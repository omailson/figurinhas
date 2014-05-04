var ProgressWidget = function (item) {
    this._item = item;
    this._progressFill = this._item.find("#progressbar .fill");
    this._progressLabel = this._item.find(".progresstext span");
};

ProgressWidget.prototype.setValue = function (value) {
    this._progressFill.width(value + "%");
    this._progressLabel.html(Math.round(value));
};
