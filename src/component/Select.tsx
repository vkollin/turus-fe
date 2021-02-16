import React, {CSSProperties} from "react";
import AsyncSelect from "react-select/async";
import {OptionProps, OptionTypeBase, StylesConfig} from "react-select";
import {color} from "../style/color";

type Props<Value> = {
    onValueChange: (newValue: Value | null) => void,
    loadOptions: (inputValue: string) => Promise<OptionTypeBase>
    value?: Value | null,
};

export function Select<Value>(props: Props<Value>): JSX.Element {
    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase> => {
        return new Promise<OptionTypeBase>(((resolve, reject) => {
            props.loadOptions(inputValue)
                .then((data: OptionTypeBase) => {
                    resolve(data);
                })
                .catch(
                    () => reject()
                )
        }));
    }

    return <AsyncSelect
        styles={styleSelect}
        loadOptions={handleLoadOptions}
        onChange={(newValue) => {
            const value = newValue?.value;

            if (typeof value !== "undefined") {
                props.onValueChange(value);
            } else {
                props.onValueChange(null);
            }
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
