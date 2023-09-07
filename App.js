import { GestureHandlerRootView } from "react-native-gesture-handler";

import CalculatorScreen from "./app/screens/CalculatorScreen";

export default function App() {
	// let displayedText = input;
	// console.log("displayedTextLength", displayedText.length);
	// if (displayedText > 999999999) {
	// 	displayedText = displayedText.toString();
	// 	displayedText =
	// 		displayedText.slice(displayedText.length - 9, displayedText.length - 6) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// } else if (displayedText > 999999) {
	// 	displayedText = displayedText.toString();
	// 	displayedText =
	// 		displayedText.slice(0, displayedText.length - 6) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 6, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// } else if (displayedText > 999) {
	// 	displayedText = displayedText.toString();
	// 	displayedText =
	// 		displayedText.slice(0, displayedText.length - 3) +
	// 		"," +
	// 		displayedText.slice(displayedText.length - 3);
	// }
	// console.log("displayedText", displayedText);
	// console.log("displayedTextLength", displayedText.length);
	// console.log("-------------------");

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

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CalculatorScreen />
		</GestureHandlerRootView>
	);
}
