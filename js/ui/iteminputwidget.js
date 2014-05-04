var ItemInputWidget = function (item) {
    this._item = item;
    this._typeTimeoutID = 0;
    this._typingEventsEnabled = false;
    this._startedTypingListener = null;
    this._stoppedTypingListener = null;
};

ItemInputWidget.prototype.keypress = function (callback) {
    this._item.keypress(callback);
};

ItemInputWidget.prototype.keydown = function (callback) {
    this._item.keydown(callback);
};

ItemInputWidget.prototype.enableTypingEvents = function (startedListener, stoppedListener, timeout) {
    timeout = timeout || 250;
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
                timeout);
        }).bind(this));
};

ItemInputWidget.prototype.value = function () {
    return this._item.val();
};

ItemInputWidget.prototype.setValue = function (value) {
    this._startedTyping();
    this._item.val(value);
    this._stoppedTyping();
};

ItemInputWidget.prototype.setFocus = function (focus) {
    if (focus)
        this._item.focus();
    else
        this._item.blur();
};

ItemInputWidget.prototype.setExists = function (exists) {
    if (exists)
        this._item.addClass("exists");
    else
        this._item.removeClass("exists");
};

ItemInputWidget.prototype.toggleKeyboard = function () {
    if (this.isNumericKeyboard())
        this.setNumericKeyboard(false);
    else
        this.setNumericKeyboard(true);
};

ItemInputWidget.prototype.setNumericKeyboard = function (numeric) {
    if (numeric) {
        this._item.prop("type", "number");
        this._item.prop("pattern", "\\d*");
    } else {
        this._item.prop("type", "text");
        this._item.prop("pattern", null);
    }
};

ItemInputWidget.prototype.isNumericKeyboard = function () {
    return this._item.prop("type") === "number";
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
