import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import {OptionTypeBase} from "react-select";
import './Select._.scss';

type Props<Value> = {
    onValueChange: (newValue: Value | null) => void,
    loadOptions: (inputValue: string) => Promise<ReadonlyArray<OptionTypeBase>>
    value?: Value | null,
};

export function Select<Value>(props: Props<Value>): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);
    const handleLoadOptions = async (inputValue: string): Promise<ReadonlyArray<OptionTypeBase>> => {
        return await props.loadOptions(inputValue)
    }

    const classNames = ["Select"]

    if (isFocused) {
        classNames.push("Select-Focused");
    }

    return <AsyncSelect
        className={classNames.join(' ')}
        classNamePrefix={"Select"}
        loadOptions={handleLoadOptions}
        onChange={(newValue) => {
            const value = newValue?.value;

            if (typeof value !== "undefined") {
                props.onValueChange(value);
            } else {
                props.onValueChange(null);
            }
        }}
        onFocus={() => {
            setIsFocused(true)
        }}
        onBlur={() => {
            setIsFocused(false)
        }}
        isMulti={false}
    />
}
