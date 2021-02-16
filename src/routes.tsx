import React from "react";
import loadable from "@loadable/component";
import {Loading} from "./component/Loading";

const defaultLoadableOptions = {
    fallback: <Loading/>
};

export const Homepage = () => {
    const Component = loadable(() => import("./page/Homepage"), {
        ...defaultLoadableOptions,
    });

    return <Component/>;
};

export const FanLocationInterview = () => {
    const Component = loadable(() => import("./page/FanLocationInterview"), {
        ...defaultLoadableOptions,
    });

    return <Component/>;
};
