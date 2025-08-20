import { getFormattedDay } from "@/utils/dateFormat";
import { Instance, t } from "mobx-state-tree";
import { divmod } from "@/utils/divmod";

export const NotificationModel = t
  .model("NotificationModel", {
    userId: t.number,
    id: t.identifierNumber,
    title: t.string,
    desc: t.string,
    isNew: true,
    timeStamp: new Date(),
  })
  .views((notification) => ({
    get howLongAgo(): string {
      const diff =
        new Date().valueOf() - new Date(notification.timeStamp).valueOf();

      const s = Math.floor(diff / 1000);
      let [minutes, seconds] = divmod(s, 60);
      let [hours, days, weeks] = [0, 0, 0];
      if (minutes > 60) {
        [hours, minutes] = divmod(minutes, 60);
        if (hours > 24) {
          [days, hours] = divmod(hours, 24);
          if (days > 7) [weeks, days] = divmod(days, 7);
        }
      }
      if (weeks > 3) return getFormattedDay(notification.timeStamp);
      if (weeks > 0) return `${weeks}w`;
      if (days > 0) return `${days}d`;
      if (hours > 0) return `${hours}h`;
      if (minutes > 0) return `${minutes}min`;
      if (seconds > 0) return `${seconds}s`;
      return "Just now";
    },

    get isRead(): string {
      return notification.isNew ? "Unread" : "Read";
    },
  }))
  .actions((notification) => ({
    toggleNew(): void {
      notification.isNew = !notification.isNew;
    },
  }));

export type NotificationModelType = Instance<typeof NotificationModel>;
