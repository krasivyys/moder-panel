import React, { useState, useEffect, useContext } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import classes from '../styles/Archive.module.css'
import ArchiveAccordion from '../components/ArchiveAccordion/ArchiveAccordion';

import { AppContext } from '../App';
import flags from '../flags';

const Acrchive = () => {

   const [archive, setArchive] = useState([])
   const [searchWord, setSearchWord] = useState('')

   const {setFlags, setNum, setUserRole} = useContext(AppContext)

   useEffect(() => {
    fetch('/api/archive')
        .then(response => response.json())
        .then(response => {
            if(response.message){
                window.location.replace('/login')
            } else {
                setArchive(response.info)
            }
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
                if(!flags.Is(response.info.flags, 2)) {
                    window.location.replace('/')
                }
            }   
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredArchive = archive.filter(arch => {
        return arch.nick.toLowerCase().includes(searchWord.toLowerCase()) || arch.vk.toLowerCase().includes(searchWord.toLowerCase()) || arch.vk_name.toLowerCase().includes(searchWord.toLowerCase()) || arch.user_id.toLowerCase().includes(searchWord.toLowerCase())
    })

  return (
    <> 
        <div className={classes.acrhive}>
            <div className={classes.acrhive_box}>
                <div className={classes.search_input}>
                <TextField
                id="input-with-icon-textfield"
                label="Введите информацию для поиска"
                autoComplete='off'
                onChange={(event) => setSearchWord(event.target.value)}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                }}
                variant="standard"
                />
                </div>
                <div className={classes.acrhive_box_content}>
                    <ArchiveAccordion archiveList={filteredArchive}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Acrchive