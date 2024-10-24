import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import fetchDoctorGroup from "../utils/doctorgroup/fetchDoctorGroup";
import RNPickerSelect from "react-native-picker-select";
import { Form } from "react-hook-form";
const FormAppointment = () => {
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
const styles = StyleSheet.create({
  containerModal: {
    flex: 1, // Chiếm toàn bộ chiều cao màn hình
    justifyContent: "flex-end", // Đặt modal ở dưới cùng
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền tối với độ trong suốt
  },
  formContainerModal: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  formTitleModal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputModal: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  labelModal: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  pickerContainerModal: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerModal: {
    height: 50,
    backgroundColor: "#f9f9f9",
  },
  dateButtonModal: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  dateButtonTextModal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonModal: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonTextModal: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerModal: {
    height: "100%",
    width: "100%", // Kích thước chữ nhỏ hơn
  },
  pickerContainerKhoaModal: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    height: 60,
    justifyContent: "center",
    marginBottom: 10,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#FF0000", // Màu đỏ cho nút đóng
  },
});

export default FormAppointment;

// export default function AppointmentForm() {
//   return <Postion />;
// }
