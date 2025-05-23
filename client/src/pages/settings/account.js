import * as webix from "webix";
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
    width: 300,
  },
  elements: [
    { template: "👤 Account Settings", type: "header" },
    { template: "Personal Information", type: "section" },
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
      name: "Email",
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
    { view: "text", label: "Password", name: "password", type: "password" },
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
            //implement data retreving 
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
  rules: {
    first_name: webix.rules.isNotEmpty,
    last_name: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    phone_number: webix.rules.isNumber,
  },
};
