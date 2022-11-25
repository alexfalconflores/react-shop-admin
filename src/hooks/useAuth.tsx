import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import endPoints from '@services/api';
import Fetch from '@utils/Fetch';
import { IGetUser } from '@interfaces/IUser';

interface AuthContextProps {
  children: React.ReactNode;
}

interface Data {
  access_token: string;
  statusCode: number | undefined;
  message: string | undefined;
}

const AuthContext = createContext({} as ReturnType<typeof useProvideAuth>);

export function ProviderAuth({ children }: AuthContextProps) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState({} as IGetUser);

  const signin = async (email: string, password: string) => {
    const response = await Fetch.Post(endPoints.auth.login, {
      email,
      password,
    });
    const data = await response.json();
    const { access_token, statusCode, message }: Data = data;

    if (statusCode !== undefined) return { statusCode, message };

    if (access_token) {
      Cookie.set('token', access_token, { expires: 5 });
      const response = await Fetch.Get(endPoints.auth.profile, 'Bearer');
      const data: IGetUser = await response.json();
      setUser(data);

      return { statusCode, message };
    }
    return { statusCode, message };
  };

  const logout = () => {
    Cookie.remove('token');
    setUser({} as IGetUser);
    window.location.href = '/login';
  };

  return {
    user,
    signin,
    logout,
  };
}
