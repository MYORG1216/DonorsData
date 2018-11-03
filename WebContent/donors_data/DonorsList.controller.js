sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.controller("Donation.donors_data.DonorsList", {

        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf donors_data.DonorsList
         */
        //	onInit: function() {
        //
        //	},

        doOperations(oEvt, oData) {
            debugger;
            let oController = this,
                oView = oController.getView(),
                oModel = oController.getOwnerComponent().getModel("DonorModel"),
                oSource = oEvt.getSource(),
                oSelectedDonor,
                dId,
                aData = oModel.getProperty("/data/DonorsList");
            switch (oData["action"]) {
                case oUserConsts.action.search:
                    debugger;
                    let sSearchValue = oEvt.getSource().getValue();
                    let aFilters = [];
                    if (sSearchValue && sSearchValue.length > 0) {
                        let filter = new sap.ui.model.Filter({
                            filters: [new sap.ui.model.Filter("DonorId", sap.ui.model.FilterOperator.EQ, sSearchValue),
                                new sap.ui.model.Filter("DonorName", sap.ui.model.FilterOperator.Contains, sSearchValue)
                            ],
                        });
                        aFilters.push(filter);
                    }
                    let aBindingItems = oView.oList.getBinding("items");
                    aBindingItems.filter(aFilters, "Application");
                    break;
                case oUserConsts.action.select:
                    debugger;
                    dId = oEvt.getSource().oParent.getText();
                    dId = dId.replace(/[^\d.]/g, '');
                    debugger;
                    aData.forEach(function(oDnr) {
                        debugger;
                        if (oDnr.DonorId == dId) {
                            debugger;
                            oSelectedDonor = oDnr;
                        }
                    });
                    if (oSelectedDonor) {
                        debugger;
                        oModel.setProperty("/SelectedDonor", oSelectedDonor);
                        oModel.setProperty("/tmp", JSON.parse(JSON.stringify(oSelectedDonor)));
                        oController.getOwnerComponent().getRouter().navTo("view3", {
                            action: oUserConsts.action.select
                        });
                    }
                    break;
                case oUserConsts.action.delet:
                    debugger;
                    dId = oEvt.getSource().oParent.getText();
                    dId = dId.replace(/[^\d.]/g, '');
                    debugger;
                    aData.forEach(function(oDnr) {
                        debugger;
                        if (oDnr.DonorId == dId) {
                            debugger;
                            oSelectedDonor = oDnr;
                        }
                    });
                    if (oModel && oSelectedDonor) {
                        debugger;
                        oModel.setProperty("/SelectedDonor", oSelectedDonor);
                        oSelectedDonor = oModel.getProperty("/SelectedDonor");
                        let oDialogOptions = {
                            "title": oBundle.getText("delet.confirm"),
                            "message": oBundle.getText("delet.msg") + " " + oSelectedDonor.DonorId + " " + oBundle.getText("delet.qm"),
                            "showCancel": false
                        };
                        if (oSelectedDonor) {
                            debugger;
                            oController.prepareConfirmationDialog(oDialogOptions).then(function(sResult) {
                                switch (sResult) {
                                    case oUserConsts.action.yes:
                                        let aDonorData = oModel.getProperty("/data/DonorsList");
                                        if (aDonorData) {
                                            debugger;
                                            let sIndex = aDonorData.findIndex((oItem) => {
                                                return oItem.DonorId === oSelectedDonor.DonorId;
                                            });
                                            if (sIndex !== -1) {
                                                aDonorData.splice(sIndex, 1);
                                            }
                                            oModel.setProperty("/data/DonorsList", aDonorData);
                                            let count = oModel.getProperty("/count");
                                            oModel.setProperty("/count", count - 1);
                                            sap.m.MessageToast.show(oBundle.getText("donor.exist_id") + " " + oSelectedDonor.DonorId + " " + oBundle.getText("delet.success"), {
                                                duration: 80000
                                            })
                                        }
                                        break;
                                }
                            })
                        }
                        let aData = oModel.getProperty("/data/DonorsList");
                        oModel.setProperty("/data/DonorsList", aData);
                        debugger;
                    }
                    break;
            }
        },

        prepareConfirmationDialog: function(oOptions) {
            debugger;
            let oDeferred = jQuery.Deferred();
            let oDialog = new sap.m.Dialog({
                customHeader: [new sap.m.Bar({
                    contentMiddle: [new sap.m.Title({
                        text: oOptions["title"],
                    })]
                })],
                content: [new sap.m.Label({
                    text: oOptions["message"]
                })],
                buttons: [new sap.m.Button({
                    text: oBundle.getText("delet.yes"),
                    press: function(oEvt) {
                        oDeferred.resolve(oUserConsts.action.yes);
                        oDialog.destroy();
                    }
                }), new sap.m.Button({
                    text: oBundle.getText("delet.no"),
                    press: function(oEvt) {
                        oDeferred.resolve(oUserConsts.action.no);
                        oDialog.destroy();
                    }
                })]
            });
            oDialog.open();
            return oDeferred.promise();
        }
        /**
         * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
         * (NOT before the first rendering! onInit() is used for that one!).
         * @memberOf donors_data.DonorsList
         */
        //	onBeforeRendering: function() {
        //
        //	},

        /**
         * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
         * This hook is the same one that SAPUI5 controls get after being rendered.
         * @memberOf donors_data.DonorsList
         */
        //	onAfterRendering: function() {
        //
        //	},

        /**
         * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
         * @memberOf donors_data.DonorsList
         */
        //	onExit: function() {
        //
        //	}

    });
});