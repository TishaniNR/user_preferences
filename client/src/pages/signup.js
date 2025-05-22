export const SignUpPage = {
  view: "form",
  scroll: false,
  width: 300,
  elements: [
    { template: "Sign Up", type: "header" },
    { view: "text", name: "name", label: "Name" },
    { view: "text", name: "surname", label: "Surname" },
    { view: "text", name: "username", label: "Username" },
    { view: "text", name: "email", label: "Email" },
    { view: "text", name: "password", type: "password", label: "Password" },
    { view: "text", name: "confirm_password", type: "password", label: "Confirm Password" },
    {
      view: "checkbox", name: "terms", labelRight: "I agree to the terms and conditions", labelWidth: 0
    },
    {
      view: "checkbox", name: "newsletter", labelRight: "Subscribe to newsletter", labelWidth: 0
    },
    
    {
      margin: 5,
      cols: [
        {
          view: "button", value: "Sign Up", css: "webix_primary", click: function () {
            webix.message("Sign Up...");
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
