import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fdffff",
	},
	inputField: {
		height: 60,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "#ababab",
		padding: 10,
		backgroundColor: "#fff",
	},
	btn: {
		backgroundColor: Colors.primary,
		height: 60,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "mon-b",
	},
	btnIcon: {
		position: "absolute",
	},
	btnOutline: {
		backgroundColor: "#fff",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.grey,
		height: 50,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	btnOutlineText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "mon-sb",
	},
	footer: {
		position: "absolute",
		height: 100,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopColor: Colors.grey,
		borderTopWidth: StyleSheet.hairlineWidth,
	},
});