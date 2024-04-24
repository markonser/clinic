import React, {useState} from 'react';
export const DataContext = React.createContext({});

export const DataContextProvider = (props) => {
  const initState = {
    doctorsListStore:[],
    adminsListStore:[],
    patientsListStore:[]
  };

  const [dataContextState, setDataContextState] = useState(initState);

  return (
    <DataContext.Provider value={{dataContextState, setDataContextState}}>
      {props.children}
    </DataContext.Provider>
  );
};