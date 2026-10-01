import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import DailyMoodSymptomScreen from "../screens/logging/DailyMoodSymptomScreen";
import InsightsScreen from "../screens/insights/InsightsScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

export type AppStackParamList = {
  Calendar: undefined;
  DailyLog: undefined;
  Insights: undefined;
  Chat: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="DailyLog" component={DailyMoodSymptomScreen} options={{ title: "Log Today" }} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Ask Eya" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
