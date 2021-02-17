import React from "react";
import loadable from "@loadable/component";
import {PageLoader} from "./component/PageLoader";

const defaultLoadableOptions = {
    fallback: <PageLoader/>
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
