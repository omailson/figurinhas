var RemoteDatabase = function () {
    Database.call(this);
};

RemoteDatabase.prototype = new Database();
RemoteDatabase.prototype.constructor = RemoteDatabase;

RemoteDatabase.URI = "server/figurinhas.php";

RemoteDatabase.prototype.add = function (item) {
    return $.get(RemoteDatabase.URI, {add: item});
};
