import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './InactiveModal.module.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const InactiveModal = ({InactiveOpenModal, setInactiveOpenModal, id, setinactive}) => {

    const [reasonForm, setReasonForm] = React.useState('')
    const [DataStart, setDataStart] = React.useState([null, null]);
    const [DataEnd, setDataEnd] = React.useState([null, null]);

    const handleClose = () => {
        setInactiveOpenModal(false);
        setReasonForm('')
        setDataStart([null, null])
        setDataEnd([null, null])
    };

    const handleInactive = async () => {
        let yearStart = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(DataStart);
        let monthStart = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(DataStart);
        let dayStart = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(DataStart);
        const InactiveStart = `${yearStart}-${monthStart}-${dayStart}`
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(DataEnd);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(DataEnd);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(DataEnd);
        const InactiveEnd = `${ye}-${mo}-${da}`
        await fetch('/api/moderator/inactive' , {method: "POST", headers: {'content-type': 'application/json'} , body: JSON.stringify({id, reasonForm ,InactiveStart, InactiveEnd})})
        .then()
        setInactiveOpenModal(false)
        setReasonForm('')
        setDataStart([null, null])
        setDataEnd([null, null])
        await fetch(`/api/getallinfo/${id}`)
            .then(response => response.json())
            .then(response => {
                setinactive(response.Inactive)
            })
    }

    const handleChange = (event) => {
        setReasonForm(event.target.value)
    }

    return (
        <div>
            <Dialog open={InactiveOpenModal} onClose={handleClose}>
                <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>Выдать неактив</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <DialogContentText sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                    Введите причину и дату выдачи неактива
                </DialogContentText>
                <div className={classes.inactive_modal_form}>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        required
                        margin="normal"
                        id="reason"
                        label="Причина неактива"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <div className={classes.inactive_modal_form_date}>
                        <div className={classes.inactive_modal_form_date_item}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Дата начала"
                                value={DataStart}
                                onChange={(newValue) => {
                                    setDataStart(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        </div>
                        <div className={classes.inactive_modal_form_date_item}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Дата конца"
                                value={DataEnd}
                                onChange={(newValue) => {
                                    setDataEnd(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        </div>
                    </div>    
                </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#1e1e1e', color: 'white'}}>
                <Button onClick={handleClose}>Отмена</Button>
                {reasonForm ? <Button onClick={handleInactive}>Выдать</Button> : <Button disabled>Выдать</Button>}
                </DialogActions>
            </Dialog>
        </div>
  )
}

export default InactiveModal