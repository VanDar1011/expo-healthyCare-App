// ChangePasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as yup from "yup";
import { useSelector } from "react-redux";
import AlertService from "../utils/AlterService";
import { useForm, Controller } from "react-hook-form";
import changeProfileUser from "../utils/user/changeProfileUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { scaleHeight, scaleWidth } from "../utils/config";
const ChangePasswordScreen = ({ navigation }) => {
  const { userId } = useSelector((state) => state.profile);
  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Trường này không được trống"),
    password: yup
      .string()
      .required("Trường này không được trống")
      .min(8, "Ít nhất 8 kí tự"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });
  const handleChangePassword = async (formData) => {
    try {
      const data = { idUser: userId, ...formData };
      console.log(data);
      const dataResponse = await changeProfileUser(data);
      if (dataResponse.status === 401) {
        throw new Error(dataResponse.message);
      }
      AlertService.showSuccessAlert("Đổi mật khẩu thành công!");
      navigation.goBack();
    } catch (error) {
      AlertService.showErrorAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Mật khẩu cũ"
              style={styles.input}
            />
          )}
          name="oldPassword"
        />
        <View style={styles.container_error}>
          {errors.oldPassword && (
            <Text style={styles.text_error}>{errors.oldPassword.message}</Text>
          )}
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Mật khẩu mới"
              style={styles.input}
            />
          )}
          name="password"
        />
        <View style={styles.container_error}>
          {errors.password && (
            <Text style={styles.text_error}>{errors.password.message}</Text>
          )}
        </View>
        {/* end yup  */}
      </View>
      <View style={styles.container_button}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleSubmit(handleChangePassword)}
        >
          <Text style={styles.updateText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={navigation.goBack}
        >
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  container_button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  updateButton: {
    width: "50%",
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "30%",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container_error: {
    paddingLeft: 20 * scaleWidth,
    height: 20 * scaleHeight,
  },
  text_error: {
    color: "red",
  },
});

export default ChangePasswordScreen;
