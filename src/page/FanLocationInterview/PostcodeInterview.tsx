import React from "react";
import {Section} from "../../component/Section";
import {Select} from "../../component/Select";
import {OptionTypeBase} from "react-select";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../type/thunk";
import {searchPostcodes} from "../../store/action/searchPostcodes";
import {Postcode} from "../../model/Postcode";
import {SelectedValue} from "../../component/SelectedValue";

export const PostcodeInterview = (props: { onSubmit: ((postcode: Postcode | null) => void), value: Postcode | null }) => {
    return <Section title={"PLZ"}>
        {
            props.value === null || props.value.code === null
                ? <SelectPostcode onSubmit={props.onSubmit}/>
                : <ShowPostcode value={props.value} onSubmit={props.onSubmit}/>
        }
    </Section>
}

const ShowPostcode = (props: { onSubmit: ((postcode: Postcode | null) => void), value: Postcode }) => {
    return <SelectedValue
        label={props.value.code}
        onClick={() => {
            props.onSubmit(null)
        }}
    />
}

const SelectPostcode = (props: { onSubmit: ((postcode: Postcode) => void) }) => {
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
        onValueChange={(newPostcode => {
            if (newPostcode instanceof Postcode) {
                props.onSubmit(newPostcode)
            }
        })}
    />
}
