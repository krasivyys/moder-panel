import React, { useState, useEffect, useContext } from 'react'
import LogsTable from '../components/Tables/LogsTable/LogsTable';
import classes from '../styles/logs.module.css'
import { AppContext } from '../App';
import flags from '../flags';

const Logs = () => {

  const [punish, setPunish] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(50)

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
    fetch('/api/logs')
        .then(response => response.json())
        .then(response => {
            setPunish(response.info.reverse())
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lastIndex = currentPage * perPage
  const firstIndex = lastIndex - perPage
  const current = punish.slice(firstIndex, lastIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
        <div className={classes.logs_box}>
            <div className={classes.logs_box_title}>
                <span>Логи наказаний модераторов</span>
            </div>
            <div className={classes.logs_box_content}>
                <LogsTable PunishLogs={current} perPage={perPage} total={punish.length} paginate={paginate}/>
            </div>
        </div>
    </>
  )
}

export default Logs