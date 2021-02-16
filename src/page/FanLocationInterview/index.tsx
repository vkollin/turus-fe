import React from "react";
import {useUser} from "../../hook/useUser";
import {PostcodeInterview} from "./PostcodeInterview";
import {ClubInterview} from "./ClubInterview";
import {EnemyInterview} from "./EnemyInterview";
import {Loading} from "../../component/Loading";
import {Club} from "../../model/Club";
import {Postcode} from "../../model/Postcode";
import {connect} from "react-redux";
import {RootStore} from "../../store";
import {UserHashType} from "../../model/User";

const FanLocationInterview = (props: { hash: UserHashType }): JSX.Element => {
    const [isLoading, user, setPostcode, setClubs, setEnemies] = useUser(props.hash)

    if (isLoading || user === null) {
        return <Loading fullpage/>
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

    return <>
        <PostcodeInterview onSubmit={handlePostcodeUpdate} value={user.postcode}/>
        <ClubInterview onSubmit={handleClubsUpdate} clubs={user.clubs}/>
        <EnemyInterview onSubmit={handleEnemiesUpdate} clubs={user.enemies}/>
    </>
}

export default connect((store: RootStore) => ({hash: store.user.hash,}))(FanLocationInterview);
