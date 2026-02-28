import { useState } from "react";
import { AllMapsData } from "../../data/ServerData";
import { AdminSaveButton } from "../../pages/admin";

type Props = {
    temporaryMapData: AllMapsData,
    specialSaveText: string,
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
        <div className="flex flex-col w-full">
            <textarea
                rows={25}
                onChange={(newText) => setState(s => ({ ...s, dataTextInput: newText.target.value }))}
                value={state.dataTextInput} />
            <AdminSaveButton specialSaveText={props.specialSaveText} save={save} />
        </div>
    );
}