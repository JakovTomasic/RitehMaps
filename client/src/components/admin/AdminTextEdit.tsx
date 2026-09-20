import { useState } from "react";
import { AllMapsData } from "../../data/ServerData";
import { AdminSaveButton } from "../../pages/admin";

type Props = {
    temporaryMapData: AllMapsData,
    specialSaveText: string,
    onTextUpdate: (json: string) => void,
    save: (json: string) => void,
};

type State = {
    dataTextInput: string,
};

export default function AdminTextEdit(props: Props) {

    const [state, setState] = useState<State>({
        dataTextInput: JSON.stringify(props.temporaryMapData, null, 4),
    });

    const save = () => {
        props.save(state.dataTextInput);
    };

    return(
        <div className="flex w-full flex-col">
            <div className="rounded-xl border border-gray-200 bg-white p-2">
                <textarea
                    rows={25}
                    spellCheck={false}
                    className="w-full resize-y rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed
                        text-gray-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    onChange={(newText) => {
                        setState(s => ({ ...s, dataTextInput: newText.target.value }))
                        props.onTextUpdate(newText.target.value)
                    }}
                    value={state.dataTextInput} />
            </div>
            <AdminSaveButton specialSaveText={props.specialSaveText} save={save} />
        </div>
    );
}
