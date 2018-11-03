sap.ui.define(["Donation/donors_data/constants/UserConstants", "Donation/donors_data/icons/icons"], (oUserConsts, oIcons) => {
    "use strict";
    sap.ui.controller("Donation.donors_data.DonorDetails", {

        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf donors_data.DonorDetails
         */
        //        	onInit: function() {
        // 
        //        	},

        doOperations(oEvt, oData) {
            debugger;
            let oController = this,
                oView = oController.getView(),
                oModel = oController.getOwnerComponent().getModel("DonorModel"),
                selectedDonor = oModel.getProperty("/SelectedDonor"),
                aBloodGroupsData = oModel.getProperty("/groups");
            debugger;
            switch (oData["action"]) {
                case oUserConsts.action.edit:
                    debugger;
                    let oEditDonorModel = new sap.ui.model.json.JSONModel({
                        "createDonor": selectedDonor,
                        "blood_groups": aBloodGroupsData,
                    });
                    oView.oEditPage = sap.ui.jsfragment("Donation.donors_data.fragments.form", {
                        "action": oUserConsts.action.edit,
                        "controller": oController,
                        "model": oEditDonorModel
                    });
                    let oPage = oView.oNavCntrDetails.getPages()[1];
                    if (oPage) {
                        oView.oNavCntrDetails.removePage(oPage);
                    }
                    oView.oNavCntrDetails.addPage(oView.oEditPage);
                    
//                    oView.oNavCntrDetails.removeAllPages();
//                    oView.oNavCntrDetails.addPage(oView.oDetailsPage);
//                    oView.oNavCntrDetails.addPage(oView.oEditPage); 
                    
                    oView.oNavCntrDetails.to(oView.oEditPage, "flip", null, "duration:'slow'");
                    break;
                    
                case oUserConsts.action.change:
                	debugger;
                	
            }
        }

        /**
         * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
         * (NOT before the first rendering! onInit() is used for that one!).
         * @memberOf donors_data.DonorDetails
         */
        //	onBeforeRendering: function() {
        //
        //	},

        /**
         * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
         * This hook is the same one that SAPUI5 controls get after being rendered.
         * @memberOf donors_data.DonorDetails
         */
        //	onAfterRendering: function() {
        //
        //	},

        /**
         * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
         * @memberOf donors_data.DonorDetails
         */
        //	onExit: function() {
        //
        //	}

    });
});