/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import './patient.css';
import React, {useContext, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {UserContext} from '../../userContext/UserContext';
import axios from 'axios';
import {fromUnixTimeToHumanFormat} from '@/utils/getLocalTimeForDisplay';
import {NotificationManager} from 'react-notifications';
import PrintForm from '@/components/printForm/PrintForm';


export default function Patient() {
  let router = [];
  let location = '';
  typeof window !== 'undefined' ? router = useRouter() : '';
  typeof window !== 'undefined' ? location = usePathname() : '';
  const {userContextState} = useContext(UserContext);
  const [recordsState, setRecordsState] = useState([]);
  const [detailsForm, setDetailsForm] = useState([]);

  async function getUserRecords() {
    try {
      const res = await axios.get(`/api/record/${userContextState.id}`);
      if (res) {
        setRecordsState(res.data.res);
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Ошибка получения данных', 15000, () => alert(error));
    }
  }
  function onShowFullInfo(el) {
    setDetailsForm(el);
  }

  useEffect(() => {
    if (location === '/patient') {
      getUserRecords();
    }
  }, []);


  return (
    <>
      {detailsForm?.id && <PrintForm
        el={detailsForm}
        onClose={setDetailsForm}
      />}
      <main className="page_content">
        <h2 className="h2">История записей и активные записи</h2>
        <h2 className='h2'>Активные записи:</h2>
        <table className="record_table">
          <thead >
            <tr className='record_table_header'>
              <td className="record_table_id table_header_item">Номер</td>
              <td className="record_table_fio table_header_item">ФИО врача</td>
              <td className="record_table_time table_header_item">Дата / Время</td>
            </tr>
          </thead>
          <tbody className='record_table_body'>
            {recordsState.map(el => {

              const day = fromUnixTimeToHumanFormat(el.day);
              return el.isHistory !== true && (
                <tr className='record_table_row' key={el.id} onDoubleClick={() => onShowFullInfo(el)} title='Двойной клик для подробностей'>
                  <td className="record_table_id">{el.id}</td>
                  <td className="record_table_fio">{el.doctorFio}</td>
                  <td className="record_table_time">{day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2 className='h2'>История записей:</h2>
        <table className="record_table">
          <thead >
            <tr className='record_table_header'>
              <td className="record_table_id table_header_item">Номер</td>
              <td className="record_table_fio table_header_item">ФИО врача</td>
              <td className="record_table_time table_header_item">Дата / Время</td>
            </tr>
          </thead>
          <tbody className='record_table_body'>
            {recordsState.map(el => {
              const day = fromUnixTimeToHumanFormat(el.day);
              return el.isHistory === true && (
                <tr className='record_table_row' key={el.id} onDoubleClick={() => onShowFullInfo(el)} title='Двойной клик для подробностей'>
                  <td className="record_table_id">{el.id}</td>
                  <td className="record_table_fio">{el.doctorFio}</td>
                  <td className="record_table_time">{day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
