import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import classes from './ModerCard.module.css'


const ModerCard = ({moderInfo}) => {


  const moder = moderInfo[0]

  return (
    <Card sx={{ minWidth: 300,  color: 'white', maxHeight: '611px' }}>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="gray" gutterBottom>
        Связь с Модератором
      </Typography>
      <div className={classes.box_list}>
            <div className={classes.box_list_item}>
                {moder.avatarUrl !== 'Нет'
                ? <img alt="" src={`https://cdn.discordapp.com/avatars/${moder.user_id}/${moder.avatarUrl}.webp`} className={classes.box_list_image} />
                : <PersonIcon className={classes.box_list_image}/>}
                <div className={classes.box_list_item_content}>
                    <a href={`https://discord.com/users/${moder.user_id}`} target='_blank' rel="noreferrer">Discord</a>
                    <span>{moder.nick}</span>
                </div>
            </div>
      </div>
      <div className={classes.box_list}>
            <div className={classes.box_list_item}>
                <PersonIcon className={classes.box_list_image}/>
                <div className={classes.box_list_item_content}>
                    <a href={`https://vk.com/id${moder.vk}`} target='_blank' rel="noreferrer">ВКонтакте</a>
                    <span>{moder.vk_name}</span>
                </div>
            </div>
      </div>
      <hr/>
      <Typography sx={{ fontSize: 20, paddingTop: '10px' }} color="gray" gutterBottom>
        Информация о Модераторе
      </Typography>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Должность
        </div>
        <div className={classes.box_info_subtitle}>
            {moder.role}
        </div>
      </div>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Префикс
        </div>
        <div className={classes.box_info_subtitle}>
          {moder.prefix}
        </div>
      </div>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Дата постановления
        </div>
        <div className={classes.box_info_subtitle}>
          {moder.date}
        </div>
      </div>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Дата повышения
        </div>
        <div className={classes.box_info_subtitle}>
          {moder.date_up}
        </div>
      </div>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Дата обновления
        </div>
        <div className={classes.box_info_subtitle}>
          {moder.last_upd}
        </div>
      </div>
      <div className={classes.box_info}>
        <div className={classes.box_info_title}>
            Добавил на сайт
        </div>
        <div className={classes.box_info_subtitle}>
          {moder.add_user}
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default ModerCard