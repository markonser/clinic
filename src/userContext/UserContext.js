import React, {useState} from 'react';
export const UserContext = React.createContext({});

export const UserContextProvider = (props) => {
  const initState = {
    id: '',
    fio: '',
    role: '',
  };

  const [userContextState, setUserContextState] = useState(initState);

  return (
    <UserContext.Provider value={{userContextState, setUserContextState}}>
      {props.children}
    </UserContext.Provider>
  );
};