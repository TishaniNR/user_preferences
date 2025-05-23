import * as webix from "webix";
import { HomePage } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { SettingsPage } from "./pages/settings.js";
import { SignUpPage } from "./pages/signup.js";
import { ExtraComponents } from "./components/extra_components.js";
import { AccountSettingsPage } from "./pages/settings/account.js";
import { NotificationPage } from "./pages/settings/notification.js";
import { ThemePage } from "./pages/settings/theme.js";
import { PrivacyPage } from "./pages/settings/privacy.js";

webix.ready(function () {
  webix.ui({
    container: "app",
    view: "multiview",
    id: "mainView",
    width: window.innerWidth,
    height: window.innerHeight,
    cells: [
      { id: "home", ...HomePage },
      { id: "login", ...LoginPage },
      { id: "settings", ...SettingsPage },
      { id: "signup", ...SignUpPage },
      { id: "extra_components", ...ExtraComponents },
      { id: "account", ...AccountSettingsPage },
      { id: "notification", ...NotificationPage },
      { id: "theme", ...ThemePage },
      { id: "privacy", ...PrivacyPage },
    ],
  });

  window.showView = function (viewId) {
    if ($$("mainView")) {
      $$("mainView").setValue(viewId);
      window.location.hash = viewId;
    }
  };

  function syncViewFromHash() {
    const viewId = window.location.hash.replace("#", "") || "home";
    showView(viewId);
  }

  window.addEventListener("hashchange", syncViewFromHash);

  syncViewFromHash();
});
