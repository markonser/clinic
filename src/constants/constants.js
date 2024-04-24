export const INITIAL_FORM_VALUES = {
  login: '',
  password: '',
  role: '',
  fio: '',
  passport: '',
  phone: '',
  address: '',
  born: ''
};

export const USER_ROLES = {
  patient: 'patient',
  doctor: 'doctor',
  admin: 'admin'
};
export const USER_ROLES_RU = {
  patient: 'Пациент',
  doctor: 'Доктор',
  admin: 'Админ.'
};

export const START_OF_DAY = [0, 0, 0, 1];
export const END_OF_DAY = [23, 59, 59, 999];
// export const WORK_TIME_INTERVALS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
export const WORK_TIME_INTERVALS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];