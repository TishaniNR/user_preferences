import * as webix from "webix";
export const PrivacyPage = {
    
    id: "privacy",
    view: "form",
    css: "webix_dark",
    elements: [
        { template: "🔒 Privacy Settings", type: "header" },
        { view: "richselect", label: "Profile Visibility", name: "profile_visibility", options: [
            { id: "PU", value: "Public" },
            { id: "FR", value: "Friends" },
            { id: "PR", value: "Private" }
        ]},
        { view: "checkbox", label: "Data Sharing Preference", name: "data_sharing_preference" },
        {
            margin: 10,
            cols: [
                {
                    view: "button",
                    value: "Save",
                    type: "form",
                    click: function () {
                        //implement data retreving 
                    }
                },


                {
                    view: "button",
                    value: "Clear",
                    click: function () {
                        this.getFormView().clear();
                    }
                }
            ]
        }
    ],
};