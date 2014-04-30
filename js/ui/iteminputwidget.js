var ItemInputWidget = function (item) {
    this._item = item;
    this._typeTimeoutID = 0;
    this._typingEventsEnabled = false;
    this._startedTypingListener = null;
    this._stoppedTypingListener = null;
};

ItemInputWidget.prototype.enableKeyPressEvent = function (callback) {
    this._item.keypress(callback);
};

ItemInputWidget.prototype.enableTypingEvents = function (startedListener, stoppedListener) {
    this._startedTypingListener = startedListener;
    this._stoppedTypingListener = stoppedListener;

    if (this._typingEventsEnabled)
        return;

    this._typingEventsEnabled = true;

    this._item
        .change(ItemInputWidget.prototype._stoppedTyping.bind(this))
        .keyup((function () {
            if (this._typeTimeoutID !== 0)
                clearTimeout(this._typeTimeoutID);
            else
                this._startedTyping();

            this._typeTimeoutID = setTimeout(
                ItemInputWidget.prototype._onTypeTimedout.bind(this),
                250);
        }).bind(this));
};

ItemInputWidget.prototype.value = function () {
    return this._item.val();
};

ItemInputWidget.prototype.setValue = function (value) {
    this._item.val(value);
};

ItemInputWidget.prototype.setFocus = function (focus) {
    if (focus)
        this._item.focus();
    else
        this._item.blur();
};

ItemInputWidget.prototype.setLineThrough = function (lineThrough) {
    if (lineThrough)
        this._item.css("text-decoration", "line-through");
    else
        this._item.css("text-decoration", "none");
};

ItemInputWidget.prototype._onTypeTimedout = function () {
    this._typeTimeoutID = 0;
    this._item.change();
};

ItemInputWidget.prototype._startedTyping = function () {
    if (this._startedTypingListener)
        this._startedTypingListener();
};

ItemInputWidget.prototype._stoppedTyping = function () {
    if (this._stoppedTypingListener)
        this._stoppedTypingListener();
};
