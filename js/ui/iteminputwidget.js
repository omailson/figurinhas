var ItemInputWidget = function (item) {
    this._item = item;
    this._typeTimeoutID = 0;
};

ItemInputWidget.prototype.enableKeyPressEvent = function (callback) {
    this._item.keypress(callback);
};

ItemInputWidget.prototype.enableListFilter = function (stickersList) {
    this._item.change((function () {
        var filter = this.value();
        stickersList.find("li:not(:contains(" + filter + "))").slideUp();
        var containsFilter = stickersList.find("li:contains(" + filter + ")");
        var filterFn = function () { return $(this).html().indexOf(filter) === 0; };
        // Contains filter but doesn't starts with it
        containsFilter.not(filterFn).slideUp();
        // Starts with filter
        containsFilter.filter(filterFn).slideDown();
    }).bind(this)).keyup((function () {
        if (this._typeTimeoutID !== 0)
            clearTimeout(this._typeTimeoutID);
        this._typeTimeoutID = setTimeout(ItemInputWidget.prototype._onTypeTimedout.bind(this), 250);
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

ItemInputWidget.prototype._onTypeTimedout = function () {
    this._typeTimeoutID = 0;
    this._item.change();
};
