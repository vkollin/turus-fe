import React, {useEffect, useRef, useState} from "react";
import s from "./index.scss";
import {useDispatch} from "react-redux";
import {Results} from "../../model/Results";
import {fetchResults} from "../../store/action/fetchResults";
import {Club} from "../../model/Club";
import {CancelTokenSource} from "axios";
import {ThunkDispatchType} from "../../type/thunk";
import {ResultsTables} from "./ResultsTables";

export default (): JSX.Element => {
    const [results, setResults] = useState<Results[]>([])

    const [postcode, setPostcode] = useState<string | null>(null);
    const [club, setClub] = useState<Club | null>(null);

    const cancelTokenRef = useRef<CancelTokenSource | null>(null)

    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(fetchResults(postcode, club, cancelTokenRef)).then((resultsResponse) => {
            setResults(resultsResponse.results)
        });
    }, []);

    useEffect(() => {
        dispatch(fetchResults(postcode, club, cancelTokenRef)).then((resultsResponse) => {
            setResults(resultsResponse.results)
        });
    }, [postcode, club]);

    return <div className={s.Wrapper}>
        <ResultsTables results={results}/>
    </div>
}
