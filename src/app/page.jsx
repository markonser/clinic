/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {useRef} from "react";
import "./page.css";
import "./styles/input.css";
import axios from "axios";
import {USER_ROLES} from "@/constants/constants";
import {useRouter} from "next/navigation";
import Header from "@/components/header/header";
import {NotificationManager} from "react-notifications";

export default function Login() {
  const router = useRouter();
  const login = useRef();
  const password = useRef();

  async function onLogin() {
    try {
      const res = await axios.post('/api/login', {
        login: login.current.value,
        password: password.current.value,
      });
      if (res) {
        const role = res.data.user.role;
        if (role === USER_ROLES.admin) router.push('/admin');
        if (role === USER_ROLES.doctor) router.push('/doctor');
        if (role === USER_ROLES.patient) router.push('/patient');
      }
    } catch (error) {
      NotificationManager.error('Ошибка', 'Проверьте логин или пароль.', 5000);
      console.log(error);
    }
  }

  return (
    <><Header />
      <main className={'main_page'}>
        <h2 className="h2">Авторизация</h2>
        <h3 className="h3">Добро пожаловать</h3>
        <form className="ath_form">
          <label className="label">
            Логин:
            <input
              type="text"
              id="username"
              name="username"
              ref={login}
            />
          </label>
          <label className="label">
            Пароль:
            <input
              type="password"
              id="password"
              name="password"
              ref={password}
            />
          </label>
          <input
            className="btn_default login_btn"
            type="button"
            value="Войти"
            onClick={onLogin}
          />
        </form>
      </main>
    </>
  );
}
