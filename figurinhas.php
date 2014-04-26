<?php

define("FILENAME", "figurinhas.txt");

class ResponseError {
    public $code;
    public $message;
    function __construct($code, $message = "") {
        $this->code = $code;
        $this->message = $message;
    }
}

$response = response();
if ($response instanceof ResponseError) {
    http_response_code($response->code);
    echo $response->message;
} else {
    echo $response;
}

function response() {
    if (isset($_GET['add'])) {
        return addItem($_GET['add']);
    } else if (isset($_GET['read'])) {
        return read();
    } else {
        return new ResponseError(404, "Function not found");
    }
}

function addItem($item) {
    if (empty($item))
        return new ResponseError(500, "Argument required");

    if (!file_put_contents(FILENAME, $item . "\n", FILE_APPEND))
        return new ResponseError(500, "Error appending to file");

    return $item;
}

function read() {
    return file_get_contents(FILENAME);
}
