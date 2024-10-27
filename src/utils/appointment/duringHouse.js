const isDuringWorkingHours = (date) => {
  const morningStartHour = 8; // 8:00 AM
  const morningEndHour = 12; // 12:00 PM
  const afternoonStartHour = 13; // 1:00 PM
  const afternoonStartMinute = 30; // 1:30 PM
  const afternoonEndHour = 17; // 5:00 PM
  const afternoonEndMinute = 30; // 5:30 PM
  const day = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

  // Check if the day is a weekday (Monday to Friday)
  const isWeekday = day >= 1 && day <= 5;

  // Check the hour and minute
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Morning hours check
  const isMorningHours = hours >= morningStartHour && hours < morningEndHour;

  // Afternoon hours check
  const isAfternoonHours =
    (hours === afternoonStartHour && minutes >= afternoonStartMinute) || // 1:30 PM onwards
    (hours > afternoonStartHour && hours < afternoonEndHour) || // Between 1:30 PM and 5:00 PM
    (hours === afternoonEndHour && minutes < afternoonEndMinute); // Up to 5:30 PM

  return isWeekday && (isMorningHours || isAfternoonHours);
};
export default isDuringWorkingHours;
