import React, {useEffect, useRef, useState} from "react";
import {Club} from "../../model/Club";
import {OptionTypeBase} from "react-select";
import {Select} from "../../component/Select";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../type/thunk";
import {usePrevious} from "../../hook/usePrevious";
import {SelectedValue} from "../../component/SelectedValue";
import {searchClubs} from "../../store/action/searchClubs";

const SEARCH_TIMEOUT = 350;

export const ClubMultiSelect = (props: { onSubmit: ((clubs: Club[]) => void), selectedClubs: Club[] }) => {
    const [selectedClubs, setSelectedClubs] = useState(props.selectedClubs);
    const previousSelectedClubs = usePrevious<Club[]>(selectedClubs)

    useEffect(() => {
        if (typeof previousSelectedClubs !== "undefined") {
            props.onSubmit(selectedClubs);
        }
    }, [selectedClubs]);

    const handleDeletion = (club: Club) => {
        const filteredClubs = selectedClubs.filter(c => c.id !== club.id);

        setSelectedClubs(filteredClubs)
    };

    const handleSelect = (club: Club) => {
        setSelectedClubs([...selectedClubs, club]);
    };

    return <>
        <ClubSelection key={JSON.stringify(selectedClubs)} selectedClubs={selectedClubs} onSelect={handleSelect}/>
        {selectedClubs.map(c => <SelectedClub key={c.id} club={c} onDelete={handleDeletion}/>)}
    </>
}

const SelectedClub = (props: { club: Club, onDelete: (club: Club) => void }) => {
    return <SelectedValue
        label={props.club.name}
        src={props.club.icon}
        onClick={() => {
            props.onDelete(props.club)
        }}
    />
};

const ClubSelection = (props: { onSelect: (club: Club) => void, selectedClubs: Club[] }) => {

    const dispatch = useDispatch<ThunkDispatchType>();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase[]> => {
        return new Promise(((resolve, reject) => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                if (inputValue.length < 2) {
                    reject();
                    return
                }

                dispatch(searchClubs(inputValue, props.selectedClubs))
                    .then(data => {
                        resolve(data.map(d => ({value: d, label: d.name})))
                    })
                    .catch(() =>
                        reject()
                    )
            }, SEARCH_TIMEOUT)
        }))
    }

    return <Select<Club>
        loadOptions={handleLoadOptions}
        onValueChange={(newValue => {
            if (newValue !== null) {
                props.onSelect(newValue)
            }
        })}
    />
}
