import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {CancelTokenSource} from "axios";
import {ThunkDispatchType} from "../../type/thunk";
import {fetchClubAndPostcode} from "../../store/action/fetchClubAndPostcode";
import {ResultsPage} from "./ResultsPage";
import {ClubAndPostcodeResponse} from "../../model/ResultsResponse";
import {PageLoader} from "../../component/PageLoader";
import s from "./ResultsPage.scss";
import {PageContent} from "../../component/PageContent";

export default (): JSX.Element => {
    const [initData, setInitData] = useState<ClubAndPostcodeResponse | null>(null);
    const cancelTokenRef = useRef<CancelTokenSource | null>(null)

    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        const url = new URL(window.location.href);

        const queryPostcode = url.searchParams.get('postcode');
        const queryClub = url.searchParams.get('club');

        if (queryClub || queryPostcode) {
            dispatch(fetchClubAndPostcode(queryPostcode, queryClub, cancelTokenRef)).then((clubAndPostcode) => {
                setInitData(clubAndPostcode);
            })
        } else {
            setInitData(new ClubAndPostcodeResponse(null, null))
        }

    }, []);

    if (initData == null) {
        return <PageContent className={s.Wrapper}><PageLoader/></PageContent>;
    }

    return <ResultsPage club={initData.club} postcode={initData.postcode}/>
}
