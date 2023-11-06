import { GestureHandlerRootView } from "react-native-gesture-handler";

import CalculatorScreen from "./app/screens/CalculatorScreen";
import colors from "./app/config/colors";

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.black }}>
			<CalculatorScreen />
		</GestureHandlerRootView>
	);
}
