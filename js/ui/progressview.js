var ProgressView = function () {
    this._progressWidget = new ProgressWidget($("#progress"));
    this._total = 0;
    this._value = 0;
};

ProgressView.prototype.setTotal = function (total) {
    this._total = total;
};

ProgressView.prototype.setValue = function (value) {
    this._value = value;
    this._progressWidget.setValue(value);
};
