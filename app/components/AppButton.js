import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import colors from "../config/colors";

const AppButton = ({
	bg = "darkGray",
	bigButton = false,
	color = "white",
	children,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			{bigButton ? (
				<View style={[styles.bigButton, { backgroundColor: colors[bg] }]}>
					<Text style={[styles.text, { color: colors[color] }]}>
						{children}
					</Text>
				</View>
			) : (
				<View style={[styles.button, { backgroundColor: colors[bg] }]}>
					<Text style={[styles.text, { color: colors[color] }]}>
						{children}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default AppButton;

const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth / 4 - 17;

const styles = StyleSheet.create({
	bigButton: {
		borderRadius: 50,
		justifyContent: "center",
		paddingLeft: 30,
		height: buttonWidth,
		width: buttonWidth * 2,
	},
	button: {
		alignItems: "center",
		borderRadius: 50,
		justifyContent: "center",
		height: buttonWidth,
		width: buttonWidth,
	},
	text: {
		fontFamily: "Helvetica Neue",
		fontSize: 40,
	},
});
