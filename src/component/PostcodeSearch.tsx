import {Postcode} from "../model/Postcode";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../type/thunk";
import {OptionTypeBase} from "react-select";
import {searchPostcodes} from "../store/action/searchPostcodes";
import {Select} from "./Select";
import React, {useRef} from "react";
import {SelectedValue} from "./SelectedValue";
import {SearchOptions} from "../repository/PostcodeRepository";
import {CancelTokenSource} from "axios";

type Props = {
    onSubmit: ((postcode: Postcode | null) => void),
    value: Postcode | null,
    className?: string,
    selectedClassName?: string,
    options?: SearchOptions,
};

export const PostcodeSearch = (props: Props) => {
    return <div className={props.className}>
        {
            props.value === null || props.value.code === null
                ? <PostcodeSelect onSubmit={props.onSubmit} options={props.options}/>
                : <ShowPostcode value={props.value} onSubmit={props.onSubmit}/>
        }
    </div>
}

const ShowPostcode = (props: { onSubmit: ((postcode: Postcode | null) => void), value: Postcode, className?: string }) => {
    return <SelectedValue
        className={props.className}
        label={props.value.code}
        onClick={() => {
            props.onSubmit(null)
        }}
    />
}

const PostcodeSelect = (props: { onSubmit: ((postcode: Postcode) => void), options?: SearchOptions }) => {
    const dispatch = useDispatch<ThunkDispatchType>();
    const cancelTokenRef = useRef<CancelTokenSource | null>(null)

    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase[]> => {
        return new Promise(((resolve, reject) => {
            if (inputValue.length < 2) {
                reject();
                return
            }

            dispatch(searchPostcodes(inputValue, cancelTokenRef, props.options))
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
