import axios from "axios";
import {NotificationManager} from "react-notifications";

export async function getOneUser(text) {

  try {
    const res = await axios.get('/api/login', {params: {fio: text}});
    if (res) {
      return res.data.users;
    }
  } catch (error) {
    NotificationManager.error('Ошибка', 'Во время поиска пользователя возникла ошибка.', 15000);
    console.log(error);
    return error;
  }

}