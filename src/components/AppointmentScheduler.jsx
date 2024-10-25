import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scaleWidth, scaleHeight } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import bookAppointment from "../utils/appointment/bookAppointment";
import { useNavigation } from "@react-navigation/native";
import VoucherSelector from "./VoucherSelector";
import FullScreenLoading from "./FulllScreenLoading";
import isDuringWorkingHours from "../utils/appointment/DuringHouse";
import AlertService from "../utils/AlterService";
const AppointmentScheduler = ({ doctorId }) => {
  // console.log(doctorId);
  // const { doctorId, userId, startTime, endTime } = req.body;
  const navigation = useNavigation();

  const { userId, email, name } = useSelector((state) => state.profile);
  // console.log("userId, email, name", userId, email, name);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onDayPress = (day) => {
    const currentDate = new Date(); // Ngày hiện tại
    currentDate.setHours(0, 0, 0, 0);
    const selectedDay = new Date(day.dateString);
    selectedDay.setHours(0, 0, 0, 0); // Ngày được chọn
    // Kiểm tra nếu ngày chọn nhỏ hơn ngày hiện tại
    if (selectedDay < currentDate) {
      // Alert.alert("Thất bại", "Ngày không thể nhỏ hơn ngày hiện tại!");
      AlertService.showErrorAlert("Ngày không thể nhỏ hơn ngày hiện tại!");
      return;
    } else {
      setSelectedDate(day.dateString);
      AlertService.showAnyAlert("Ngày đã chọn", day.dateString);
      // Alert.alert("Ngày đã chọn", day.dateString);
    }
  };
  const showStartPicker = () => {
    setStartPickerVisibility(true);
  };

  const showEndPicker = () => {
    setEndPickerVisibility(true);
  };

  const hideStartPicker = () => {
    setStartPickerVisibility(false);
  };

  const hideEndPicker = () => {
    setEndPickerVisibility(false);
  };

  const handleStartConfirm = (date) => {
    // if (endTime <= date) {
    //   Alert.alert("Lỗi", "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!");
    //   return;
    // }
    setStartTime(date);
    hideStartPicker();
  };

  const handleEndConfirm = (date) => {
    // const threeHoursLater = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);
    // if (date <= threeHoursLater) {
    //   Alert.alert("Lỗi", "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!");
    //   return;
    // } else {
    //   setEndTime(date);
    //   hideEndPicker();
    // }
    setEndTime(date);
    hideEndPicker();
  };
  const handleConfirmDateAndTime = async () => {
    try {
      const dateParts = selectedDate.split("-"); // Tách thành mảng ngày tháng năm
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Tháng bắt đầu từ 0
      const day = parseInt(dateParts[2], 10);

      // Thiết lập thời gian bắt đầu
      const startDateTime = new Date(
        year,
        month,
        day,
        startTime.getHours(),
        startTime.getMinutes()
      );
      if (!isDuringWorkingHours(startDateTime)) {
        AlertService.showErrorAlertByType("workingHours");
        // Alert.alert(
        //   "Lỗi",
        //   "Giờ làm việc \nBuổi sáng: 8:00 - 12:00\nBuổi chiều: 13:00 - 17:00\nNgày làm việc: Thứ Hai đến Thứ Sáu"
        // );
        return;
      }
      // Thiết lập thời gian kết thúc
      const endDateTime = new Date(
        year,
        month,
        day,
        endTime.getHours(),
        endTime.getMinutes()
      );
      const branch_id = null;

      setIsLoading(true);
      const data = await bookAppointment({
        doctorId,
        userId,
        email,
        startTime: startDateTime,
        endTime: endDateTime,
        branch_id,
        phone: null,
        specialist_id: null,
        voucher_code: selectedVoucher?.voucher_code,
      });
      Alert.alert("Đặt hàng", "Taọ lịch hẹn thành công", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
      // AlertService.showConfirmationAlert(
      //   "Đặt hàng",
      // )
      console.log("VoucherSeletec", selectedVoucher);
    } catch (error) {
      console.log("Lỗi : ", error.message);
      AlertService.showErrorAlert("Đặt lịch hẹn thất bại");
      // Alert.alert("Lỗi", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <FullScreenLoading visible={isLoading} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          <Icon name="calendar" size={30} color="#000" />
          <Text style={styles.title}>Appointment</Text>
        </View>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
        <Text style={styles.selectedDateText}>
          Ngày đã chọn: {selectedDate}
        </Text>
        <View>
          <Button title="Chọn Thời Gian Bắt Đầu" onPress={showStartPicker} />
          <Text>Thời gian bắt đầu: {startTime.toLocaleTimeString()}</Text>

          <Button title="Chọn Thời Gian Kết Thúc" onPress={showEndPicker} />
          <Text>Thời gian kết thúc: {endTime.toLocaleTimeString()}</Text>

          <DateTimePickerModal
            isVisible={isStartPickerVisible}
            mode="time"
            onConfirm={handleStartConfirm}
            onCancel={hideStartPicker}
            is24Hour={true}
          />

          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="time"
            onConfirm={handleEndConfirm}
            onCancel={hideEndPicker}
            is24Hour={true}
          />
        </View>
      </View>
      <VoucherSelector
        setSelectedVoucher={setSelectedVoucher}
        selectedVoucher={selectedVoucher}
      />
      {/* comment here */}
      {/* <View style={styles.workingHoursContainer}>
        <View style={styles.header}>
          <Icon name="time" size={30} color="#000" />
          <Text style={styles.title}>Giờ làm việc</Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeRow}>
            <Text>Thứ 2- Thứ 6 </Text>
            <Text>09:00 - 17:30</Text>
          </View>
          <View style={styles.timeRow}>
            <Text>Thứ 7 </Text>
            <Text>09:00 - 12:30</Text>
          </View>
        </View>
      </View> */}
      <Pressable style={styles.button} onPress={handleConfirmDateAndTime}>
        <Text style={styles.buttonText}>Đặt lịch</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  calendarContainer: {
    padding: 10,
    marginBottom: 5 * scaleHeight,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // workingHoursContainer: {
  //   padding: 10,
  //   backgroundColor: "#ffffff",
  //   borderRadius: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 10,
    justifyContent: "center",
  },
  // timeContainer: {
  //   padding: 15,
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  // timeRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingVertical: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  // },
  button: {
    backgroundColor: "#007BFF", // Màu nền
    paddingVertical: 12, // Khoảng cách dọc
    paddingHorizontal: 24, // Khoảng cách ngang
    borderRadius: 8, // Bán kính góc
    elevation: 2, // Đổ bóng trên Android
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Vị trí bóng
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 4, // Độ lan tỏa của bóng
    alignItems: "center", // Căn giữa nội dung
  },
  buttonText: {
    color: "#FFFFFF", // Màu chữ
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Đậm
  },
});

export default AppointmentScheduler;
