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
  userName: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    marginTop: 10 * scaleHeight,
  },
  userEmail: {
    fontSize: 16 * scaleWidth,
    color: "#888",
    marginTop: 5 * scaleHeight,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15 * scaleHeight,
    paddingHorizontal: 60 * scaleWidth,
    borderRadius: 30 * scaleWidth,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
  },
});
export default styles;
