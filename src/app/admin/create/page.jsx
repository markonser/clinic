/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, {useContext, useState} from 'react';
import Link from 'next/link';
import './create.css';
import '../../styles/input.css';
import {UserContext} from '@/userContext/UserContext';
import Select from 'react-select';
import {DataContext} from '@/dataContext/DataContext';
import axios from 'axios';
import {WORK_TIME_INTERVALS} from '@/constants/constants';
import {checkInTimeInterval, convertTimeToUnix, fromUnixTimeToHumanFormat, getDayRange} from '@/utils/getLocalTimeForDisplay';
import {NotificationManager} from 'react-notifications';
import '@/components/printForm/printFormStyles.css';
import PrintForm from '@/components/printForm/DetailedForm.jsx';
import NewRecord from '@/components/newRecordModal/newRecord';


export default function Create() {
  const {userContextState} = useContext(UserContext);
  const {dataContextState} = useContext(DataContext);

  const [isShowCreateNewModal, setIsShowCreateNewModal] = useState(false);
  const [isShowChart, setIsShowChart] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [patientListHistory, setPatientListHistory] = useState([]);
  const [detailsForm, setDetailsForm] = useState('');
  const [inputDay, setInputDay] = useState('');
  const [patientSelect, setPatientSelect] = useState({value: '', label: ''});
  const [docSelect, setDocSelect] = useState({value: '', label: ''});
  const [recordsState, setRecordsState] = useState([]);
  const patientsSelectOptions = dataContextState?.patientsListStore.map(el => {return {value: el.id, label: el.fio};});
  const doctorSelectOptions = dataContextState?.doctorsListStore.map(el => {return {value: el.id, label: el.fio};});

  function onShowPrintForm(el) {
    setDetailsForm(el);
  }

  function onShowCreateNewModal(time) {
    if (!inputDay || !patientSelect?.value || !docSelect?.value) {
      NotificationManager.error('Ошибка', 'Все поля обязательны к заполнению', 5000);
      return;
    }
    setIsShowCreateNewModal(time);
  }

  function onShowHistory(el) {
    getUserRecords(el.patientId);
    setIsHistory(true);
  }

  function onDateTimeInputChange(value) {
    setInputDay(value);
    setRecordsState([]);
    setPatientListHistory([]);
    setIsShowChart(false);
  }

  function onDocWorkChartHandle() {
    setIsHistory(false);
    setRecordsState([]);
    setPatientListHistory([]);

    //выбраны нет ДАТЫ + пациент + доктор
    if (!inputDay && patientSelect?.value && docSelect?.value) {
      console.log('===  page.jsx [63] ===',);
      getRecByDay(false, docSelect?.value, patientSelect?.value);
      setIsHistory(true);
      return;
    }
    //выбраны нет ДАТЫ + пациент - доктор
    if (!inputDay && patientSelect?.value && !docSelect?.value) {
      console.log('===  page.jsx [70] ===',);
      getRecByDay(false, false, patientSelect?.value);
      setIsHistory(true);
      return;
    }
    //выбраны дата + пациент + доктор
    if (inputDay && patientSelect?.value && docSelect?.value) {
      console.log('===  page.jsx [77] ===',);
      getRecByDay(inputDay, docSelect?.value, patientSelect?.value);
      setIsHistory(false);
      setIsShowChart(true);
      return;
    }
    //выбраны дата + пациент - без доктора
    if (inputDay && patientSelect?.value && !docSelect?.value) {
      console.log('===  page.jsx [85] ===',);
      getRecByDay(inputDay, false, patientSelect?.value);
      setIsHistory(true);
      setIsShowChart(true);
      return;
    }
    //выбраны + дата - без пациента + доктор
    if (inputDay && !patientSelect?.value && docSelect?.value) {
      console.log('===  page.jsx [93] ===',);
      getRecByDay(inputDay, docSelect?.value, false);
      setIsHistory(false);
      setIsShowChart(true);
      return;
    }
  }
  async function getUserRecords(id) {
    setPatientListHistory([]);
    try {
      const res = await axios.get(`/api/record/${id}`);
      if (res) {
        setPatientListHistory(res.data.res);
      }
    } catch (error) {

    }
  }

  async function getRecByDay(day = false, doctorId = false, patientId = false) {
    const unixDay = convertTimeToUnix(day);
    const dayRange = getDayRange(unixDay, true);
    const data = {
      doctorId: doctorId,
      dayRange: dayRange,
      patientId: patientId
    };
    try {
      const res = await axios.post(`/api/record/getByDay`, data);
      if (res) {
        setPatientListHistory(res.data.res);
        setRecordsState(res.data.res);
        res.data.res.length === 0
          ? NotificationManager.info('Сообщение', 'По заданным параметрам нет записей', 5000)
          : '';
        return res.data.res;
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время получения данных возникла ошибка.', 15000);
    }
  }

  async function onQuickSave(day = false) {
    if (!inputDay || !patientSelect?.value || !docSelect?.value) {
      NotificationManager.info('Ошибка', 'Все поля обязательны к заполнению', 5000);
      return;
    }

    const data = {
      day: !!day ? convertTimeToUnix(day) : convertTimeToUnix(inputDay),
      patientId: patientSelect?.value,
      fio: patientSelect?.label,
      doctorId: docSelect?.value,
      doctorFio: docSelect?.label,
      adminFio: userContextState.fio
    };

    try {
      const res = await axios.post('/api/record', data);
      if (res) {
        console.log('===  page.jsx [155] ===',);
        NotificationManager.success('OK', 'Запись сохранена.', 5000);
        // getRecByDay(inputDay, docSelect?.value, false);
        onDocWorkChartHandle();
        setIsShowCreateNewModal(false);
        NotificationManager.info('Обновлен', `Список записи для ${docSelect?.label}`, 10000);
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время сохранения возникла ошибка.', 15000);
      console.log(error);
    }
  }

  function findPatientInTime(time) {
    const result = recordsState.find((el) => {
      if (el => el.isHistory === false || el.isHistory === null) {
        const inInterval = checkInTimeInterval(time, el.day);
        return inInterval ? el : false;
      }
    });
    return result;
  }

  return (
    <>
      <div className='page_content'>
        <h2 className='h2'>Создание записи на прием</h2>

        <form className='admin_create_form'>
          <div className='inputs_wrapper'>
            <label id='hintDate'>
              <div>Дата приема:</div>
              <input
                type="datetime-local"
                name="doctor_day"
                value={inputDay}
                onChange={(evt) => {setIsShowChart(false); onDateTimeInputChange(evt.target.value);}}
                step={"1800"}

              />
            </label>

            <label id='hintDoctorFio'>
              <div>ФИО врача:</div>
              <Select
                isSearchable
                isClearable
                className='doc_select'
                name='doctorFio'
                options={doctorSelectOptions}
                defaultValue={{value: '', label: '---'}}
                onChange={(newValue) => {
                  setRecordsState([]);
                  setDocSelect(newValue);
                  setPatientListHistory([]);
                  setIsShowChart(false);
                }}
                noOptionsMessage={() => 'не найдено'}
              />
            </label>

            <label >
              <div>ФИО пациента:</div>
              <Select
                isSearchable
                isClearable
                className='pat_select'
                name='fio'
                options={patientsSelectOptions}
                defaultValue={{value: '', label: '---'}}
                onChange={(newValue) => {
                  setPatientSelect(newValue);
                  setRecordsState([]);
                  setPatientListHistory([]);
                  setIsShowChart(false);
                }}
                noOptionsMessage={() => 'не найдено'}
              />
            </label>

          </div>
          <div className="create_form_btns">
            <button className='btn_default' type="button" onClick={onDocWorkChartHandle}>Показать / Обновить</button>
            {/* <button className='btn_default' type="button">Записи пациента</button> */}
            <Link href='/admin' className='btn_default'>На главную</Link>
            <button className='btn_default' type="button" id='makeRecordBTN'
              title="Сохраняет запись на указанную дату и время"
              onClick={() => onQuickSave()}
            >Записать пациента</button>
          </div>
        </form>

        {isShowChart && inputDay && docSelect?.value &&
          <>
            <h2 className='h2'>График работы врачей</h2>
            <table className="record_table">
              <thead>
                <tr className='record_table_header' >
                  <td className="record_table_id table_header_item">Время врача</td>
                  <td className="record_table_fio table_header_item">ФИО врача</td>
                  <td className="record_table_fio table_header_item">ФИО пациента</td>
                  <td className="record_table_time table_header_item">Время записи</td>
                </tr>
              </thead>
              <tbody className='record_table_body'>
                {WORK_TIME_INTERVALS.map((time => {
                  const record = findPatientInTime(time);
                  if (record) {
                    const day = fromUnixTimeToHumanFormat(record.day).slice(-5);
                    return (
                      <tr className='record_table_row' key={record.id} onDoubleClick={() => onShowHistory(record)} title='Двойной клик для подробностей'>
                        <td className="record_table_id">{time}</td>
                        <td className="record_table_fio">{record.doctorFio}</td>
                        <td className="record_table_fio">{record.fio}</td>
                        <td className="record_table_time">{day}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr className='record_table_row' key={time} onDoubleClick={() => onShowCreateNewModal(time)}>
                        <td className="record_table_id">{time}</td>
                        <td className="record_table_fio"></td>
                        <td className="record_table_fio"></td>
                        <td className="record_table_time"></td>
                      </tr>
                    );
                  }
                }
                ))}
              </tbody>
            </table>
          </>
        }

        {/* {isHistory && !!patientListHistory?.length &&
          <>
            <h2 className='h2'>Все записи пациента:</h2>
            <table className="record_table">
              <thead>
                <tr className='record_table_header' >
                  <td className="record_table_id table_header_item">Номер записи</td>
                  <td className="record_table_fio table_header_item">ФИО врача</td>
                  <td className="record_table_fio table_header_item">ФИО пациента</td>
                  <td className="record_table_time table_header_item">Дата / Время</td>
                </tr>
              </thead>
              <tbody className='record_table_body'>
                {recordsState?.map((el) => {
                  const day = fromUnixTimeToHumanFormat(el.day);
                  return (
                    <tr className='record_table_row' key={el.id} onDoubleClick={() => onShowPrintForm(el)} title='Двойной клик для подробностей'>
                      <td className="record_table_id">{el.id}</td>
                      <td className="record_table_fio">{el.doctorFio}</td>
                      <td className="record_table_fio">{el.fio}</td>
                      <td className="record_table_time">{day}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        } */}
        {isHistory && !!patientListHistory?.length &&
          <>
            <h2 className='h2'>Все записи пациента:</h2>
            <table className="record_table">
              <thead>
                <tr className='record_table_header' >
                  <td className="record_table_id table_header_item">Номер записи</td>
                  <td className="record_table_fio table_header_item">ФИО врача</td>
                  <td className="record_table_fio table_header_item">ФИО пациента</td>
                  <td className="record_table_time table_header_item">Дата / Время</td>
                </tr>
              </thead>
              <tbody className='record_table_body'>
                {patientListHistory?.map((el) => {
                  const day = fromUnixTimeToHumanFormat(el.day);
                  return (
                    <tr className={`record_table_row ${el.isHistory ? 'inHistory' : ''}`}
                      key={el.id}
                      onDoubleClick={() => onShowPrintForm(el)}
                      title='Двойной клик для подробностей'
                    >
                      <td className="record_table_id">{el.id}</td>
                      <td className="record_table_fio">{el.doctorFio}</td>
                      <td className="record_table_fio">{el.fio}</td>
                      <td className="record_table_time">{day}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        }

        {detailsForm?.id && <PrintForm
          el={detailsForm}
          onClose={setDetailsForm}
          patientsSelectOptions={patientsSelectOptions}
          doctorSelectOptions={doctorSelectOptions}
        />}

        {isShowCreateNewModal &&
          <NewRecord
            doctor={docSelect}
            patient={patientSelect}
            inputTime={inputDay}
            timeInChart={isShowCreateNewModal}
            onClose={setIsShowCreateNewModal}
            onSave={onQuickSave}
          />}

      </div>
    </>
  );
}
