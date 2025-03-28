import { useState } from "react";
import { z } from "zod";
import { API_URL } from "../server";
import { AllMapsData, AllMapsDataSchema, ServerChangeDataRequest, ServerChangePasswordRequest } from "../data/ServerData";
import AdminTextEdit from "../components/admin/AdminTextEdit";
import Button from "../components/Button";
import AdminFancyEdit, { AdminFancyEditState } from "../components/admin/AdminFancyEdit";
import AdminMapPopup from "../components/admin/AdminMapPopup";
import { submaps } from "../data/submaps";
import { addUuids, AllMapsDataWithUuids, removeUuids } from "../data/AdminObjects";
import AdminChangePassword, { ChangePasswordState, EMPTY_PASSWORD_CHANGE_STATE } from "../components/admin/AdminChangePassword";

type Props = {
    allMapData: AllMapsData,
}

type State = {
    mapDateState: AdminFancyEditState,
    saveResultMessage: string,
    textMode: boolean,
    password: string,
    // null iff popup isn't visible
    adminMapPopup: AdminMapPopupState | null,
    // null iff change password screen isn't visible
    changePasswordScreen: ChangePasswordState | null,
}

type AdminMapPopupState = {
    submapId: number,
    nodeToShowId: string | null,
    edgeToShow: { nodeOrHallwayId1: string, nodeOrHallwayId2: string } | null,
    hallwayToShowId: string | null,
}

const safeParseJson = (any: string): any | null => {
    try {
        return JSON.parse(any);
    } catch (error) {
        return null;
    }
};

