var Formatter = {};

Formatter.formatItem = function (item) {
    item = item + ""; // int -> string conversion
    item = item.toUpperCase();

    return item;
};
