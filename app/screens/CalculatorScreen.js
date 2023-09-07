import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import DisplayedText from "../components/DisplayedText";

const CalculatorScreen = () => {
	const [input, setInput] = useState("0");
	const [operator, setOperator] = useState(null);
	const [buffer, setBuffer] = useState([]);
	const [result, setResult] = useState(null);
	const [hasDecimal, setHasDecimal] = useState(false);
	const [showResult, setShowResult] = useState(false);

	console.log("input", input);
	console.log("buffer", buffer);
	console.log("operator", operator);
	console.log("result", result);
	console.log("hasDecimal", hasDecimal);
	console.log("showResult", showResult);
	console.log("-------------------");
	console.log("              ");

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
		if (input == "0") {
			// when there is not input yet and user presses '.'
			setInput("0.");
			setHasDecimal(true);
		}
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
		setInput(newNumber);
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

	const buttons = [
		[
			{
				text: input == 0 && result === null && operator === null ? "AC" : "C",
				bg: "lightGray",
				color: "black",
				operatorButton: false,
			},
			{
				text: "+/-",
				bg: "lightGray",
				color: "black",
				onPress: () => handleButtonClick("+/-"),
				operatorButton: false,
			},
			{
				text: "%",
				bg: "lightGray",
				color: "black",
				operatorButton: false,
			},
			{
				value: "/",
				identifier: "\u00F7",
				operatorButton: true,
			},
		],
		[
			{
				text: "7",
				operatorButton: false,
			},
			{
				text: "8",
				operatorButton: false,
			},
			{
				text: "9",
				operatorButton: false,
			},
			{
				value: "x",
				identifier: "\u00D7",
				operatorButton: true,
			},
		],
		[
			{
				text: "4",
				operatorButton: false,
			},
			{
				text: "5",
				operatorButton: false,
			},
			{
				text: "6",
				operatorButton: false,
			},
			{
				value: "-",
				identifier: "\u2212",
				operatorButton: true,
			},
		],
		[
			{
				text: "1",
				operatorButton: false,
			},
			{
				text: "2",
				operatorButton: false,
			},
			{
				text: "3",
				operatorButton: false,
			},
			{
				value: "\u002B",
				identifier: "+",
				operatorButton: true,
			},
		],
		[
			{
				text: "0",
				bigButton: true,
				operatorButton: false,
			},
			{
				text: ".",
				operatorButton: false,
			},
			{
				bg: "orange",
				text: "=",
				operatorButton: false,
			},
		],
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<DisplayedText output={!showResult ? input : result} />
				{/* 	<View style={styles.buttonsRow}>
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick(input === 0 ? "AC" : "C")}
						text={
							input == 0 && result === null && operator === null ? "AC" : "C"
						}
					/>
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick("+/-")}
						text="+/-"
					/>
					<AppButton
						bg="lightGray"
						color="black"
						onPress={() => handleButtonClick("%")}
						text={"\u0025"}
					/>
					<OperatorButton value="/" identifier={"\u00F7"} />
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("7")} text="7" />
					<AppButton onPress={() => handleButtonClick("8")} text="8" />
					<AppButton onPress={() => handleButtonClick("9")} text="9" />
					<OperatorButton value="x" identifier={"\u00D7"} />
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("4")} text="4" />
					<AppButton onPress={() => handleButtonClick("5")} text="5" />
					<AppButton onPress={() => handleButtonClick("6")} text="6" />
					<OperatorButton value="-" identifier={"\u2212"} />
				</View>
				<View style={styles.buttonsRow}>
					<AppButton onPress={() => handleButtonClick("1")} text="1" />
					<AppButton onPress={() => handleButtonClick("2")} text="2" />
					<AppButton onPress={() => handleButtonClick("3")} text="3" />
					<OperatorButton value="+" identifier={"\u002B"} text="+" />
				</View>
				<View style={styles.buttonsRow}>
					<AppButton
						bigButton={true}
						onPress={() => handleButtonClick("0")}
						text="0"
					/>
					<AppButton onPress={() => handleButtonClick(".")} text="." />
					<AppButton
						bg="orange"
						onPress={() => handleButtonClick("=")}
						text={"\u003D"}
					/>
				</View> */}
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
									onPress={() => handleButtonClick(button.text)}
									text={button.text}
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
