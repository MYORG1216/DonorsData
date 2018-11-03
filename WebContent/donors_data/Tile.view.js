sap.ui.jsview("Donation.donors_data.Tile", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf donors_data.Tile
     */
    getControllerName: function() {
        return "Donation.donors_data.Tile";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf donors_data.Tile
     */
    createContent: function(oController) {
        debugger;
        let oView = this;
        oView.oTile = new sap.m.GenericTile({
            header: oBundle.getText("tile.hdr_txt"),
            subheader: oBundle.getText("tile.sub_hdr_txt"),
            press: () => {
                debugger;
                oController.tilePress()
            },
            tileContent: [
                new sap.m.TileContent({
                    content: [
                        new sap.m.ImageContent({
                            src: "images/donation.jpg"
                        })
                    ],
                    footer: oBundle.getText("tile.footer")
                })
            ]
        }).addStyleClass("tile");
        oView.oMarquee = new scroll({
            width: "1260px",
            text: oBundle.getText("tile.scroll_txt")
        }).addStyleClass("customize")
        return new sap.m.Page({
            title: oBundle.getText("tile.title_txt"),
            content: [
                oView.oTile,
                oView.oMarquee
            ]
        }).addStyleClass("title");
    }

});