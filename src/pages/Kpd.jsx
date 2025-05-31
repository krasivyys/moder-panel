import React, { useState, useEffect, useContext } from 'react'
import KpdTable from '../components/Tables/KpdTable/KpdTable';
import classes from '../styles/kpd.module.css'
import flags from '../flags';
import { AppContext } from '../App';

const Kpd = () => {

  const [KPD, setKpd] = useState([])
  const [serverId, setServerId] = useState(0)

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
                setServerId(response.info.server)
                if(!flags.Is(response.info.flags, 2)) {
                  window.location.replace('/')
                }
            }
        })
    fetch('/api/kpd')
        .then(response => response.json())
        .then(response => {
          setKpd(response.info)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <div className={classes.kpd_box}>
            <div className={classes.kpd_box_title}>
                <span>КПД модерации за текущую неделю</span>
            </div>
            <div className={classes.kpd_box_content}>
              <KpdTable KpdList={KPD} serverId={serverId}/>
            </div>
        </div>
    </>
  )
}

export default Kpd