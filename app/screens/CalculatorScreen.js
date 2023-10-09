import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import { buttons } from "../components/calculatorButtons";
import colors from "../config/colors";
import DisplayedText from "../components/DisplayedText";

const CalculatorScreen = () => {
	const [input, setInput] = useState("0");
	const [operator, setOperator] = useState(null);
	const [buffer, setBuffer] = useState([]);
	const [result, setResult] = useState(null);
	const [hasDecimal, setHasDecimal] = useState(false);
	const [showResult, setShowResult] = useState(false);

	const convertBufferToResult = (inputArray) => {
		const expression = inputArray
			.map((item) => {
				if (typeof item === "number") {
					return item.toString(); // Convert numbers to strings
				} else if (item === "x") {
					return "*"; // Replace 'x' with '*'
				}
				return item; // Keep other elements as they are
			})
			.join("");

		return expression;
	};

	const handleButtonClick = (button) => {
		if (button === "AC" || button === "C") {
			setBuffer([]);
			setHasDecimal(false);
			setInput("0");
			setOperator(null);
			setResult(null);
			setShowResult(false);
		} else if (button === "+/-") {
			if (operator === null) {
				setInput(input * -1);
			} else {
				setResult(result * -1);
			}
		} else if (button === "%") {
			if (operator === null) {
				setInput(input / 100);
			} else {
				setResult(result / 100);
			}
		} else if (button === "=") {
			handleResult();
		} else if (button === ".") {
			handleDecimal();
		} else if (
			button === "/" ||
			button === "x" ||
			button === "-" ||
			button === "+"
		) {
			handleOperator(button);
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

	const handleDecimal = () => {
		// if (input == "0" && result === null && operator === null && hasDecimal === false) {
		// 	// when there is not input yet and user presses '.'
		// 	setInput("0.");
		// 	setHasDecimal(true);
		// }
		if (hasDecimal === false) {
			// when there is already an input and user presses '.'
			setInput(input + ".");
			setHasDecimal(true);
		}
		if (result !== null) {
			// when there is already a result and user presses '.', it resets all data to default
			setInput("0.");
			setHasDecimal(true);
			setBuffer([]);
			setResult(null);
			setOperator(null);
			setShowResult(false);
		}
	};

	const handleNumber = (number) => {
		let currenText = input;
		let newText = currenText + number;
		let newNumber = parseFloat(newText);
		if (newText.length < 10) {
			setInput(newNumber);
		}
	};

	const handleOperator = (op) => {
		if (operator === null && result === null && buffer.length === 0) {
			//when user enters a number and presses an operator for the first time
			setBuffer([input, op]);
			setInput(0);
			setOperator(op);
		} else if (operator !== null && buffer.length > 0) {
			// when user enters a number, presses an operator when there is already an input in the buffer
			setBuffer([...buffer, input, op]);
			setInput(0);
			setOperator(op);
		} else if (operator !== null && buffer.length === 0) {
			// when user enters a number, presses an operator when there is no input in the buffer
			setBuffer([result, op]);
			setInput(0);
			setOperator(op);
			setResult(null);
			setShowResult(false);
		}
	};

	const handleResult = () => {
		if (operator === null && result === null && buffer.length === 0) {
			//user entered a number and pressed '='
			setBuffer([input]);
			setResult(input);
			setInput(0);
			setShowResult(true);
		} else if (operator !== null && result !== null && buffer.length === 0) {
			// user entered a number, pressed an operator, entered another number continously before finally pressing and pressed '=' while there is already a result
			let answer = null;
			if (operator === "+") {
				answer = parseFloat(parseFloat(result) + parseFloat(input));
			} else if (operator === "-") {
				answer = parseFloat(parseFloat(result) - parseFloat(input));
			} else if (operator === "x") {
				answer = parseFloat(parseFloat(result) * parseFloat(input));
			} else if (operator === "/") {
				answer = parseFloat(parseFloat(result) / parseFloat(input));
			}
			setResult(answer);
			setShowResult(true);
		} else if (operator !== null && result === null && buffer.length > 0) {
			// user entered a number, pressed an operator, entered another number continously before finally pressing and pressed '=' while there is no result yet
			let bufferExpression = convertBufferToResult(buffer);
			let answer = eval(bufferExpression + input);
			setResult(answer);
			setShowResult(true);
			setBuffer([]);
		}
	};

	const OperatorButton = ({ identifier, value }) => (
		<AppButton
			onPress={() => handleButtonClick(value)}
			bg={
				operator === value &&
				buffer[buffer.length - 1] === value &&
				input == "0"
					? "lightGray"
					: "orange"
			}
			color={
				operator === value &&
				buffer[buffer.length - 1] === value &&
				input == "0"
					? "orange"
					: "white"
			}
			text={identifier}
		/>
	);

	let displayedText = !showResult ? input.toString() : result.toString();
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
	// console.log("input", input);
	// console.log("buffer", buffer);
	// console.log("operator", operator);
	// console.log("result", result);
	// console.log("hasDecimal", hasDecimal);
	// console.log("showResult", showResult);
	// console.log("-------------------");
	// console.log("              ");

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<DisplayedText output={displayedText} />
				{buttons.map((row, index) => (
					<View key={index} style={styles.buttonsRow}>
						{row.map((button, index) =>
							button.operatorButton ? (
								<OperatorButton
									key={index}
									value={button.value}
									identifier={button.identifier}
								/>
							) : (
								<AppButton
									key={index}
									bg={button.bg}
									bigButton={button.bigButton ? true : false}
									color={button.color}
									onPress={() =>
										handleButtonClick(
											button.clearButton
												? input == 0
													? "AC"
													: "C"
												: button.text
										)
									}
									text={
										button.clearButton
											? input == 0 && result === null && operator === null
												? "AC"
												: "C"
											: button.text
									}
								/>
							)
						)}
					</View>
				))}
			</View>
		</SafeAreaView>
	);
};

export default CalculatorScreen;

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
		flex: 1,
		justifyContent: "flex-end",
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
