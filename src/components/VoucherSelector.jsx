import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchVouchers from "../utils/voucher/fetchVoucherById";
import formatVoucherCode from "../utils/voucher/formatVoucherCode";
const VoucherSelector = ({ selectedVoucher, setSelectedVoucher }) => {
  // Danh sách mã voucher mẫu
  //   const vouchers = [
  //     { id: "1", code: "DISCOUNT10", description: "Giảm giá 10%" },
  //     { id: "2", code: "FREESHIP", description: "Miễn phí vận chuyển" },
  //     { id: "3", code: "BUY1GET1", description: "Mua 1 tặng 1" },
  //   ];
  const dispatch = useDispatch();
  const { userId, name, email } = useSelector((state) => state.profile);
  const [vouchers, setVouchers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal

  // Hàm khi chọn mã voucher
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setModalVisible(false); // Đóng Modal sau khi chọn
  };
  const handleClearVoucher = () => {
    setSelectedVoucher(null); // Đặt lại voucher đã chọn về null
  };
  useEffect(() => {
    fetchVouchers(userId, setVouchers);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voucher của bạn</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.selectedVoucherContainer}>
          {/* Hiển thị biểu tượng để mở Modal */}
          <View
            style={styles.iconContainer}
            // Mở Modal khi nhấn vào icon
          >
            <FontAwesome
              name="ticket"
              size={24}
              color={selectedVoucher ? "#00838f" : "#666"}
            />
          </View>

          {/* Hiển thị mã voucher đã chọn */}
          <Text style={styles.selectedVoucherText}>
            {selectedVoucher
              ? formatVoucherCode(selectedVoucher.voucher_code)
              : "Chưa có voucher được chọn"}
          </Text>
          {selectedVoucher && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearVoucher} // Xóa voucher khi nhấn vào nút
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text> Xóa </Text>
                <FontAwesome name="times-circle" size={24} color="#ff0000" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Modal để hiển thị danh sách voucher */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Đóng Modal khi nhấn ngoài vùng
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn mã voucher</Text>
            {vouchers.length === 0 && (
              <Text style={styles.text_no_voucher}>
                Không có voucher nào cả
              </Text>
            )}
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.voucherItem}
                  onPress={() => handleSelectVoucher(item)} // Chọn voucher và đóng Modal
                >
                  <Text style={styles.voucherCode}>
                    {formatVoucherCode(item.voucher_code)}
                  </Text>
                  <Text style={styles.voucherDescription}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  selectedVoucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 3,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 50,
    marginRight: 10,
  },
  selectedVoucherText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  voucherItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  voucherCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  voucherDescription: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#00838f",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 60,
  },
  text_no_voucher: {
    color: "#4CAF50",
    textAlign: "center",
  },
});

export default VoucherSelector;
