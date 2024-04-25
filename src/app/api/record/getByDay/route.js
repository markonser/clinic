import {Records} from "@/db/models/records";
import {NextResponse} from "next/server";
import {Op} from "sequelize";

export async function POST(req) {
  const body = await req.json();
  const {doctorId, dayRange, patientId} = body;
  console.log('=== body route.js [4] ===', body);

  //выбраны нет ДАТЫ + пациент + доктор
  if (dayRange.startDate < 0 && patientId && doctorId) {
    try {
      const res = await Records.findAll({
        where: {
          patientId: patientId,
          doctorId: doctorId
        }
      });
      if (res) {
        console.log('=== res !dayRange.startDate && +patientId && +doctorId----- ===', res.length);
        return NextResponse.json({
          message: 'Записи загружены', res
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
  //выбраны нет ДАТЫ + пациент - доктор
  if (dayRange.startDate < 0 && patientId && !doctorId) {
    try {
      const res = await Records.findAll({
        where: {
          patientId: patientId,
        }
      });
      if (res) {
        console.log('=== res !dayRange.startDate && patientId && !doctorId----- ===', res.length);
        return NextResponse.json({
          message: 'Записи загружены', res
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

  if (dayRange.startDate && !patientId && doctorId) {
    try {
      const res = await Records.findAll({
        where: {
          doctorId: doctorId,
          day: {
            [Op.between]: [dayRange.startDate, dayRange.endDate]
          }
        }
      });
      if (res) {
        console.log('=== res !patientId && doctorId----- ===', res.length);
        return NextResponse.json({
          message: 'Записи загружены', res
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
  //выбраны + ДАТa + пациент + доктор
  if (dayRange.startDate && patientId && doctorId) {
    try {
      const res = await Records.findAll({
        where: {
          // patientId: patientId,
          // doctorId: doctorId,
          [Op.or]: [{patientId: patientId}, {doctorId: doctorId}],
          day: {
            [Op.between]: [dayRange.startDate, dayRange.endDate]
          }
        }
      });
      if (res) {
        console.log('=== res patientId === true ++++++ ===', res.length);
        return NextResponse.json({
          message: 'Записи загружены', res
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

  if (dayRange.startDate && patientId && !doctorId) {
    try {
      const res = await Records.findAll({
        where: {
          patientId: patientId,
          day: {
            [Op.between]: [dayRange.startDate, dayRange.endDate]
          }
        }
      });
      if (res) {
        console.log('=== 122 res patientId && !doctorId ===', res.length);
        return NextResponse.json({
          message: 'Записи загружены', res
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


  console.log('=== что-то пошло не так( route.js [60] ===');
  return NextResponse.json({
    message: `что-то пошло не так(`
  }, {status: 500});
}