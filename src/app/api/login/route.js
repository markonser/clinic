import {Users} from "@/db/models/user";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30;
const secret = process.env.JWT_SECRET;

export async function GET(req) {

  try {
    const res = await Users.findAll();
    if (res) {
      const users = res.map((el) => {
        const {password, ...user} = el.dataValues;
        return user;
      });
      return NextResponse.json({
        users: users
      }, {status: 200});
    }
    return NextResponse.json({
      message: `${res}`
    }, {status: 400});
  } catch (error) {
    return NextResponse.json({
      message: `${error}`
    }, {status: 500});
  }
}

export async function POST(req, res) {
  const body = await req.json();
  const {password: passUserInput, login} = body;
  try {
    const userDb = await Users.findOne({
      where: {
        login: login
      }
    });

    if (userDb) {
      const {password, id, fio, role, ...user} = userDb.dataValues;
      const match = await bcrypt.compare(passUserInput, password);

      if (match) {
        const token = sign({
          id, fio, role
        },
          secret,
          {
            expiresIn: MAX_AGE
          }
        );

        const serialized = serialize('token', token, {
          httpOnly: true,
          // secure:
          sameSite: 'strict',
          maxAge: MAX_AGE,
          path: '/'
        });

        return NextResponse.json({
          message: `Добрый день: ${userDb.fio}`,
          user: {
            id, fio, role
          }
        }, {
          status: 200,
          headers: {'Set-Cookie': serialized}
        });
      }
    }
    return NextResponse.json({
      message: `Пользователь не найден, проверьте логин или пароль.`
    }, {status: 401});
  } catch (error) {
    return NextResponse.json({
      message: `Ошибка: ${error}`
    }, {status: 500});
  }
}