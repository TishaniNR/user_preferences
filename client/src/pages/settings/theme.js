import * as webix from "webix";
import { getUserIdFromURL, api } from "../../utils/api";
export const ThemePage = {
  id: "theme",
  view: "form",
  scroll: true,
  padding: 20,
  width: 800,
  labelWidth: 200,
  elementsConfig: {
    labelPosition: "top",
    labelAlign: "left",
  },

  elements: [
    {
      cols: [
        {
          view: "icon",
          icon: "mdi mdi-arrow-left",
          css: "back-icon",
          width: 40,
          click: () => {
            if (window.showView) window.showView("settings");
          },
        },
        {
          template: "🎨 Theme Settings",
          type: "header",
          css: "setting-header",
          borderless: true,
          padding: { left: 10 },
          gravity: 3,
        },
      ],
    },
    { template: "Appearance", type: "section" },
    {
      view: "richselect",
      label: "Theme Mode",
      name: "theme_mode",
      options: [
        { id: "LI", value: "Light" },
        { id: "DA", value: "Dark" },
      ],
      on: {
        onChange: function (newVal) {
          if (newVal === "DA") {
            document.body.classList.add("dark-theme");
          } else {
            document.body.classList.remove("dark-theme");
          }
        },
      },
    },
    {
      view: "richselect",
      label: "Accent Color",
      name: "accent_color",
      options: [
        { id: "BL", value: "Blue" },
        { id: "GR", value: "Green" },
        { id: "PU", value: "Purple" },
        { id: "RE", value: "Red" },
      ],
      on: {
        onChange: function (newVal) {
          document.body.classList.remove(
            "accent-blue",
            "accent-green",
            "accent-purple",
            "accent-red"
          );

          switch (newVal) {
            case "BL":
              document.body.classList.add("accent-blue");
              break;
            case "GR":
              document.body.classList.add("accent-green");
              break;
            case "PU":
              document.body.classList.add("accent-purple");
              break;
            case "RE":
              document.body.classList.add("accent-red");
              break;
          }
        },
      },
    },
    {
      view: "richselect",
      label: "Font Style",
      name: "font_style",
      options: [
        { id: "DE", value: "Default" },
        { id: "SE", value: "Serif" },
        { id: "MO", value: "Monospace" },
      ],
      on: {
        onChange: function (newVal) {
          document.body.classList.remove(
            "font-default",
            "font-serif",
            "font-monospace"
          );

          switch (newVal) {
            case "DE":
              document.body.classList.add("font-default");
              break;
            case "SE":
              document.body.classList.add("font-serif");
              break;
            case "MO":
              document.body.classList.add("font-monospace");
              break;
          }
        },
      },
    },
    {
      view: "checkbox",
      labelRight: "High Contrast Mode",
      name: "high_contrast_mode",
      on: {
        onChange: function (newVal) {
          if (newVal) document.body.classList.add("high-contrast");
          else document.body.classList.remove("high-contrast");
        },
      },
    },
    {
      view: "checkbox",
      labelRight: "Reduced Motion",
      name: "reduced_motion",
    },

    {
      margin: 10,
      cols: [
        {
          view: "button",
          value: "Save",
          type: "form",
          click: function () {
            const form = this.getFormView();
            if (form.validate()) {
              const values = form.getValues();
              webix.message("Saved : " + JSON.stringify(values));
            }
          },
        },
        {
          view: "button",
          value: "Clear",
          click: function () {
            this.getFormView().clear();
          },
        },
      ],
    },
  ],
  on: {
    onViewShow: function () {
      const userId = getUserIdFromURL();
      if (userId) {
        api.getUserData(userId).then((userData) => {
          if (userData && userData.theme_settings) {
            const theme = userData.theme_settings;
            const formValues = {
              theme_mode: theme.mode || "LI",
              accent_color: theme.accent_color || "BL",
              font_style: theme.font_style || "DE",
              high_contrast_mode: theme.high_contrast_mode ?? false,
              reduced_motion: theme.reduced_motion ?? false,
            };

            this.setValues(formValues);

            if (formValues.theme_mode === "DA")
              document.body.classList.add("dark-theme");
            else document.body.classList.remove("dark-theme");

            const accentMap = {
              BL: "accent-blue",
              GR: "accent-green",
              PU: "accent-purple",
              RE: "accent-red",
            };
            Object.values(accentMap).forEach((c) =>
              document.body.classList.remove(c)
            );
            if (accentMap[formValues.accent_color])
              document.body.classList.add(accentMap[formValues.accent_color]);

            const fontMap = {
              DE: "font-default",
              SE: "font-serif",
              MO: "font-monospace",
            };
            Object.values(fontMap).forEach((c) =>
              document.body.classList.remove(c)
            );
            if (fontMap[formValues.font_style])
              document.body.classList.add(fontMap[formValues.font_style]);

            if (formValues.high_contrast_mode)
              document.body.classList.add("high-contrast");
            else document.body.classList.remove("high-contrast");
          }
        });
      }
    },
  },
};
