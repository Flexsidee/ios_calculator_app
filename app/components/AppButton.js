import {
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
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
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				bigButton ? styles.bigButton : styles.normalButton,
				{
					backgroundColor: pressed
						? colors[
								bg === "darkGray"
									? "gray"
									: bg === "lightGray"
									? "white"
									: "lightOrange"
						  ]
						: colors[bg],
				},
			]}
		>
			<Text style={[styles.text, { color: colors[color] }]}>{children}</Text>
		</Pressable>
	);
};

export default AppButton;

const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth / 4 - 17;

const styles = StyleSheet.create({
	button: {
		borderRadius: 50,
		height: buttonWidth,
		justifyContent: "center",
	},
	bigButton: {
		paddingLeft: 30,
		width: buttonWidth * 2,
	},
	normalButton: {
		alignItems: "center",
		width: buttonWidth,
	},
	text: {
		fontFamily: "Helvetica Neue",
		fontSize: 40,
	},
	test: {
		// backgroundColor: "red",
	},
});
