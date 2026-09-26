
export const PASSWORD_CHANGED_MESSAGE = "Password changed";

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

const inputStyle = "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition \
    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

const labelStyle = "mb-1 text-sm font-semibold text-gray-700";

export default function AdminChangePassword(props: Props) {

    const succeeded = props.state.error === PASSWORD_CHANGED_MESSAGE;

    return(
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-900/40 p-4"
            onClick={props.onClose}>

            <form
                className="flex w-full max-w-sm flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
                onClick={e => e.stopPropagation()}
                onSubmit={e => {
                    e.preventDefault();
                    props.onSave();
                }}>

                <h2 className="mb-5 text-lg font-bold text-gray-800">Change password</h2>

                <label className={labelStyle}>Old password</label>
                <input type="password"
                    autoFocus
                    autoComplete="current-password"
                    className={`${inputStyle} mb-4`}
                    value={props.state.oldPassword}
                    onChange={v => { props.onOldPasswordChange(v.target.value); }}
                />

                <label className={labelStyle}>New password</label>
                <input type="password"
                    autoComplete="new-password"
                    className={`${inputStyle} mb-4`}
                    value={props.state.newPassword1}
                    onChange={v => { props.onNewPassword1Change(v.target.value); }}
                />

                <label className={labelStyle}>Repeat new password</label>
                <input type="password"
                    autoComplete="new-password"
                    className={inputStyle}
                    value={props.state.newPassword2}
                    onChange={v => { props.onNewPassword2Change(v.target.value); }}
                />

                <div className={`min-h-[1.5rem] mt-2 text-sm font-semibold ${succeeded ? "text-emerald-600" : "text-red-500"}`}>
                    { props.state.error }
                </div>

                <div className="mt-2 flex justify-end gap-2">
                    <button type="button"
                        className="rounded-lg border border-gray-200 px-4 py-2 font-semibold text-gray-600
                            transition hover:bg-gray-100 hover:text-gray-800"
                        onClick={props.onClose}>
                        Cancel
                    </button>
                    <button type="submit"
                        className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700">
                        Change password
                    </button>
                </div>

            </form>
        </div>
    );
}
