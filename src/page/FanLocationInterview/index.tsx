import React from "react";
import {useUser} from "../../hook/useUser";
import {PostcodeInterview} from "./PostcodeInterview";
import {ClubInterview} from "./ClubInterview";
import {EnemyInterview} from "./EnemyInterview";
import {Loading} from "../../component/Loading";
import {Club} from "../../model/Club";
import {Postcode} from "../../model/Postcode";

export const FanLocationInterview = (): JSX.Element => {
    const [isLoading, user, setPostcode, setClubs, setEnemies] = useUser(null)

    if (isLoading || user === null) {
        return <Loading fullpage/>
    }

    const handlePostcodeUpdate = (postcode: Postcode) => {
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
