import { useState } from "react";
import { z } from "zod";
import { API_URL } from "../server";
import { AllMapsData, AllMapsDataSchema, ServerChangeDataRequest } from "../data/ServerData";
import AdminTextEdit from "../components/admin/AdminTextEdit";
import Button from "../components/Button";
import AdminFancyEdit from "../components/admin/AdminFancyEdit";
import AdminMapPopup from "../components/admin/AdminMapPopup";

type Props = {
    allMapData: AllMapsData,
}

type State = {
    temporaryAllMapData: AllMapsData,
    saveResultMessage: string,
    textMode: boolean,
    password: string,
    adminMapPopup: AdminMapPopupState | null,
}

type AdminMapPopupState = {
    submapId: number,
}

const safeParseJson = (any: string): any | null => {
    try {
        return JSON.parse(any);
    } catch (error) {
        return null;
    }
};

export default function AdminPage(props: Props){

    const [state, setState] = useState<State>({
        temporaryAllMapData: props.allMapData,
        saveResultMessage: "",
        textMode: true,
        password: "",
        adminMapPopup: null,
    });


    const showSubmap = (submapId: number) => {
        setState(s => ({
            ...s,
            adminMapPopup: {
                submapId: submapId,
            },
        }));
    }

    const saveText = async (dataJson: string) => {
        const allMapData = AllMapsDataSchema.safeParse(safeParseJson(dataJson));
        if (!allMapData.success) {
            setState(s => ({ ...s, saveResultMessage: "Invalid data" }));
            return;
        }
        save(allMapData.data);
    };

    // TODO: test when server is down
    const save = async (allMapData: AllMapsData) => {
        // console.log("to SAVE: ", JSON.stringify(allMapData.data));
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
                    saveResultMessage: "Server error",
                    temporaryAllMapData: allMapData,
                }));
                return null;
            });
    };

    return(
        <div className="relative w-full mx-auto my-0 flex flex-col pt-4">
            password:
            <input type="password" 
                className="mb-11 bg-slate-300 w-32"
                value={state.password}
                onChange={ newValue =>
                setState(s => ({ ...s, password: newValue.target.value }))
            }/>

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
                    <AdminTextEdit temporaryMapData={state.temporaryAllMapData} save={saveText} />
                    <div className="text-xl font-bold">{state.saveResultMessage}</div>
                </>
                :
                <>
                    <AdminFancyEdit 
                        temporaryMapData={state.temporaryAllMapData}
                        save={save}
                        showSubmap={showSubmap}
                    />
                    <div className="text-xl font-bold">{state.saveResultMessage}</div>
                </>
            }

            { state.adminMapPopup === null ? <></> :
                <AdminMapPopup
                    submapId={state.adminMapPopup.submapId}
                    mapData={state.temporaryAllMapData}
                    close={() => setState(s => ({ ...s, adminMapPopup: null }))}
                />
            }
        </div>
    );
}