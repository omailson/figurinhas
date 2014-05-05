var Loader = {};

Loader.load = function (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = callback;
    script.onreadystatechange = callback;
    script.src = url;

    document.body.appendChild(script);
};
