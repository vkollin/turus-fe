import React, {useEffect, useRef, useState} from "react";
import s from "./ResultsPage.scss";
import {useDispatch} from "react-redux";
import {Results} from "../../model/Results";
import {fetchResults} from "../../store/action/fetchResults";
import {Club} from "../../model/Club";
import {CancelTokenSource} from "axios";
import {ThunkDispatchType} from "../../type/thunk";
import {ClubsTable, PostcodesTable} from "./ResultsTable";
import {PageLoader} from "../../component/PageLoader";
import {Postcode} from "../../model/Postcode";
import {PostcodeSearch} from "../../component/PostcodeSearch";
import {ClubSearch} from "../../component/ClubSearch";
import {PageContent} from "../../component/PageContent";

export const ResultsPage = (props: { club: Club | null, postcode: Postcode | null }): JSX.Element => {
    const [results, setResults] = useState<Results[]>([])

    const [isLoading, setIsLoading] = useState(true);
    const [postcode, setPostcode] = useState<Postcode | null>(props.postcode);
    const [club, setClub] = useState<Club | null>(props.club);

    const cancelTokenRef = useRef<CancelTokenSource | null>(null)

    const dispatch = useDispatch<ThunkDispatchType>()

    const buildUrl = () => {
        const url = new URL(`${window.location.protocol}//${window.location.host}${window.location.pathname}`);

        if (club) {
            url.searchParams.append('club', `${club.id}`);
        }

        if (postcode) {
            url.searchParams.append('postcode', `${postcode.code}`);
        }

        window.history.replaceState({
                club: club?.id,
                postcode: postcode?.code,
            },
            `${club?.name} @ ${postcode?.code}`,
            url.href
        );
    }

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
            buildUrl();
            setIsLoading(false)
        });
    }, [postcode, club]);

    let content: JSX.Element

    if (isLoading) {
        content = <PageLoader/>;
    } else if (club !== null) {
        content = <PostcodesTable
            results={results}
            club={club}
        />
    } else {
        content = <ClubsTable
            results={results}
            onClick={(c) => {
                setClub(c)
            }}
        />;
    }

    return <PageContent className={s.Wrapper}>
        <Header
            postcode={postcode}
            club={club}
            setPostcode={
                (postcode) => {
                    setIsLoading(true);
                    setPostcode(postcode);
                }
            }
            setClub={
                (club) => {
                    setIsLoading(true);
                    setClub(club);
                }
            }
        />
        {content}
    </PageContent>
}

type HeaderProps = {
    postcode: Postcode | null,
    club: Club | null,
    setPostcode: (postcode: Postcode | null) => void,
    setClub: (club: Club | null) => void
};

const Header = (props: HeaderProps): JSX.Element => {
    return <div className={s.Header}>
        <div className={s.HeaderItem}>
            <PostcodeSearch
                onSubmit={props.setPostcode}
                value={props.postcode}
                options={{withResult: true}}
            />
        </div>
        <div className={s.HeaderItem}>
            <ClubSearch
                key={props.club?.id}
                onSelect={props.setClub}
                selectedClub={props.club}
                options={{withResult: true}}
            />
        </div>
    </div>
}

