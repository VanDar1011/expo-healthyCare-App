import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16 * scaleWidth,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 16 * scaleHeight,
  },
  // picker: {
  //   padding: 0,
  //   margin: 0,
  //   height: 80,
  //   // width: "100%",
  //   // backgroundColor: "white",
  //   // marginBottom: 16,
  //   color: "black",
  // },
  // list: {
  //   marginTop: 46 * scaleHeight,
  // },
});
export default styles;
