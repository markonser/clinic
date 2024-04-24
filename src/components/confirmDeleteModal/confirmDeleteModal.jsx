import React from 'react';
import './confirmDeleteModal.css';

export default function ConfirmDeleteModal({id,onDelete, onClose}) {

  return (
    <div className='delete_modal'>
      <h2 className='h2'>Подтвердите удаление</h2>
      <button className='btn_default' type="button" onClick={() => onClose('')}>Закрыть</button>
      <button className='btn_default' type="button" onClick={() => onDelete(id)}>Удалить</button>
    </div>
  );
}
