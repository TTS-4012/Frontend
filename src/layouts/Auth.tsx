import { ReactNode } from "react";

type PropsType = {
    children: ReactNode
};

function Auth(props: PropsType) {
    return (
        <div className="h-screen w-screen bg-indigo-100 flex">
            <div className="m-auto max-w-md w-full bg-white p-3 rounded-lg shadow">
                {props.children}
            </div>
        </div>
    );
}

export default Auth;