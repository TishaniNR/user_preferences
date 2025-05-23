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
    labelWidth: 200,
    width: 300,
  },
  elements: [
    { template: "🔔 Notification Settings", type: "header" },
    { template: "Email Alerts", type: "section" },
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
            //implement data retreving 
          },
        },
      ],
    },
  ],
};
