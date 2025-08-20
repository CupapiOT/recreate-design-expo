import { NotificationsStore } from "@/models/NotificationsStore";
import React from "react";

export const notificationsStore = NotificationsStore.create({
  notifications: [],
  state: "done",
});
export const NotificationsStoreContext =
  React.createContext(notificationsStore);

export const NotificationsStoreContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotificationsStoreContext.Provider value={notificationsStore}>
      {children}
    </NotificationsStoreContext.Provider>
  );
};

export const useNotificationsStore = () =>
  React.useContext(NotificationsStoreContext);
