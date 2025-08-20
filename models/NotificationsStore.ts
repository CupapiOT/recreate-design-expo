import { t, flow, Instance } from "mobx-state-tree";
import { NotificationModel, NotificationModelType } from "./NotificationModel";
import { lowerCaseToSentence } from "@/utils/caseFormat";
import axios, { isAxiosError } from "axios";
import { Post } from "@/types/Post";
import { ApiService } from "@/constants/api";

// A model is just the definition of the shape of a particular type of data.
// We also need to instantiate it. (See comment below)
export const NotificationsStore = t // move to rootStore
  .model("NotificationsStore", {
    notifications: t.array(NotificationModel),
    state: t.enumeration("State", ["pending", "done", "error", "empty"]),
    // The "maybe" is for "this could be undefined."
    priorityNotification: t.maybe(t.reference(NotificationModel)),
  })
  .views((self) => ({
    get lastId() {
      return self.notifications.at(self.notifications.length - 1)?.id;
    },
  }))
  .actions((self) => {
    function formatPostText(text: string) {
      const formatted = lowerCaseToSentence(text).replace(/\r?\n/g, " ");
      return formatted;
    }
    /**
     * This exists to keep backward compatibility with the old notification
     * model.
     */
    function makePostAsNotification(posts: Post[]) {
      return posts.map(({ userId, id, title, body }) =>
        NotificationModel.create({
          userId,
          id,
          title: userId + "." + id + ". " + formatPostText(title),
          desc: formatPostText(body),
          timeStamp: new Date(),
          isNew: true,
        }),
      );
    }
    let fetchedCount = 0;
    const NUM_OF_POSTS_PER_LOAD = 10;

    return {
      setPriority(notification: NotificationModelType) {
        const notificationToPrioritize =
          self.priorityNotification === notification ? undefined : notification;
        self.priorityNotification = notificationToPrioritize;
      },

      addNotification(
        title: string,
        desc: string,
        isNew: boolean,
        timeStamp: Date,
        id?: number,
      ) {
        const lastID = self.notifications.at(-1)?.id ?? 0;
        const newID = id ?? lastID;
        self.notifications.push({
          userId: 0,
          id: newID + 1,
          title,
          desc,
          isNew,
          timeStamp,
        });
      },

      /**
       * NOTE: This method permanently deletes a notification.
       */
      deleteNotification(notificationToDelete: NotificationModelType) {
        if (self.priorityNotification === notificationToDelete) {
          self.priorityNotification = undefined;
        }
        self.notifications.replace(
          self.notifications.filter(
            (notification) => notification.id !== notificationToDelete.id,
          ),
        );
      },

      reset() {
        self.priorityNotification = undefined;
        const placeholderNotification: NotificationModelType =
          NotificationModel.create({
            userId: 0,
            title: "Title Here!",
            desc: "Descriptions are placed here!",
            timeStamp: new Date(),
            id: 0,
          });
        self.notifications.replace([placeholderNotification]);
      },

      refresh: flow(function* refresh() {
        try {
          self.state = "pending";
          const response = yield axios.get(ApiService.POSTS_URL, {
            params: {
              _start: 0,
              _limit: NUM_OF_POSTS_PER_LOAD,
            },
          });
          const posts: Post[] = response.data;
          const formattedPosts = makePostAsNotification(posts);
          self.notifications.replace(formattedPosts);
          self.priorityNotification = undefined; // put in component
          fetchedCount = posts.length;

          if (posts.length === 0) self.state = "empty";
          else self.state = "done";
        } catch (error) {
          if (isAxiosError(error)) console.error("Axios Error:", error);
          else console.error("Unexpected error:", error);
        }
      }),

      fetchNotifications: flow(function* fetchNotifications() {
        try {
          self.state = "pending";
          const response = yield axios.get(ApiService.POSTS_URL, {
            params: {
              _start: fetchedCount,
              _limit: NUM_OF_POSTS_PER_LOAD,
            },
          });
          const posts: Post[] = response.data;
          const formattedPosts = makePostAsNotification(posts);

          self.notifications.push(...formattedPosts);
          fetchedCount += posts.length;

          if (posts.length === 0) self.state = "empty";
          else self.state = "done";
        } catch (error) {
          if (isAxiosError(error)) console.error("Axios Error:", error);
          else console.error("Unexpected Error:", error);
        }
      }),
    };
  });

export type NotificationsStoreType = Instance<typeof NotificationsStore>;

// // Instead of using ReactContext, the simplest way is we can do the following:
// let notificationsStore: NotificationsStoreType;
// export function useNotificationsStore() {
//   if (!notificationsStore) {
//     notificationsStore = NotificationsStore.create({
//       notifications: [],
//       state: "done",
//     });
//   }
//   return notificationsStore;
// }
//
