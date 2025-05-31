import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import classes from './RemoveModal.module.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#272727' }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

const RemoveModal = ({moderator, openDel, setOpenDel, setList}) => {

    const handleClose = () => {
        setOpenDel(false);
    };

    const handleDel = async () => {
      let d = new Date();
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      const DateNow = `${ye}-${mo}-${da}`
      await fetch('/api/moderator', {method: "DELETE", headers: {'content-type': 'application/json'} ,body: JSON.stringify({moderator, DateNow, reason})})
        .then(response => response.json())
        .then(response => {
          setOpenDel(false);
        })
      await fetch('/api/moderators')
        .then(response => response.json())
        .then(response => {
          setList(response.info)
        })
        .catch(err => console.log())
    }

    const [reason, setReason] = React.useState('')

    const handleChange = (e) => {
      setReason(e.target.value)
    }
    
    return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDel}
      >
         <BootstrapDialogTitle color={'white'} id="customized-dialog-title" onClose={handleClose}>
          Форма на снятие Модератора
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{backgroundColor: '#272727', color: 'white', border: 'none'}}>
          <Box className={classes.remove_modal_info}>
            <TextField
                autoComplete='off'
                autoFocus
                className={classes.remove_modal_form}
                id="outlined-multiline-static"
                label="Причина снятия"
                defaultValue={reason}
                onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#272727', color: 'white'}}>
          <Button autoFocus onClick={handleClose}>
            Закрыть
          </Button>
          {reason.length > 0 
          ? <Button autoFocus onClick={handleDel}>
              Удалить
            </Button>
          : <Button autoFocus disabled>
              Удалить
            </Button>
          }
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

export default RemoveModal