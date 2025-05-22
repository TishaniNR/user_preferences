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
          view: "button", value: "Login", css: "webix_primary", click: function () {
            webix.message("Logging in...");
          }
        },
        {
          view: "button", value: "Back", click: function () {
            if (window.showView) window.showView("home");
          }
        }
        
      ]
    }
  ]
};
