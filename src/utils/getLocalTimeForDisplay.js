import {END_OF_DAY, START_OF_DAY} from "@/constants/constants";

const dateOptions = {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  // timeZone: 'Europe/Moscow',
  timeZone: 'Asia/Krasnoyarsk',
};

// day: 'numeric' or '2-digit';
// weekday: 'narrow', 'short', or 'long';
// year: 'numeric' or '2-digit';
// month: 'numeric', '2-digit', 'narrow', 'short', or 'long';
// hour: 'numeric' or '2-digit';
// minute: 'numeric' or '2-digit';
// second: 'numeric' or '2-digit'

export function getDayRange(day, isUnixTime = false) {
  if (isUnixTime) {
    return {
      startDate: Math.round(new Date(new Date(day * 1000).setHours(...START_OF_DAY)).getTime() / 1000.0),
      endDate: Math.round(new Date(new Date(day * 1000).setHours(...END_OF_DAY)).getTime() / 1000.0),
    };
  }
  return {
    startDate: Math.round(new Date(new Date(day).setHours(...START_OF_DAY)).getTime() / 1000.0),
    endDate: Math.round(new Date(new Date(day).setHours(...END_OF_DAY)).getTime() / 1000.0),
  };
}

export function getLocalTimeFromUnixToDayTimeInput(inDate) {
  let date = new Date(inDate * 1000); // Or the date you'd like converted.
  let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString('ru-RU', dateOptions);
  return isoDateTime;
}

export function fromUnixTimeToHumanFormat(inDate, options = dateOptions) {
  return new Date(inDate * 1000).toLocaleDateString('ru-RU', options);
}
export function fromUnixTimeToDateOnly(inDate, options = dateOptions) {
  const tmp = new Date(inDate * 1000).toLocaleDateString('ru-RU').split('.');
  return `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
}

export function convertTimeToUnix(inDate) {
  return Math.round(new Date(inDate).getTime() / 1000.0);
}

export function checkInTimeInterval(interval, currentValue) {
  const intervalArr = interval.split(':');
  const currTmpArr = new Date(currentValue * 1000).toLocaleDateString('ru-RU', dateOptions).slice(-5).split(':');
  const checkHours = intervalArr[0] === currTmpArr[0];
  currTmpArr[1] >= 30 ? currTmpArr[1] = '30' : currTmpArr[1] = '00';
  const checkMinutes = intervalArr[1] === currTmpArr[1];
  return checkHours && checkMinutes;
}

// const makeTimes = (interval, elapsedTimeMin) => {
//   const deltaTimeMin = Math.ceil(elapsedTimeMin / 30) * 30;
//   const startTime = new Date(interval.start);
//   const endTime = new Date(interval.end);
//   if (startTime.getSeconds() > 0) {
//     startTime.setSeconds(60);
//   }
//   startTime.setMinutes(Math.ceil(startTime.getMinutes() / 30) * 30);
//   const result = [];
//   while (startTime <= endTime) {
//     result.push(startTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}));
//     startTime.setMinutes(startTime.getMinutes() + deltaTimeMin);
//   }
//   return result;
// };

// makeTimes({start: 'Tue Aug 30 2022 09:00:00', end: 'Tue Aug 30 2022 16:30:00'}, 20);
// // Array(16) [ "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", … ]

// makeTimes({start: 'Tue Aug 30 2022 09:00:00', end: 'Tue Aug 30 2022 16:30:00'}, 40);
// // Array(8) [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00" ]