import React, { useContext, useState, createContext } from 'react';

interface GlobalContext {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Context = createContext({} as GlobalContext);

export const useGlobalStateContext = () => {
  return useContext(Context);
}

export const GlobalStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const value = React.useMemo(() => ({ token, setToken }), [token]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
