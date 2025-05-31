import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import classes from '../styles/moderator.module.css'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ModerCard from '../components/ModerCard/ModerCard';
import ModerCardInfo from '../components/ModerCard/ModerCardInfo/ModerCardInfo';
import EditModal from '../components/Tables/allModersTable/Modals/EditModal/EditModal';
import { AppContext } from '../App';
import ModeratorSkeleton from '../components/ModeratorSkeleton/ModeratorSkeleton';
import flagsSetting from '../flags';

const Moderator = () => {

  const { id } = useParams()

  const [mainModerInfo, setMainModerInfo] = useState({})
  const [moderWarns, setModerWarns] = useState({})
  const [moderInactive, setModerInactive] = useState({})
  const [moderPunish, setModerPunish] = useState({})
  const [moderKpd, setModerKpd] = useState({})
  const [EditModalState, setEditModalState] = useState(false)
  const [server, setServer] = useState()

  const {setNum, setFlags, setUserRole, flags, userRole} = useContext(AppContext)

  useEffect(() => {
    fetch(`/api/getallinfo/${id}`)
        .then(response => response.json())
        .then(response => {
            setMainModerInfo(response.MainInfo)
            setModerWarns(response.Warns)
            setModerInactive(response.Inactive)
            setModerPunish(response.Punish)
            setModerKpd(response.Kpd)
        })
    fetch('/api/me')
        .then(response => response.json())
        .then(response => {
            if(response.message){
                window.location.replace('/login')
            } else {
                setNum(response.info.num)
                setFlags(response.info.flags)
                setUserRole(response.info.role)
                setServer(response.info.server)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>  
        {mainModerInfo.length > 0 ? 
        <div className={classes.main_box}>
            <div className={classes.box_data}>
                <div className={classes.moder_nick}>
                    <h4>{mainModerInfo[0].nick} (ID: {id})</h4>
                </div>
                <div className={classes.moder_buttons}>
                    <div className={classes.edit_button}>
                        {flagsSetting.Is(flags, 8) 
                        ?<Button onClick={() => setEditModalState(true)} variant="outlined" startIcon={<EditIcon />}>
                        Редактировать
                        </Button>
                        : ''}
                    </div>
                </div>
            </div>
            <div className={classes.moder_info}>
                <ModerCard moderInfo={mainModerInfo}/>
                <div className={classes.moder_info_full}>
                 <ModerCardInfo warns={moderWarns} inactives={moderInactive} logs={moderPunish} kpd={moderKpd} moderId={mainModerInfo[0].user_id} userFlags={flags} setWarn={setModerWarns} setinactive={setModerInactive} setkpd={setModerKpd}/>
                </div>
            </div>
            {flagsSetting.Is(flags, 8) 
            ? <EditModal moderator={mainModerInfo[0]} open={EditModalState} setOpen={setEditModalState} serverId={server} setInfo={setMainModerInfo} userFlags={flags} userRole={userRole}/>
            : ''}
        </div> 
        : <ModeratorSkeleton />
        }
    </>
  )
}

export default Moderator