import React, {useEffect, useRef, useState} from "react";
import s from "./index.scss";
import {useDispatch} from "react-redux";
import {Results} from "../../model/Results";
import {fetchResults} from "../../store/action/fetchResults";
import {Club} from "../../model/Club";
import {CancelTokenSource} from "axios";
import {ThunkDispatchType} from "../../type/thunk";
import {ClubsTable, PostcodesTable} from "./ResultsTable";
import {PageLoader} from "../../component/PageLoader";
import {Postcode} from "../../model/Postcode";

export default (): JSX.Element => {
    const [results, setResults] = useState<Results[]>([])

    const [isLoading, setIsLoading] = useState(true);
    const [postcode, setPostcode] = useState<Postcode | null>(null);
    const [club, setClub] = useState<Club | null>(null);

    const cancelTokenRef = useRef<CancelTokenSource | null>(null)

    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(fetchResults(postcode, club, cancelTokenRef)).then((resultsResponse) => {
            setResults(resultsResponse.results)
            setIsLoading(false)
        });
    }, []);

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchResults(postcode, club, cancelTokenRef)).then((resultsResponse) => {
            setResults(resultsResponse.results)
            setIsLoading(false)
        });
    }, [postcode, club]);

    let table: JSX.Element

    if (club !== null) {
        table = <PostcodesTable
            results={results}
        />
    } else {
        table = <ClubsTable
            results={results}
        />;
    }


    return <div className={s.Wrapper}>
        <Header
            postcode={postcode}
            club={club}
            setPostcode={setPostcode}
            setClub={setClub}
        />
        {(isLoading) && <PageLoader/>}
        {table}
    </div>
}

const Header = (props: { postcode: Postcode | null, club: Club | null, setPostcode: (postcode: Postcode | null) => void, setClub: (club: Club | null) => void }): JSX.Element => {

    return <div className={s.Header}>

    </div>
}

