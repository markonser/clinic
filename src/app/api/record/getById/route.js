import {Records} from "@/db/models/records";
import {NextResponse} from "next/server";
import {Op} from "sequelize";

export async function POST(req) {
  const body = await req.json();
  const {day, fio, doctorId, isHistorySearchFlag} = body;

  try {
    // получение ВСЕХ пациентов в указанную дату
    if (fio === '' && isHistorySearchFlag === false) {
      const res = await Records.findAll({
        where: {
          doctorId: doctorId,
          isHistory: {
            [Op.or]: [0, false, null],
          },
          day: {
            [Op.between]: [day.startDate, day.endDate]
          }
        }
      });
      if (res) {
        return NextResponse.json({
          message: 'Записи загружены', res
        }, {status: 200});
      }
      return NextResponse.json({
        message: `${res}`
      }, {status: 400});
    }

  } catch (error) {
    return NextResponse.json({
      message: `${error}`
    }, {status: 500});
  }
}

// export async function PUT(req) { }

// export async function DELETE(req) { }