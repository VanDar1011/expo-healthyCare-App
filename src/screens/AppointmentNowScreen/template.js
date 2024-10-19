import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import fetchDoctorGroup from "../../utils/doctorgroup/fetchDoctorGroup";
import RNPickerSelect from "react-native-picker-select";
import Postion from "../../components/Position";
const AppointmentForm = () => {
  const { userId, email, name } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: "",
    date: new Date(),
    time: new Date(),
  });
  // const [showDatePicker, setShowDatePicker] = useState(true); // Mặc định bật DatePicker
  // const [showTimePicker, setShowTimePicker] = useState(true); // Mặc định bật TimePicker
  const [departments, setDoctorGroups] = useState([]);
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    handleInputChange("date", currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || formData.time;
    handleInputChange("time", currentTime);
  };

  const handleSubmit = () => {
    // Logic xử lý đặt lịch ở đây (gửi dữ liệu hoặc xác nhận)
    console.log("Form Data: ", formData);
  };

  useEffect(() => {
    const functionFetchDoctorGroup = async () => {
      try {
        await fetchDoctorGroup(setDoctorGroups, (flag = 3));
      } catch (error) {
        console.log("Error fetching fetchDoctorGroup:", error.message || error);
      }
    };
    functionFetchDoctorGroup();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Form Đặt Lịch</Text>
        {/* Tên */}
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        {/* Số điện thoại */}
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
        />
        {/* Chọn Khoa */}
        <Text style={styles.label}>Chọn Khoa:</Text>
        <View style={styles.pickerContainerKhoa}>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("departmentId", value)}
            items={departments.map((department) => ({
              label: department.name, // Hiển thị tên khoa
              value: department.id, // Giá trị là ID khoa
            }))}
            style={{
              inputIOS: {
                padding: 10,
                backgroundColor: "#FFF",
                color: "black",
              },
              inputAndroid: {
                backgroundColor: "#FFF",
                padding: 10,
                color: "black",
              },
            }}
            placeholder={{ label: "Chọn khoa...", value: null }} // Hiển thị placeholder
          />
        </View>
        {/* Chọn Ngày */}
        <Text style={styles.label}>Chọn Ngày:</Text>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={onChangeDate}
            style={styles.datePicker} // Áp dụng style tùy chỉnh
          />
        </View>
        {/* Chọn Giờ */}
        <Text style={styles.label}>Chọn Giờ:</Text>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={formData.time}
            mode="time"
            display="default"
            onChange={onChangeTime}
            style={styles.datePicker} // Áp dụng style tùy chỉnh
          />
        </View>
        {/* Nút Đặt Lịch */}
        <Button title="Tìm kiếm" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AppointmentForm;

// export default function AppointmentForm() {
//   return <Postion />;
// }
