import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';


const columns = [
    { id: 'Date', label: 'Дата', minWidth: 150, align: 'center' },
    { id: 'Punish', label: 'Наказание', minWidth: 1201, align: 'center' }
];

const LogsTable = ({PunishLogs = [], perPage, total, paginate}) => {

  const pageNumber = []

  for(let i = 1; i <= Math.ceil(total / perPage); i++){
    pageNumber.push(i)
  }

  const handleClick = (e) => paginate(e.target.textContent || e.target.innerText)

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
        <TableBody sm={{ color: 'white'}}>
        {PunishLogs.length > 0 ? PunishLogs.map((row) => (
            <TableRow
              hover
              key={row.id}
            >
            <TableCell align="center" sx={{ color: 'white', borderColor: '#49423D' }}>
            {row.timeget}
            </TableCell>
            <TableCell align="left" sx={{ color: 'white', a: {color: '#2196f3', textDecoration: 'none'}, borderColor: '#49423D' }}>Модератор <Link to={`/moderator/${row.moder_id}`}>{row.moder_name}</Link> выдал {row.punishType} на {row.timePunish / 60} минут. Причина: {row.reason}</TableCell>
            </TableRow>
        )) : <> <TableRow>
            <TableCell colSpan={'2'} className='column'  sx={{ color: 'white', padding: '0px' }}><LinearProgress/></TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center" colSpan={'2'} className='column'  sx={{ color: 'white' }}>Загрузка данных...</TableCell>
        </TableRow>
        </>}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={pageNumber.length} color="primary" size="large" onClick={handleClick}/>
    </>
  )
}

export default LogsTable