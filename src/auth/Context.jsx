import React, { useState, createContext } from 'react';
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
    const { getLocalStorage, setLocalStorage } = Storage();
    const [dataUser, setDataUser] = useState(userDataInitial);

    const checkUser = () => {
        return getLocalStorage();
    }
    const login = (user) => {
        setLocalStorage(user); setDataUser(user);
    }
    const logout = () => {
        setLocalStorage(null); setDataUser(null);
    }

    return (
        <Context.Provider value={{
            dataUser, setDataUser, checkUser, login, logout
        }}>
            {children}
        </Context.Provider>
    )
};
