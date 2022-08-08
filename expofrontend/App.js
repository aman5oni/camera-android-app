import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage"
import VideoPage from "./screens/VideoPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            // headerShadowVisible: false,
            // headerTitleAlign: "center",
            headerShown: false
            // headerTintColor:"red",
            // title:"hello",
          }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="VideoPage" component={VideoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
