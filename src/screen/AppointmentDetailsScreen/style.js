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
  picker: {
    height: 50 * scaleHeight,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 16 * scaleHeight,
  },
  list: {
    marginTop: 16 * scaleHeight,
  },
});
export default styles;
