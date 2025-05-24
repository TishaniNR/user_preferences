import { getUserIdFromURL, api } from "../../utils/api";
export const NotificationPage = {
  id: "notification",
  view: "form",
  scroll: true,
  padding: 20,
  width: 800,
  labelWidth: 200,
  elementsConfig: {
    labelPosition: "top",
    labelAlign: "left",
  },
  elements: [
    {
      cols: [
        {
          view: "icon",
          icon: "mdi mdi-arrow-left",
          css: "back-icon",
          width: 40,
          click: () => {
            if (window.showView) window.showView("settings");
          },
        },

        {
          template: "🔔 Notification Settings",
          type: "header",
          css: "setting-header",
          borderless: true,
          padding: { left: 10 },
          gravity: 3,
        },
      ],
    },
    {
      template: "Notification Preferences",
      type: "section",
      css: "sub-header",
    },
    { view: "checkbox", label: "Email Alerts", name: "email_alerts" },
    {
      view: "checkbox",
      label: "Push Notifications",
      name: "push_notifications",
    },
    {
      view: "richselect",
      label: "Notification Frequency",
      name: "notification_frequency",
      options: [
        { id: "IM", value: "Immediately" },
        { id: "DA", value: "Daily" },
        { id: "WE", value: "Weekly" },
      ],
    },
    { view: "text", label: "Notification Sound", name: "notification_sound" },
    {
      view: "richselect",
      label: "Sound Mode",
      name: "sound_mode",
      options: [
        { id: "SO", value: "Sound" },
        { id: "VI", value: "Vibrate" },
        { id: "SI", value: "Silent" },
      ],
    },
    { view: "checkbox", label: "Text Preview", name: "text_preview" },
    { view: "checkbox", label: "Media Preview", name: "media_preview" },
    { view: "checkbox", label: "Mute All Notifications", name: "mute_all" },
    { view: "text", label: "Message Tone", name: "message_tone" },
    { view: "text", label: "Group Message Tone", name: "group_message_tone" },

    {
      margin: 10,
      cols: [
        {
          view: "button",
          value: "Save",
          type: "form",
          click: function () {
            const form = this.getFormView();
            if (!form.validate()) {
              webix.message({
                type: "error",
                text: "Please fill in required fields",
              });
              return;
            }
            const values = form.getValues();

            const notification_settings = {
              email_alerts: values.email_alerts ?? true,
              push_notifications: values.push_notifications ?? true,
              notification_frequency: values.notification_frequency || "IM",
              notification_sound: values.notification_sound || "Default",
              sound_mode: values.sound_mode || "SO",
              text_preview: values.text_preview ?? true,
              media_preview: values.media_preview ?? true,
              mute_all: values.mute_all ?? false,
              message_tone: values.message_tone || "Default",
              group_message_tone: values.group_message_tone || "Default",
            };

            const payload = {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone_number: values.phone_number,
              date_of_birth: values.dob,

              education: education,
              professional_info: professional_info,
              notification_settings: notification_settings,
              theme_settings: theme_settings,
              privacy_settings: privacy_settings,
            };

            console.log("Saving user data:", payload);
            api
              .updateUserData(getUserIdFromURL(), payload)
              .then(() => {
                webix.message({
                  type: "success",
                  text: "User updated successfully!",
                });
              })
              .catch((err) => {
                webix.message({
                  type: "error",
                  text: "Failed to update user.",
                });
                console.error(err);
              });
          },
        },
        {
          view: "button",
          value: "Clear",
          click: function () {
            this.getFormView().clear();
          },
        },
      ],
    },
  ],
  on: {
    onViewShow: function () {
      const userId = getUserIdFromURL();
      if (userId) {
        api.getUserData(userId).then((userData) => {
          if (userData && userData.notification_settings) {
            const notification = userData.notification_settings;
            const formValues = {
              email_alerts: notification.email_alerts ?? true,
              push_notifications: notification.push_notifications ?? true,
              notification_frequency:
                notification.notification_frequency || "IM",
              notification_sound: notification.notification_sound || "Default",
              sound_mode: notification.sound_mode || "SO",
              text_preview: notification.text_preview ?? true,
              media_preview: notification.media_preview ?? true,
              mute_all: notification.mute_all ?? false,
              message_tone: notification.message_tone || "Default",
              group_message_tone: notification.group_message_tone || "Default",
            };

            this.setValues(formValues);
          }
        });
      }
    },
  },
};
