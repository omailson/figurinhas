var EventDispatcher = function () {
    this._listeners = [];
};

EventDispatcher.bind = function (obj, eventName) {
    var eventNameCapitalized = eventName.charAt(0).toUpperCase() + eventName.slice(1);
    var addMethodName = "add" + eventNameCapitalized + "EventListener";
    var removeMethodName = "remove" + eventNameCapitalized + "EventListener";
    if (obj[addMethodName] !== undefined || obj[removeMethodName] !== undefined) {
        throw new Error("Can't create an event called " + eventName);
    }

    var eventDispatcher = new EventDispatcher();
    obj[addMethodName] = function (listener) {
        eventDispatcher.addListener(listener);
    };

    obj[removeMethodName] = function (listener) {
        eventDispatcher.removeListener(listener);
    };

    return eventDispatcher;
};

EventDispatcher.prototype.addListener = function (listener) {
    if (this._listeners.indexOf(listener) !== -1)
        return;

    this._listeners.push(listener);
};

EventDispatcher.prototype.dispatch = function () {
    for (var i = 0; i < this._listeners.length; i++)
        this._listeners[i].apply(null, arguments);
};

EventDispatcher.prototype.removeListener = function (listener) {
    var idx = this._listeners.indexOf(listener);
    if (idx === -1)
        return;

    this._listeners.splice(idx, 1);
};
