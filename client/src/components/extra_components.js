var form1 = [
  { view: "text", type: "password", label: "Password", name: "pass1" },
  { view: "text", type: "password", label: "Repeat password", name: "pass2" },
  {
    view: "button",
    value: "Submit",
    click: function () {
      this.getParentView().validate();
    },
  },
];

var menu = {
  view: "menu",
  id: "m1",
  layout: "y",
  width: 200,
  select: true,
  data: [
    { id: "1", value: "Translations", icon: "mdi mdi-qrcode", badge: 20 },
    { id: "2", value: "Comments", icon: "mdi mdi-comment", badge: 3 },
    { $template: "Spacer" },
    { id: "3", value: "Help" },
    { id: "4", value: "Info" },
    { id: "5", value: "About" },
  ],
  on: {
    onMenuItemClick: function (id) {
      $$("t1").setHTML("Click: " + this.getMenuItem(id).value);
    },
  },
};

export const ExtraComponents = {
  view: "form",
  scroll: true,
  rows: [
    {
      padding: 20,
      width: 400,
      view: "form",
      rows: [
        { type: "section", template: "Left labels" },
        { view: "switch", value: 1, label: "Light" },
        { view: "switch", value: 0, label: "Sound" },

        { type: "section", template: "Right labels" },
        { view: "switch", value: 0, labelWidth: 0, labelRight: "Sound" },
        { view: "switch", value: 1, labelWidth: 0, labelRight: "Light" },

        { type: "section", template: "On/Off labels" },
        { view: "switch", onLabel: "On", offLabel: "Off", value: 1 },
        { view: "switch", onLabel: "Play", offLabel: "Pause", value: 0 },
      ],
    },
    {
      type: "wide",
      cols: [menu, { id: "t1", template: " " }],
    },
    //menu

    {
      view: "form",
      scroll: false,
      width: 300,
      elements: [
        {
          template:
            "<div class='webix_icon mdi mdi-account'></div> <span class='text'>Login</span>",
          type: "header",
        },
        { view: "text", label: "Email", name: "email" },
        { view: "text", label: "Password", name: "password", type: "password" },
        { view: "button", value: "Login", css: "webix_primary" },
      ],
    },
    {
      view: "form",
      scroll: false,
      width: 300,
      elements: form1,
      rules: {
        $obj: function (data) {
          //password must not be empty
          if (!data.pass1) {
            webix.message("You need to specify password");
            return false;
          }
          //passwords must be equal
          if (data.pass1 != data.pass2) {
            webix.message("Passwords are not the same");
            return false;
          }
          return true;
        },
      },
      elementsConfig: {
        labelPosition: "top",
      },
    },
    {
      view: "form",
      rows: [
        {
          view: "uploader",
          value: "Upload file",
          multiple: false,
          autosend: false,
          name: "files",
          inputWidth: 150,
          link: "list1",
          upload: "https://docs.webix.com/samples/server/upload",
        },
        {
          view: "list",
          id: "list1",
          type: "uploader",
          autoheight: true,
          borderless: true,
        },
      ],
    },

    {
      view: "form",
      elements: [
        {
          view: "checkbox",
          labelRight: "Enable search",
          labelWidth: 0,
          value: 1,
        },
        {
          view: "radio",
          label: "Filter",
          labelPosition: "top",
          options: [
            { id: "1", value: "Disabled" },
            { id: "2", value: "Enabled" },
            { id: "3", value: "Per column" },
          ],
          value: "1",
        },
        {
          view: "switch",
          label: "Light",
          labelWidth: 60,
          labelRight: "Darkness",
          value: 1,
        },
        {
          view: "switch",
          label: "Theme",
          labelWidth: 60,
          value: 0,
          onLabel: "DARK",
          offLabel: "LIGHT",
        },
      ],
    },
    {
      view: "toolbar",
      height: 65,
      cols: [
        {
          view: "button",
          css: "icon_back_btn",
          label:
            '<span class="webix_icon mdi mdi-arrow-left"></span><span class="text">Back</span>',
          inputWidth: 100,
        },
        { view: "button", value: "New Color", inputWidth: 100, css: "bt_1" },
        {
          view: "button",
          css: "icon_btn",
          label:
            '<span class="webix_icon mdi mdi-music"></span><div class="text">Icon Button</div>',
          inputWidth: 100,
        },
        {
          view: "button",
          css: "image_btn",
          label: '<div class="image"></div><div class="text">Image</div>',
          inputWidth: 100,
        },
      ],
    },

    {
      view: "button",
      label: "Login",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("login"); // make sure showView exists
      },
    },
    {
      view: "button",
      label: "Sign Up",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("signup"); // make sure showView exists
      },
    },
    {
      view: "button",
      label: "Go to Settings",
      width: 200,
      align: "center",
      click: function () {
        if (window.showView) window.showView("settings"); // make sure showView exists
      },
    },

    {},
  ],
};
