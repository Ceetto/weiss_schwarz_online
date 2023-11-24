import React from "react";
import {redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from "react-redux";
import {RootState} from "./api/store";


const ProtectedRoute = (props: RouteProps) => {
    const auth = useSelector((state: RootState) => state.auth);

    if (auth.account) {
        if (props.path === "/login") {
            return redirect("/");
        }
        return <Route {...props} />;
    } else if (!auth.account) {
        return redirect("/login");
    } else {
        return <div>Not found</div>;
    }
};

export default ProtectedRoute;