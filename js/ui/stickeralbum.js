var StickerAlbum = function () {
};

StickerAlbum.prototype.count = function () {
    // 640 regular stickers + 9 advertising
    return 649;
};

StickerAlbum.prototype.list = function () {
    var list = [];
    for (var i = 0; i < 640; i++) {
        // apparently this is fast than i.toString();
        // see: http://stackoverflow.com/a/5765401
        list.push(i + "");
    }

    list.push("L1");
    list.push("L2");
    list.push("L3");
    list.push("L4");
    list.push("J1");
    list.push("J2");
    list.push("J3");
    list.push("J4");
    list.push("W1");

    return list;
};
