var Core = function () {
    this._busy = false;
};

Core.URI = "figurinhas.php";

Core.prototype.isBusy = function () {
    return this._busy;
};

Core.prototype.add = function (item) {
    this._busy = true;
    var defer = $.get(Core.URI, {add: item});

    defer.always((function () {
        this._busy = false;
    }).bind(this));

    return defer.promise();
};
