import * as webix from "webix";
import { getUserIdFromURL, api } from "../../utils/api";
export const PrivacyPage = {
  id: "privacy",
  view: "form",
  css: "webix_dark",
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
          template: "🔒 Privacy Settings",
          type: "header",
          css: "setting-header",
          borderless: true,
          padding: { left: 10 },
          gravity: 3,
        },
      ],
    },
    {
      view: "richselect",
      label: "Profile Visibility",
      name: "profile_visibility",
      options: [
        { id: "PU", value: "Public" },
        { id: "FR", value: "Friends" },
        { id: "PR", value: "Private" },
      ],
    },
    {
      view: "checkbox",
      label: "Data Sharing Preference",
      name: "data_sharing_preference",
    },
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

            const education = values.education || [
              {
                high_school_name: values.high_school_name || "",
                high_school_year: parseInt(values.high_school_year) || null,
                university_name: values.university_name || "",
                degree: values.degree || "",
                start_year: parseInt(values.edu_start_year) || null,
                end_year: parseInt(values.edu_end_year) || null,
              },
            ];

            const professional_info = values.professional_info || [
              {
                current_job: values.current_job || "",
                job_title: values.job_title || "",
                company_name: values.company_name || "",
                employment_type: values.employment_type || "",
                start_date: values.prof_start_date || null,
              },
            ];

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

            const theme_settings = {
              mode: values.theme_mode || "LI",
              accent_color: values.accent_color || "BL",
              font_style: values.font_style || "DE",
              high_contrast_mode: values.high_contrast_mode ?? false,
              reduced_motion: values.reduced_motion ?? false,
            };

            const privacy_settings = {
              profile_visibility: values.profile_visibility || "PR",
              data_sharing_preference: values.data_sharing_preference ?? false,
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
          if (userData) {
            const formValues = {
              ...userData,
              profile_visibility:
                userData.privacy_settings?.profile_visibility || "PR",
              data_sharing_preference:
                userData.privacy_settings?.data_sharing_preference || false,
            };
            console.log("User data:", userData);
            this.setValues(formValues);
          }
        });
      }
    },
  },
};
