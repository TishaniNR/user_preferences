export const ForgetPasswordPage = {
  view: "form",
  scroll: false,
  width: 300,
  elements: [
    { template: "🔐 Reset Password", type: "header" },
    { view: "text", name: "email", label: "Email" },
    {
      view: "button",
      name: "back_to_login",
      label: "Back to Login",
      click: function () {
        if (window.showView) window.showView("login");
      },
    },
    {
      margin: 5,
      cols: [
        {
          view: "button",
          value: "Send Reset Link",
          css: "webix_primary",
          click: async function () {
            const values = this.getFormView().getValues();
            const result = await api.sendResetLink({
              email: values.email,
            });

            if (result.message) {
              webix.message(result.message);

              if (window.showView) window.showView("login");
            } else {
              webix.message({
                type: "error",
                text: result.error || "Failed to send reset link",
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
