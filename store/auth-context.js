import { createContext, useEffect, useState } from "react";
import AsynStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
});

function AuthContextProvider({children}){

    const [authToken, setAuthToken] = useState();

    function authenticate(token){
        setAuthToken(token);
        AsynStorage.setItem('token', token);
    }

    function logout(){
        setAuthToken(null);
        AsynStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;