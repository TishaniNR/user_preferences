import { api } from "../utils/api";
import * as webix from "webix";
import { setUserId } from "../auth";

export const LoginPage = {
  view: "form",
  scroll: false,
  width: 300,
  elements: [
    { template: "🔐 Login", type: "header" },
    { view: "text", name: "email", label: "Email" },
    { view: "text", name: "password", type: "password", label: "Password" },
    {
      view: "button",
      name: "remember_me",
      label: "Create a new account",
      click: function () {
        if (window.showView) window.showView("signup");
      },
    },
    {
      view: "button",
      name: "forgot_password",
      label: "Forgot Password?",
      click: function () {
        if (window.showView) window.showView("forgot_password");
      },
    },
    {
      margin: 5,
      cols: [
        {
          view: "button",
          value: "Login",
          css: "webix_primary",
          click: async function () {
            const values = this.getFormView().getValues();
            const result = await api.login({
              email: values.email,
              password: values.password,
            });

            if (result.message) {
              // set user ID in authenticate current user
              setUserId(result.user_id);
              webix.message(result.message);
              // redirect to home page
              if (window.showView) window.showView("home");
            } else {
              webix.message({
                type: "error",
                text: result.error || "Login failed",
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
};
