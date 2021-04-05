import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import {components, OptionTypeBase} from "react-select";
import './Select._.scss';
import {NoticeProps} from "react-select/src/components/Menu";

type OptionType = { label: string, value: string };

type Props<Value> = {
    onValueChange: (newValue: Value | null) => void,
    loadOptions: (inputValue: string) => Promise<ReadonlyArray<OptionTypeBase>>
    value?: OptionType | null,
    placeholder?: string,
    className?: string,
    style?: Style,
    onFocus?: () => void,
};

export enum Style {
    GREY,
    WHITE,
}

type ReactSelectComponentPropsType = NoticeProps<OptionTypeBase, boolean>;

const formatOptionLabel = (option: OptionTypeBase) => {
    return <div>{option.label}</div>
};

const NoOptionsMessage = (props: ReactSelectComponentPropsType) => {
    return <components.NoOptionsMessage {...props}>Keine Ergebnisse gefunden</components.NoOptionsMessage>
}

const LoadingMessage = (props: ReactSelectComponentPropsType) => {
    return <components.LoadingMessage {...props}>Ergenisse werden geladen</components.LoadingMessage>
}

export function Select<Value>(props: Props<Value>): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);
    const handleLoadOptions = async (inputValue: string): Promise<ReadonlyArray<OptionTypeBase>> => {
        return await props.loadOptions(inputValue)
    }

    const placeholder = props.placeholder ? props.placeholder : "Auswählen";

    const classNames = ["Select"]

    switch (props.style ?? Style.GREY) {
        case Style.GREY:
            classNames.push("SelectStyleGrey");
            break;
        case Style.WHITE:
            classNames.push("SelectStyleWhite");
            break;
    }

    if (props.className) {
        classNames.push(props.className);
    }

    if (isFocused) {
        classNames.push("Select-Focused");
    }

    return <AsyncSelect
        className={classNames.join(' ')}
        classNamePrefix={"Select"}
        components={{
            NoOptionsMessage: NoOptionsMessage,
            LoadingMessage: LoadingMessage,
        }}
        placeholder={placeholder}
        isClearable={true}
        value={props.value}
        formatOptionLabel={formatOptionLabel}
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
            if (typeof props.onFocus === "function") {
                props.onFocus();
            }

            setIsFocused(true)
        }}
        onBlur={() => {
            setIsFocused(false)
        }}
        isMulti={false}
    />
}
