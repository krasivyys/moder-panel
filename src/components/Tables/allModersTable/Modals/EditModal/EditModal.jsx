import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './EditModal.module.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import flags from '../../../../../flags';

const EditModal = ({moderator, open, setOpen, serverId, setInfo, setList, userFlags, userRole}) => {

  const [role, setRole] = useState('');
  const [flagsSet, setFlagsSet] = useState(false)
  const [addOrDelModerAndEditModer, setAddOrDelModerAndEditModer] = useState(false)
  const [addOrDelWarnsAndVacation, setAddOrDelWarnsAndVacation] = useState(false)
  const [watchKpdAndLogsAndArchive, setWatchKpdAndLogsAndArchive] = useState(false)

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    const editInfo = document.getElementsByTagName("input");
    let UserFlags = 0
    if(flagsSet) UserFlags += flags.UserFlagSetFlags // +16
    if(addOrDelModerAndEditModer) UserFlags += flags.ModerEditModerator // +8
    if(addOrDelWarnsAndVacation) UserFlags += flags.ModerAddOrDelWarnsAndVacation // +4
    if(watchKpdAndLogsAndArchive) UserFlags += flags.ModerWatchKpdAndLogsAndArchive // +2
    var info = {
      id: moderator.id,
      nick: editInfo.nick.value,
      prefix: editInfo.prefix.value,
      vk: editInfo.vk.value,
      discord: editInfo.discord.value,
      age: editInfo.age.value,
      city: editInfo.city.value,
      role: role,
      flags: UserFlags
    }
    fetch('/api/moderator', {method: "PUT", headers: {'content-type': 'application/json'}, body: JSON.stringify({info})})
      .then(response => response.json())
      .then(response => {
        if(response?.message === 'Информация была успешно изменена') {
          setOpen(false)
          fetch(`/api/getallinfo/${moderator.user_id}`)
          .then(response => response.json())
          .then(response => {
            setInfo(response.MainInfo)
          })}
          fetch('/api/moderators')
          .then(response => response.json())
          .then(response => {
            setList(response.info)
          })
      })
  }

  useEffect(() => {
    checkFlags(moderator?.flags)
    setRole(moderator?.role_eng)
  }, [moderator])

  const checkFlags = (UserFlags) => {
    setWatchKpdAndLogsAndArchive(flags.Is(UserFlags, 2))
    setAddOrDelWarnsAndVacation(flags.Is(UserFlags, 4))
    setAddOrDelModerAndEditModer(flags.Is(UserFlags, 12))
    setFlagsSet(flags.Is(UserFlags, 30))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{bgcolor: '#272727', color: 'white', width: 600}}>{moderator ? moderator.nick : ''}</DialogTitle>
        <DialogContent className={classes.edit_modal_content_form}>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                autoComplete="off"
                margin="none"
                id="nick"
                label="Игровой ник"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.nick : ''}
                style={{ color: 'white' }}
                  />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                margin="none"
                autoComplete="off"
                id="prefix"
                label="Префикс"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.prefix : ''}
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                margin="none"
                autoComplete="off"
                id="vk"
                label="ВКонтакте"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.vk : ''}
                style={{ color: 'white' }}
              />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                margin="none"
                autoComplete="off"
                id="discord"
                label="Discord ID"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.user_id : ''}
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                margin="none"
                autoComplete="off"
                id="age"
                label="Возраст"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.age : ''}
                style={{ color: 'white' }}
              />
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <TextField
                margin="none"
                autoComplete="off"
                id="city"
                label="Город"
                type="text"
                variant="standard"
                defaultValue={moderator ? moderator.city : ''}
                style={{ color: 'white' }}
              />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item} style={{width: '100px', color: '#b7b4b4'}}>
              Должность
            </div>
            <div className={classes.edit_modal_content_form_item}>
              <FormControl sx={{ width: 400, marginTop: '15px' }}>
                  <Select
                  value={role}
                  onChange={handleChange}
                  displayEmpty
                  sx={{color: 'white'}}
                >
                  <MenuItem value={'undefined' | ''}>
                    Выберите должность
                  </MenuItem>
                  {userRole === 'Администратор' && <MenuItem value={'admin'}>Администратор</MenuItem>}
                  {userRole === 'Администратор' && <MenuItem value={'gm'}>Главный Модератор</MenuItem>}
                  {userRole === 'Администратор' && <MenuItem value={'zgm'}>Зам. Главного модератора</MenuItem>}
                  <MenuItem value={'kurator'}>Куратор</MenuItem>
                  <MenuItem value={'support'}>Support Team</MenuItem>
                  {serverId === 13 && <MenuItem value={'commerce'}>Следящий за коммерцией</MenuItem>}
                  <MenuItem value={'stmoder'}>Старший Модератор</MenuItem>
                  {serverId === 13 && <MenuItem value={'mp'}>Следящий за мероприятиями</MenuItem>}
                  <MenuItem value={'moder'}>Модератор</MenuItem>
                </Select>
              </FormControl>
              </div>
          </div>
          {flags.Is(userFlags, 30) 
          ? <div className={classes.advanced_prev}>
          <div className={classes.advanced_prev_title}>
            <span>Дополнительные привилегии</span>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <FormControlLabel control={<Checkbox checked={flagsSet} onChange={(event) => setFlagsSet(event.target.checked)}/>} label="Разрешить менять дополнительные привилегии*" />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <FormControlLabel control={<Checkbox checked={addOrDelModerAndEditModer} onChange={(event) => setAddOrDelModerAndEditModer(event.target.checked)}/>} label="Добавлять/удалять/редактировать модератора" />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <FormControlLabel control={<Checkbox checked={addOrDelWarnsAndVacation} onChange={(event) => setAddOrDelWarnsAndVacation(event.target.checked)}/>} label="Добавлять/снимать выговора/отпуска" />
            </div>
          </div>
          <div className={classes.edit_modal_content_form_row}>
            <div className={classes.edit_modal_content_form_item}>
              <FormControlLabel control={<Checkbox checked={watchKpdAndLogsAndArchive} onChange={(event) => setWatchKpdAndLogsAndArchive(event.target.checked)}/>} label="Просмотр КПД/Логов/Архива" />
            </div>
          </div>
        </div>
          : ''}
        </DialogContent>
        <DialogActions sx={{bgcolor: '#272727', color: 'white'}}>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleEdit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditModal