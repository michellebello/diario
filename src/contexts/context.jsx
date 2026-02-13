import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AppContext = createContext(null);

export const initialState = {
  username: null,
  accounts: [],
  transactions: [],
  accountNumbers: [],
  accountBalance: [],
  budgets: [],
  isLoggedIn: false,
  loading: {
    accounts: false,
    transactions: false,
    accountNumbers: false,
    accountBalance: false,
    budgets: false,
  },
  error: {
    accounts: null,
    transactions: null,
    accountNumbers: null,
    accountBalance: null,
    budgets: null,
  },
};

export const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const saved = sessionStorage.getItem("userInfo");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log("userInfo saved:", userInfo);
  }, [userInfo]);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
