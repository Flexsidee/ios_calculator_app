import { useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

import AppButton from "./app/components/AppButton";
import colors from "./app/config/colors";

export default function App() {
	const [input, setInput] = useState(0.0);
	const [input2, setInput2] = useState(0);
	const [operator, setOperator] = useState(null);

	let displayedText = input;
	console.log("displayedTextLength", displayedText.length);
	if (displayedText > 999999999) {
		displayedText = displayedText.toString();
		displayedText =
			displayedText.slice(displayedText.length - 9, displayedText.length - 6) +
			"," +
			displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
			"," +
			displayedText.slice(displayedText.length - 3);
	} else if (displayedText > 999999) {
		displayedText = displayedText.toString();
		displayedText =
			displayedText.slice(0, displayedText.length - 6) +
			"," +
			displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
			"," +
			displayedText.slice(displayedText.length - 3);
	} else if (displayedText > 999) {
		displayedText = displayedText.toString();
		displayedText =
			displayedText.slice(0, displayedText.length - 3) +
			"," +
			displayedText.slice(displayedText.length - 3);
	}
	console.log("displayedText", displayedText);
	console.log("displayedTextLength", displayedText.length);
	console.log("-------------------");
	// let displayedText = input.toString();
	// console.log("displayedTextLength", displayedText.length);
	// if (displayedText.length == 9) {
	// 	displayedText =
	// 		displayedText.slice(displayedText.length - 9, displayedText.length - 6) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// } else if (displayedText.length > 6) {
	// 	displayedText =
	// 		displayedText.slice(0, displayedText.length - 6) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// } else if (displayedText.length > 3) {
	// 	displayedText =
	// 		displayedText.slice(0, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// }
	// console.log("displayedText", displayedText);
	// console.log("displayedTextLength", displayedText.length);
	// console.log("-------------------");

	const handleNumber = (number) => {
		let currenText = input.toString();
		let newText = currenText + number.toString();
		let newNumber = parseInt(newText);
		setInput(newNumber);
	};

	const handleDecimal = () => {
		let currenText = input.toString();
		if (input === 0) {
			currenText = "0.";
			setInput(parseFloat(currenText));
		}
	};

	const handleButtonClick = (button) => {
		if (button === "AC" || button === "C") {
			setInput(0);
		} else if (button === "negate") {
			setInput(input * -1);
		} else if (button === "%") {
			setInput(input / 100);
		} else if (button === "/") {
		} else if (button === "x") {
		} else if (button === "-") {
		} else if (button === "+") {
		} else if (button === "=") {
		} else if (button === ".") {
			handleDecimal();
		} else if (
			button === "1" ||
			button === "2" ||
			button === "3" ||
			button === "4" ||
			button === "5" ||
			button === "6" ||
			button === "7" ||
			button === "8" ||
			button === "9" ||
			button === "0"
		) {
			handleNumber(button);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				{/* <Text style={styles.display}>{input}</Text> */}
				<Text style={styles.display}>{displayedText}</Text>
				<View style={styles.buttonsRow}>
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick(input === 0 ? "AC" : "C")}
					>
						{input === 0 ? "AC" : "C"}
					</AppButton>
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick("negate")}
					>
						+/-
					</AppButton>
					{/* <AppButton bg="lightGray" color="black" onPress={negateInput}>
						{"\u00B1"}
					</AppButton> */}
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick("%")}
					>
						{"\u0025"}
					</AppButton>
					<AppButton bg="orange" onPress={() => handleButtonClick("/")}>
						{"\u00F7"}
					</AppButton>
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("7")}>7</AppButton>
					<AppButton onPress={() => handleButtonClick("8")}>8</AppButton>
					<AppButton onPress={() => handleButtonClick("9")}>9</AppButton>
					<AppButton bg="orange" onPress={() => handleButtonClick("x")}>
						{"\u00D7"}
					</AppButton>
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("4")}>4</AppButton>
					<AppButton onPress={() => handleButtonClick("5")}>5</AppButton>
					<AppButton onPress={() => handleButtonClick("6")}>6</AppButton>
					<AppButton bg="orange" onPress={() => handleButtonClick("-")}>
						{"\u2212"}
					</AppButton>
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("1")}>1</AppButton>
					<AppButton onPress={() => handleButtonClick("2")}>2</AppButton>
					<AppButton onPress={() => handleButtonClick("3")}>3</AppButton>
					<AppButton bg="orange" onPress={() => handleButtonClick("+")}>
						{"\u002B"}
					</AppButton>
				</View>
				<View style={styles.buttonsRow}>
					<AppButton bigButton={true} onPress={() => handleButtonClick("0")}>
						0
					</AppButton>
					<AppButton onPress={() => handleButtonClick("=")}>.</AppButton>
					<AppButton bg="orange" onPress={() => handleButtonClick("=")}>
						{"\u003D"}
					</AppButton>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	body: {
		marginBottom: 20,
		padding: 15,
	},
	buttonsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: 10,
	},
	container: {
		backgroundColor: colors.black,
		color: colors.orange,
		flex: 1,
		justifyContent: "flex-end",
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	display: {
		color: colors.white,
		fontFamily: "Helvetica Neue",
		fontSize: 70,
		marginBottom: 10,
		marginRight: 10,
		textAlign: "right",
	},
});
