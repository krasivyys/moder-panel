import React, {useState, createContext} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from './pages/Login';
import Auth from './pages/Auth';
import Moderator from './pages/Moderator';
import AddModerator from './pages/AddModerator';
import Kpd from './pages/Kpd';
import Logs from './pages/Logs';
import Acrchive from './pages/Acrchive';
import MenuBar from './components/MenuBar/MenuBar';
import './App.css';

export const AppContext = createContext()

function App() {

  const [num, setNum] = useState(20)
  const [flags, setFlags] = useState(0)
  const [userRole, setUserRole] = useState('')
  
  return (
    <BrowserRouter>
      <AppContext.Provider value={{flags, setFlags, num, setNum, userRole, setUserRole}}>
        <MenuBar>
          <Routes>
            <Route exact path="/login" element={<Login/>}>
            </Route>
            <Route exact path="/main" element={<Main />}>
            </Route>
            <Route exact path="/" element={<Main />}>
            </Route>
            <Route exact path="/auth" element={<Auth/>}>
            </Route>
            <Route exact path="/moderator/:id" element={<Moderator />}>
            </Route>
            <Route exact path="/add-moderator" element={<AddModerator />}>
            </Route>
            <Route exact path="/kpd" element={<Kpd />}>
            </Route>
            <Route exact path="/logs" element={<Logs />}>
            </Route>
            <Route exact path="/archive" element={<Acrchive />}>
            </Route>
          </Routes>
        </MenuBar>
      </AppContext.Provider>
    </BrowserRouter>
  );
}


export default App;
