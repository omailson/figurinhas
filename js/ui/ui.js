var View = function () {
    this._inputParent = $.Deferred();

    this.btnAdd = DOMTree.get(R.AddButton);
    this.inputWidget = new ItemInputWidget(DOMTree.get(R.InputText));
    this.removeButton = new RemoveButtonWidget(DOMTree.get(R.RemoveButton), DOMTree.get(R.ConfirmButton));
    this.keyboardIconWidget = this._createKeyboardIconWidget(DOMTree.get(R.InputText.KeyboardIcon));

    this._core = null;
    this.progressView = null;
};

View.prototype.init = function () {
    $(document).on("pagecreate", this._onPageCreated.bind(this));
    window.scrollTo(0,1);

    this.btnAdd.click(View.prototype._onBtnAddClicked.bind(this));
    this.inputWidget.keypress(View.prototype._onTxtItemKeyPressed.bind(this));
    this.inputWidget.keydown(View.prototype._onTxtItemKeyDown.bind(this));
    this.inputWidget.enableTypingEvents(
            null,
            View.prototype._onStoppedTyping.bind(this));
    this.removeButton.setConfirmedCallback(this.remove.bind(this));
    this.removeButton.hide(false);

    this._core = new Core();
    this.progressView = this._createProgressView(this._core);
};

View.prototype._createProgressView = function (core) {
    var stickerAlbum = new StickerAlbum();
    var progressView = new ProgressView();

    progressView.setTotal(stickerAlbum.count());
    core.count().done(function (count) {
        progressView.setValue(count);
    });

    return progressView;
};

View.prototype._createKeyboardIconWidget = function (item) {
    var keyboardIconWidget = new KeyboardIconWidget(item);

    this._inputParent.done(function (inputParent) {
        keyboardIconWidget.init(inputParent);
    });

    keyboardIconWidget.setClickListener(this._onToggleKeyboard.bind(this));

    return keyboardIconWidget;
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
        this.progressView.itemAdded();
    }).bind(this));

    promise.always((function () {
        // Enable all inputs
        this.disableInputs(false);
        // Refocus
        this.inputWidget.setFocus(true);
    }).bind(this));

    return promise;
};

View.prototype.remove = function () {
    var item = this.inputWidget.value();

    // Unfocus
    this.inputWidget.setFocus(false);
    // Disable all inputs
    this.disableInputs(true);

    var promise = this._core.remove(item);
    promise.done((function () {
        this.inputWidget.setValue("");
        this.progressView.itemRemoved();
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
    DOMTree.get(R.InputText).prop("disabled", disabled);
};

View.prototype._onPageCreated = function () {
    this._inputParent.resolve(DOMTree.get(R.InputText.Parent));
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

View.prototype._onTxtItemKeyDown = function (e) {
    // Clear input if backspace is pressed
    if (e.which === 8) // Backspace
        this.inputWidget.setValue("");
};

View.prototype._onStoppedTyping = function () {
    var value = this.inputWidget.value();

    this._core.hasItem(value).done((function (exists) {
        this.inputWidget.setExists(exists);
        if (exists)
            this.removeButton.show();
        else
            this.removeButton.hide();
    }).bind(this));
};

View.prototype._onToggleKeyboard = function () {
    this.inputWidget.toggleKeyboard();
    this.inputWidget.setFocus(true);
};
