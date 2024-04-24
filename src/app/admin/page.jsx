/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import './admin.css';
import '../styles/input.css';
import Link from 'next/link';
import React, {useContext, useEffect} from 'react';
import Header from '@/components/header/header';
import {UserContext} from '../../userContext/UserContext';
import {USER_ROLES} from '@/constants/constants';
import {useRouter} from 'next/navigation';

export default function Admin() {
  const {userContextState} = useContext(UserContext);
  const router = useRouter();
console.log('=== userContextState page.jsx [15] ===', userContextState);
  return (
    <>
    {/* <Header fio={userContextState?.fio} /> */}
      <div className="admin_content">
        <h2>Личный кабинет администратора</h2>
        <div className="nav_wrapper">
          <Link href='/admin/new-admin' className='nav_btn_big'>Создать или редактировать пользователя</Link>
          {/* <Link href='/admin/new-patient' className='nav_btn_big'>Добавить нового пациента</Link> */}
          <Link href='/admin/create' className='nav_btn_big'>Записать на прием</Link>
        </div>
      </div>
    </>
  );
}
