import {Users} from "@/db/models/user";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const salt = bcrypt.genSaltSync(10);
  const initialData = await req.json();

  const {id, login, password, role, ...restData} = initialData;
  if (!login || !password || !role) {
    return NextResponse.json({
      message: `Поля: логин, пароль и тип пользователя обязательны.`
    }, {status: 400});
  }
  try {
    const hashPass = bcrypt.hashSync(password, salt);

    const isUserDb = await Users.findOne({
      where: {
        login: login
      }
    });
    if (isUserDb) {
      return NextResponse.json({
        message: `Пользователь с логином: ${isUserDb.login} уже существует.`
      }, {status: 409});
    }

    const res = await Users.create({login, role, password: hashPass, ...restData});
    if (res) {
      return NextResponse.json({
        message: `Запись сохранена под номером: ${res.id}`
      }, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({
      message: "ERROR",
      error: error
    }, {status: 500});
  }
}

export async function PUT(req, res) {
  const salt = bcrypt.genSaltSync(10);
  const initialData = await req.json();

  const {id, login, password, role, ...restData} = initialData;
  if (!login || !role) {
    return NextResponse.json({
      message: `Поля: логин и тип пользователя обязательны.`
    }, {status: 400});
  }
  const hashPass = password ? bcrypt.hashSync(password, salt) : null;

  try {
    const res = password && hashPass
      ? Users.update({login, role, password: hashPass, ...restData}, {
        where: {
          id: id
        }
      })
      : Users.update({login, role, ...restData}, {
        where: {
          id: id
        }
      });

    if (res) {
      return NextResponse.json({
        message: `Новые данные пользователя сохранены.`
      }, {status: 200});
    }

  } catch (error) {
    return NextResponse.json({
      message: "ERROR",
      error: error
    }, {status: 500});
  }
}