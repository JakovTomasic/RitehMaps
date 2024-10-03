import { useState } from "react";
import { z } from "zod";
import { API_URL } from "../server";
import { AllMapsData, AllMapsDataSchema } from "../data/ServerData";

type Props = {
    allMapData: AllMapsData,
}

type State = {
    temporaryAllMapData: AllMapsData,
    dataTextInput: string,
    saveResultMessage: string,
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
        dataTextInput: JSON.stringify(props.allMapData, null, 4),
        saveResultMessage: "",
    });


    // TODO: test when server is down
    const save = async () => {
        const allMapData = AllMapsDataSchema.safeParse(safeParseJson(state.dataTextInput));
        if (!allMapData.success) {
            setState(s => ({ ...s, saveResultMessage: "Invalid data" }));
            return;
        }
        // console.log("to SAVE: ", JSON.stringify(allMapData.data));
        fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allMapData.data),
        })
            .then((res) => res.json())
            .then((result) => {
                const data = z.boolean().safeParse(result);
                if (data.success && data.data === true) {
                    setState(s => ({ ...s, saveResultMessage: "saved" }));
                    setTimeout(() => {
                        setState(s => ({ ...s, saveResultMessage: "" }));
                    }, 3000);
                } else {
                    setState(s => ({ ...s, saveResultMessage: "Server error" }));
                }
            })
            .catch(error => {
                console.error(error);
                return null;
            });
    };

    return(
        <div className="relative w-fill mx-auto my-0 flex flex-col">
            <textarea
                onChange={(newText) => setState(s => ({ ...s, dataTextInput: newText.target.value }))}
                value={state.dataTextInput} />
            <button onClick={save}>Save</button>

            <div className="text-xl font-bold">{state.saveResultMessage}</div>
        
        </div>
    );
}