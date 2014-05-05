var ProgressWidget = function (item) {
    this._item = item;
    this._progressFill = DOMTree.get(R.ProgressWidget.Fill);
    this._progressLabel = DOMTree.get(R.ProgressWidget.Label);
};

ProgressWidget.prototype.setValue = function (value) {
    this._progressFill.width(value + "%");
    this._progressLabel.html(Math.round(value));
};
