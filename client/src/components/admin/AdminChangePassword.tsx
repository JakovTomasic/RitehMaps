
export type ChangePasswordState = {
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
    error: string,
}

export const EMPTY_PASSWORD_CHANGE_STATE: ChangePasswordState = {
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    error: "",
}

type Props = {
    state: ChangePasswordState,
    onOldPasswordChange: (_: string) => void,
    onNewPassword1Change: (_: string) => void,
    onNewPassword2Change: (_: string) => void,
    onClose: () => void,
    onSave: () => void,
};

export default function AdminChangePassword(props: Props) {
    return(
        <div className="flex flex-col w-full p-4">
            <button
                className="mb-11 w-32 p-2 bg-stone-500"
                onClick={props.onClose}
            >back</button>

            Old password:
            <input type="password" 
                className="mb-6 bg-slate-300 w-64"
                value={props.state.oldPassword}
                onChange={v => { props.onOldPasswordChange(v.target.value); }}
            />

            New password:
            <input type="password" 
                className="mb-6 bg-slate-300 w-64"
                value={props.state.newPassword1}
                onChange={v => { props.onNewPassword1Change(v.target.value); }}
            />

            Repeat new password:
            <input type="password" 
                className="mb-6 bg-slate-300 w-64"
                value={props.state.newPassword2}
                onChange={v => { props.onNewPassword2Change(v.target.value); }}
            />

            <button
                className="mb-11 w-48 p-2 bg-emerald-500"
                onClick={props.onSave}
            >change password</button>
            
            <div className="text-lg text-red-400">
                { props.state.error }
            </div>
        </div>
    );
}