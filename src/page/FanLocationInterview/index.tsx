import React, {useState} from "react";
import {useUser} from "../../hook/useUser";
import {ClubInterview} from "./ClubInterview";
import {EnemyInterview} from "./EnemyInterview";
import {Club} from "../../model/Club";
import {Postcode} from "../../model/Postcode";
import {connect} from "react-redux";
import {RootStore} from "../../store";
import {UserHashType} from "../../model/User";
import {PageLoader} from "../../component/PageLoader";
import s from "./index.scss";
import {ThankYou} from "./ThankYou";
import {PageContent} from "../../component/PageContent";
import {PostcodeSearch} from "../../component/PostcodeSearch";
import {Section} from "../../component/Section";

const FanLocationInterview = (props: { hash: UserHashType }): JSX.Element => {
    const [isLoading, user, setPostcode, setClubs, setEnemies] = useUser(props.hash);
    const [showThankYou, setShowThankYou] = useState(false);

    if (isLoading || user === null) {
        return <PageLoader/>
    }

    const handlePostcodeUpdate = (postcode: Postcode | null) => {
        setPostcode(postcode);
    }

    const handleClubsUpdate = (clubs: Club[]) => {
        setClubs(clubs);
    }

    const handleEnemiesUpdate = (clubs: Club[]) => {
        setEnemies(clubs)
    }

    const handleNextClick = () => {
        setShowThankYou(true);
        window.scroll({top: 0})
    }

    if (showThankYou) {
        return <ThankYou
            onBack={() => {
                setShowThankYou(false)
            }}
        />
    }

    return <>
        <Section title={"PLZ"}>
            <PostcodeSearch
                onSubmit={handlePostcodeUpdate}
                value={user.postcode}
                selectedClassName={s.SelectedValue}
            />
        </Section>
        <ClubInterview onSubmit={handleClubsUpdate} clubs={user.clubs} selectedClassName={s.SelectedValue}/>
        <EnemyInterview onSubmit={handleEnemiesUpdate} clubs={user.enemies} selectedClassName={s.SelectedValue}/>

        <PageContent className={s.ButtonWrapper}>
            <span
                className={s.NextButton}
                onClick={() => {
                    handleNextClick()
                }}
            >
                Weiter
            </span>
        </PageContent>
    </>
}

export default connect((store: RootStore) => ({hash: store.user.hash,}))(FanLocationInterview);
