import React, {CSSProperties, useState} from "react";
import AsyncSelect from "react-select/async";
import {OptionProps, OptionTypeBase, StylesConfig} from "react-select";
import {color} from "../style/color";
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

// @ts-ignore
const styleSelect: StylesConfig = {
    container: (provided: CSSProperties) => ({
        ...provided,
        width: '100%'
    }),
    control: (provided: CSSProperties) => ({
        ...provided,
        background: 'transparent',
        border: '0',
        borderBottom: `2px solid ${color.accentColor}`,
        borderRadius: 0,
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: () => ({
        color: color.accentColor
    }),
    valueContainer: (provided: CSSProperties) => ({
        ...provided,
        paddingLeft: 0,
    }),
    singleValue: (provided: CSSProperties) => ({
        ...provided,
        color: color.accentColor,
        fontWeight: 500,
    }),
    input: (provided: CSSProperties) => ({
        ...provided,
        color: color.accentColor,
        fontWeight: 300,
    }),
    menu: (provided: CSSProperties) => ({
        ...provided,
        background: color.overlayBackgroundColor,
        borderRadius: "2px",
        color: "white",
    }),
    option: (provided: CSSProperties, state: OptionProps<OptionTypeBase, boolean>) => ({
        ...provided,
        background: state.isFocused ? color.overlayBackgroundColorLight : "transparent",
    }),
}
