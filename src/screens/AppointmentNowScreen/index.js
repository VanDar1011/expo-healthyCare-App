import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown"; // Importing the Dropdown component
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import fetchNearPlace from "../../utils/map/fetchNearPlace";
// import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import fetchDoctorGroup from "../../utils/doctorgroup/fetchDoctorGroup";
import formatDistance from "../../utils/map/formatDistance";
// import FullScreenLoading from "./FulllScreenLoading";
import bookAppointment from "../../utils/appointment/bookAppointment";
import { useNavigation } from "@react-navigation/native";
import VoucherSelector from "../../components/VoucherSelector";
import FullScreenLoading from "../../components/FulllScreenLoading";
import isDuringWorkingHours from "../../utils/appointment/duringHouse";
const Postion = () => {
  const navaigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [brach, setBrach] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [address, setAddress] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [departments, setDoctorGroups] = useState([]);
  const { userId, email, name } = useSelector((state) => state.profile);
  const [loading, isLoading] = useState(true);
  const [loadingAppointment, setLoadingAppointment] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: "",
    branch: null,
    departmentId: null,
    date: new Date(),
    time: new Date(),
  });
  const handleInputChange = (key, value) => {
    // console.log(key, value);
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

  const handleSubmit = async () => {
    try {
      // Logic xử lý đặt lịch ở đây (gửi dữ liệu hoặc xác nhận)
      console.log("Time current : ", formData.time);
      const dateString = formData.date.toISOString().split("T")[0];
      const dateParts = dateString.split("-"); // Tách thành mảng ngày tháng năm
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Tháng bắt đầu từ 0
      const day = parseInt(dateParts[2], 10);
      const startDateTime = new Date(
        year,
        month,
        day,
        formData.time.getHours(),
        formData.time.getMinutes()
      );
      const startTime = new Date(startDateTime);
      if (!isDuringWorkingHours(startDateTime)) {
        Alert.alert(
          "Lỗi",
          "Giờ làm việc \nBuổi sáng: 8:00 - 12:00\nBuổi chiều: 13:00 - 17:00\nNgày làm việc: Thứ Hai đến Thứ Sáu"
        );
        return;
      }
      const endDateTime = startDateTime.setHours(
        startDateTime.getHours() + 2,
        startDateTime.getMinutes() + 59
      );

      const endDate = new Date(endDateTime);

      // Thiết lập thời gian bắt đầu
      const data = await bookAppointment({
        userId,
        email,
        startTime: startTime,
        endTime: endDate,
        phone: formData.phone,
        branch_id: formData.branch,
        specialist_id: formData.departmentId,
        voucher_code: selectedVoucher?.voucher_code,
      });
      setSelectedVoucher(null);
      // console.log(data);
      Alert.alert("Tạo lịch hẹn", "Tạo lịch hẹn thành công");
      setIsFormVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Đặt lịch thất bại");
    } finally {
      // setLoadingAppointment(false);
    }
  };

  const handleNext = (item) => {
    // console.log(item.id);
    handleInputChange("branch", item.id);
    setIsFormVisible(true);
  };
  const handleCloseModal = () => {
    // Đóng modal
    setIsFormVisible(false);
  };
  const handleOpenMap = (endLatitude, endLongitude) => {
    const endAddress = {
      latitude: endLatitude,
      longitude: endLongitude,
    };
    console.log("End Address : ", endAddress);
    const startAddress = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    console.log("Start Address : ", startAddress);
    navaigation.navigate("MapBox", {
      address: {
        startAddress,
        endAddress,
      },
    });
    // // Mở map
    // console.log("Open Map");
  };
  useEffect(() => {
    (async () => {
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Lấy vị trí hiện tại
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (currentLocation) {
        const resAddress = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&format=json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dataAddress = await resAddress.json();
        console.log(dataAddress);
        setAddress(dataAddress.display_name);
        isLoading(false);
        await fetchNearPlace(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          setPlaces
        );
      }
    })();
  }, []);
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
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Đang xử lí vị trí, vui lòng chờ...
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (loadingAppointment)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tạo lịch hẹn</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vị trí của bạn:</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        location && (
          <View>
            {/* <Text style={styles.location}>
              Vĩ độ: {location.coords.latitude}
            </Text>
            <Text style={styles.location}>
              Kinh độ: {location.coords.longitude}
            </Text> */}
            <Text style={styles.location}>{address}</Text>
          </View>
        )
      )}
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.distance}>
              Khoảng cách :{formatDistance(item.distance)} km
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleOpenMap(item.latitude, item.longitude)}
              >
                <Text style={styles.buttonText}>Đường đi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleNext(item)}
              >
                <Text style={styles.buttonText}>Tiếp theo</Text>
              </TouchableOpacity>
              <Text></Text>
            </View>
          </View>
        )}
      />
      {isFormVisible && (
        <View style={styles.containerModal}>
          <View style={styles.formContainerModal}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.formTitleModal}>Form Đặt Lịch</Text>
            {/* Tên */}
            <TextInput
              style={styles.inputModal}
              placeholder="Tên"
              value={formData.name}
              editable={false}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            {/* Email */}
            <TextInput
              style={styles.inputModal}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              editable={false}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            {/* Số điện thoại */}
            <TextInput
              style={styles.inputModal}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              value={formData.phone}
              returnKeyType="done"
              onChangeText={(text) => handleInputChange("phone", text)}
            />
            {/* Chọn Khoa */}
            <Text style={styles.labelModal}>Chọn Khoa:</Text>
            <View style={styles.pickerContainerKhoaModal}>
              {/* new dropDown  */}
              <Dropdown
                style={styles.dropdown} // Styling the dropdown
                data={departments}
                searchPlaceholder="Search..."
                labelField="name" // Field to display in the dropdown
                valueField="id" // Field used to identify selected value
                value={formData.departmentId}
                onChange={(item) => handleInputChange("departmentId", item.id)} // Update value on change
                placeholder="Select Department"
                search
                maxHeight={300}
                renderLeftIcon={() => (
                  <AntDesign
                    name="Safety"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                )}
              />
            </View>
            {/* Chọn Ngày */}
            <Text style={styles.labelModal}>Chọn Ngày:</Text>
            <View style={styles.pickerContainerModal}>
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={onChangeDate}
                style={styles.datePickerModal}
              />
            </View>
            {/* Chọn Giờ */}
            <Text style={styles.labelModal}>Chọn Giờ:</Text>
            <View style={styles.pickerContainerModal}>
              <DateTimePicker
                value={formData.time}
                mode="time"
                display="default"
                onChange={onChangeTime}
                style={styles.datePickerModal}
              />
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <VoucherSelector
                  selectedVoucher={selectedVoucher}
                  setSelectedVoucher={setSelectedVoucher}
                />
              </View>
            </View>
            {/* Nút Đặt Lịch */}
            <Button title="Đặt ngay" onPress={handleSubmit} />
          </View>
        </View>
      )}

      {/* // */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
  },
  distance: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF", // Màu nền cho nút
    padding: 10,
    borderRadius: 5,
    // alignItems: "center",
  },
  buttonText: {
    color: "black", // Màu chữ trong nút
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerModal: {
    position: "absolute", // Set to absolute
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
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
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
    // width: "100%",
    // height: 60,
    // justifyContent: "center",
    // marginBottom: 10,
    // zIndex: 10,
    // height: 50,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 8,
    // paddingHorizontal: 12,
    // justifyContent: "center",
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#fff", // Màu nền trắng
  },
  loadingText: {
    fontSize: 18, // Kích thước chữ lớn
    color: "#333", // Màu chữ đậm
    marginBottom: 10, // Khoảng cách dưới cho ActivityIndicator
  },
  icon: {
    marginRight: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});

export default Postion;
