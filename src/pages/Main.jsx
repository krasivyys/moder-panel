import React, {useEffect, useState, useContext} from "react";
import AllModersTable from "../components/Tables/allModersTable/AllModersTable";

import classes from '../styles/main.module.css'

import { AppContext } from "../App";

const Main = () => {

    const [modersList, setModersList] = useState()
    const [modersCount, setModersCount] = useState(0)
    const [server, setServer] = useState()

    const {setNum, setFlags, flags, setUserRole, userRole} = useContext(AppContext)

    useEffect(() => {
        fetch('/api/moderators')
            .then(response => response.json())
            .then(response => {
                if(response.message){
                    window.location.replace('/login')
                } else {
                    setModersList(response.info)
                    setModersCount(response.info?.length)
                }
            })
        fetch('/api/me')
            .then(response => response.json())
            .then(response => {
                if(response.message){
                    window.location.replace('/login')
                } else {
                    setNum(response.info.num)
                    setServer(response.info.server)
                    setFlags(response.info.flags)
                    setUserRole(response.info.role)
                }
            })
        // eslint-disable-next-line
    }, [])

    return (
        <>  
            <div className={classes.main}>
                <div className={classes.moders_count}>
                    <h4>Список Модерации (Всего: {modersCount})</h4>
                </div>
                <AllModersTable List={modersList} userFlags={flags} serverId={server} setList={setModersList} userRole={userRole}/>
            </div>
        </>
    )
}


export default Main;