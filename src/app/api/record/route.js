import {Records} from "@/db/models/records";
import {NextResponse} from "next/server";

export async function POST(req) {
  const body = await req.json();
console.log('=== body route.js [6] ===', body);
  try {
    const res = await Records.create(body);
    if (res) {
console.log('=== res record route.js [10] ===', res);
      return NextResponse.json({
        message: 'Запись сохранена'
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

export async function PUT(req) {
  const body = await req.json();
  const {id, ...rest} = body;

  try {
    const res = await Records.update(
      rest,
      {
        where: {
          id: id,
        },
      },
    );
    if (res) {
      return NextResponse.json({
        message: 'Запись сохранена'
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

