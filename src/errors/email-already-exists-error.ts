export class EmailAlreadyExistsErro extends Error {
    constructor() {
        super('Email already exists');
    }
}