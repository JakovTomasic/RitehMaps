import { useState } from "react";
import { z } from "zod";
import { API_URL } from "../server";
import { AllMapsData, AllMapsDataSchema, ServerChangeDataRequest, ServerChangePasswordRequest, ServerLoginRequest } from "../data/ServerData";
import AdminTextEdit from "../components/admin/AdminTextEdit";
import AdminFancyEdit, { AdminFancyEditState } from "../components/admin/AdminFancyEdit";
import AdminMapPopup from "../components/admin/AdminMapPopup";
import { submaps } from "../data/submaps";
import { addUuids, AllMapsDataWithUuids, removeUuids } from "../data/AdminObjects";
import AdminChangePassword, { ChangePasswordState, EMPTY_PASSWORD_CHANGE_STATE, PASSWORD_CHANGED_MESSAGE } from "../components/admin/AdminChangePassword";
import AdminLogin from "../components/admin/AdminLogin";

export const SAVED_MESSAGE = "Saved";

type Props = {
    allMapData: AllMapsData,
}

type State = {
    mapDataState: AdminFancyEditState,
    saveResultMessage: string,
    textMode: boolean,
    // The password confirmed by the server, empty until logged in. Used for saving.
    password: string,
    loginScreen: LoginScreenState,
    // null iff popup isn't visible
    adminMapPopup: AdminMapPopupState | null,
    // null iff change password screen isn't visible
    changePasswordScreen: ChangePasswordState | null,
}

// null iff the admin is logged in (= everything below is unlocked)
type LoginScreenState = {
    passwordInput: string,
    error: string,
    checking: boolean,
} | null;

