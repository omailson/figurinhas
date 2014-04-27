var Figurinhas = {
    BUSY: false,
    URI: "figurinhas.php"
};

var add = function (item) {
    Figurinhas.BUSY = true;
    var defer = $.get(Figurinhas.URI, {add: item});

    defer.always(function () {
        Figurinhas.BUSY = false;
    });

    return defer.promise();
};
