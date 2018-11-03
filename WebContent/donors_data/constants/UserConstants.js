sap.ui.define(["jquery.sap.global"], (jQuery) => {
    "use strict";
    jQuery.sap.declare("Donation.donors_data.constants.constantsData");
    const oAction = {
        "create": "ADD",
        "search": "SEARCH",
        "select": "SELECT",
        "delet": "DELETE",
        "yes": "YES",
        "no": "NO",
        "edit": "EDIT",
        "ok": "OK",
        "cancel": "CANCEL",
        "change": "CHANGE"
    };
    const oUserConstants = {
        "action": oAction
    };
    Object.freeze(oUserConstants);
    return oUserConstants;
});