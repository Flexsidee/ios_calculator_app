import { GestureHandlerRootView } from "react-native-gesture-handler";

import CalculatorScreen from "./app/screens/CalculatorScreen";

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CalculatorScreen />
		</GestureHandlerRootView>
	);
}
