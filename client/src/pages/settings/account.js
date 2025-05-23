import * as webix from "webix";
import { getUserIdFromURL, api } from "../../utils/api";
export const AccountSettingsPage = {
  id: "account",
  view: "form",
  scroll: true,
  padding: 20,
  width: 800,
  labelWidth: 200,
  elementsConfig: {
    labelPosition: "top",
    labelAlign: "left",
    labelWidth: 200,
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
          template: "👤 Account Settings",
          type: "header",
          css: "setting-header",
          borderless: true,
          padding: { left: 10 },

          gravity: 3,
        },
      ],
    },

    { template: "Personal Information", type: "section", css: "sub-header" },
    { view: "text", label: "First name", name: "first_name", required: true },
    { view: "text", label: "Last name", name: "last_name", required: true },
    {
      view: "datepicker",
      label: "Date of Birth",
      name: "dob",
      format: "%Y-%m-%d",
    },
    {
      view: "richselect",
      label: "Gender",
      name: "gender",
      options: [
        { id: "M", value: "Male" },
        { id: "F", value: "Female" },
        { id: "N", value: "Prefer not to say" },
      ],
    },
    { view: "text", label: "Nationality", name: "nationality" },
    {
      view: "richselect",
      label: "Marital Status",
      name: "marital_status",
      options: [
        { id: "SI", value: "Single" },
        { id: "MA", value: "Married" },
      ],
    },
    { view: "text", label: "Profile Picture URL", name: "profile_picture_url" },

    { template: "Contact Information", type: "section" },
    {
      view: "text",
      name: "email",
      label: "Email",
      required: true,
      invalidMessage: "Invalid email address",
    },
    { view: "text", label: "Phone Number", name: "phone_number" },
    { view: "text", label: "Address", name: "address" },

    { template: "Identity Verification", type: "section" },
    {
      view: "text",
      label: "National ID/Passport",
      name: "national_id_passport",
    },
    { view: "text", label: "Tax ID Number", name: "tax_id_number" },
    { view: "text", label: "Driver's License", name: "drivers_license" },

    { template: "Education", type: "section" },
    { view: "text", label: "High School Name", name: "high_school_name" },
    { view: "text", label: "High School Year", name: "high_school_year" },
    { view: "text", label: "University Name", name: "university_name" },
    { view: "text", label: "Degree", name: "degree" },
    {
      view: "datepicker",
      label: "Start Year",
      name: "start_year",
      format: "%Y",
    },
    { view: "datepicker", label: "End Year", name: "end_year", format: "%Y" },

    { template: "Professional Information", type: "section" },
    { view: "text", label: "Current Job", name: "current_job" },
    { view: "text", label: "Job Title", name: "job_title" },
    { view: "text", label: "Company Name", name: "company_name" },
    {
      view: "richselect",
      label: "Employment Type",
      name: "employment_type",
      options: [
        { id: "FT", value: "Full-time" },
        { id: "PT", value: "Part-time" },
        { id: "CT", value: "Contract" },
      ],
    },
    {
      view: "datepicker",
      label: "Start Date",
      name: "start_date",
      format: "%Y-%m-%d",
    },

    { template: "Security Settings", type: "section" },
    {
      view: "text",
      label: "Current Password",
      name: "password",
      type: "password",
    },
    {
      view: "text",
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
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
            const dobString = values.dob
              ? values.dob.toISOString().slice(0, 10)
              : null;

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
              ...values,
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone_number: values.phone_number,
              date_of_birth: dobString,
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
            const maritalStatusMap = {
              Single: "SI",
              Married: "MA",
              SI: "SI",
              MA: "MA",
            };
            const formData = {
              first_name: userData.first_name || "",
              last_name: userData.last_name || "",
              dob: userData.date_of_birth
                ? new Date(userData.date_of_birth)
                : null,
              gender: userData.gender || "",
              nationality: userData.nationality || "",
              marital_status: maritalStatusMap[userData.marital_status] || "",
              profile_picture_url: userData.profile_picture_url || "",

              email: userData.email || "",
              phone_number: userData.phone_number || "",
              address: userData.address || "",

              national_id_passport: userData.national_id_passport || "",
              tax_id_number: userData.tax_id_number || "",
              drivers_license: userData.drivers_license || "",

              high_school_name: userData.education?.[0]?.high_school_name || "",
              high_school_year: userData.education?.[0]?.high_school_year || "",
              university_name: userData.education?.[0]?.university_name || "",
              degree: userData.education?.[0]?.degree || "",
              start_year: userData.education?.[0]?.start_year || "",
              end_year: userData.education?.[0]?.end_year || "",

              current_job: userData.professional_info?.[0]?.current_job || "",
              job_title: userData.professional_info?.[0]?.job_title || "",
              company_name: userData.professional_info?.[0]?.company_name || "",
              employment_type:
                userData.professional_info?.[0]?.employment_type || "",
              start_date: userData.professional_info?.[0]?.start_date || "",

              password: "",
              confirm_password: "",
            };

            this.setValues(formData);
          }
        });
      }
    },
  },
  rules: {
    first_name: webix.rules.isNotEmpty,
    last_name: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    phone_number: webix.rules.isNumber,
  },
};
