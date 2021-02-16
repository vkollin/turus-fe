import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchOpenApiDoc} from "../store/action/documentationAction";
// @ts-ignore
import SwaggerUi, {presets} from "swagger-ui";
import style from "./ApiDocumentation.scss";
// import "swagger-ui/dist/swagger-ui.css";

import {apiUrl} from "../store/apiUrl";

export const ApiDocumentation = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        const d = dispatch(fetchOpenApiDoc()) as unknown as Promise<JSON>;

        d.then((json) => {
            SwaggerUi({
                dom_id: '#swaggerContainer',
                url: apiUrl,
                spec: json,
                presets: [presets.apis]
            })
        })
    }, []);

    return <div className={style.Container} id="swaggerContainer"/>
}
