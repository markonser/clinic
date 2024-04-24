import {Users} from "@/db/models/user";
import {NextResponse} from "next/server";

export async function DELETE(req) {
  const idUrl = await req.nextUrl.pathname.split('/');
  const id = idUrl[3];

  try {
    const res = await Users.destroy({
      where: {
        id: id
      }
    });
    if (res) {
      return NextResponse.json({
        message: `Пользователь c id: ${id} удален успешно`
      }, {status: 200});
    }
  } catch (error) {
    if (res) {
      return NextResponse.json({
        message: `Ошибка удаления.`
      }, {status: 500});
    }
  }
}