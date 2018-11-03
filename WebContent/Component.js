jQuery.sap.declare("Donation.Component");
sap.ui.core.UIComponent.extend("Donation.Component", {
    "metadata": {
        "rootView": {
            "viewName": "Donation.donors_data.DonorsApp",
            "type": "JS"
        },
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "viewType": "JS",
                "viewPath": "Donation.donors_data",
                "controlId": "appContainer",
                "controlAggregation": "pages",
                "async": true
            },
            "routes": [{
                "pattern": "",
                "name": "view1",
                "target": "tile"
            }, {
                "pattern": "Donors_List",
                "name": "view2",
                "target": "list"
            }, {
                "pattern": "Donors_Details",
                "name": "view3",
                "target": "details"
            }],
            "targets": {
                "tile": {
                    "viewName": "Tile",
                    "controlAggregation": "pages"
                },
                "list": {
                    "viewName": "DonorsList",
                    "controlAggregation": "pages"
                },
                "details": {
                    "viewName": "DonorDetails",
                    "controlAggregation": "pages"
                }
            }
        }
    },
    init: function() {
        debugger;
        this.oData = new sap.ui.model.json.JSONModel();
        this.oData.loadData("json/data.json");
        this.oData.attachRequestCompleted((oEvt) => {
            debugger;
            this.oInitialData = JSON.parse(JSON.stringify(oEvt.getSource().getData()));
        });
        this.setModel(this.oData, "DonorModel");
        window.oBundle = jQuery.sap.resources({
            "url": "donors_data/i18n/i18n.properties"
        })
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
    }
});