sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.jsfragment("Donation.donors_data.fragments.donations", {
        createContent(oData) {
            debugger;
            let oController = oData.controller;
            if (oController.getOwnerComponent()) {
                var oModel = oController.getOwnerComponent().getModel("DonorModel");
            }
            let oView = oController.getView();
            let oDonationModel = oData.model; 
            debugger; 
            oView.oDate = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "date"
                    })
                ],
                text: oBundle.getText("donor.date"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oDateInp = new sap.m.DatePicker({
                value: "{DonationModel>/addDonation/Ddate}",
                valueFormat: "ddMMyyyy",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oComment = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "comment"
                    })
                ],
                text: oBundle.getText("donor.comment"), 
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oCommentInp = new sap.m.TextArea({
                value: "{DonationModel>/addDonation/Comment}",
                rows: 4,
                maxLength: 200,
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oDonationForm = new sap.ui.layout.form.SimpleForm({
                editable: true,
                layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                content: [
                    oView.oDate, oView.oDateInp,
                    oView.oComment, oView.oCommentInp
                ]
            }).setModel(oDonationModel, "DonationModel");
            oView.oFormPage = new sap.m.Page({
                title: (oData.action == oUserConsts.action.add) ? oBundle.getText("dntsform.titleAdd") : oBundle.getText("dntsform.titleEdit"),
                headerContent: [
                    new sap.m.Button({
                        icon: oIcons.action.ok1,
                        text: oBundle.getText("form.ok"),
                        press: () => {
                            debugger;
                            let oController = oData.controller,
                                oModel = oController.getOwnerComponent().getModel("DonorModel"),
                                oDonorCreateModel = oView.oDonationForm.getModel("DonationModel"),
                                oDonationData = oDonorCreateModel.getProperty("/addDonation");
                            debugger;
                            if (!oDonationData["Ddate"]) {
                                sap.m.MessageToast.show(oBundle.getText("donation.date_miss"))
                                return false;
                            }
                            if (!jQuery.isEmptyObject(oDonationData)) {
                                debugger;
                                if (oData.action == oUserConsts.action.add) {
                                    debugger;
                                    let aDonationsData = oModel.getProperty("/SelectedDonor/Donations");
                                    let aData = oModel.getProperty("/data/DonorsList");
                                    aDonationsData.push(oDonationData);
                                    let count = oModel.getProperty("/SelectedDonor/Count");
                                    count = count + 1;
                                    oModel.setProperty("/SelectedDonor/Count", JSON.parse(JSON.stringify(count)));
                                    oModel.setProperty("/SelectedDonor/Donations", JSON.parse(JSON.stringify(aDonationsData)));
                                    oModel.setProperty("/tmp/Donations", JSON.parse(JSON.stringify(aDonationsData)));
                                    oModel.setProperty("/tmp/Count", JSON.parse(JSON.stringify(count)));
                                    oModel.setProperty("/data/DonorsList", JSON.parse(JSON.stringify(aData)));  
                                    debugger;
                                    oView.oDntsNavCntr.to(oView.oDntsTabPage, "flip", null, "duration:'slow'");
                                    this.clear(oDonationModel);
                                } else {
                                    debugger;

                                }
                            }
                        }
                    }),
                    new sap.m.Button({
                        icon: oIcons.action.cancel1,
                        text: oBundle.getText("form.cancel"),
                        press: () => {
                            debugger;
                            if (oData.action == oUserConsts.action.add) {
                                debugger;
                                oView.oDntsNavCntr.to(oView.oDntsTabPage, "flip", null, "duration:'slow'");
                                this.clear(oDonationModel);
                            } else {
                                debugger;

                            }
                        }
                    }),
                ],
                content: [
                    oView.oDonationForm
                ]
            }).addStyleClass("page");
            return oView.oFormPage;
        },
        
        clear(oDonationModel) {
            debugger;
            let oObj = oDonationModel.getProperty("/addDonation");
            oObj.Ddate = "";
            oObj.Comment = ""; 
            oDonationModel.setProperty("/addDonation", oObj);
        }

    })
})