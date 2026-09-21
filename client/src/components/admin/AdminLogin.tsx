import { useState } from "react";

type Props = {
    password: string,
    error: string,
    checking: boolean,
    onPasswordChange: (_: string) => void,
    onSubmit: () => void,
};

export default function AdminLogin(props: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
            <form
                className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit();
                }}>

                <h1 className="text-xl font-bold text-gray-800">Admin</h1>
                <p className="mt-1 mb-6 text-sm text-gray-500">
                    Enter the admin password to view and edit map data.
                </p>

                <label htmlFor="admin-password" className="mb-1 text-sm font-semibold text-gray-700">
                    Password
                </label>
                <div className="relative w-full">
                    <input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        autoFocus
                        autoComplete="current-password"
                        className="w-full rounded-lg border border-gray-300 pl-3 pr-16 py-2 outline-none transition
                            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                        value={props.password}
                        onChange={v => props.onPasswordChange(v.target.value)}
                    />
                    <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-gray-500
                            hover:text-cyan-700 transition"
                        onClick={() => setShowPassword(v => !v)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="min-h-[1.5rem] mt-2 text-sm font-semibold text-red-500">
                    {props.error}
                </div>

                <button
                    type="submit"
                    disabled={props.checking}
                    className={`mt-2 w-full rounded-lg px-4 py-2 font-semibold text-white transition ${
                        props.checking
                            ? "bg-cyan-300 cursor-not-allowed"
                            : "bg-cyan-600 hover:bg-cyan-700"
                    }`}>
                    {props.checking ? "Checking..." : "Log in"}
                </button>

                <a href="/" className="mt-4 text-center text-sm text-gray-500 hover:text-cyan-700 transition">
                    Back to map
                </a>
            </form>
        </div>
    );
}
