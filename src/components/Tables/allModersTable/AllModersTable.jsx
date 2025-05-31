import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import EditModal from './Modals/EditModal/EditModal';
import RemoveModal from './Modals/RemoveModal/RemoveModal';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import classes from './AllModersTable.module.css'
import Badge from '@mui/material/Badge';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import flags from '../../../flags';

const columns = [
  { id: 'Nick', label: 'Nick', minWidth: 250, align: 'left' },
  { id: 'Prefix', label: 'Prefix', minWidth: 130, align: 'center' },
  { id: 'Discord ID', label: 'Discord ID', minWidth: 300, align: 'center' },
  { id: 'VK', label: 'VK', minWidth: 292, align: 'center' },
  { id: 'JobTitle', label: 'Должность', minWidth: 365, align: 'center' },
  { id: 'Inactive', label: 'Неактив до', minWidth: 179, align: 'center' },
  { id: 'Actions', label: 'Действия', minWidth: 156, align: 'center' }
];

const AllModersTable = ({List, userFlags, serverId, setList, userRole}) => {
  
  const [moder, setModer] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setDeletedModal] = useState(false)

  const handleClickOpenModal = (row) => {
    setOpenModal(true)
    setModer(row)
  }
  
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', color: 'white' }} size={'small'} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
                <TableCell
                  sx={{ color: 'white', borderColor: '#49423D' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                {column.label}
                </TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody sm={{ color: 'white' }}>
        {List ? List.map((row) => (
            <TableRow
              hover
              key={row.nick}
            >
            <TableCell align="left" sx={{ color: 'white', a: {color: '#2196f3', textDecoration: 'none'}, borderColor: '#49423D', display: 'flex', flexDirection: 'row'}}>
            <div className={classes.copy_btn}>
              <Tooltip title={'Скопировать'}>
                <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(row.nick)}}/>
              </Tooltip>
            </div>
            <div className={classes.avatar}>{row.avatarUrl !== 'Нет' 
            ? row.ws === '0' 
            ? <img src={`https://cdn.discordapp.com/avatars/${row.user_id}/${row.avatarUrl}.webp`} alt={''}/> 
            : row.ws <= 2
            ? <Badge badgeContent={row.ws} color="primary" sx={{width: '32px'}}>
              <img src={`https://cdn.discordapp.com/avatars/${row.user_id}/${row.avatarUrl}.webp`} alt={''}/>
            </Badge>
            : <Badge badgeContent={row.ws} color="secondary">
              <img src={`https://cdn.discordapp.com/avatars/${row.user_id}/${row.avatarUrl}.webp`} alt={''}/>
            </Badge>
            : row.ws === '0' 
            ? <PersonIcon /> 
            : row.ws <= 2
            ? <Badge badgeContent={row.ws} color="primary">
              <PersonIcon /> 
            </Badge>
            : <Badge badgeContent={row.ws} color="error">
              <PersonIcon /> 
            </Badge>}</div>
            <Link to={`/moderator/${row.user_id}`}>{row.nick}</Link>
            </TableCell>
            <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}>{row.prefix}</TableCell>
            <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}>{row.user_id}</TableCell>
            <TableCell align="center" sx={{ color: 'white', a: {color: '#2196f3', textDecoration: 'none'}, borderColor: '#49423D'}}><a href={`https://vk.com/id${row.vk}`} target='_blank' rel="noreferrer">{row.vk_name}</a></TableCell>
            <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}>{row.role}</TableCell>
            <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}>{row.neakt}</TableCell>
            {flags.Is(userFlags, 12) 
            ? <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}><button style={{background: 'transparent', border: 'none', outline: 'none', color: 'white', cursor: 'pointer' }} type='button' onClick={() => handleClickOpenModal(row)}><EditIcon /></button><button style={ {background: 'transparent', border: 'none', outline: 'none', color: 'white', cursor: 'pointer' }} type='button' onClick={() => {setDeletedModal(true); setModer(row)}}><DeleteIcon /></button></TableCell> 
            : <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D'}}></TableCell>}
            </TableRow>
        )) : <> <TableRow>
            <TableCell colSpan={'9'} className='column'  sx={{ color: 'white', padding: '0px' }}><LinearProgress/></TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center" colSpan={'9'} className='column'  sx={{ color: 'white' }}>Загрузка данных...</TableCell>
        </TableRow>
        </>}
        </TableBody>
      </Table>
    </TableContainer>
    {flags.Is(userFlags, 12) 
    ? <><EditModal moderator={moder} open={openModal} setOpen={setOpenModal} serverId={serverId} setList={setList} userFlags={userFlags} userRole={userRole}/>
    <RemoveModal moderator={moder} openDel={openDeleteModal} setOpenDel={setDeletedModal} setList={setList}/></>
    : ''}
    </>
  )
}

export default AllModersTable