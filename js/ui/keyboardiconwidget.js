var KeyboardIconWidget = function (item) {
    this._item = item;

    this._clickCallback = null;
};

KeyboardIconWidget.prototype.init = function (inputParent) {
    this._item.detach();
    inputParent.append(this._item);
    inputParent.css("position", "relative"); // XXX
    this._item.show();

    this._item.click(this._onClicked.bind(this));
};

KeyboardIconWidget.prototype.setClickListener = function (listener) {
    this._clickCallback = listener;
};

KeyboardIconWidget.prototype._onClicked = function () {
    if (this._clickCallback)
        this._clickCallback();
};
