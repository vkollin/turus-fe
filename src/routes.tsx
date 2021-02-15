import React from "react";
import loadable from "@loadable/component";
import {Loading} from "./element/Loading";

const defaultLoadableOptions = {
    fallback: <Loading/>
};

export const Homepage = () => {
    const Component = loadable(() => import("./page/Homepage"), {
        ...defaultLoadableOptions,
        resolveComponent: mod => mod.Homepage,
    });

    return <Component/>;
};

export const ApiDocumentation = () => {
    const Component = loadable(() => import("./page/ApiDocumentation"), {
        ...defaultLoadableOptions,
        resolveComponent: mod => mod.ApiDocumentation,
    });

    return <Component/>;
};
