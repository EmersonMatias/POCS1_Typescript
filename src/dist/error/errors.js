export function errorConflictHandling(name) {
    var error = {
        type: "conflict_error",
        message: "".concat(name, " alredy exist"),
        status: 409
    };
    return error;
}
export function errorDontExistHandling(name) {
    var error = {
        type: "conflict_error",
        message: "".concat(name, " doesn\u00B4t exist"),
        status: 404
    };
    return error;
}
