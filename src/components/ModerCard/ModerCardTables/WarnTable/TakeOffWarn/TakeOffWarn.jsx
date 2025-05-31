import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './TakeOffWarn.module.css'

const WarnModal = ({WarnOpenModal, setWarnOpenModal, id, moderId, setwarn}) => {

    const [reasonForm, setReasonForm] = React.useState('')

    const handleClose = () => {
        setWarnOpenModal(false);
    };

    const handleWarn = async () => {
        await fetch('/api/moderator/warn' , {method: "DELETE", headers: {'content-type': 'application/json'} , body: JSON.stringify({id, reasonForm, moderId})})
            .then(response => response.json())
            .then(response => {
                console.log(response.message)
                setWarnOpenModal(false)
                setReasonForm('')
            })
        await fetch(`/api/getallinfo/${moderId}`)
            .then(response => response.json())
            .then(response => {
                setwarn(response.Warns)
            })
            .catch(err => console.log())
    }

    const handleChange = (event) => {
        setReasonForm(event.target.value)
    }

    return (
        <div>
            <Dialog open={WarnOpenModal} onClose={handleClose}>
                <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>Снять выговор</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <DialogContentText sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                    Введите причину снятия выдачи выговора
                </DialogContentText>
                <div className={classes.warn_modal_form}>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        required
                        margin="dense"
                        id="reason"
                        label="Причина снятия выговора"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <Button onClick={handleClose}>Отмена</Button>
                {reasonForm ? <Button onClick={handleWarn}>Снять</Button> : <Button disabled>Снять</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default WarnModal