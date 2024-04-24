import {Records} from "@/db/models/records";
import {NextResponse} from "next/server";

export async function GET(req) {
  const idUrl = await req.nextUrl.pathname.split('/');
  const id = idUrl[3];
console.log('=== [id] route.js [7] ===', id);
  try {
    const res = await Records.findAll({
      where: {
        patientId: id
      },
      order: [['day', 'DESC']]
    });
    if (res) {
      return NextResponse.json({
        res
      }, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({
      message: error
    }, {status: 500});
  }
}
export async function DELETE(req) {
  const idUrl = await req.nextUrl.pathname.split('/');
  const id = idUrl[3];

  try {
    const res = await Records.destroy({
      where: {
        id: id
      }
    });
    if (res) {
      return NextResponse.json({
        message: `Запись c id: ${id} удалена успешно`
      }, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({
      message: error
    }, {status: 500});
  }
}