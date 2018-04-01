var StickerAlbum = function () {
};

StickerAlbum.prototype.count = function () {
    // 00 + 1 .. 681
    return 682;
};

StickerAlbum.prototype.list = function () {
    var list = [];

    list.push("00");
    for (var i = 1; i <= 681; i++) {
        // apparently this is fast than i.toString();
        // see: http://stackoverflow.com/a/5765401
        list.push(i + "");
    }

    return list;
};
