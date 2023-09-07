import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

const DisplayedText = ({ output }) => {
	// const DeleteInput = () => {
	// 	setInput(input.slice(0, input.length - 1));
	// 	setInput(input.length > 1 ? input.slice(0, input.length - 1) : "0");
	// };

	return (
		/* <Swipeable renderRightActions={() => <DeleteInput />}>
						<View>
							<Text style={styles.display}>{output}</Text>
						</View>
					</Swipeable> */
		<Text style={styles.display}>{output}</Text>
	);
};

export default DisplayedText;

const styles = StyleSheet.create({
	display: {
		color: colors.white,
		fontFamily: "Helvetica Neue",
		fontSize: 70,
		marginBottom: 10,
		marginRight: 10,
		textAlign: "right",
	},
});
