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

    item = Formatter.formatItem(item);

    this._database.save({key: item}, function (obj) {
        defer.resolve(item);
    });

    return defer.promise();
};

LocalDatabase.prototype.batchInsertion = function (items) {
    var defer = $.Deferred();

    var objs = items.map(function (item) {
        item = Formatter.formatItem(item);
        return {key: item};
    });

    this._database.batch(objs, function () {
        defer.resolve();
    });

    return defer.promise();
};

LocalDatabase.prototype.hasItem = function (item) {
    var defer = $.Deferred();

    item = Formatter.formatItem(item);

    this._database.exists(item, function (exists) {
        defer.resolve(exists);
    });

    return defer.promise();
};

LocalDatabase.prototype.remove = function (item) {
    var defer = $.Deferred();

    item = Formatter.formatItem(item);

    this._database.remove(item, function () {
        defer.resolve(item);
    });

    return defer.promise();
};

LocalDatabase.prototype.count = function () {
    var defer = $.Deferred();

    this._database.keys(function (keys) {
        defer.resolve(keys.length);
    });

    return defer.promise();
};

LocalDatabase.prototype.clear = function () {
    var defer = $.Deferred();

    this._database.nuke(function () {
        defer.resolve();
    });

    return defer.promise();
};
