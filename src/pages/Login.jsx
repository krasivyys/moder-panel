import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import classes from '../styles/login.module.css';
import auth from '../scripts/auth';


const Login = () => {
    
    useEffect(() => {
        document.title = 'Авторизация'
        fetch('/api/me')
            .then(response => response.json())
            .then(response => {
                if(response.message){
                } else {
                    window.location.replace('/')
                }
            })
    }, [])

    return (
        <div className={classes.welcome}>
            <div className={classes.welcome_title}>
                <span>Для получения доступа к сайту, Вам необходимо авторизироваться через <strong>Discord</strong></span> <Button onClick={auth} variant="outlined" size="medium">Авторизироваться</Button>
            </div>
        </div>
    )
}


export default Login;