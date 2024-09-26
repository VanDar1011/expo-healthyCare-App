import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import HomeVip from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import AppointmentDetailsScreen from "../screens/AppointmentDetailsScreen";
import MedicineBenefitScreen from "../components/MedicineBenefitScreen";
import TermsPrivacyScreen from "../components/TermsPrivacyScreen";
import DetailsMedicineScreen from "../screens/DetailsMedicineScreen";
import MedicinesScreen from "../screens/MedicinesScreen";
import ArcilesDetailsScreen from "../screens/ArctilesDetailsScreen";
import ProfileScreen from "../screens/Profile";
import DoctorsGroupScreen from "../screens/DoctorsGroupScreen";
import DoctorsGroupDetailScreen from "../screens/DoctorsGroupDetailScreen";
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeVip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medicines"
          component={MedicinesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsMedicine"
          component={DetailsMedicineScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Articles"
          component={ArticlesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArctilesDetails"
          component={ArcilesDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorGroup"
          component={DoctorsGroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorGroupDetail"
          component={DoctorsGroupDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BenefitScreen"
          component={MedicineBenefitScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsPrivacyScreen"
          component={TermsPrivacyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
