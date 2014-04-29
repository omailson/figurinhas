var View = function () {
    this.btnAdd = $("#add");
    this.inputWidget = new ItemInputWidget($("#item"));
    this.stickersList = $("#stickerslist");

    this._core = null;
};

View.prototype.init = function () {
    this.btnAdd.click(View.prototype._onBtnAddClicked.bind(this));
    this.inputWidget.enableKeyPressEvent(View.prototype._onTxtItemKeyPressed.bind(this));
    this._populateStickersList();
    this.inputWidget.enableListFilter(this.stickersList);

    this._core = new Core();
};

View.prototype.add = function () {
    var item = this.inputWidget.value();

    // Unfocus
    this.inputWidget.setFocus(false);
    // Disable all inputs
    this.disableInputs(true);

    var promise = this._core.add(item);
    promise.done((function () {
        this.inputWidget.setValue("");
    }).bind(this));

    promise.always((function () {
        // Enable all inputs
        this.disableInputs(false);
        // Refocus
        this.inputWidget.setFocus(true);
    }).bind(this));

    return promise;
};

View.prototype.disableInputs = function (disabled) {
    $("input").prop("disabled", disabled);
};

View.prototype._onBtnAddClicked = function () {
    if (this.inputWidget.value() === "") {
        this.inputWidget.setFocus(true);
        return;
    }

    var promise = this.add();
};

View.prototype._onTxtItemKeyPressed = function (e) {
    if (e.keyCode === 13 && !this._core.isBusy() && this.inputWidget.value() !== "")
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
