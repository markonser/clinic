'use client';
import React, {useContext, useState} from 'react';
import './printForm.css';
import {UserContext} from '@/userContext/UserContext';
import {DataContext} from '@/dataContext/DataContext';
import {USER_ROLES} from '@/constants/constants';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {convertTimeToUnix, getLocalTimeFromUnixToDayTimeInput} from '@/utils/getLocalTimeForDisplay.js';
import Select from 'react-select';
import ConfirmDeleteModal from '../confirmDeleteModal/confirmDeleteModal';

export default function PrintForm({el, onClose, needUpdate = () => { }, patientsSelectOptions = [], doctorSelectOptions = []}) {
  const {userContextState} = useContext(UserContext);
  const {dataContextState, setDataContextState} = useContext(DataContext);
  const [formItems, setFormItems] = useState(el);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [fioValue, setFioValue] = useState({value: el.doctorFio, label: el.doctorFio});
  const [dayISO, setDayISO] = useState(getLocalTimeFromUnixToDayTimeInput(formItems.day).slice(0, 16));

  function onFormChange(evt) {
    if (evt.target.name === 'doctorDay') {
      setFormItems({...formItems, ['doctorDay']: evt.target.value});
      setDayISO(evt.target.value);
      return;
    }
    if (evt.target.name === 'isHistory') {
      setFormItems({...formItems, ['isHistory']: !formItems.isHistory});
      return;
    }
    setFormItems({...formItems, [evt.target.name]: evt.target.value});
  }

  async function onSaveFormChanges() {
    const {doctorDay, day, doctorFio, ...rest} = formItems;
    const unixDayFormat = convertTimeToUnix(dayISO);
    const body = {
      id: el.id,
      day: unixDayFormat,
      adminFio: userContextState.role === USER_ROLES.admin ? useContext.fio : '',
      doctorFio: doctorFio,
      ...rest
    };
    try {
      const res = await axios.put('/api/record', body);
      if (res) {
        NotificationManager.success('Сообщение.', 'Изменения сохранены', 5000);
        setConfirmDelete('');
        needUpdate((prev) => prev += 1);
        onClose('');
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время сохранения возникла ошибка.', 15000);
      console.log(error);
    }
  }
  async function onDelete(id) {
    try {
      const res = await axios.delete(`/api/record/${id}`);
      NotificationManager.success('Сообщение.', res.data.message, 5000);
      needUpdate((prev) => prev += 1);
      onClose('');
    } catch (error) {
      NotificationManager.error('Ошибка', 'Во время удаления возникла ошибка.', 15000);
      console.log(error);
    }
  }
  function fake(e) { }
  return (
    <div className="modal">
      <div className="modal_content">

        <h2 className='modal_title h2'>Квитанция для записи №
          <input type="text" name="id" disabled id='print_form_id' value={formItems.id} onChange={fake} />
        </h2>

        <form className="modal_form"
          onChange={(evt) => onFormChange(evt)}
        >
          <label>
            <div>Дата приема:</div>
            <input
              type="datetime-local"
              name="doctorDay"
              value={dayISO}
              onChange={(evt) => onFormChange(evt)}
              disabled={userContextState.role === USER_ROLES.patient}
            />
          </label>
          <label>
            <div>ФИО пациента:</div>
            <input type="text" name="fio" onChange={fake} value={formItems.fio} disabled />
          </label>

          <label>
            <div>ФИО врача:</div>
            <Select
              isClearable
              isDisabled={userContextState.role === USER_ROLES.admin ? false : true}
              className='pat_select'
              name='doctorFio'
              options={doctorSelectOptions}
              defaultValue={{value: fioValue.label, label: fioValue.label}}
              onChange={(newValue) => setFioValue(newValue)}
            />
          </label>
          <label>
            {userContextState?.role === USER_ROLES.admin && (
              <>
                <div> ФИО администратора:</div>
                <input type="text" name="adminFio" onChange={fake} value={userContextState.fio} />
              </>
            )}
          </label>

          <label className='services'>
            <div>Оказанные услуги:</div>
            <textarea name="services" rows={5} onChange={fake} value={formItems.services || ''} />
          </label>
          <label className='services'>
            <div>Заметки врача:</div>
            <textarea name="doctorNotes" rows={5} onChange={fake} value={formItems.doctorNotes || ''} />
          </label>

          <label className='money'>
            <div>Сумма:</div>
            <input type="text" name="money" onChange={fake} value={formItems.money} />
          </label>
          {userContextState.role !== USER_ROLES.patient &&
            <>
              <div className='stamp_area'>м.п.</div>
              <label className='history_title'>
                <input type="checkbox" name="isHistory" checked={formItems.isHistory} onChange={fake} /> Отметить как ВЫПОЛНЕН и перенести в историю
              </label>
            </>
          }
          <div className="printForm_action_btn_wrapper">
            {userContextState.role !== USER_ROLES.patient &&
              <button button className='btn_default' type="button" onClick={onSaveFormChanges}>Сохранить изменения</button>
            }
            <button className='btn_default' type="button" onClick={() => onClose('')}>Закрыть</button>
            {userContextState.role !== USER_ROLES.patient &&
              <button className='btn_default' type="button" onClick={() => setConfirmDelete(el.id)}>Удалить запись</button>
            }
          </div>
        </form>
        {confirmDelete && <ConfirmDeleteModal
          id={el.id}
          onDelete={onDelete}
          onClose={setConfirmDelete}
        />}
      </div>
    </div>
  );
}
