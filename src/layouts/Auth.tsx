import { Outlet } from "react-router-dom";

function Auth() {
    return (
        <div className="h-screen w-screen bg-indigo-100 flex">
            <div className="m-auto max-w-md w-full bg-white p-3 rounded-lg shadow">
                <Outlet />
            </div>
        </div>
    );
}

export default Auth;