import * as webix from "webix";
import { getUserId } from "../auth";
export const HomePage = {
  id: "home",
  view: "form",
  scroll: true,
  css: "home-background",
  rows: [
    {
      view: "template",
      template: "<div class='home-welcome'>Welcome to the Home Page</div>",
      borderless: true,
      autoheight: true,
      css: "transparent-template",
    },
    {
      view: "button",
      id: "loginBtn",
      label: "Login",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("login");
      },
    },
    {
      view: "button",
      id: "signupBtn",
      label: "Sign Up",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("signup");
      },
    },
    {
      view: "button",
      id: "settingBtn",
      hidden: true,
      label: "Go to Settings",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("settings");
      },
    },
    {
      view: "button",
      id: "logoutBtn",
      label: "Logout",
      hidden: true,
      width: 200,
      align: "center",
      click: async function () {
        const result = await webix.confirm({
          title: "Logout",
          text: "Are you sure you want to logout?",
          ok: "Yes",
          cancel: "No",
        });
        if (result) {
          localStorage.removeItem("userId");

          window.location.href = window.location.origin + "/home";
        }
      },
    },
    {
      view: "template",
      template:
        "<div class='home-footer'>About | Contact | Privacy Policy</div>",
      borderless: true,
      autoheight: true,
      css: "home-footer",
    },

    {},
  ],
  on: {
    onViewShow: function () {
      const userId = getUserId();
      //console.log("User ID:", userId);

      const loginBtn = this.queryView({ id: "loginBtn" });
      const signupBtn = this.queryView({ id: "signupBtn" });
      const logoutBtn = this.queryView({ id: "logoutBtn" });
      const settingsBtn = this.queryView({ id: "settingBtn" });

      if (userId) {
        if (settingsBtn) settingsBtn.show();
        if (logoutBtn) logoutBtn.show();
        if (loginBtn) loginBtn.hide();
        if (signupBtn) signupBtn.hide();

        const newUrl = `/home/${userId}`;
        if (window.location.pathname !== newUrl) {
          window.history.pushState({}, "", newUrl);
        }
      } else {
        if (settingsBtn) settingsBtn.hide();
        if (logoutBtn) logoutBtn.hide();
        if (loginBtn) loginBtn.show();
        if (signupBtn) signupBtn.show();

        const newUrl = `/home`;
        if (window.location.pathname !== newUrl) {
          window.history.pushState({}, "", newUrl);
        }
      }
    },
  },
};
