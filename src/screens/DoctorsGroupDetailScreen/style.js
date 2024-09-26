import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8", // Soft background color for a calming effect
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50", // Darker shade for the title
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1.5, // Slightly spaced out letters for emphasis
  },
  list: {
    paddingBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background for contrast
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#dcdcdc", // Light border for subtle separation
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, // For Android shadow
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginRight: 15,
    borderColor: "#3498db", // Add a border to the image for emphasis
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e", // Dark color for the doctor's name
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  group: {
    fontSize: 16,
    color: "#7f8c8d", // Greyish color for the doctor's group name
  },
  separator: {
    height: 1,
    backgroundColor: "#ecf0f1", // Light grey separator between items
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#2ecc71", // Green button for positive action
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;
