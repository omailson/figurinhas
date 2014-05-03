var RemoveButtonWidget = function (item, confirmButton) {
    this._item = item;
    this._confirmButton = confirmButton;
    this._confirmedCallback = null;

    this._init();
};

RemoveButtonWidget.prototype._init = function () {
    this._confirmButton.click(this._onConfirmed.bind(this));
};

RemoveButtonWidget.prototype._onClicked = function (e) {
    // do nothing
    // jQuery mobile already handle this
};

RemoveButtonWidget.prototype._onConfirmed = function (e) {
    if (this._confirmedCallback)
        this._confirmedCallback();
};

RemoveButtonWidget.prototype.setConfirmedCallback = function (callback) {
    this._confirmedCallback = callback;
};
