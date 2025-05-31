import classes from './ModerCardInfo.module.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AddCommentIcon from '@mui/icons-material/AddComment';
import WarnTable from '../ModerCardTables/WarnTable/WarnTable';
import InactiveTable from '../ModerCardTables/InactiveTable/InactiveTable';
import LogsTable from '../ModerCardTables/LogsTable/LogsTable';
import WarnModal from './Modals/WarnModal/WarnModal';
import InactiveModal from './Modals/InactiveModal/InactiveModal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import flags from '../../../flags';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <h4>{children}</h4>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const columns = [
    { id: 'Date', label: 'Дата', minWidth: 300, align: 'center' },
    { id: 'Mute', label: 'Mute', minWidth: 100, align: 'center' },
    { id: 'Unmute', label: 'Un_Mute', minWidth: 100, align: 'center' },
    { id: 'Prison', label: 'Prison', minWidth: 100, align: 'center' },
    { id: 'UnPrison', label: 'Un_Prison', minWidth: 100, align: 'center' },
    { id: 'UnFrac', label: 'Un_Frac', minWidth: 100, align: 'center' },
    { id: 'Message', label: 'Message', minWidth: 100, align: 'center' },
];


const ModerCardInfo = ({warns=[], inactives=[], logs=[], kpd=[], moderId, userFlags, setWarn, setinactive, setkpd}) => {

   const [value, setValue] = React.useState(0)
   const [openWarnModal, setopenWarnModal] = React.useState(false);
   const [openInactiveModal, setopenInactiveModal] = React.useState(false);
   const [buttonTitle, setButtonTitle] = React.useState(true)
   const handleChange = (event, newValue) => {
    setValue(newValue);
   };

   const handleClick = () => {
    if(!buttonTitle) {
        fetch(`/api/getallinfo/${moderId}`)
            .then(response => response.json())
            .then(response => {
                setkpd(response.Kpd)
                setButtonTitle(true)
            })
    } else {
        fetch(`/api/getallinfo/${moderId}?` + new URLSearchParams({'type': 'weekly'}))
            .then(response => response.json())
            .then(response => {
                setkpd(response.info)
                setButtonTitle(false)
            })
    }
   }

  return (
    <>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} textColor="inherit" onChange={handleChange} aria-label="basic tabs example">
            <Tab label="КПД" {...a11yProps(0)} />
            <Tab label="Выговоры" {...a11yProps(1)} />
            <Tab label="Неактивы" {...a11yProps(2)} />
            <Tab label="Логи" {...a11yProps(3)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <div className={classes.tab_title}>
                Активность модератора
                <div className={classes.slide_btn}>
                    {buttonTitle
                    ? <Button variant='outlied' onClick={() => {handleClick()}}>Группировка по дням</Button>
                    : <Button variant='outlied' onClick={() => {handleClick()}}>Группировка по неделям</Button>}
                </div>
            </div>
            <div className={classes.tab_content}>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%', color: 'white', border: 'none' }} size={'small'} aria-label="simple table">
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
                        {kpd.length > 0 ? kpd.map((row) => (
                            <TableRow
                            hover
                            key={row.id}
                            >
                            <TableCell align="center" sx={{ color: 'white', a: {color: '#2196f3', textDecoration: 'none'} }}>
                                {`${row.date.split('T')[0]} ${buttonTitle ? `(${new Date(row.date).toLocaleString('ru-us', {  weekday: 'long' })})` : ''}`}
                            </TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.mute}</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.un_mute}</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.prison}</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.un_prison}</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.un_frac}</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>{row.message}</TableCell>
                            </TableRow>
                        )) : <> 
                        <TableRow>
                        <TableCell align="center" colSpan={'12'} className='column'  sx={{ color: 'white' }}>Нет информации</TableCell>
                        </TableRow>
                        </>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div className={classes.tab_warns}>
                <div className={classes.tab_title}>
                    Выговоры Модератора
                </div>
                <div className={classes.tab_warn_button}>
                    <div className={classes.tab_warn_button_}>
                        {flags.Is(userFlags, 4)
                        ?<Button onClick={() => setopenWarnModal(true)} variant="outlined" size="medium" startIcon={<FeedbackIcon />}>
                        Выдать выговор
                        </Button>
                        : ''}
                    </div>
                </div>
            </div>
            <WarnTable Warns={warns} setwarn={setWarn} userFlags={userFlags}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div className={classes.tab_inactive}>
                <div className={classes.tab_title}>
                    Неактивы Модератора
                </div>
                <div className={classes.tab_inactive_button}>
                    <div className={classes.tab_inactive_button_}>
                        {flags.Is(userFlags, 4)
                        ?<Button onClick={() => setopenInactiveModal(true)} variant="outlined" size="medium" startIcon={<AddCommentIcon />}>
                        Выдать неактив
                        </Button>
                        : ''}
                    </div>
                </div>
            </div>
            <InactiveTable inacvtivesM={inactives}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <div className={classes.tab_title}>
                Логи наказаний модератора
            </div>
            <LogsTable Logs={logs}/>
        </TabPanel>
        </Box>
        {flags.Is(userFlags, 4)
        ?<>
        <WarnModal WarnOpenModal={openWarnModal} setWarnOpenModal={setopenWarnModal} id={moderId} setWarn={setWarn}/>
        <InactiveModal InactiveOpenModal={openInactiveModal} setInactiveOpenModal={setopenInactiveModal} id={moderId} setinactive={setinactive}/>
        </>
        : ''}
    </>
  )
}

export default ModerCardInfo