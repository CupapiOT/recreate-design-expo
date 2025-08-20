import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import InfoHeader from "@/components/layout/InfoHeader";
import NotificationsList from "@/components/notifications/NotificationsList";
import { NotificationsStoreContextProvider } from "@/contexts/NotificationsStoreContext";

export default function NotificationsScreen() {
  return (
    <NotificationsStoreContextProvider>
      <SafeAreaView style={[styles.container]}>
        <InfoHeader title="Notifications" />
        <NotificationsList />
      </SafeAreaView>
    </NotificationsStoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
});
