import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import classes from '../styles/addmoderator.module.css'
import { AppContext } from '../App';
import flags from '../flags';
 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddModerator = () => {

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('')
  const [msgType, setMsgType] = useState('success')

  const [age, setAge] = React.useState('');
  const [nick, setNick] = useState('')
  const [prefix, setprefix] = useState('')
  const [vk, setvk] = useState('')
  const [discord, setdiscord] = useState('')
  const [yearold, setyearold] = useState('')
  const [city, setcity] = useState('')

  const {setNum, setFlags, setUserRole} = useContext(AppContext)


  useEffect(() => {
    fetch('/api/me')
        .then(response => response.json())
        .then(response => {
            if(response.message){
                window.location.replace('/login')
            } else {
                setNum(response.info.num)
                setFlags(response.info.flags)
                setUserRole(response.info.role)
                if(!flags.Is(response.info.flags, 2)) {
                  window.location.replace('/')
              }
            }
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleAdd = () => {
    const editInfo = document.getElementsByTagName("input");
    let info = {
      nick: editInfo.nick.value,
      prefix: editInfo.prefix.value,
      vk: editInfo.vk.value,
      discord: editInfo.discord.value,
      yearold: editInfo.age.value,
      city: editInfo.city.value,
      age
    }
    fetch('/api/add-moderator', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(info)})
      .then(response => response.json())
      .then(response => {
        setMessage(response.message)
        if(response.message !== 'Модератор был успешно добавлен в базу данных'){
          setMsgType('error')
        } else{
          setMsgType('success')
        }
        editInfo.nick.value = ''
        editInfo.prefix.value = ''
        editInfo.vk.value = ''
        editInfo.discord.value = ''
        editInfo.age.value = ''
        editInfo.city.value = ''
        setAge('')
        hideMessage()
      })
  }

  const hideMessage = () => {
    message ? setOpen(true) : setOpen(false)
  }

  return (
    <>
      <div className={classes.add_moderator_form}>
        <div className={classes.add_moderator_form_head}>
          <div className={classes.add_moderator_form_head_title}>
            <span>Добавить модератора</span>
          </div>
        </div>
        <div className={classes.add_moderator_form_body}>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="nick"
                defaultValue={nick}
                label="Игровой ник"
                type="text"
                variant="standard"
                onChange={setNick}
                style={{ color: 'white' }}
                  />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="prefix"
                defaultValue={prefix}
                label="Префикс"
                type="text"
                onChange={setprefix}
                variant="standard"
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="vk"
                defaultValue={vk}
                label="ВКонтакте"
                type="text"
                onChange={setvk}
                variant="standard"
                style={{ color: 'white' }}
              />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="discord"
                defaultValue={discord}
                label="Discord ID"
                type="text"
                onChange={setdiscord}
                variant="standard"
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="age"
                defaultValue={yearold}
                label="Возраст"
                type="text"
                onChange={setyearold}
                variant="standard"
                style={{ color: 'white' }}
              />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="city"
                defaultValue={city}
                onChange={setcity}
                label="Город"
                type="text"
                variant="standard"
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <FormControl sx={{ width: 400, marginTop: '15px' }}>
                  <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  sx={{color: 'white'}}
                >
                  <MenuItem value="">
                    Выберите должность
                  </MenuItem>
                  <MenuItem value={'kurator'}>Куратор</MenuItem>
                  <MenuItem value={'support'}>Support Team</MenuItem>
                  <MenuItem value={'stmoder'}>Старший Модератор</MenuItem>
                  <MenuItem value={'moder'}>Модератор</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.button}>
            {nick && prefix && vk && discord && yearold && city && age ? <Button onClick={handleAdd} variant="contained">Добавить</Button> : <Button variant="contained" disabled>Добавить</Button>}
          </div>
      </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msgType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddModerator