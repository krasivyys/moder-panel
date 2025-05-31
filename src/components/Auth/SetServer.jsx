import React from 'react'
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import classes from './setServer.module.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: '10px' }} className={classes.tab_server_action}>
            {children}
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}
  

const SetServer = ({setServer, servers = [], groups = []}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentServers = servers.filter(server => {
        return server.server_index === value
    })

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'max-content' }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider', width: 'max-content' }}
            >
                {groups.length === 0 ? '' 
                : groups.map((group, index) => (
                    <Tab 
                        label={group.server_category} 
                        {...a11yProps(index)} 
                    />
                ))}
            </Tabs>
            <Box className={classes.tabs_server_list}>
                {currentServers.map(server => (
                    <TabPanel value={value} index={server.server_index} className={classes.tab_server_box}>
                        <Button variant='text' 
                            onClick={setServer} 
                            id={server.server_id}
                        >
                            {server.server_name}
                        </Button>
                    </TabPanel>
                ))}
            </Box>
        </Box>
    )
}

export default SetServer