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

          try {
            const result = await api.login({
              email: values.email,
              password: values.password,
            });

            if (result.message) {
              setUserId(result.user_id);
              webix.message(result.message);
              if (window.showView) window.showView("home");
            } else {
              webix.message({
                type: "error",
                text: "Invalid username or password",
              });
            }
          } catch (error) {
            console.error("Login error:", error);
            webix.message({
              type: "error",
              text: "ILogin failed. Please try again later.",
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
