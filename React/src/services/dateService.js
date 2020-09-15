import logger from "sabio-debug";
import moment from "moment";

const _logger = logger.extend("DateService");

const formatDate = (utcDate) => {
  if (utcDate) {
    let date = new Date(Date.parse(utcDate));
    let day = date.toLocaleString("en-us", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return day;
  } else {
    return "Invalid Date";
  }
};

const formatDateMonth = (utcDate) => {
  if (utcDate) {
    let date = new Date(Date.parse(utcDate));
    let day = date.toLocaleString("en-us", {
      month: "short",
      year: "numeric",
    });
    return day;
  } else {
    return "Invalid Date";
  }
};

const formatDateTime = (utcDate) => {
  if (utcDate) {
    let date = new Date(Date.parse(utcDate));
    let day = date.toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return day;
  } else {
    return "Invalid Date";
  }
};

const formatTime = (utcDate) => {
  let time = "Invalid Date";
  if (utcDate) {
    let date = new Date(Date.parse(utcDate));
    time = date.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return time;
};

const formatISOTime = (utcDate) => {
  _logger(utcDate);
  let time = "Invalid Date";
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  if (utcDate) {
    let date = new Date(Date.now() - timeZoneOffset);
    _logger(date);
    time = date.toISOString().slice(0, 16);
  }
  return time;
};

const convertToRegularTime = (militaryTime) => {
  if (typeof militaryTime === "string") {
    const hourMinuteArray = militaryTime.split(":");
    const minutes = hourMinuteArray[1];
    const hour = hourMinuteArray[0] % 12;
    let midday = "AM";
    if (hourMinuteArray[0] / 12 > 1) {
      midday = "PM";
    }
    let regularTime = `${hour}:${minutes} ${midday}`;
    return regularTime;
  }
  return militaryTime;
};

const convertToHour = (minutes) => {
  let time = `Invalid Input`;
  if (Number.isInteger(minutes)) {
    let minMod = minutes % 60;
    let formatMin = minMod < 10 ? "0" + minMod : minMod;
    time = `${Math.floor(minutes / 60)}:${formatMin}`;
  }
  return time;
};

const verifyDateOrder = (begin, end) => {
  let beginDate = new Date(begin);
  let endDate = new Date(end);
  let result = false;
  if (endDate > beginDate) {
    result = true;
  } else if (+endDate === +beginDate) {
    result = "same day";
  }
  return result;
};

const addDays = (date, days) => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + days);

  const DD = newDate.getDate();
  const MM = newDate.getMonth() + 1;
  const YYYY = newDate.getFullYear();
  const HH = newDate.getHours();
  const mm = newDate.getMinutes();

  return `${MM}/${DD}/${YYYY} ${HH}:${mm}`;
};

const getCurrentMilitaryTime = () => {
  const date = new Date();
  // _logger('military time',date)
  const militaryTime = `${addZeros(date.getHours())}:${addZeros(
    date.getMinutes()
  )}`;

  return militaryTime;
};

const getCurrentDate = () => {
  const date = new Date();
  // _logger('current date',date)
  const yearMonthDate = `${date.getFullYear()}-${addZeros(
    date.getMonth() + 1
  )}-${addZeros(date.getDate())}`;
  // _logger(yearMonthDate)
  return yearMonthDate;
};

const addZeros = (time) => {
  let timeWithZeroes = "";
  if (time < 10) {
    timeWithZeroes = `0${time}`;
  } else {
    timeWithZeroes = time;
  }

  return timeWithZeroes;
};

const lastSevenDays = () => {
  let days = [
    moment().subtract(7, "day").format("ddd DD"),
    moment().subtract(6, "day").format("ddd DD"),
    moment().subtract(5, "day").format("ddd DD"),
    moment().subtract(4, "day").format("ddd DD"),
    moment().subtract(3, "day").format("ddd DD"),
    moment().subtract(2, "day").format("ddd DD"),
    moment().subtract(1, "day").format("ddd DD"),
  ];
  return days;
};
const formatDateDay = (utcDate) => {
  if (utcDate) {
    let day = moment(utcDate).format("ddd DD");
    return day;
  } else {
    return "Invalid Date";
  }
};
const lastThreeMonths = () => {
  let months = moment().subtract(3, "month").format("YYYY-MM-DD");
  return months;
};
const currentMonth = () => {
  let month = moment().format("MMMM");
  return month;
};
const currentDayN = () => {
  let day = moment().format("DD");
  return day;
};
const currentDayS = () => {
  let day = moment().format("dddd");
  return day;
};
const currentTime = () => {
  let time = moment().format("h:mm");
  return time;
};
const currentAmPm = () => {
  let amPm = moment().format("a");
  return amPm;
};
export {
  formatDate,
  formatDateMonth,
  formatDateTime,
  formatDateDay,
  formatTime,
  formatISOTime,
  convertToHour,
  convertToRegularTime,
  verifyDateOrder,
  addDays,
  getCurrentMilitaryTime,
  getCurrentDate,
  lastSevenDays,
  lastThreeMonths,
  currentMonth,
  currentDayN,
  currentDayS,
  currentTime,
  currentAmPm,
};
