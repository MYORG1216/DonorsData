sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.jsfragment("Donation.donors_data.fragments.form", {
        createContent(oData) {
            debugger;
            let oController = oData.controller;
            if (oController.getOwnerComponent()) {
                var oModel = oController.getOwnerComponent().getModel("DonorModel");
            }
            let oView = oController.getView();
            let oDonorModel = oData.model;
            let sId = oModel.getProperty("/SelectedDonor/DonorId");
            debugger;
            oView.oId = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "id"
                    })
                ],
                text: oBundle.getText("donor.id"),
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oIdInp = new sap.m.Input({
                value: {
                    path: "DonorModel>/count",
                    formatter: function(sData) {
                        debugger;
                        return sData + 1;
                    }
                },
                enabled: false,
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oIdEditInp = new sap.m.Input({
                value: sId,
                enabled: false,
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oName = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "name"
                    })
                ],
                text: oBundle.getText("donor.name"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oNameInp = new sap.m.Input({
                value: "{DnrModel>/createDonor/DonorName}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oGender = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "gender"
                    })
                ],
                text: oBundle.getText("donor.gender"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            let sData = oModel.getProperty("/SelectedDonor/Gender"),
                oTemp;
            if (sData && sData == "Male") {
                debugger;
                oTemp = 0;
            }
            if (sData && sData == "Female") {
                debugger;
                oTemp = 1;
            }
            oView.oRadioGroupInp = new sap.m.RadioButtonGroup({
                columns: 2,
                selectedIndex: (oData.action == oUserConsts.action.create) ? -1 : oTemp,
                buttons: [new sap.m.RadioButton({
                    text: oBundle.getText("donor.male"),
                }), new sap.m.RadioButton({
                    text: oBundle.getText("donor.female")
                })],
                select: (oEvt) => {
                    debugger;
                    let sData = oEvt.getSource().getSelectedButton().getText();
                    oDonorModel.setProperty("/createDonor/Gender", sData);
                },
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oAge = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "age"
                    })
                ],
                text: oBundle.getText("donor.age"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oStepInp = new sap.m.StepInput({
                min: 15,
                max: 60,
                step: 5,
                value: "{DnrModel>/createDonor/Age}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oMob = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "mob"
                    })
                ],
                text: oBundle.getText("donor.mob"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oMobInp = new sap.m.MaskInput({
                width: "100%",
                placeholderSymbol: "_",
                mask: "9999999999",
                value: "{DnrModel>/createDonor/MobileNo}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oBldGrp = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "bg"
                    })
                ],
                text: oBundle.getText("donor.blood_grp"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oBldGrpInp = new sap.m.ComboBox({
                width: "100%",
                placeholder: oBundle.getText("donor.blood_grp_ph"),
                value: "{DnrModel>/createDonor/BloodGroup}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            }).bindItems("DnrModel>/blood_groups", (sIdx, oCtx) => {
                debugger;
                return new sap.ui.core.Item({
                    text: "{DnrModel>opt}"
                })
            });
            oView.oDNo = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "dno"
                    })
                ],
                text: oBundle.getText("donor.dno"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oDNoInp = new sap.m.Input({
                value: "{DnrModel>/createDonor/Dno}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oArea = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "area"
                    })
                ],
                text: oBundle.getText("donor.area"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oAreaInp = new sap.m.Input({
                value: "{DnrModel>/createDonor/Area}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oCity = new sap.m.Label({
                labelFor: [
                    new sap.m.Text({
                        text: "city"
                    })
                ],
                text: oBundle.getText("donor.city"),
                required: true,
                layoutData: new sap.ui.layout.GridData({
                    span: "L4 M4 S12",
                })
            });
            oView.oCityInp = new sap.m.Input({
                value: "{DnrModel>/createDonor/City}",
                layoutData: new sap.ui.layout.GridData({
                    span: "L5 M5 S12",
                })
            });
            oView.oForm = new sap.ui.layout.form.SimpleForm({
                editable: true,
                layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                content: (oData.action == oUserConsts.action.create) ? [
                    oView.oId, oView.oIdInp,
                    oView.oName, oView.oNameInp,
                    oView.oGender, oView.oRadioGroupInp,
                    oView.oAge, oView.oStepInp,
                    oView.oMob, oView.oMobInp,
                    oView.oBldGrp, oView.oBldGrpInp,
                    oView.oDNo, oView.oDNoInp,
                    oView.oArea, oView.oAreaInp,
                    oView.oCity, oView.oCityInp
                ] : [
                    oView.oId, oView.oIdEditInp,
                    oView.oName, oView.oNameInp,
                    oView.oGender, oView.oRadioGroupInp,
                    oView.oAge, oView.oStepInp,
                    oView.oMob, oView.oMobInp,
                    oView.oBldGrp, oView.oBldGrpInp,
                    oView.oDNo, oView.oDNoInp,
                    oView.oArea, oView.oAreaInp,
                    oView.oCity, oView.oCityInp
                ]
            }).setModel(oDonorModel, "DnrModel");
            oView.oFormPage = new sap.m.Page({
                title: (oData.action == oUserConsts.action.create) ? oBundle.getText("form.titleAdd") : oBundle.getText("form.titleEdit"),
                headerContent: [
                    new sap.m.Button({
                        icon: oIcons.action.ok,
                        text: oBundle.getText("form.ok"),
                        press: () => {
                            debugger;
                            let oController = oData.controller,
                                oModel = oController.getOwnerComponent().getModel("DonorModel"),
                                oDonorCreateModel = oView.oForm.getModel("DnrModel"),
                                aGroupsData = oDonorCreateModel.getProperty("/blood_groups");
                            let count = oModel.getProperty("/count");
                            if (oData.action == oUserConsts.action.create) {
                                debugger;
                                oDonorModel.setProperty("/createDonor/DonorId", count + 1);
                            }
                            let oDnrData = oDonorCreateModel.getProperty("/createDonor");
                            debugger;
                            if (!oDnrData["DonorName"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.name_miss"))
                                return false;
                            }
                            if (!oDnrData["Gender"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.gender_miss"))
                                return false;
                            }
                            if (!oDnrData["Age"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.age_miss"))
                                return false;
                            }
                            if (!oDnrData["MobileNo"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.mob_miss"))
                                return false;
                            }
                            if (!oDnrData["BloodGroup"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.blood_grp_miss"))
                                return false;
                            }
                            if (oDnrData["BloodGroup"]) {
                                debugger;
                                let count1 = aGroupsData.length;
                                let count2 = 0;
                                aGroupsData.forEach((oObject) => {
                                    if (oDnrData["BloodGroup"] !== oObject.opt) {
                                        count2 = count2 + 1;
                                    }
                                });
                                if (count1 == count2) {
                                    debugger;
                                    sap.m.MessageToast.show(oBundle.getText("donor.blood_grp_improper"))
                                    return false;
                                }
                            }
                            if (!oDnrData["Dno"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.dno_miss"))
                                return false;
                            }
                            if (!oDnrData["Area"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.area_miss"))
                                return false;
                            }
                            if (!oDnrData["City"]) {
                                sap.m.MessageToast.show(oBundle.getText("donor.city_miss"))
                                return false;
                            }
                            if (!jQuery.isEmptyObject(oDnrData)) {
                                debugger;
                                if (oData.action == oUserConsts.action.create) {
                                    debugger;
                                    let aData = oModel.getProperty("/data/DonorsList");
                                    aData.push(oDnrData);
                                    oModel.setProperty("/data/DonorsList", JSON.parse(JSON.stringify(aData)));
                                    debugger;
                                    oView.oNavContainer.to(oView.oListPage, "flip", null, "duration:'slow'");
                                    let countInc = oModel.getProperty("/count");
                                    oModel.setProperty("/count", countInc + 1);
                                    this.clear(oDonorModel, oView);
                                } else {
                                    debugger;
                                    let aData = oModel.getProperty("/data/DonorsList");
                                    debugger;
                                    oModel.setProperty("/data/DonorsList", JSON.parse(JSON.stringify(aData)));
                                    let oSelected = oModel.getProperty("/SelectedDonor");
                                    oModel.setProperty("/SelectedDonor", JSON.parse(JSON.stringify(oSelected)));
                                    oModel.setProperty("/tmp", JSON.parse(JSON.stringify(oSelected)));
                                    debugger;
                                    oView.oNavCntrDetails.to(oView.oDetailsPage, "flip", null, "duration:'slow'");
                                    this.clear(oDonorModel, oView);
                                }
                            }
                        }
                    }),
                    new sap.m.Button({
                        icon: oIcons.action.cancel,
                        text: oBundle.getText("form.cancel"),
                        press: () => {
                            debugger;
                            if (oData.action == oUserConsts.action.create) {
                                debugger;
                                this.clear(oDonorModel, oView);
                                oView.oNavContainer.to(oView.oListPage, "flip", null, "duration:'slow'");
                            } else {
                                debugger;
                                let aData = oModel.getProperty("/data/DonorsList"),
                                    oDonorCreateModel = oView.oForm.getModel("DnrModel"),
                                    oDonorData = oDonorCreateModel.getProperty("/createDonor"),
                                    oTmpData = oModel.getProperty("/tmp");
                                oModel.setProperty("/SelectedDonor", oTmpData);
                                debugger;
                                let sIndex = aData.findIndex((oItem) => {
                                    return oItem.DonorId === oDonorData["DonorId"];
                                });
                                if (sIndex !== -1) {
                                    debugger;
                                    aData.splice(sIndex, 1, oTmpData);
                                }
                                oView.oNavCntrDetails.to(oView.oDetailsPage, "flip", null, "duration:'slow'");
                                this.clear(oDonorModel, oView);
                            }

                        }
                    })
                ],
                content: [
                    oView.oForm
                ]
            });
            return oView.oFormPage;
        },

        clear(oDonorModel, oView) {
            debugger;
            let oObj = oDonorModel.getProperty("/createDonor");
            oObj.DonorId = "";
            oObj.DonorName = "";
            oObj.Gender = "";
            oObj.Age = "";
            oObj.MobileNo = "";
            oObj.BloodGroup = "";
            oObj.Dno = "";
            oObj.Area = "";
            oObj.City = "";
            oDonorModel.setProperty("/createDonor", oObj);
            oView.oRadioGroupInp.setSelectedIndex(-1);
            oView.oStepInp.setValue(15);
            oView.oBldGrpInp.setSelectedItem(null);
        }

    })
})