const isDuringWorkingHours = (date) => {
  const morningStartHour = 8; // 8:00 AM
  const morningEndHour = 10; // 10:00 AM
  const afternoonStartHour = 13; // 1:00 PM
  const afternoonEndHour = 15; // 3:00 PM
  const day = date.getDay(); // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy

  // Kiểm tra xem ngày có phải là ngày làm việc không (Thứ Hai đến Thứ Sáu)
  const isWeekday = day >= 1 && day <= 5;

  // Kiểm tra giờ
  const hours = date.getHours();
  const isMorningHours = hours >= morningStartHour && hours < morningEndHour;
  const isAfternoonHours =
    hours >= afternoonStartHour && hours < afternoonEndHour;

  return isWeekday && (isMorningHours || isAfternoonHours);
};
export default isDuringWorkingHours;
