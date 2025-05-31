import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';


const columns = [
  { id: 'Discord ID', label: 'Discord ID', minWidth: 300, align: 'center' },
  { id: 'Mute', label: 'Mute', minWidth: 100, align: 'center' },
  { id: 'Unmute', label: 'Un_Mute', minWidth: 100, align: 'center' },
  { id: 'Prison', label: 'Prison', minWidth: 100, align: 'center' },
  { id: 'UnPrison', label: 'Un_Prison', minWidth: 100, align: 'center' },
  { id: 'UnFrac', label: 'Un_Frac', minWidth: 100, align: 'center' },
  { id: 'Message', label: 'Message', minWidth: 100, align: 'center' },
];

const KpdTable = ({KpdList = [], serverId}) => {

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', color: 'white' }} size={'small'} aria-label="simple table">
        <TableHead>
          <TableRow>
            {serverId === 181 &&
              <TableCell
              sx={{ color: 'white' }}
              align='center'
              style={{ minWidth: 150 }}
            >
              Nick
            </TableCell>
            }
            {columns.map((column) => (
                <TableCell
                  sx={{ color: 'white' }}
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
        {KpdList.length > 0 ? KpdList.map((row) => (
            <TableRow
              hover
              key={row.id}
            >
            {serverId === 181 &&
              <TableCell align="center" sx={{ color: 'white' }}>{row.name}</TableCell>
            }
            <TableCell align="center" sx={{ color: 'white', a: {color: '#2196f3', textDecoration: 'none'} }}>
              <Link to={`/moderator/${row.user_id}`}>{row.user_id}</Link>
            </TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.mute}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.un_mute}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.prison}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.un_prison}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.un_frac}</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>{row.message}</TableCell>
            </TableRow>
        )) : <> <TableRow>
            <TableCell colSpan={'12'} className='column'  sx={{ color: 'white', padding: '0px' }}><LinearProgress/></TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center" colSpan={'12'} className='column'  sx={{ color: 'white' }}>Загрузка данных...</TableCell>
        </TableRow>
        </>}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default KpdTable