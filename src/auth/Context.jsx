import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from './Storage';

export const Context = createContext();

const userDataInitial = {
    'userId': null,
    'firstname': null,
    'lastname': null,
    'rolname': null,
    'accesstoken': null,
    'refreshtoken': null
};

export const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [openSessionExpired, setOpenSessionExpired] = useState(false);
    const { getLocalStorage, setLocalStorage } = Storage();
    const [dataUser, setDataUser] = useState(userDataInitial);

    const checkUser = () => {
        return getLocalStorage();
    }
    const login = (user) => {
        setLocalStorage(1, user); setDataUser(user);
    }
    const loginRefresh = (user) => {
        setLocalStorage(2, user); setDataUser({ ...dataUser, accesstoken: user.accesstoken });
    }
    const logout = () => {
        setLocalStorage(3, null); setDataUser(null); navigate('/');
    }

    return (
        <Context.Provider value={{
            dataUser, setDataUser, checkUser, login, loginRefresh, logout, openSessionExpired, setOpenSessionExpired
        }}>
            {children}
        </Context.Provider>
    )
};
