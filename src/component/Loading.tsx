import React from "react";

export const Loading = (props: { fullpage?: boolean }): JSX.Element => {

    return <div>...Loading {props.fullpage ? "(FULLPAGE PLEASE)" : ""}</div>
}
