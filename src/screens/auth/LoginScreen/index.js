import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GradientButton from "../../../components/GradientButton";
import { setProfile, getProfile } from "../../../utils/user/profileUser";
import { setProfileRedux } from "../../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
// const API_APP = process.env['API_APP'];
import API_APP from "../../../utils/config"; // lay bien moi truong
// console.log(API_APP, test);
export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userId, name, email } = useSelector((state) => state.profile);
  console.log(userId, name, email);
  // if (userId && name && email) {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Home" }],
  //   });
  //   // navigation.navigate("Home");
  // }
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onPressSend = async (formData) => {
    // Perform actions with the validated form data
    // console.log(formData);
    try {
      const res = await fetch(`${API_APP}/v1/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        console.log(result.message);
        Alert.alert("Login Failed", `${result.message}`);
        return;
      }
      console.log(result);
      const userId = result.data.id.toString();
      const name = result.data.name.toString();
      const email = result.data.email.toString();

      console.log(userId, name);
      dispatch(setProfileRedux({ userId, name, email }));
      await setProfile(userId, name, email);
      Alert.alert("Login Success", `${result.message}`);
      // navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNoLogin = () => {
    navigation.navigate("Home");
  };
  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getProfile();
      if (profile.userId && profile.name && profile.email) {
        dispatch(setProfileRedux({ userId, name, email }));
        // Navigate to Home if the user is already logged in
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    };
    checkProfile();
  }, []);
  return (
    // <ImageBackground
    //   source={require('../assets/img/bg.jpg')} // Replace with your image URL
    //   style={styles.backgroundImage}>
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/logo_stand.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back !</Text>
      <View style={styles.container_input}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email của bạn"
              style={styles.input}
            />
          )}
          name="email"
        />
        <View style={styles.container_error}>
          {errors.email && (
            <Text style={styles.text_error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.container_icon_input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Password"
                secureTextEntry={isSecure}
                style={[styles.input, styles.input_password]}
              />
            )}
            name="password"
          />
          <View style={styles.icon_eye}>
            <TouchableOpacity onPress={toggleSecureEntry}>
              <Icon
                name={isSecure ? "eye" : "eye-slash"}
                size={15}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_error}>
          {errors.password && (
            <Text style={styles.text_error}>{errors.password.message}</Text>
          )}
        </View>
      </View>
      <View style={styles.container_btn_submit}>
        <GradientButton title="Đăng nhập" onPress={handleSubmit(onPressSend)} />
      </View>
      <View style={styles.container_no_login}>
        <Pressable onPress={handleNoLogin}>
          <Text style={styles.text_no_login}>Không đăng nhập</Text>
        </Pressable>
      </View>
      <View style={styles.container_link_register}>
        <Text>Chưa có tài khoản ?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text_link_register}>Đăng kí</Text>
        </Pressable>
      </View>
    </View>
    // </ImageBackground>
  );
}
