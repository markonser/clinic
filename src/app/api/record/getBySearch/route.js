import {Records} from "@/db/models/records";
import {NextResponse} from "next/server";
import {Op} from "sequelize";

export async function POST(req) {
  const body = await req.json();
  const {day, fio, doctorId, isHistorySearchFlag} = body;
  console.log(body);
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
      console.log('=========RES===fio---- ==========', res);
      if (res) {
        return NextResponse.json({
          message: 'Записи загружены', res
        }, {status: 200});
      }
      return NextResponse.json({
        message: `${res}`
      }, {status: 400});
    }
    // получение конкретной фио на указанную дату
    if (fio !== '' && isHistorySearchFlag === false) {
      const res = await Records.findAll({
        where: {
          doctorId: doctorId,
          isHistory: {
            [Op.or]: [0, false, null],
          },
          fio: {
            [Op.like]: `%${fio}%`,
          },
          day: {
            [Op.between]: [day.startDate, day.endDate]
          }
        }
      });
      console.log('=========RES====fio+++++======', res);
      if (res) {
        return NextResponse.json({
          message: `Записи загружены для ${fio}`, res
        }, {status: 200});
      }
    }
    // получение ИСТОРИИ конкретной фио без учета даты
    if (fio !== '' && isHistorySearchFlag === true) {
      const res = await Records.findAll({
        where: {
          doctorId: doctorId,
          fio: {
            [Op.like]: `%${fio}%`,
          },
        },
        limit: 100
      });
      console.log('=========RES====fio+++++ history======', res);
      if (res) {
        return NextResponse.json({
          message: `Загружена история для ${fio}`, res
        }, {status: 200});
      }
      return NextResponse.json({
        message: `${res}`
      }, {status: 400});
    }

  } catch (error) {
    console.log('=== error route.js [81] ===', error);
    return NextResponse.json({
      message: `${error}`
    }, {status: 500});
  }
}

// export async function PUT(req) { }

// export async function DELETE(req) { }