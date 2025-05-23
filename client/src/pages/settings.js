// export const menu_data_multi = [
//   { id: "account", icon: "mdi mdi-view-column", value:"Account", data:[
//     { id: "personal", icon:"mdi mdi-circle", value:"Personal Information"},
//     { id: "education", icon:"mdi mdi-circle", value:"Education"},
//     { id: "professional", icon:"mdi mdi-circle", value:"Professional Information"},
//     { id: "account_set", icon:"mdi mdi-circle", value:"Account Settings"},
//     { id: "password", icon:"mdi mdi-circle", value:"Change Password"},
//   ]},
//   {id: "notification", icon: "mdi mdi-calendar", value:"Notification"},
//   {id: "theme", icon: "mdi mdi-pencil", value:"Theme",  data:[
//     {id: "colors", icon:"mdi mdi-circle", value: "Colors"},
//     { id:"fonts", icon:"mdi mdi-circle", value:"Fonts"},
//     { id:"layouts", icon:"mdi mdi-circle", value:"Layouts"},
//   ]},
//   {id: "privacy", icon: "mdi mdi-book", value:"Privacy", data:[
//     {id : "visibility", value:"Profile Visibility"},
//     {id : "data" , value:"Data Sharing"},
//   ]},

// ];

import * as webix from "webix";

export const menu_data_multi = [
  { id: "account", icon: "wxi-user", value: "Account" },
  { id: "notification", icon: "mdi mdi-bell", value: "Notification" },
  { id: "theme", icon: "mdi mdi-palette", value: "Theme" },
  { id: "privacy", icon: "mdi mdi-lock", value: "Privacy" },
];

export const SettingsPage = {
  rows: [
    {
      view: "toolbar",
      css: "webix_dark",
      padding: 3,
      elements: [
        {
          view: "button",
          type: "icon",
          icon: "mdi mdi-menu",
          width: 37,
          align: "left",
          css: "app_button",
          click: function () {
            $$("sidebar1").toggle();
          },
        },
        { view: "label", label: "Settings" },
        {},
        {
          view: "button",
          type: "icon",
          width: 45,
          css: "app_button",
          icon: "mdi mdi-home",
          click: function () {
            if (window.showView) window.showView("home");
          },
        },
        {
          view: "button",
          type: "icon",
          width: 45,
          css: "app_button",
          icon: "mdi mdi-comment",
          badge: 8,
        },
        {
          view: "button",
          type: "icon",
          width: 45,
          css: "app_button",
          icon: "mdi mdi-bell",
          badge: 4,
        },
      ],
    },
    {
      cols: [
        {
          view: "sidebar",
          id: "sidebar1",
          css: "webix_dark",
          width: 300,
          data: menu_data_multi,
          on: {
            onAfterSelect: function (id) {
              webix.message("Selected " + this.getItem(id).value);

              const contentArea = $$("content_area");
              if (!contentArea) return;

              switch (id) {
                case "account":
                  contentArea.define(
                    "template",
                    "<h2>Account Settings Content Here</h2>"
                  );
                  contentArea.refresh();
                  break;
                case "notification":
                  contentArea.define(
                    "template",
                    "<h2>Notification Settings Content Here</h2>"
                  );
                  contentArea.refresh();
                  break;
                case "theme":
                  contentArea.define(
                    "template",
                    "<h2>Theme Settings Content Here</h2>"
                  );
                  contentArea.refresh();
                  break;
                case "privacy":
                  contentArea.define(
                    "template",
                    "<h2>Privacy Settings Content Here</h2>"
                  );
                  contentArea.refresh();
                  break;
                default:
                  contentArea.define(
                    "template",
                    "Select an option from the menu"
                  );
                  contentArea.refresh();
              }
            },
          },
        },
        {
          view: "template",
          id: "content_area",
          template: "Select an option from the menu",
          padding: 20,
          fillspace: true,
        },
      ],
    },
  ],
};

/// page change
// export const SettingsPage = {
//   rows: [
//     {
//       view: "toolbar",
//       css: "webix_dark",
//       padding: 3,
//       elements: [
//         {
//           view: "button",
//           type: "icon",
//           icon: "mdi mdi-menu",
//           width: 37,
//           align: "left",
//           css: "app_button",
//           click: function () {
//             $$("sidebar1").toggle();
//           },
//         },
//         { view: "label", label: "Settings" },
//         {},
//         //home
//         { view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-home", click: function () {
//           if (window.showView) window.showView("home");
//         } },
//         { view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-comment", badge: 8 },
//         { view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-bell", badge: 4},
//       ],
//     },
//     {
//       cols: [
//         {
//           view: "sidebar",
//           id: "sidebar1",
//           css: "webix_dark",
//           width: 300,
//           data: menu_data_multi,
//           on: {
//             onAfterSelect: function (id) {

//               webix.message("Selected " + this.getItem(id).value);
//               if (window.showView) window.showView(id);
//             },
//           },
//         },
//         { template: "Select an option from the menu", padding: 20, fillspace: true },
//       ],
//     },
//   ],
// };
