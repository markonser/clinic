/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './doctor.css';
import '../styles/input.css';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import {UserContext} from '../../userContext/UserContext';
import {usePathname, useRouter} from 'next/navigation';
import {NotificationManager} from 'react-notifications';
import {DataContext} from '../../dataContext/DataContext';
import {convertTimeToUnix, fromUnixTimeToHumanFormat, getDayRange} from '@/utils/getLocalTimeForDisplay';
import Select from 'react-select';
import PrintForm from '@/components/printForm/DetailedForm.jsx';
// import {doctorSteps} from './doctor_enjoyhint_steps ';
// import enjoyhint from "xbs-enjoyhint/src/enjoyhint";

export default function Doctor() {
  const {userContextState} = useContext(UserContext);
  const {dataContextState, setDataContextState} = useContext(DataContext);
  const router = useRouter();
  const path = usePathname();
  const dayRef = useRef();
  const [needUpdate, setNeedUpdate] = useState(0);
  const [patientList, setPatientList] = useState([]);
  const [patientListActive, setPatientListActive] = useState([]);
  const [patientListHistory, setPatientListHistory] = useState([]);
  const [detailsForm, setDetailsForm] = useState([]);
  const [fioValue, setFioValue] = useState('');
  const [isDayEmpty, setDayEmpty] = useState('');
  const patientsSelectOptions = dataContextState?.patientsListStore.map(el => {return {value: el.id, label: el.fio};});
  const doctorSelectOptions = dataContextState?.doctorsListStore.map(el => {return {value: el.id, label: el.fio};});
  // const enjoyhint_instance = new enjoyhint({});
  // enjoyhint_instance.set(doctorSteps);



  async function getPatients(isHistorySearchFlag = false, fio = '', day = new Date(), isUnixTime = false) {
    setPatientList([]);
    setPatientListActive([]);
    setPatientListHistory([]);
    const inDay = getDayRange(day, isUnixTime);
    const data = {
      day: inDay,
      fio: !!fio ? fio : '',
      doctorId: userContextState.id,
      isHistorySearchFlag: isHistorySearchFlag
    };

    if (isHistorySearchFlag && fio === '') {
      NotificationManager.info('Внимание!', 'Для получения истории записей укажите ФИО пациента.', 5000);
      return;
    }
    try {
      const res = await axios.post('/api/record/getBySearch', data);
      if (res) {
        const activeTmp = res.data.res.filter(el => el.isHistory === false || el.isHistory === null);
        const historyTmp = res.data.res.filter(el => el.isHistory === true);
        if (!res.data.res) {
          NotificationManager.info('Сообщение.', 'По данному запросу данные отсутствуют.', 5000);
        }
        setPatientListActive(activeTmp);
        setPatientList(res.data.res);
        isHistorySearchFlag && setPatientListHistory(historyTmp);
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время получения данных возникла ошибка.', 15000);
      console.log(error);
    }
  }

  async function onQuickSave(e) {
    setPatientList([]);
    setPatientListActive([]);
    setPatientListHistory([]);
    if (!fioValue?.value || !dayRef.current.value) {
      NotificationManager.info('Ошибка', 'Проверьте поле ДАТА или ФИО', 5000);
      return;
    }

    const data = {
      day: convertTimeToUnix(dayRef.current.value),
      patientId: fioValue?.value,
      fio: fioValue?.label,
      doctorId: userContextState.id,
      doctorFio: userContextState.fio,
    };

    try {
      const res = await axios.post('/api/record', data);
      getPatients();
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время сохранения возникла ошибка.', 15000);
      console.log(error);
    }
  }

  async function onSearch() {
    setPatientList([]);
    setPatientListActive([]);
    setPatientListHistory([]);
    const inDay = dayRef.current.value
      ? new Date(dayRef.current.value)
      : new Date();
    const inFio = fioValue?.label || '';
    getPatients(false, inFio, inDay);
  }

  function onShowFullInfo(el) {
    localStorage.setItem('selectedPatientFio', JSON.stringify(el.fio));
    localStorage.setItem('selectedDay', JSON.stringify(el.day));
    setDetailsForm(el);
  }

  useEffect(() => {
    if (path === '/doctor') {
      getPatients();
    }
  }, []);
  useEffect(() => {
    if (path === '/doctor' && needUpdate !== 0) {
      const fio = JSON.parse(localStorage.getItem('selectedPatientFio'));
      const day = JSON.parse(localStorage.getItem('selectedDay'));
      getPatients(false, fio, day, true);
    }
  }, [needUpdate]);

  return (
    <>
      {detailsForm?.id && <div id='modal'><PrintForm
        el={detailsForm}
        onClose={setDetailsForm}
        needUpdate={setNeedUpdate}
        patientsSelectOptions={patientsSelectOptions}
        doctorSelectOptions={doctorSelectOptions}
      />
      </div>
      }
      <div className="page_content">

        <h2 className="h2">Создание и поиск записи</h2>
        <form className="doctor_form">
          <label className='hint_date'>
            <div>Дата и время:</div>
            <input
              type="datetime-local"
              name="doctor_day"
              ref={dayRef}
              value={isDayEmpty}
              onChange={(evt) => setDayEmpty(evt.target.value)}
            />
          </label>
          <label className='hint_fio'>
            <div>ФИО пациента:</div>
            <Select
              isClearable
              className='pat_select'
              name='fio'
              options={patientsSelectOptions}
              defaultValue={{value: '', label: 'выберите пациента'}}
              onChange={(newValue) => setFioValue(newValue)}
              noOptionsMessage={() => 'не найдено'}

            />
          </label>

        </form>

        <div className="doctor_action_btn_wrapper">
          <button
            id='btn1'
            className='btn_default doctor_btn'
            type="button"
            title='Последние 100 записей указанного пациента БЕЗ УЧЕТА ДАТЫ.'
            onClick={() => {getPatients(true, fioValue?.label);}}
            disabled={!!fioValue ? false : true}
          >
            {!!fioValue ? `Показать историю для: ${fioValue?.label}` : `Введите ФИО`}
          </button>
          <button
            id='btn2'
            className='btn_default doctor_btn'
            type="button"
            title='Если указана только ДАТА - найдет все записи в этот день, если ДАТА и ФИО - найдет записи только для указанного пациента в этот день.' onClick={onSearch}
          >
            {!!isDayEmpty
              ? `Показать все записи на: ${fromUnixTimeToHumanFormat(convertTimeToUnix(isDayEmpty)).slice(0, 11)} ${fioValue ? `для: ${fioValue?.label}` : ''}`
              : `Показать все записи на сегодня`}
          </button>
          <button
            id='btn3'
            className='btn_default doctor_btn'
            type="button"
            title='Сохраняет запись для указанного пациента в выбранный день.'
            onClick={onQuickSave}
            disabled={(!!fioValue && !!isDayEmpty) ? false : true}
          >
            Сохранить запись
          </button>
        </div>

        <h2 className='h2'>Активные записи:</h2>
        <table className="record_table" id='active_table'>
          <thead >
            <tr className='record_table_header'>
              <td className="record_table_id table_header_item">Номер</td>
              <td className="record_table_fio table_header_item">ФИО пациента:</td>
              <td className="record_table_time table_header_item">Дата / Время</td>
            </tr>
          </thead>
          <tbody className='record_table_body'>
            {patientListActive.map((el) => {
              const day = fromUnixTimeToHumanFormat(el.day);
              return (
                <tr
                  className='record_table_row'
                  key={el.id} onDoubleClick={() => onShowFullInfo(el)}
                  title='Двойной клик для подробностей'>
                  <td className="record_table_id">{el.id}</td>
                  <td className="record_table_fio">{el.fio}</td>
                  <td className="record_table_time">{day}</td>
                </tr>
              );
            })}


          </tbody>
        </table>
        {patientListHistory.length > 0 &&
          <>
            <h2 className='h2'>История записей:</h2>
            <table className="record_table">
              <thead className='record_table_header'>
                <td className="record_table_id table_header_item">Номер</td>
                <td className="record_table_fio table_header_item">ФИО пациента:</td>
                <td className="record_table_time table_header_item">Дата / Время</td>
              </thead>
              <tbody className='record_table_body'>
                {patientListHistory.map((el) => {
                  const day = fromUnixTimeToHumanFormat(el.day);
                  return (
                    <tr className='record_table_row' key={el.id} onDoubleClick={() => onShowFullInfo(el)} title='Двойной клик для подробностей'>
                      <td className="record_table_id">{el.id}</td>
                      <td className="record_table_fio">{el.fio}</td>
                      <td className="record_table_time">{day}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>}

      </div>
    </>
  );
}
