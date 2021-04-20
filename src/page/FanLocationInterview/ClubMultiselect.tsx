import React, {useEffect, useRef, useState} from "react";
import {Club} from "../../model/Club";
import {usePrevious} from "../../hook/usePrevious";
import {SelectedValue} from "../../component/SelectedValue";
import {ClubSearch} from "../../component/ClubSearch";

const MANIPULATION_TIMEOUT = 500;

export const ClubMultiSelect = (props: { onSubmit: ((clubs: Club[]) => void), selectedClubs: Club[], selectedClassName?: string }) => {
    const [selectedClubs, setSelectedClubs] = useState(props.selectedClubs);
    const previousSelectedClubs = usePrevious<Club[]>(selectedClubs)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (typeof previousSelectedClubs !== "undefined") {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(
                () => {
                    props.onSubmit(selectedClubs);

                },
                MANIPULATION_TIMEOUT
            );
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
        <ClubSearch
            key={JSON.stringify(selectedClubs)}
            selectedClubs={selectedClubs}
            onSelect={(newValue) => {
                if (newValue !== null) {
                    handleSelect(newValue)
                }
            }}
        />
        {selectedClubs.map(c => <SelectedClub
            key={c.id}
            club={c}
            onDelete={handleDeletion}
            className={props.selectedClassName}
        />)}
    </>
}

const SelectedClub = (props: { club: Club, onDelete: (club: Club) => void, className?: string }) => {
    return <SelectedValue
        className={props.className}
        label={props.club.name}
        src={props.club.icon}
        onClick={() => {
            props.onDelete(props.club)
        }}
    />
};

