import * as webix from "webix";
import { HomePage } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { SettingsPage } from "./pages/settings.js";
import { SignUpPage } from "./pages/signup.js";
import { ExtraComponents } from "./components/extra_components.js";


webix.ready(function () {
  webix.ui({
    container: "app",
    // Use a single full-height multiview directly:
    view: "multiview",
    id: "mainView",
    // Give it full height and width:
    width: window.innerWidth,
    height: window.innerHeight,
    cells: [
      { id: "home", ...HomePage },
      { id: "login", ...LoginPage },
      { id: "settings", ...SettingsPage },
      { id: "signup", ...SignUpPage },
      { id: "extra_components", ...ExtraComponents },
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
