sap.ui.jsview("Donation.donors_data.DonorsApp", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf donors_data.DonorsApp
     */
    getControllerName: function() {
        return "Donation.donors_data.DonorsApp";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf donors_data.DonorsApp
     */
    createContent: function(oController) {
        return new sap.m.App("appContainer", {});
    }

});