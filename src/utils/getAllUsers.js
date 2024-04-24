import axios from "axios";
import {NotificationManager} from "react-notifications";

export async function getAllUsers() {

  try {
    const res = await axios.get('/api/login');
    if (res) {
      return res.data.users;
    }
  } catch (error) {
    NotificationManager.error('Ошибка', 'Во время получения списка пользователей возникла ошибка.', 15000);
    console.log(error);
    return error;
  }

}