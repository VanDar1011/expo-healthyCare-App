import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40 * scaleHeight,
  },
  infoContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    marginTop: 10 * scaleHeight,
  },
  userEmail: {
    fontSize: 16 * scaleWidth,
    color: "#4CD20A",
    marginTop: 5 * scaleHeight,
  },
  updateText: {
    fontSize: 16 * scaleWidth,
    color: "#4CD20A",
    fontWeight: "bold",
    marginVertical: 10 * scaleHeight,
  },
  editText: {
    marginVertical: 10 * scaleHeight,
  },
  input: {
    color: "black",
    fontSize: 16 * scaleWidth,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10 * scaleWidth,
    paddingHorizontal: 20 * scaleWidth,
    paddingVertical: 10 * scaleHeight,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10 * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    borderRadius: 30 * scaleWidth,
  },
  logoutText: {
    color: "#fff",
    fontSize: 15 * scaleWidth,
    fontWeight: "bold",
  },
});
export default styles;
