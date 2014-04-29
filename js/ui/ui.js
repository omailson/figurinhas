var View = function () {
    this.btnAdd = $("#add");
    this.txtItem = $("#item");
    this.stickersList = $("#stickerslist");

    this._core = null;
};

View.prototype.init = function () {
    this.btnAdd.click(View.prototype._onBtnAddClicked.bind(this));
    this.txtItem.keypress(View.prototype._onTxtItemKeyPressed.bind(this));
    this._populateStickersList();
    this._enableListFilter();

    this._core = new Core();
};

View.prototype.add = function () {
    var item = this.txtItem.val();

    // Unfocus
    this.txtItem.blur();
    // Disable all inputs
    this.disableInputs(true);

    var promise = this._core.add(item);
    promise.done((function () {
        this.txtItem.val("");
    }).bind(this));

    promise.always((function () {
        // Enable all inputs
        this.disableInputs(false);
        // Refocus
        this.txtItem.focus();
    }).bind(this));

    return promise;
};

View.prototype.disableInputs = function (disabled) {
    $("input").prop("disabled", disabled);
};

View.prototype._onBtnAddClicked = function () {
    if (this.txtItem.val() === "") {
        this.txtItem.focus();
        return;
    }

    var promise = this.add();
};

View.prototype._onTxtItemKeyPressed = function (e) {
    if (e.keyCode === 13 && !this._core.isBusy() && this.txtItem.val() !== "")
        this.add();
};

View.prototype._populateStickersList = function () {
    var stickerAlbum = new StickerAlbum();
    var stickers = stickerAlbum.list();
    var item;
    for (var i = 0; i < stickers.length; i++) {
        item = $("<li>").html(stickers[i]);
        this.stickersList.append(item);
    }
};

View.prototype._enableListFilter = function () {
    this.txtItem.change((function () {
        var filter = this.txtItem.val();
        this.stickersList.find("li:not(:contains(" + filter + "))").slideUp();
        var containsFilter = this.stickersList.find("li:contains(" + filter + ")");
        var filterFn = function () { return $(this).html().indexOf(filter) === 0; };
        // Contains filter but doesn't starts with it
        containsFilter.not(filterFn).slideUp();
        // Starts with filter
        containsFilter.filter(filterFn).slideDown();
    }).bind(this)).keyup(function () {
        $(this).change();
    });
};
