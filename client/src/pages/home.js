export const HomePage = {
  view: "form",
  scroll: true,
  css: "home-background",
  rows: [
    {
      view: "button",
      label: "Login",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("login");
      },
    },
    {
      view: "button",
      label: "Sign Up",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("signup");
      },
    },
    {
      view: "button",
      label: "Go to Settings",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("settings");
      },
    },
    {},
  ],
};
