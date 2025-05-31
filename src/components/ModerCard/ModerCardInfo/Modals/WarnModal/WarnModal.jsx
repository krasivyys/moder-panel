import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './WarnModal.module.css'

const WarnModal = ({WarnOpenModal, setWarnOpenModal, id, setWarn}) => {

    const [reasonForm, setReasonForm] = React.useState('')

    const handleClose = () => {
        setWarnOpenModal(false);
    };

    const handleWarn = async () => {
        await fetch('/api/moderator/warn' , {method: "POST", headers: {'content-type': 'application/json'} , body: JSON.stringify({id, reasonForm})})
            .then(response => response.json())
            .then(response => {
                setWarnOpenModal(false)
                setReasonForm('')
            })
        await fetch(`/api/getallinfo/${id}`)
            .then(response => response.json())
            .then(response => {
                setWarn(response.Warns)
            })
    }

    const handleChange = (event) => {
        setReasonForm(event.target.value)
    }

    return (
        <div>
            <Dialog open={WarnOpenModal} onClose={handleClose}>
                <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>Выдать выговор</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <DialogContentText sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                    Введите причину выдачи выговора
                </DialogContentText>
                <div className={classes.warn_modal_form}>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        required
                        margin="dense"
                        id="reason"
                        label="Причина выговора"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <Button onClick={handleClose}>Отмена</Button>
                {reasonForm ? <Button onClick={handleWarn}>Выдать</Button> : <Button disabled>Выдать</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default WarnModal