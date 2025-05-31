import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SetServer from '../components/Auth/SetServer';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import classes from '../styles/Auth.module.css'

const queryString = require('query-string');

const Auth = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
    const code = query.code

    const [servers, setServers] = useState([])
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        fetch('/api/me')
            .then(response => response.json())
            .then(response => {
                if(response.message){
                } else {
                    window.location.replace('/')
                }
            })
        fetch('/api/servers')
            .then(response => response.json())
            .then(response => {
                setServers(response.list.servers)
                setGroups(response.list.groups)
                setLoading(false)
            })
    }, [])

    const setServ = (event) => {
        fetch(`/api/authorization?code=${code}`, {method: "POST" ,headers: {'content-type': 'application/json'}, body: JSON.stringify({server: Number(event.target.id)})})
        .then(response => response.json())
        .then(response => {
            if(response.message){
                window.location.replace('/main')
            }
        })
    }

    return (
        <Container maxWidth="sm">
            <div className={classes.auth_page_block}>
                <div className={classes.auth_page_title}>
                    <span>{loading ? 'Загрузка...' : 'Выберите сервер'}</span>
                </div>
                {loading 
                ? <div className={classes.auth_page_loading}>
                    <LinearProgress />
                    </div>
                : <SetServer setServer={setServ} servers={servers} groups={groups}/>}
            </div>
        </Container>
    );
}

export default Auth;