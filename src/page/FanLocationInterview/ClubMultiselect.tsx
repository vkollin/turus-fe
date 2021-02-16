import React, {useEffect, useState} from "react";
import {Club} from "../../model/Club";
import {OptionTypeBase} from "react-select";
import {Select} from "../../component/Select";
import {useDispatch} from "react-redux";
import {searchClubs} from "../../store/action/searchClubs";
import {ThunkDispatchType} from "../../type/thunk";
import {usePrevious} from "../../hook/usePrevious";

export const ClubMultiSelect = (props: { onSubmit: ((clubs: Club[]) => void), selectedClubs: Club[] }) => {
    const [selectedClubs, setSelectedClubs] = useState(props.selectedClubs);
    const previousSelectedClubs = usePrevious<Club[]>(selectedClubs)

    useEffect(() => {
        const x = previousSelectedClubs;
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
        {selectedClubs.map(c => <SelectedClub key={c.id} club={c} onDelete={handleDeletion}/>)}
        <ClubSelection key={JSON.stringify(selectedClubs)} selectedClubs={selectedClubs} onSelect={handleSelect}/>
    </>
}

const SelectedClub = (props: { club: Club, onDelete: (club: Club) => void }) => {
    return <div
        onClick={() => {
            props.onDelete(props.club)
        }}
    >
        {props.club.name}
    </div>
};

const ClubSelection = (props: { onSelect: (club: Club) => void, selectedClubs: Club[] }) => {

    const dispatch = useDispatch<ThunkDispatchType>();

    const handleLoadOptions = (inputValue: string): Promise<OptionTypeBase[]> => {
        return new Promise(((resolve, reject) => {
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
        }))
    }

    return <Select<Club>
        value={null}
        loadOptions={handleLoadOptions}
        onValueChange={(newValue => {
            if (newValue !== null) {
                props.onSelect(newValue)
            }
        })}
    />
}
