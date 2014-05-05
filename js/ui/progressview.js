var ProgressView = function () {
    this._progressWidget = new ProgressWidget(DOMTree.get(R.ProgressWidget));
    this._total = 0;
    this._value = 0;
};

ProgressView.prototype.setTotal = function (total) {
    this._total = total;
};

ProgressView.prototype.setValue = function (value) {
    this._value = value;
    this._progressWidget.setValue(value / this._total * 100);
};

ProgressView.prototype.itemAdded = function () {
    this.setValue(this._value + 1);
};

ProgressView.prototype.itemRemoved = function () {
    this.setValue(this._value - 1);
};
