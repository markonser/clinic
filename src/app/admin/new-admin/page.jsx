/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, {useContext, useEffect, useRef, useState} from 'react';
import './new-admin.css';
import '../../styles/input.css';
import 'react-notifications/lib/notifications.css';
import Link from 'next/link';
import {INITIAL_FORM_VALUES, USER_ROLES, USER_ROLES_RU} from '@/constants/constants';
import axios from 'axios';
import {UserContext} from '@/userContext/UserContext';
import {convertTimeToUnix, fromUnixTimeToDateOnly, fromUnixTimeToHumanFormat} from '@/utils/getLocalTimeForDisplay';
import {NotificationManager} from 'react-notifications';
import {usePathname, useRouter} from 'next/navigation';
import {getAllUsers} from '@/utils/getAllUsers';
import Header from '@/components/header/header';
import ConfirmDeleteModal from '@/components/confirmDeleteModal/confirmDeleteModal';
import {getOneUser} from '@/utils/getOneUser';

export default function NewAdmin() {
  const [inputsState, setInputsState] = useState(INITIAL_FORM_VALUES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const location = usePathname();
  const [usersList, setUsersList] = useState();
  const [findFio, setFindFio] = useState();
  const roleRef = useRef();

  function onChangeFormData(evt) {
    setInputsState(() => {
      const data = {
        ...inputsState, [evt.target.name]: evt.target.value
      };
      return data;
    });
  }

  async function handleSubmit() {
    const {born, password, ...rest} = inputsState;

    const data = {
      born: convertTimeToUnix(born),
      password: password,
      ...rest
    };
    try {
      const res = isEditMode
        ? await axios.put('/api/createUser', data)
        : await axios.post('/api/createUser', data);
      if (res) {
        getInitialState();
        NotificationManager.success('Сообщение.', 'Пользователь добавлен успешно', 5000);
        password && NotificationManager.warning('Напоминание.', 'Сообщите новый пароль пользователю', 10000);
        onCancelEditClick();
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время сохранения нового пользователя возникла ошибка.', 15000);
      console.log(error);
    }
  }
  async function onEditUser(el) {
    setIsEditMode(el.id);
    const born = fromUnixTimeToDateOnly(el.born);
    for (let i = 0; i < roleRef.current.options.length; i++) {
      const element = roleRef.current.options[i];
      element.selected = false;
      if (element.value === el.role) {
        element.selected = true;
      }
    }

    setInputsState({
      id: el.id,
      login: el.login,
      password: el.password,
      fio: el.fio,
      passport: el.passport,
      role: el.role,
      phone: el.phone,
      address: el.address,
      born: born
    });
  }

  function onCancelEditClick() {
    setInputsState(INITIAL_FORM_VALUES);
    setIsEditMode(false);
    for (let i = 0; i < roleRef.current.options.length; i++) {
      const element = roleRef.current.options[i];
      element.selected = false;
    }
  }

  async function getInitialState() {
    const data = await getAllUsers();
    setUsersList(data);
  }
  async function findUser() {
    const data = await getOneUser(findFio);
    console.log('=== findFio page.jsx [97] ===',data);
    setUsersList(data);
  }


  function fake() { }
  async function onDelete(id) {
    try {
      const res = await axios.delete(`/api/createUser/${id}`);
      NotificationManager.success('Сообщение.', res.data.message, 5000);
      getInitialState();
      setConfirmDelete('');
      setIsEditMode('');
      setInputsState(INITIAL_FORM_VALUES);
      for (let i = 0; i < roleRef.current.options.length; i++) {
        const element = roleRef.current.options[i];
        element.selected = false;
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время удаления возникла ошибка.', 15000);
      console.log(error);
    }
  }

  useEffect(() => {
    if (location === '/admin/new-admin') {
      getInitialState();
    }

  }, []);

  return (
    <>
      <div className='page_content'>
        <h2 className={`h2 `}>
          {isEditMode ? 'Редактирование данных пользователя' : 'Создать нового пользователя'}
        </h2>
        <form className={`new_office_user_form ${isEditMode ? 'editMode' : ''}`} onInput={(evt) => onChangeFormData(evt)}>
          <div className="auth_data">
            <div title='Нужен для входа на сайт'>
              <div>Login:</div>
              <input className="" type="text" name="login" onInput={fake} value={inputsState.login} />
            </div>
            <div title='Нужен для входа на сайт'>
              <div>Password:</div>
              <input className="" type="text" name="password" onInput={fake} value={inputsState.password} />
            </div>
            <div title='Нужен для входа на сайт'>
              <div>Тип пользователя:</div>
              <select name="role" ref={roleRef}>
                <option value="">--выберите--</option>
                <option onChange={fake} value={USER_ROLES.patient}>Пациент</option>
                <option onChange={fake} value={USER_ROLES.doctor}>Доктор</option>
                <option onChange={fake} value={USER_ROLES.admin}>Администратор</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <div>ФИО</div>
              <input className="" type="text" name="fio" onInput={fake} value={inputsState.fio} />
            </div>
            <div className="phone">
              <div>Телефон</div>
              <input className="" type="text" name="phone" onInput={fake} value={inputsState.phone} />
              {isEditMode && <div>
                <div>id пользователя</div>
                <input className="" type="text" name="id" onInput={fake} value={inputsState.id} disabled />
              </div>}
            </div>
          </div>
          <div>
            <div className="passport">
              <div>Паспорт</div>
              <input className="" type="text" name="passport" onInput={fake} value={inputsState.passport} /></div>
            <div className="address">
              <div>Адрес</div>
              <input className="" type="text" name="address" onInput={fake} value={inputsState.address} />
            </div>
          </div>
          <div>
            <div>Дата рождения</div>
            <input className="" type="date" name="born" onInput={fake} value={inputsState.born} />
            {isEditMode && <button type="button" className='btn_default delete_btn' onClick={() => setConfirmDelete(inputsState.id)}>
              Удалить
            </button>}
          </div>


          <button type="button" className='btn_default' onClick={handleSubmit}>
            {isEditMode ? 'Сохранить изменения' : 'Создать'}
          </button>
          {isEditMode && <button type="button" className='btn_default' onClick={onCancelEditClick}>
            Выйти из режима редактирования
          </button>}
          {!isEditMode && <Link href='/admin' className='btn_default'>Вернуться на главную</Link>}
        </form>

        <h2 className='h2'>100 последних зарегистрированных пользователей:</h2>
        <div className='find_user'>
          <div className='find_user_title'>Найти пользователя по ФИО:</div>
          <input className="find_user_input" type="text" name="find_user" onInput={(e)=>setFindFio(e.target.value)} value={findFio} />
          <button className='btn_default' onClick={findUser}>Найти</button>
        </div>
        <div id="table-scroll">
          <table className="new_patient_table">
            <thead>
              <tr className='new_patient_thead'>
                <th className="new_patient_id">Личное дело</th>
                <th className="new_patient_login">Login</th>
                <th className="new_patient_fio">ФИО</th>
                <th className="new_patient_born">Дата рождения</th>
                <th className="new_patient_phone">Телефон</th>
                <th className="new_patient_passport">Паспорт</th>
                <th className="new_patient_address">Адрес</th>
                <th className="new_patient_role">Доступ</th>
              </tr>
            </thead>
            <tbody className='new_patient_body'>
              {usersList && usersList.map(el => {
                const born = fromUnixTimeToHumanFormat(el.born, {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                  hour: '2-digit',
                }).slice(0, 13);
                return (
                  <tr className='new_patient_tr'
                    key={el.id}
                    onDoubleClick={() => onEditUser(el)}
                    title='Двойной клик для редактирования пользователя'
                  >
                    <td className="new_patient_id">{el.id}</td>
                    <td className="new_patient_login">{el.login}</td>
                    <td className="new_patient_fio">{el.fio}</td>
                    <td className="new_patient_born">{born}</td>
                    <td className="new_patient_phone">{el.phone}</td>
                    <td className="new_patient_passport">{el.passport}</td>
                    <td className="new_patient_address">{el.address}</td>
                    <td className="new_patient_role">{USER_ROLES_RU[el.role]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {confirmDelete && <ConfirmDeleteModal
          id={isEditMode}
          onDelete={onDelete}
          onClose={setConfirmDelete}
        />}
      </div>
    </>
  );
}
