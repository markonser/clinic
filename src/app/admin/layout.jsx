/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "@/components/header/header";
import {UserContext} from "@/userContext/UserContext";
import {useRouter} from "next/navigation";
import {USER_ROLES} from "@/constants/constants";
import {DataContext} from "@/dataContext/DataContext";
import {getInitialLoadInfo} from "@/utils/getInitialLoadInfo";

export default function RootLayout({children}) {
  let router = [];
  typeof window !== 'undefined' ? router = useRouter() : '';
  const {userContextState, setUserContextState} = useContext(UserContext);
  const {setDataContextState} = useContext(DataContext);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userContextState.role) {
      return;
    } else {
      (async () => {
        try {
          const {data} = await axios.get('/api/checkAuth');
          if (data.user.role !== USER_ROLES.admin) {router.push('/');}
          setUserContextState(data.user);
          setIsAuth(true);
        } catch (error) {
          router.push('/');
        }

        const {docTMP, patTMP, admTMP} = await getInitialLoadInfo();
        setDataContextState({
          doctorsListStore: [...docTMP],
          adminsListStore: [...admTMP],
          patientsListStore: [...patTMP]
        });
      })();
    }
  }, []);

  if (!isAuth) {
    return <h2>..........Проверка авторизации........</h2>;
  }

  return (
    <main className="auth_layout">
      <Header fio={userContextState?.fio} />
      {children}
    </main>
  );
}
