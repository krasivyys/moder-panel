import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    { id: 'Date', label: 'Дата', minWidth: 200, align: 'center' },
    { id: 'Reason', label: 'Наказание', minWidth: 805, align: 'center' }
];

const LogsTable = ({Logs = []}) => {
  return (
    <>
        <TableContainer component={Paper}>
                <Table sx={{ width: '100%', color: 'white' }} size="small" aria-label="simple table">
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
                    {Logs.length > 0 ? Logs.map((row) => (
                        <TableRow
                        key={row.id}
                        hover
                        >
                        <TableCell align="center" sx={{ color: 'white' }}>{row.timeget}</TableCell>
                        <TableCell align="left" sx={{ color: 'white' }}>{row.moder_name} выдал {row.punishType} {row.user_id} на {row.timePunish} минут. Причина: {row.reason}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                            <TableCell colSpan={'2'} align="center" sx={{ color: 'white' }}>Наказаний нет</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  )
}

export default LogsTable