import {Club} from "../model/Club";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../type/thunk";
import React, {useRef} from "react";
import {OptionTypeBase} from "react-select";
import {searchClubs} from "../store/action/searchClubs";
import {Select, Style} from "./Select";
import {SearchOptions} from "../repository/ClubRepository";

const SEARCH_TIMEOUT = 350;

type Props = {
    onSelect: (club: Club | null) => void,
    selectedClubs?: Club[], // use to exclude ids from search result
    selectedClub?: Club | null, // use to display in field after selection
    className?: string,
    style?: Style,
    onFocus?: () => void,
    options?: SearchOptions,
    mapMode?: boolean,
};

export const ClubSearch = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatchType>();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase[]> => {
        return new Promise(((resolve, reject) => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            if (inputValue.length < 3) {
                reject();
                return
            }

            timeoutRef.current = setTimeout(
                () => {

                    dispatch(searchClubs(inputValue, props.selectedClubs ?? [], props.options))
                        .then(data => {
                            resolve(data.map(d => ({value: d, label: d.name})))
                        })
                        .catch(() =>
                            reject()
                        )
                },
                SEARCH_TIMEOUT
            )
        }))
    }

    const value = props.selectedClub ? {label: props.selectedClub.name, value: props.selectedClub.name} : null;

    return <Select<Club>
        loadOptions={handleLoadOptions}
        className={props.className}
        style={props.style ?? Style.GREY}
        placeholder={'Verein suchen'}
        onFocus={props.onFocus}
        onValueChange={props.onSelect}
        value={value}
        mapMode={props.mapMode}
    />
}
