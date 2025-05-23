import { api } from "../api";
import * as webix from "webix";

export const LoginPage = {
  view: "form",
  scroll: false,
  width: 300,
  elements: [
    { template: "🔐 Login", type: "header" },
    { view: "text", name: "email", label: "Email" },
    { view: "text", name: "password", type: "password", label: "Password" },
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
