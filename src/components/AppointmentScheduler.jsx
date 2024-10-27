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
import isDuringWorkingHours from "../utils/appointment/duringHouse";
import AlertService from "../utils/AlterService";
import getMyTimeZone from "../utils/getMyTimeZone";
const AppointmentScheduler = ({ doctorId }) => {
  const navigation = useNavigation();
  const { userId, email, name } = useSelector((state) => state.profile);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onDayPress = (day) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const selectedDay = new Date(day.dateString);
    selectedDay.setHours(0, 0, 0, 0);
    if (selectedDay < currentDate) {
      AlertService.showErrorAlert("Ngày không thể nhỏ hơn ngày hiện tại!");
      return;
    } else {
      setSelectedDate(day.dateString);
      AlertService.showAnyAlert("Ngày đã chọn", day.dateString);
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
    setStartTime(date);
    hideStartPicker();
  };

  const handleEndConfirm = (date) => {
    setEndTime(date);
    hideEndPicker();
  };
  const handleConfirmDateAndTime = async () => {
    try {
      const dateParts = selectedDate.split("-");
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
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
      if (!isDuringWorkingHours(endDateTime)) {
        AlertService.showErrorAlertByType("workingHours");
        return;
      }
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

      Alert.alert("Success", "Taọ lịch hẹn thành công", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      AlertService.showErrorAlert("Đặt lịch hẹn thất bại");
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
            minimumDate={new Date(new Date().setHours(8, 0, 0, 0))}
            maximumDate={new Date(new Date().setHours(17, 30, 0, 0))}
          />

          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="time"
            onConfirm={handleEndConfirm}
            onCancel={hideEndPicker}
            is24Hour={true}
            minimumDate={new Date(startTime || new Date().setHours(8, 0, 0, 0))}
            maximumDate={new Date(new Date().setHours(17, 30, 0, 0))}
          />
        </View>
      </View>
      <VoucherSelector
        setSelectedVoucher={setSelectedVoucher}
        selectedVoucher={selectedVoucher}
      />
      {/* Time to work  */}
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
    padding: 20 * scaleWidth,
    backgroundColor: "#f9f9f9",
  },
  calendarContainer: {
    padding: 10 * scaleWidth,
    backgroundColor: "#fff",
    marginBottom: 5 * scaleHeight,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 10 * scaleWidth,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12 * scaleHeight,
    paddingHorizontal: 24 * scaleWidth,
    borderRadius: 8 * scaleWidth,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
  },
});

export default AppointmentScheduler;
