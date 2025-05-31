import React, {useState, useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login';
import { AppContext } from '../../App';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const pageList = [
    {id: 'main', name: 'Главная', url: '/main', icon: <DashboardIcon />, flags: 0},
    {id: 'add-moderator', name: 'Добавить', url: '/add-moderator', icon: <PersonAddIcon />, flags: 8},
    {id: 'kpd', name: 'КПД модерации', url: '/kpd', icon: <TrendingUpIcon />, flags: 2},
    {id: 'logs', name: 'Логи', url: '/logs', icon: <AnalyticsRoundedIcon />, flags: 2},
    {id: 'archive', name: 'Архив', url: '/archive', icon: <ArchiveRoundedIcon />, flags: 2}
]

const MenuBar = ({children}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      if(open) {
        setOpen(false)
      } else {
        setOpen(true)
      }
      // setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const {flags} = useContext(AppContext)

    const handleLogout = () => {
      fetch('/api/logout', {method: "POST"})
      .then(response => response.json())
      .then(response => {
        console.log(response.message)
        window.location.replace('/login')
      })
    }

    const pathName = window.location.pathname

    return (
        <>
        {pathName !== '/login'
        ?
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'inline-flex' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, a: {textDecoration: 'none', color: '#808080', transition: '0.2s', outline: 'none'}, 'a:hover': {color: 'white'} }}>
            <Link to='/main'>Панель модератора</Link>
          </Typography>
          <LogoutRoundedIcon sx={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => handleLogout()}/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pageList.map((page, index)   => (
            <div key={index}>
              {page.flags <= flags 
              ? 
                <ListItem disablePadding>
                  <Link to={page.url} style={{"width": "100%", "textDecoration": "none", "color": "inherit"}}>
                    <ListItemButton onClick={() => console.log()}>
                      <ListItemIcon>
                        {page.icon}
                      </ListItemIcon>
                      <ListItemText primary={page.name} />
                    </ListItemButton> 
                  </Link>
                </ListItem>
              : ''}
            </div>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
    : <Login /> }
    </ >
    )
}

export default MenuBar