var LocalDatabase = function () {
    Database.call(this);

    this._database = this._createDatabase();
};

LocalDatabase.prototype = new Database();
LocalDatabase.prototype.constructor = LocalDatabase;

LocalDatabase.prototype._createDatabase = function () {
    var adapters = this._getAdapters();
    var lawnchair = new Lawnchair({name: "stickers", record: "sticker", adapter: adapters}, function () {});

    return lawnchair;
};

LocalDatabase.prototype._getAdapters = function () {
    var adapters = [];
    if (Modernizr.indexeddb)
        adapters.push("indexed-db");

    if (Modernizr.localstorage)
        adapters.push("dom");

    if (Modernizr.websqldatabase)
        adapters.push("webkit-sqlite");

    return adapters;
};

LocalDatabase.prototype.add = function (item) {
    var defer = $.Deferred();

    this._database.save({key: item}, function (obj) {
        defer.resolve(item);
    });

    return defer.promise();
};
