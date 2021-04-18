import React from "react";
import loadable from "@loadable/component";
import {PageLoader} from "./component/PageLoader";
import {Footer} from "./component/Footer";
import {PageWrapper} from "./component/PageWrapper";

const defaultLoadableOptions = {
    fallback: <PageLoader/>
};

export const Homepage = () => {
    const Component = loadable(() => import("./page/Homepage"), {
        ...defaultLoadableOptions,
    });

    return <PageWrapper>
        <Component/>
        <Footer/>
    </PageWrapper>;
};

export const FanLocationInterview = () => {
    const Component = loadable(() => import("./page/FanLocationInterview"), {
        ...defaultLoadableOptions,
    });

    return <PageWrapper>
        <Component/>
        <Footer/>
    </PageWrapper>;
};

export const Result = () => {
    const Component = loadable(() => import("./page/Result"), {
        ...defaultLoadableOptions,
    });

    return <PageWrapper>
        <Component/>
        <Footer/>
    </PageWrapper>;
};

export const Map = () => {
    const Component = loadable(() => import("./page/Map"), {
        ...defaultLoadableOptions,
    });

    return <>
        <Component/>
        <Footer mapMode={true}/>
    </>
};
