import React, {HTMLAttributes, useState} from "react";
import {useDispatch} from "react-redux";
import {logoutAction} from "../store/user/actions";
import {Redirect} from "react-router-dom";

export const Logout: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const dispatch = useDispatch()

    const handleLogin = () => {
        const logoutPromise = dispatch(logoutAction()) as unknown as Promise<void>;

        logoutPromise
            .then(() => {
                setRedirectToReferrer(true);
            })
    }

    if (redirectToReferrer) {
        return <Redirect to={'/'}/>
    }

    return <div onClick={handleLogin} {...props}>{props.children}</div>
}

