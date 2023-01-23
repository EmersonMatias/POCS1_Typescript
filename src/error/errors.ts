export function errorConflictHandling(name: string){
    const error = {
        type: "conflict_error",
        message: `${name} alredy exist`,
        status: 409
    }

    return error
}

export function errorDontExistHandling(name: string){
    const error = {
        type: "conflict_error",
        message: `${name} doesn´t exist`,
        status: 404
    }

    return error
}