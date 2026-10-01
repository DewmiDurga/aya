import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

/**
 * Schedules a local reminder N days before the predicted period start.
 * predictedStartDate: "YYYY-MM-DD"
 */
export async function schedulePeriodReminder(
  predictedStartDate: string,
  daysBefore: number = 2
) {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  const triggerDate = new Date(predictedStartDate);
  triggerDate.setDate(triggerDate.getDate() - daysBefore);
  triggerDate.setHours(9, 0, 0, 0);

  if (triggerDate.getTime() <= Date.now()) return; // don't schedule in the past

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Period reminder",
      body: `Your period is expected in about ${daysBefore} day(s). Track how you're feeling.`
    },
    trigger: triggerDate
  });
}
