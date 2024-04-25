import React from 'react';
import './newRecord.css';

export default function NewRecord({doctor, patient, timeInChart, onClose, onSave, inputTime}) {
  const date = inputTime.split(/[\s-T]+/);

  function onSaveClick() {
    const finishTime = `${date[0]}-${date[1]}-${date[2]}T${timeInChart}`;
    onSave(finishTime);
  }
  return (
    <div className='create_new_modal'>
      <h2 className="h2">Создать новую запись?</h2>
      <div>
        <p>Дата: <b>{date[2]}.{date[1]}.{date[0]}</b> на <b>{timeInChart}</b></p>
        <p>Пациент: <b>{patient.label}</b></p>
        <p>Врач: <b>{doctor.label}</b></p>
      </div>
      <button className='btn_default' type="button" onClick={onSaveClick}>ДА</button>
      <button className='btn_default' type="button" onClick={() => onClose('')}>Закрыть</button>
    </div>
  );
}
