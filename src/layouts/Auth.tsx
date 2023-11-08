import { ReactNode } from "react";

type PropsType = {
    children: ReactNode
};

function Auth(props: PropsType) {
    return (
        <div className="h-screen w-screen bg-blue-300 flex">
            <div className="bg-blue-50">
                {props.children}
            </div>
        </div>
    );
}

export default Auth;