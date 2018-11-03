sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.jsview("Donation.donors_data.DonorsList", {

        /** Specifies the Controller belonging to this View. 
         * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
         * @memberOf donors_data.DonorsList
         */
        getControllerName: function() {
            return "Donation.donors_data.DonorsList";
        },

        /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
         * Since the Controller is given to this method, its event handlers can be attached right away. 
         * @memberOf donors_data.DonorsList
         */
        createContent: function(oController) {
            debugger;
            let oView = this;
            let oModel = oController.getOwnerComponent().getModel("DonorModel");
            let aBloodGroupsData = oModel.getProperty("/groups");
            let oAddDonorModel = new sap.ui.model.json.JSONModel({
                "createDonor": {
                    "DonorId": "",
                    "DonorName": "",
                    "Gender": "",
                    "Age": "",
                    "MobileNo": "",
                    "BloodGroup": "",
                    "Dno": "",
                    "Area": "",
                    "City": "",
                    "Donations": [],
                    "Count": 0
                },
                "blood_groups": aBloodGroupsData,
            });
            debugger;
            oView.oSearchField = new sap.m.SearchField({
                enabled: {
                    path: "DonorModel>/count",
                    formatter: function(iCount) {
                        debugger;
                        if (iCount > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                liveChange: [{
                    "action": oUserConsts.action.search,
                }, oController.doOperations, oController]
            });
            oView.oMsg = new sap.m.MessagePage({
                text: oBundle.getText("list.msg_txt"),
                icon: oIcons.action.msg,
                showHeader: false,
                visible: {
                    path: "DonorModel>/count",
                    formatter: function(iCount) {
                        debugger;
                        if (iCount == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            });
            oView.oList = new sap.m.List({
                mode: sap.m.ListMode.None,
                noDataText: oBundle.getText("list.noData"),
                visible: {
                    path: "DonorModel>/count",
                    formatter: function(iCount) {
                        debugger;
                        if (iCount > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                items: {
                    path: "DonorModel>/data/DonorsList",
                    factory: (dIdx, oContext) => {
                        debugger;
                        return new sap.m.FeedListItem({
                            type: sap.m.ListType.None,
                            showIcon: false,
                            text: oBundle.getText("list.id") + "{DonorModel>DonorId}",
                            timestamp: oBundle.getText("list.name") + ":" + " " + "{DonorModel>DonorName}",
                            actions: [
                                new sap.m.FeedListItemAction({
                                    icon: oIcons.action.display,
                                    text: oBundle.getText("list_info"),
                                    key: "info",
                                    press: [{
                                        "action": oUserConsts.action.select
                                    }, oController.doOperations, oController]
                                }),
                                new sap.m.FeedListItemAction({
                                    icon: oIcons.action.delet,
                                    text: oBundle.getText("list_delet"),
                                    key: "delet",
                                    press: [{
                                        "action": oUserConsts.action.delet
                                    }, oController.doOperations, oController]
                                })
                            ]
                        })
                    }
                }
            });
            oView.oListPage = new sap.m.Page({
                title: oBundle.getText("list.title_txt"),
                showNavButton: true,
                showFooter: true,
                navButtonPress: () => {
                    oController.getOwnerComponent().getRouter().navTo("view1");
                },
                subHeader: new sap.m.Bar({
                    contentMiddle: oView.oSearchField,
                }),
                content: [
                    oView.oMsg,
                    oView.oList
                ],
                footer: [
                    new sap.m.Bar({
                        contentRight: [
                            new sap.m.Button({
                                text: {
                                    path: "DonorModel>/count",
                                    formatter: function(iCount) {
                                        debugger;
                                        if (iCount > 0) {
                                            return oBundle.getText("list.add_btn");
                                        } else {
                                            return oBundle.getText("list.add_btn1");
                                        }
                                    }
                                },
                                icon: oIcons.action.create,
                                press: () => {
                                    debugger;
                                    oView.oNavContainer.to(oView.oFormPage, "flip", null, "duration:'slow'");
                                }
                            })
                        ]
                    })
                ]
            });
            oView.oFormPage = sap.ui.jsfragment("Donation.donors_data.fragments.form", {
                "action": oUserConsts.action.create,
                "controller": oController,
                "model": oAddDonorModel
            });
            oView.oNavContainer = new sap.m.NavContainer({
                pages: [
                    oView.oListPage,
                    oView.oFormPage
                ]
            });
            return new sap.m.Page({
                showHeader: false,
                content: [
                    oView.oNavContainer
                ]
            });
        }

    });
});