import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TakeOffWarn from './TakeOffWarn/TakeOffWarn'
import flags from '../../../../flags';

const columns = [
    { id: 'DateUp', label: 'Дата выдачи', minWidth: 181, align: 'center' },
    { id: 'ReasonUp', label: 'Причина выдачи', minWidth: 275, align: 'center' },
    { id: 'WhoGive', label: 'Выдал', minWidth: 150, align: 'center' },
    { id: 'DateDown', label: 'Дата снятия', minWidth: 181, align: 'center' },
    { id: 'ReasonDown', label: 'Причина снятия', minWidth: 275, align: 'center' },
    { id: 'WhoDel', label: 'Снял', minWidth: 150, align: 'center' },
    { id: 'Action', label: 'Действие', minWidth: 90, align: 'center' }
];

const WarnTable = ({Warns = [], setwarn, userFlags}) => {

    const [openWarnModal, setopenWarnModal] = React.useState(false);
    const [reprimandId, setReprimandId] = React.useState();
    const [moderId, setModerId] = React.useState();

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
                {Warns.length > 0 ? Warns.map((row) => (
                    <TableRow
                    key={row.id}
                    hover
                    >
                    <TableCell align="center" sx={{ color: 'white' }}>{row.date}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{row.reason}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{row.admin}</TableCell>
                    {row.date2 !== 'Не снят'
                    ? <TableCell align="center" sx={{ color: 'white' }}>{row.date2}</TableCell>
                    : <TableCell align="center" sx={{ color: 'white' }}></TableCell>}
                    {row.reason2 !== 'Не снят'
                    ? <TableCell align="center" sx={{ color: 'white' }}>{row.reason2}</TableCell>
                    : <TableCell align="center" sx={{ color: 'white' }}></TableCell>}
                    {row.admindel !== 'Не снят'
                    ? <TableCell align="center" sx={{ color: 'white' }}>{row.admindel}</TableCell>
                    : <TableCell align="center" sx={{ color: 'white' }}></TableCell>}
                    {flags.Is(userFlags, 4) 
                    ? row.status === 'Погашен' 
                    ? <TableCell align="center" sx={{ color: 'white' }}><button style={{background: 'transparent', border: 'none', outline: 'none', color: 'white' }}><CheckBoxIcon /></button></TableCell> 
                    : <TableCell align="center" sx={{ color: 'white' }}><button onClick={() => {setopenWarnModal(true); setReprimandId(row.id); setModerId(row.moder)}} style={{background: 'transparent', border: 'none', outline: 'none', color: 'white', cursor: 'pointer' }}><CheckBoxOutlineBlankIcon/></button></TableCell> 
                    : <TableCell align="center" sx={{ color: 'white' }}></TableCell>}
                    </TableRow>
                )) : <TableRow>
                        <TableCell colSpan={'7'} align="center" sx={{ color: 'white' }}>Выговоров нет</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
        {flags.Is(userFlags, 4) &&
        <TakeOffWarn WarnOpenModal={openWarnModal} setWarnOpenModal={setopenWarnModal} id={reprimandId} moderId={moderId} setwarn={setwarn}/>}
    </>
  )
}

export default WarnTable