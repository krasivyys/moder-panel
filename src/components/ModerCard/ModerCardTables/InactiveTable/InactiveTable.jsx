import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    { id: 'Date1', label: 'От', minWidth: 201, align: 'center' },
    { id: 'Date2', label: 'До', minWidth: 201, align: 'center' },
    { id: 'Reason', label: 'Причина выдачи', minWidth: 201, align: 'center' },
    { id: 'WhoGive', label: 'Кто выдал', minWidth: 201, align: 'center' },
    { id: 'Status', label: 'Статус', minWidth: 201, align: 'center' }
];

const InactiveTable = ({inacvtivesM=[]}) => {
  return (
    <>
        <TableContainer component={Paper}>
                <Table sx={{ width: '100%', color: 'white' }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
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
                    {inacvtivesM.length > 0 ? inacvtivesM.map((row) => (
                        <TableRow
                        key={row.id}
                        hover
                        >
                        <TableCell align="center" sx={{ color: 'white' }}>{row.date1}</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>{row.date2}</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>{row.reason}</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>{row.admin}</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>{row.status}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                            <TableCell colSpan={'5'} align="center" sx={{ color: 'white' }}>Неактивов нет</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  )
}

export default InactiveTable