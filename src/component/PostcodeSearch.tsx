import {Postcode} from "../model/Postcode";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../type/thunk";
import {OptionTypeBase} from "react-select";
import {searchPostcodes} from "../store/action/searchPostcodes";
import {Select} from "./Select";
import React from "react";
import {SelectedValue} from "./SelectedValue";

export const PostcodeSearch = (props: { onSubmit: ((postcode: Postcode | null) => void), value: Postcode | null, className?: string }) => {
    return <div className={props.className}>
        {
            props.value === null || props.value.code === null
                ? <PostcodeSelect onSubmit={props.onSubmit}/>
                : <ShowPostcode value={props.value} onSubmit={props.onSubmit}/>
        }
    </div>
}

const ShowPostcode = (props: { onSubmit: ((postcode: Postcode | null) => void), value: Postcode }) => {
    return <SelectedValue
        label={props.value.code}
        onClick={() => {
            props.onSubmit(null)
        }}
    />
}

const PostcodeSelect = (props: { onSubmit: ((postcode: Postcode) => void) }) => {
    const dispatch = useDispatch<ThunkDispatchType>();

    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase[]> => {
        return new Promise(((resolve, reject) => {
            if (inputValue.length < 2) {
                reject();
                return
            }

            dispatch(searchPostcodes(inputValue))
                .then(data => {
                    resolve(data.map(d => ({value: d, label: d.code})))
                })
                .catch(() =>
                    reject()
                )
        }))
    }

    return <Select<Postcode>
        loadOptions={handleLoadOptions}
        placeholder="PLZ suchen"
        onValueChange={(newPostcode => {
            if (newPostcode instanceof Postcode) {
                props.onSubmit(newPostcode)
            }
        })}
    />
}
