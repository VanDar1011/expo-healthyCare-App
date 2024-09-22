import Constants from "expo-constants";
import { Dimensions } from "react-native";
const API_APP = Constants.expoConfig.extra.apiUrl;
console.log(API_APP);
const { width, height } = Dimensions.get("window");

// Tính toán tỷ lệ dựa trên kích thước màn hình
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;
const scaleWidth = width / SCREEN_WIDTH;
const scaleHeight = height / SCREEN_HEIGHT;
export default API_APP;
export { scaleWidth, scaleHeight };
