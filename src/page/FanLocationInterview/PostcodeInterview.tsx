import React from "react";
import {PageContent} from "../../component/PageContent";
import {Select} from "../../component/Select";
import {OptionTypeBase} from "react-select";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../type/thunk";
import {searchPostcodes} from "../../store/action/searchPostcodes";
import {Postcode} from "../../model/Postcode";

export const PostcodeInterview = (props: { onSubmit: ((postcode: Postcode) => void), value: Postcode | null }) => {
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


    return <PageContent>
        <h1>PLZ Auswahl</h1>

        <Select<Postcode>
            value={props.value}
            loadOptions={handleLoadOptions}
            onValueChange={(newPostcode => {
                if (newPostcode instanceof Postcode) {
                    props.onSubmit(newPostcode)
                }
            })}
        />
    </PageContent>
}
