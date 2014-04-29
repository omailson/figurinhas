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

    list.push("l1");
    list.push("l2");
    list.push("l3");
    list.push("l4");
    list.push("j1");
    list.push("j2");
    list.push("j3");
    list.push("j4");
    list.push("w1");

    return list;
};
