// settings.js
export const menu_data_multi = [
  { id: "structure", icon: "mdi mdi-view-column", value:"Account", data:[
    { id: "layouts", icon:"mdi mdi-circle", value:"Privacy"},
    {id: "multiviews", icon:"mdi mdi-circle", value:"Account Settings"}
  ]},
  {id: "tools", icon: "mdi mdi-calendar", value:"Notification", data:[
    { id: "kanban", icon:"mdi mdi-circle", value: "Email"},
    { id: "pivot", icon:"mdi mdi-circle", value: "SMS"},
    { id: "scheduler", icon:"mdi mdi-circle", value: "System Alert"},
  ]},
  {id: "forms", icon: "mdi mdi-pencil", value:"Theme",  data:[
    {id: "buttons", icon:"mdi mdi-circle", value: "Buttons"},
    { id:"texts", icon:"mdi mdi-circle", value:"Text Fields"},
    { id:"selects", icon:"mdi mdi-circle", value:"Selectors"}
  ]},
  {id: "demo", icon: "mdi mdi-book", value:"Privacy"}
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
        { view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-comment", badge: 4 },
        { view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-bell", badge: 10 },
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
              webix.message("Selected: " + this.getItem(id).value);
            },
          },
        },
        { template: "Select an option from the menu", padding: 20, fillspace: true },
      ],
    },
  ],
};
