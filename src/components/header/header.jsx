"use client";
import React, {useContext} from 'react';
import './header.css';
import {UserContext} from '@/userContext/UserContext';
import {usePathname, useRouter} from 'next/navigation';
import axios from 'axios';
// import enjoyhint from "xbs-enjoyhint/src/enjoyhint";
// import {doctorSteps} from '@/app/doctor/doctor_enjoyhint_steps ';
// import {newAdminSteps} from '@/app/admin/new-admin/newAdminSteps';
// import {adminSteps} from '@/app/admin/adminSteps';
// import {newAdmRecordSteps} from '@/app/admin/create/newAdmRecordSteps';
import Image from 'next/image';

export default function Header({fio}) {
  const router = useRouter();
  // const location = usePathname();
  const {setUserContextState} = useContext(UserContext);

  // const enjoyhint_instance = new enjoyhint({});
  // if (location === '/doctor') {
  //   enjoyhint_instance.set(doctorSteps);
  // }
  // if (location === '/admin') {
  //   enjoyhint_instance.set(adminSteps);
  // }
  // if (location === '/admin/new-admin') {
  //   enjoyhint_instance.set(newAdminSteps);
  // }
  // if (location === '/admin/create') {
  //   enjoyhint_instance.set(newAdmRecordSteps);
  // }

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
      <div className='logo'>
        <Image src={'/logo.jpeg'} width={60} height={60} alt='logo' />
        <h1 className='header_title'>МедЗапись.ру</h1>
      </div>
      {/* {location !== '/' && <div className="help" title='Информация о работе со страницей' onClick={() => enjoyhint_instance.run()}>?</div>} */}
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
