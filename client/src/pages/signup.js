import * as webix from "webix";
import { api } from "../api";
export const SignUpPage = {
  view: "form",
  scroll: false,
  width: 300,
  elements: [
    { template: "Sign Up", type: "header" },
    { view: "text", name: "name", label: "Name", required: true },
    { view: "text", name: "surname", label: "Surname", required: true },
    { view: "text", name: "username", label: "Username", required: true },
    {
      view: "text",
      name: "email",
      label: "Email",
      required: true,
      invalidMessage: "Invalid email",
    },
    {
      view: "text",
      name: "password",
      type: "password",
      label: "Password",
      required: true,
    },
    {
      view: "text",
      name: "confirm_password",
      type: "password",
      label: "Confirm Password",
      required: true,
      invalidMessage: "Passwords do not match",
    },
    {
      view: "checkbox",
      name: "terms",
      labelRight: "I agree to the terms and conditions",
      labelWidth: 0,
    },
    {
      view: "checkbox",
      name: "newsletter",
      labelRight: "Subscribe to newsletter",
      labelWidth: 0,
    },
    {
      margin: 5,
      cols: [
        {
          view: "button",
          value: "Sign Up",
          css: "webix_primary",
          click: async function () {
            const form = this.getFormView();
            if (!form.validate()) {
              webix.message({
                type: "error",
                text: "Please fill in required fields",
              });
              return;
            }
            const values = form.getValues();
            const result = await api.signup({
              first_name: values.name,
              last_name: values.surname,
              username: values.username,
              email: values.email,
              password: values.password,
              confirm_password: values.confirm_password,
              terms: values.terms,
              newsletter: values.newsletter,
            });
            if (result.message) {
              webix.message(result.message);
              if (window.showView) window.showView("home");
            } else {
              webix.message({
                type: "error",
                text: result.error || "Sign up failed",
              });
            }
          },
        },
        {
          view: "button",
          value: "Back",
          click: function () {
            if (window.showView) window.showView("home");
          },
        },
      ],
    },
  ],
  rules: {
    name: webix.rules.isNotEmpty,
    surname: webix.rules.isNotEmpty,
    username: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    password: function (value) {
      return value ? true : "Password is required";
    },
    confirm_password: function (value, obj) {
      return value === obj.password ? true : "Passwords do not match";
    },
    terms: function (value) {
      return value ? true : "You must agree to the terms";
    },
  },
  elementsConfig: {
    labelPosition: "top",
  },
};
