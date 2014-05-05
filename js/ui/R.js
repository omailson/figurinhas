var R = {
    AddButton: $("#add"),
    RemoveButton: $("#removebutton"),
    ConfirmButton: $("#confirmbutton"),
    InputText: {
        root: $("#item"),
        Parent: function () { return R.InputText.root.parent(); },
        KeyboardIcon: $("#keyboardiconwidget")
    },
    ProgressWidget: {
        root: $("#progress"),
        Fill: function () { return R.ProgressWidget.root.find("#progressbar .fill"); },
        Label: function () { return R.ProgressWidget.root.find(".progresstext span"); }
    }
};
