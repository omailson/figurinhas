var DebugDatabase = function () {
    Database.call(this);
};

DebugDatabase.prototype = new Database();
DebugDatabase.prototype.constructor = DebugDatabase;

DebugDatabase.prototype.add = function (item) {
    var defer = $.Deferred();

    setTimeout(function () {
        defer.resolve(item);
    }, 1000);

    return defer.promise();
};
