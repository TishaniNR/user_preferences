webix.ready(function () {
  webix.ui({
    rows: [
      {
        view: "toolbar",
        id: "toolbar",
        elements: [
          {
            view: "icon",
            icon: "mdi mdi-menu",
            click: function () {
              if ($$("menu").config.hidden) {
                $$("menu").show();
              } else $$("menu").hide();
            },
          },
          {
            view: "label",
            label: "Demo",
          },
        ],
      },
    ],
  });

  webix.ui({
    view: "sidemenu",
    id: "menu",
    width: 200,
    position: "left",
    state: function (state) {
      var toolbarHeight = $$("toolbar").$height;
      state.top = toolbarHeight;
      state.height -= toolbarHeight;
    },
    css: "my_menu",
    body: {
      view: "list",
      borderless: true,
      scroll: false,
      template: "<span class='webix_icon mdi mdi-#icon#'></span> #value#",
      data: [
        { id: 1, value: "Customers", icon: "account" },
        { id: 2, value: "Products", icon: "cube" },
        { id: 3, value: "Reports", icon: "chart-bar" },
        { id: 4, value: "Archives", icon: "database" },
        { id: 5, value: "Settings", icon: "cogs" },
      ],
      select: true,
      type: {
        height: 40,
      },
    },
  });
});
