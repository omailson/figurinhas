var Core = function () {
    this._busy = false;
    this._db = new LocalDatabase();
};

Core.prototype.isBusy = function () {
    return this._busy;
};

Core.prototype.add = function (item) {
    this._busy = true;
    var defer = this._db.add(item);

    defer.always((function () {
        this._busy = false;
    }).bind(this));

    return defer.promise();
};
