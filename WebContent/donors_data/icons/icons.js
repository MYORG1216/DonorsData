sap.ui.define(["sap/ui/core/IconPool"], (IconPool) => {
    "use strict";
    const Actions = {
        "create": IconPool.getIconURI("add"),
        "msg": IconPool.getIconURI("detail-view"),
        "display": IconPool.getIconURI("display-more"),
        "delet": IconPool.getIconURI("delete"),
        "edit": IconPool.getIconURI("edit"),
        "ok": IconPool.getIconURI("accept"),
        "cancel": IconPool.getIconURI("decline"),
        "save": IconPool.getIconURI("save"),
        "add": IconPool.getIconURI("add"),
        "remove": IconPool.getIconURI("delete"),
        "change": IconPool.getIconURI("edit"),
        "ok1": IconPool.getIconURI("accept"),
        "cancel1": IconPool.getIconURI("decline")
    };
    const oIcons = {
        "action": Actions
    };
    return oIcons;
});