const EMPTY_LOGIN_SCREEN_STATE: LoginScreenState = {
    passwordInput: "",
    error: "",
    checking: false,
};

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
        mapDataState: {
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
        loginScreen: EMPTY_LOGIN_SCREEN_STATE,
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
        const node = state.mapDataState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeId);
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
        const node = state.mapDataState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeOrHallwayId1);
        const hallway = state.mapDataState.temporaryMapData.hallways.find(h => h.v.id === nodeOrHallwayId1);
        if (!node && !hallway) {
            alert(`Invalid data! Cannot find node or hallway with id ${nodeOrHallwayId1}`);
            return;
        }
        const node2 = state.mapDataState.temporaryMapData.nodes.find(n => n.v.nodeId === nodeOrHallwayId2);
        const hallway2 = state.mapDataState.temporaryMapData.hallways.find(h => h.v.id === nodeOrHallwayId2);
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
        const hallway = state.mapDataState.temporaryMapData.hallways.find(h => h.v.id === hallwayId);
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

    const logIn = async () => {
        if (state.loginScreen === null) return;
        const password = state.loginScreen.passwordInput;
        setState(s => ({
            ...s,
            loginScreen: s.loginScreen === null ? null : { ...s.loginScreen, checking: true, error: "" },
        }));
        const request: ServerLoginRequest = { password };
        fetch(`${API_URL}/login`, {
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
                    // Unlocks everything below
                    setState(s => ({ ...s, password: password, loginScreen: null }));
                } else {
                    setLoginError("Wrong password");
                }
            })
            .catch(error => {
                console.error(error);
                setLoginError("Server error");
                return null;
            });
    };

    const setLoginError = (error: string) => {
        setState(s => ({
            ...s,
            loginScreen: s.loginScreen === null ? null : { ...s.loginScreen, checking: false, error: error },
        }));
    };

    const logOut = () => {
        setState(s => ({
            ...s,
            password: "",
            loginScreen: EMPTY_LOGIN_SCREEN_STATE,
            saveResultMessage: "",
            adminMapPopup: null,
            changePasswordScreen: null,
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
                    setState(s => ({ ...s, saveResultMessage: SAVED_MESSAGE }));
                    setTimeout(() => {
                        setState(s => ({ ...s, saveResultMessage: "" }));
                    }, 3000);
                } else {
                    setState(s => ({ ...s, saveResultMessage: "Server error" }));
                }
            })
            .catch(error => {
                console.error(error);
                setState(s => ({ ...s, saveResultMessage: "Server error: " + error }));
                return null;
            });
    };

    const changePassword = async (wholeState: ChangePasswordState) => {
        if (wholeState.newPassword1 !== wholeState.newPassword2) {
            setChangePasswordMessage("Error: new passwords differ!");
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
                    setChangePasswordMessage(PASSWORD_CHANGED_MESSAGE);
                    setTimeout(() => {
                        setState(s => ({
                            ...s,
                            // Keep saving working after the password changed
                            password: wholeState.newPassword1,
                            // Close the change password screen (this isn't perfect if user closes it manually and then opens it again)
                            changePasswordScreen: null,
                        }));
                    }, 1500);
                } else {
                    setChangePasswordMessage("Error changing password");
                }
            })
            .catch(error => {
                console.error(error);
                setChangePasswordMessage("Error changing password");
                return null;
            });
    };

    const setChangePasswordMessage = (message: string) => {
        setState(s => ({
            ...s,
            changePasswordScreen: s.changePasswordScreen === null ? null : { ...s.changePasswordScreen, error: message },
        }));
    };

    // Everything below is hidden until the server confirms the password
    if (state.loginScreen !== null) {
        const loginScreen = state.loginScreen;
        return (
            <AdminLogin
                password={loginScreen.passwordInput}
                error={loginScreen.error}
                checking={loginScreen.checking}
                onPasswordChange={(value) => {
                    setState(s => ({
                        ...s,
                        loginScreen: s.loginScreen === null ? null : { ...s.loginScreen, passwordInput: value, error: "" },
                    }));
                }}
                onSubmit={logIn}
            />
        );
    }

    return(
        <div className="min-h-screen w-full bg-gray-50">

            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">

                    <h1 className="mr-auto text-lg font-bold text-gray-800">Admin</h1>

                    <div className="flex rounded-lg bg-gray-100 p-1">
                        <button
                            className={modeTabStyle(state.textMode)}
                            onClick={() => setState(s => ({ ...s, textMode: true }))}>
                            Text
                        </button>
                        <button
                            className={modeTabStyle(!state.textMode)}
                            onClick={() => setState(s => ({ ...s, textMode: false }))}>
                            Fancy
                        </button>
                    </div>

                    <button
                        className={headerButtonStyle}
                        onClick={() => {
                            // Open change passwords screen
                            setState(s => ({ ...s, changePasswordScreen: EMPTY_PASSWORD_CHANGE_STATE }));
                        }}>
                        Change password
                    </button>

                    <button className={headerButtonStyle} onClick={logOut}>
                        Log out
                    </button>

                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-6">
                { state.textMode ?
                    <AdminTextEdit
                        specialSaveText={state.saveResultMessage}
                        temporaryMapData={removeUuids(state.mapDataState.temporaryMapData)}
                        onTextUpdate={(json: string) => {
                            const allMapData = AllMapsDataSchema.safeParse(safeParseJson(json));
                            if (allMapData.success) {
                                setState(old => {
                                    return {
                                        ...old,
                                        mapDataState: {
                                            ...old.mapDataState,
                                            temporaryMapData: {
                                                ...addUuids(allMapData.data),
                                                submaps: localSubmaps,
                                            }
                                        }
                                    };
                                });
                            }
                        }}
                        save={saveText} />
                    :
                    <AdminFancyEdit
                        state={state.mapDataState}
                        specialSaveText={state.saveResultMessage}
                        updateState={s => setState(oldS => ({ ...oldS, mapDataState: s }))}
                        save={saveWithUuids}
                        showSubmap={showSubmap}
                        showNode={showNode}
                        showEdge={showEdge}
                        showHallway={showHallway}
                    />
                }
            </main>

            { state.changePasswordScreen === null ? <></> :
                <AdminChangePassword
                    state={state.changePasswordScreen}
                    onOldPasswordChange={(value) => {
                        setState((s: State) => {
                            if (s.changePasswordScreen === null) return s;
                            else return ({ ...s, changePasswordScreen: {...s.changePasswordScreen, oldPassword: value} });
                        });
                    }}
                    onNewPassword1Change={(value) => {
                        setState(s => {
                            if (s.changePasswordScreen === null) return s;
                            else return ({ ...s, changePasswordScreen: {...s.changePasswordScreen, newPassword1: value} })
                        });
                    }}
                    onNewPassword2Change={(value) => {
                        setState(s => {
                            if (s.changePasswordScreen === null) return s;
                            else return ({ ...s, changePasswordScreen: {...s.changePasswordScreen, newPassword2: value} })
                        });
                    }}
                    onClose={() => {
                        setState(s => ({ ...s, changePasswordScreen: null }));
                    }}
                    onSave={() => {
                        if (state.changePasswordScreen != null) changePassword(state.changePasswordScreen);
                    }}
                />
            }

            { state.adminMapPopup === null ? <></> :
                <AdminMapPopup
                    submapId={state.adminMapPopup.submapId}
                    mapData={removeUuids(state.mapDataState.temporaryMapData)}
                    nodeToShowId={state.adminMapPopup.nodeToShowId}
                    edgeToShow={state.adminMapPopup.edgeToShow}
                    hallwayToShowId={state.adminMapPopup.hallwayToShowId}
                    close={() => setState(s => ({ ...s, adminMapPopup: null }))}
                />
            }

        </div>
    );
}

const headerButtonStyle = "rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 \
    transition hover:bg-gray-100 hover:text-gray-800";

function modeTabStyle(active: boolean): string {
    return `rounded-md px-4 py-1.5 text-sm font-semibold transition ${
        active ? "bg-white text-cyan-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
    }`;
}

export function AdminSaveButton(props: {specialSaveText: string, save: () => void}) {
    const hasMessage = props.specialSaveText.length > 0;
    const saved = props.specialSaveText === SAVED_MESSAGE;
    return(
        <div className="sticky bottom-0 z-10 mt-6 flex items-center gap-3 border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
            <button
                className={`rounded-lg px-5 py-2 font-semibold text-white transition ${
                    hasMessage ? "cursor-default bg-cyan-300" : "bg-cyan-600 hover:bg-cyan-700"
                }`}
                onClick={hasMessage ? () => { } : props.save}>
                Save
            </button>
            { !hasMessage ? <></> :
                <span className={`text-sm font-semibold ${saved ? "text-emerald-600" : "text-red-500"}`}>
                    {props.specialSaveText}
                </span>
            }
        </div>
    );
}
