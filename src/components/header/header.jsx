"use client";
import React, {useContext} from 'react';
import './header.css';
import {UserContext} from '@/userContext/UserContext';
import {useRouter} from 'next/navigation';
import axios from 'axios';

export default function Header({fio}) {
  const router = useRouter();
  const {setUserContextState} = useContext(UserContext);
  function onExitClick() {
    axios.get('api/logOut');
    setUserContextState({
      fio: '',
      id: '',
      role: ''
    });
    router.push('/');
  }
  return (
    <div className="header">
      <h1 className='header_title'>МедЗапись.ру</h1>
      {fio &&
        <div className='header_info'>
          <p className="fio">{fio}</p>
          <button
            className="btn_default"
            type="button"
            onClick={onExitClick}
          >Выйти</button>
        </div>
      }
    </div>
  );
}
