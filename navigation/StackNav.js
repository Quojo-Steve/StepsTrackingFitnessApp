import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from "../screens/FirstScreen";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="firstScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="firstScreen"
        component={FirstScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="test"
        component={Test}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
