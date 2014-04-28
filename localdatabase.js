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

    // XXX Lawnchair version in use only support one adapter
    // The code below is from a more recent version of the lib
    // You can also update Lawnchair and change the code below to 'return adapters;'
    var adapter;
    for (var j = 0, k = adapters.length; j < k; j++) {
        // itirates over the array of available adapters
        for (var i = Lawnchair.adapters.length-1; i >= 0; i--) {
            if (Lawnchair.adapters[i].adapter === adapters[j]) {
                adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i].adapter : undefined;
                if (adapter) break;
            }
        }
        if (adapter) break;
    }

    if (adapter)
        return adapter;

    return "window-name";
};

LocalDatabase.prototype.add = function (item) {
    var defer = $.Deferred();

    this._database.save({key: item, value: true}, function (obj) {
        defer.resolve(item);
    });

    return defer.promise();
};