export default function AdminPage(props: Props){

    const mockSubmaps = submaps.map(s => ({ id: s.id, caption: s.path }));
    const localSubmaps = props.allMapData.submaps.length === 0 ? mockSubmaps : props.allMapData.submaps;

    const [state, setState] = useState<State>({
        mapDateState: {
            temporaryMapData: {
                ...addUuids(props.allMapData),
                submaps: localSubmaps,
            },
            expandNodes: false,
            expandEdges: false,
            expandHallways: false,
            expandProfessors: false,
            expandSubmaps: false,
        },
        saveResultMessage: "",
        textMode: true,
        password: "",
        adminMapPopup: null,
        changePasswordScreen: null,
    });


    const showSubmap = (submapId: number) => {
        setState(s => ({
            ...s,
            adminMapPopup: {
                submapId: submapId,
                nodeToShowId: null,
                edgeToShow: null,
                hallwayToShowId: null,
            },
        }));
    };
    const showNode = (nodeId: string) => {
        const node = state.mapDateState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeId);
        if (!node) {
            alert("Invalid data!");
            return;
        }
        setState(s => ({
            ...s,
            adminMapPopup: {
                submapId: node.v.submapId,
                nodeToShowId: node.v.nodeId,
                edgeToShow: null,
                hallwayToShowId: null,
            },
        }));
    };
    const showEdge = (nodeOrHallwayId1: string, nodeOrHallwayId2: string) => {
        const node = state.mapDateState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeOrHallwayId1);
        const hallway = state.mapDateState.temporaryMapData.hallways.find(h => h.v.id === nodeOrHallwayId1);
        if (!node && !hallway) {
            alert(`Invalid data! Cannot find node or hallway with id ${nodeOrHallwayId1}`);
            return;
        }
        const node2 = state.mapDateState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeOrHallwayId2);
        const hallway2 = state.mapDateState.temporaryMapData.hallways.find(h => h.v.id === nodeOrHallwayId2);
        if (!node2 && !hallway2) {
            alert(`Invalid data! Cannot find node or hallway with id ${nodeOrHallwayId2}`);
            return;
        }
        setState(s => ({
            ...s,
            adminMapPopup: {
                submapId: node ? node.v.submapId : hallway!.v.submapId,
                nodeToShowId: null,
                edgeToShow: { nodeOrHallwayId1, nodeOrHallwayId2 },
                hallwayToShowId: null,
            },
        }));
    };
    const showHallway = (hallwayId: string) => {
        const hallway = state.mapDateState.temporaryMapData.hallways.find(h => h.v.id === hallwayId);
        if (!hallway) {
            alert(`Invalid data! Cannot find hallway with id ${hallwayId}`);
            return;
        }
        setState(s => ({
            ...s,
            adminMapPopup: {
                submapId: hallway.v.submapId,
                nodeToShowId: null,
                edgeToShow: null,
                hallwayToShowId: hallway.v.id,
            },
        }));
    };

    const saveText = async (dataJson: string) => {
        const allMapData = AllMapsDataSchema.safeParse(safeParseJson(dataJson));
        if (!allMapData.success) {
            setState(s => ({ ...s, saveResultMessage: "Invalid data" }));
            return;
        }
        save(allMapData.data);
    };

    const saveWithUuids = async (allMapData: AllMapsDataWithUuids) => {
        return await save(removeUuids(allMapData))
    }

    const save = async (allMapData: AllMapsData) => {
        const request: ServerChangeDataRequest = {
            password: state.password,
            data: allMapData,
        }
        fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
            .then((res) => res.json())
            .then((result) => {
                const data = z.boolean().safeParse(result);
                if (data.success && data.data === true) {
                    setState(s => ({
                        ...s,
                        saveResultMessage: "saved",
                        temporaryAllMapData: allMapData,
                    }));
                    setTimeout(() => {
                        setState(s => ({ ...s, saveResultMessage: "" }));
                    }, 3000);
                } else {
                    setState(s => ({
                        ...s,
                        saveResultMessage: "Server error",
                        temporaryAllMapData: allMapData,
                    }));
                }
            })
            .catch(error => {
                console.error(error);
                setState(s => ({
                    ...s,
                    saveResultMessage: "Server error: " + error,
                    temporaryAllMapData: allMapData,
                }));
                return null;
            });
    };

    const changePassword = async (wholeState: ChangePasswordState) => {
        if (wholeState.newPassword1 !== wholeState.newPassword2) {
            setState(s => ({
                ...s,
                changePasswordScreen: s.changePasswordScreen !== null ? { ...s.changePasswordScreen, error: "Error: new passwords differ!" } : null,
            }));
            return;
        }
        const request: ServerChangePasswordRequest = {
            oldPassword: wholeState.oldPassword,
            newPassword: wholeState.newPassword1,
        };
        fetch(`${API_URL}/changePassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
            .then((res) => res.json())
            .then((result) => {
                const data = z.boolean().safeParse(result);
                if (data.success && data.data === true) {
                    setState(s => ({
                        ...s,
                        changePasswordScreen: s.changePasswordScreen !== null ? { ...s.changePasswordScreen, error: "Password changed" } : null,
                    }));
                    setTimeout(() => {
                        setState(s => ({
                            ...s,
                            // Close the change password screen (this isn't perfect if user closes it manually and then opens it again)
                            changePasswordScreen: null, 
                        }));
                    }, 1500);
                } else {
                    setState(s => ({
                        ...s,
                        changePasswordScreen: s.changePasswordScreen !== null ? { ...s.changePasswordScreen, error: "Error changing password" } : null,
                    }));
                }
            })
            .catch(error => {
                console.error(error);
                setState(s => ({
                    ...s,
                    changePasswordScreen: s.changePasswordScreen !== null ? { ...s.changePasswordScreen, error: "Error changing password" } : null,
                }));
                return null;
            });
    };

    return(
        <div className="relative w-full mx-auto my-0 flex flex-col pt-4">
            { state.changePasswordScreen ?
                <AdminChangePassword
                    state={state.changePasswordScreen}
                    onOldPasswordChange={(value) => {
                        setState(s => ({ ...s, changePasswordScreen: {...s.changePasswordScreen, oldPassword: value} }));
                    }}
                    onNewPassword1Change={(value) => {
                        setState(s => ({ ...s, changePasswordScreen: {...s.changePasswordScreen, newPassword1: value} }));
                    }}
                    onNewPassword2Change={(value) => {
                        setState(s => ({ ...s, changePasswordScreen: {...s.changePasswordScreen, newPassword2: value} }));
                    }}
                    onClose={() => {
                        setState(s => ({ ...s, changePasswordScreen: null }));
                    }}
                    onSave={() => {
                        changePassword(state.changePasswordScreen);
                    }}
                />
                :
                <>
                    Password:
                    <input type="password" 
                        className="mb-6 bg-slate-300 w-64"
                        value={state.password}
                        onChange={ newValue =>
                        setState(s => ({ ...s, password: newValue.target.value }))
                    }/>

                    <button
                        className="mb-11 w-48 bg-stone-500"
                        onClick={() => {
                            // Open change passwords screen
                            setState(s => ({ ...s, changePasswordScreen: EMPTY_PASSWORD_CHANGE_STATE }));
                        }}
                    >change password</button>

                    <div className="mb-11 flex flex-row">
                        <Button
                            enabled={true}    
                            text="Text"
                            onClick={() => setState(s => ({ ...s, textMode: true }))} />
                        <Button
                            enabled={true}    
                            text="Fancy"
                            onClick={() => setState(s => ({ ...s, textMode: false }))} />
                    </div>

                    { state.textMode ?
                        <>
                            <AdminTextEdit temporaryMapData={removeUuids(state.mapDateState.temporaryMapData)} save={saveText} />
                            <div className="text-xl font-bold">{state.saveResultMessage}</div>
                        </>
                        :
                        <>
                            <AdminFancyEdit
                                state={state.mapDateState}
                                updateState={s => setState(oldS => ({ ...oldS, mapDateState: s }))}
                                save={saveWithUuids}
                                showSubmap={showSubmap}
                                showNode={showNode}
                                showEdge={showEdge}
                                showHallway={showHallway}
                            />
                            <div className="text-xl font-bold">{state.saveResultMessage}</div>
                        </>
                    }

                    { state.adminMapPopup === null ? <></> :
                        <AdminMapPopup
                            submapId={state.adminMapPopup.submapId}
                            mapData={removeUuids(state.mapDateState.temporaryMapData)}
                            nodeToShowId={state.adminMapPopup.nodeToShowId}
                            edgeToShow={state.adminMapPopup.edgeToShow}
                            hallwayToShowId={state.adminMapPopup.hallwayToShowId}
                            close={() => setState(s => ({ ...s, adminMapPopup: null }))}
                        />
                    }
                </>
            }
        </div>
    );
}