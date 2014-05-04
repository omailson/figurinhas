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

Core.prototype.remove = function (item) {
    this._busy = true;
    var defer = this._db.remove(item);

    defer.always((function () {
        this._busy = false;
    }).bind(this));

    return defer.promise();
};

Core.prototype.hasItem = function (item) {
    return this._db.hasItem(item);
};

Core.prototype.count = function () {
    return this._db.count();
};
