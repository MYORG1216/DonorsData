sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.jsview("Donation.donors_data.DonorDetails", {

        /** Specifies the Controller belonging to this View. 
         * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
         * @memberOf donors_data.DonorDetails
         */
        getControllerName: function() {
            return "Donation.donors_data.DonorDetails";
        },

        /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
         * Since the Controller is given to this method, its event handlers can be attached right away. 
         * @memberOf donors_data.DonorDetails
         */
        createContent: function(oController) {
            debugger;
            let oView = this;
            let oSelected;
            oView.oUserHeaderPanel = oView.createHeaderPanel();
            let DonorModel = oController.getOwnerComponent().getModel("DonorModel");
            let selectedDonor = DonorModel.getProperty("/SelectedDonor");
            DonorModel.setProperty("/SelectedDonor", selectedDonor);
            let oAddDonationModel = new sap.ui.model.json.JSONModel({
                "addDonation": { 
                	"Ddate": "",
                    "Comment": ""
                } 
            });
            debugger;
            oView.oDonationsTable = new sap.m.Table({
                mode: sap.m.ListMode.SingleSelectMaster,
                select: (oEvt) => {
                	debugger;
                	oSelected = oEvt.getSource().getSelectedItem().getBindingContext("DonorModel").getObject();
                	if (oSelected) {
                		DonorModel.setProperty("/flag", true);
                		DonorModel.setProperty("/addFlag", false);
                	}
                },
            	columns: {
                    path: "DonorModel>/ColData",
                    factory: function(sId, oContext) {
                        debugger;
                        return new sap.m.Column({
                            header: new sap.m.Text({
                                text: "{DonorModel>value}"
                            })
                        })
                    }
                },
                items: {
                    path: "DonorModel>/SelectedDonor/Donations",
                    factory: function(eId, oContext) {
                        debugger;
                        return new sap.m.ColumnListItem({
                            cells: {
                                path: "DonorModel>/ColData",
                                factory: (sIdx, oCtx) => {
                                    debugger;
                                    let oRetObj = {}; 
                                   if (oCtx.getObject().key && oCtx.getObject().key === "Ddate") {
                                        debugger;
                                        oRetObj = new sap.m.Text({
                                            text: `{DonorModel>${oContext.getPath()}/${oCtx.getObject().key}}`, 
                                            width: "60%",  
                                        });
                                    } else {
                                        debugger;
                                        oRetObj = new sap.m.Text({ 
                                            text: `{DonorModel>${oContext.getPath()}/${oCtx.getObject().key}}`
                                        })
                                    }
                                    return oRetObj;
                                }
                            }
                        })
                    }
                }
            });
            oView.oDntsTabPage = new sap.m.Page({ 
                customHeader: [
                	new sap.m.Bar({
                		contentRight: [
                			new sap.m.Button({
                                icon: oIcons.action.add,
                                press: () => {
                                	debugger;
                                	oView.oDntsNavCntr.to(oView.oCreateDntsPage, "flip", null, "duration:'slow'");
                                }
                            }),
                            new sap.m.Button({
                                icon: oIcons.action.change,
                                enabled: "{DonorModel>/flag}",
                                press: [{
                                    "action": oUserConsts.action.change
                                }, oController.doOperations, oController, oSelected]
                            }),
                            new sap.m.Button({
                                icon: oIcons.action.remove,
                                enabled: "{DonorModel>/flag}"
                            })
                		]
                	}).addStyleClass("bar") 
                ],
                content: [
                    oView.oDonationsTable
                ]
            });
            oView.oCreateDntsPage =  sap.ui.jsfragment("Donation.donors_data.fragments.donations", {
                "action": oUserConsts.action.add,
                "controller": oController,
                "model": oAddDonationModel
            });
            oView.oEditDntsPage = new sap.m.Page({

            });
            oView.oDntsNavCntr = new sap.m.NavContainer({
                height: "18.9rem",
            	initialPage: oView.oDntsTabPage,
                pages: [
                    oView.oDntsTabPage,
                    oView.oCreateDntsPage,
                    oView.oEditDntsPage
                ]
            });
            oView.oIconTab = new sap.m.IconTabBar({
                items: [
                    new sap.m.IconTabFilter({
                        text: oBundle.getText("details.dnts") + "(" + "{DonorModel>/SelectedDonor/Count}" + ")",
                        content: [
                            oView.oDntsNavCntr
                        ]
                    })
                ]
            });
            oView.oDetailsPage = new sap.m.Page({
                title: oBundle.getText("donor.details") + " " + "{DonorModel>/SelectedDonor/DonorName}",
                headerContent: [
                    new sap.m.Button({
                        text: oBundle.getText("details.save"),
                        icon: oIcons.action.save,
                    })
                ],
                showNavButton: true,
                navButtonPress: () => {
                    debugger;
                    let aData = DonorModel.getProperty("/data/DonorsList");
                    DonorModel.setProperty("/data/DonorsList", aData);
                    oController.getOwnerComponent().getRouter().navTo("view2");
                },
                content: [
                    oView.oUserHeaderPanel,
                    oView.oIconTab
                ]
            });
            oView.oNavCntrDetails = new sap.m.NavContainer({
                pages: [
                    oView.oDetailsPage
                ]
            });
            return new sap.m.Page({
                showHeader: false,
                content: [
                    oView.oNavCntrDetails
                ]
            });
        },

        createHeaderPanel() {
            let oView = this,
                oController = oView.getController();
            oView.oUserHeader = new sap.m.ObjectHeader({
                title: "{DonorModel>/SelectedDonor/DonorName}",
                number: oBundle.getText("details.id") + " " + "{DonorModel>/SelectedDonor/DonorId}",
                attributes: [new sap.m.ObjectAttribute({
                        text: oBundle.getText("details.blood_grp") + " " + "{DonorModel>/SelectedDonor/BloodGroup}"
                    }),
                    new sap.m.ObjectAttribute({
                        text: oBundle.getText("details.gender_age") + " " + "{DonorModel>/SelectedDonor/Gender}" + "(" + "{DonorModel>/SelectedDonor/Age}" + ")"
                    }),
                    new sap.m.ObjectAttribute({
                        text: oBundle.getText("details.mob") + " " + "{DonorModel>/SelectedDonor/MobileNo}"
                    })
                ],
                statuses: [new sap.m.ObjectStatus({
                        title: oBundle.getText("details.dno") + " ",
                        text: "{DonorModel>/SelectedDonor/Dno}"
                    }), new sap.m.ObjectStatus({
                        title: oBundle.getText("details.area") + " ",
                        text: "{DonorModel>/SelectedDonor/Area}"
                    }),
                    new sap.m.ObjectStatus({
                        title: oBundle.getText("details.city") + " ",
                        text: "{DonorModel>/SelectedDonor/City}"
                    })
                ]
            });
            oView.oUserHeaderPanel = new sap.m.Panel({
                expandable: true,
                expanded: true,
                headerToolbar: new sap.m.Toolbar({
                    content: [
                        new sap.m.Title({
                            text: oBundle.getText("details.info")
                        }),
                        new sap.m.ToolbarSpacer({}),
                        new sap.m.Button({
                            text: oBundle.getText("details.edit"),
                            icon: oIcons.action.edit,
                            press: [{
                                "action": oUserConsts.action.edit
                            }, oController.doOperations, oController]
                        })
                    ]
                }),
                content: [oView.oUserHeader]
            });
            return oView.oUserHeaderPanel;
        }

    });
});