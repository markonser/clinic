import {USER_ROLES} from "@/constants/constants";
import axios from "axios";

export async function getInitialLoadInfo() {
  const res = await axios.get('/api/login');
  const docTMP = [];
  const patTMP = [];
  const admTMP = [];
  if (res) {
    res.data.users.forEach(el => {
      if (el.role === USER_ROLES.doctor) {
        docTMP.push(el);
      }
      if (el.role === USER_ROLES.admin) {
        admTMP.push(el);
      }
      if (el.role === USER_ROLES.patient) {
        patTMP.push(el);
      }
    });
  }
  return {docTMP, patTMP, admTMP};
}