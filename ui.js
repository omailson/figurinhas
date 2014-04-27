var sendAdd = function () {
    var item = $("#item").blur().val();
    // Disable all inputs
    $("input").prop("disabled", true);

    var promise = add(item);
    promise.done(function () {
        $("#item").val("");
    });

    promise.always(function () {
        // Enable all inputs
        $("input").prop("disabled", false);
        // Refocus
        $("#item").focus();
    });

    return promise;
};

$("#add").click(function () {
    if ($("#item").val() === "") {
        $("#item").focus();
        return;
    }
    var promise = sendAdd();
});

$("#item").keypress(function (e) {
    if (e.keyCode === 13 && !Figurinhas.BUSY && $(this).val() !== "")
        sendAdd();
});
