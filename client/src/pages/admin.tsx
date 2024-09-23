import { ProfessorData } from "../data/ProfessorData";
import { useState } from "react";
import { z } from "zod";
import { API_URL, ProfessorDataSchema, SaveAllData } from "../server";

type Props = {
    professors: ProfessorData[],
}

type State = {
    professorData: ProfessorData[],
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
        professorData: props.professors,
        dataTextInput: JSON.stringify(props.professors),
        saveResultMessage: "",
    });


    // TODO: test when server is down
    const save = async () => {
        // TODO: other data, too

        const professorData = z.array(ProfessorDataSchema).safeParse(safeParseJson(state.dataTextInput));
        if (!professorData.success) {
            setState(s => ({ ...s, saveResultMessage: "Invalid professors data" }));
            return;
        }
        const request: SaveAllData = {
            arr: professorData.data,
        }
        console.log("REQUEST", JSON.stringify(request));
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