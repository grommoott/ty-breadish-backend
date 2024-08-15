"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const _helpers_1 = require("@helpers");
class Email {
    _email;
    get email() {
        return this._email;
    }
    toString() {
        return this._email;
    }
    toBDView() {
        return `'${(0, _helpers_1.pgFormat)(this._email)}'`;
    }
    serialize() {
        return this._email;
    }
    constructor(email) {
        let isValid = true;
        const adressArr = email.split("@");
        const urlArr = adressArr[1]?.split(".");
        isValid = isValid && adressArr?.length == 2;
        isValid = isValid && adressArr[0]?.length > 0;
        isValid = isValid && adressArr[1]?.length > 0;
        isValid = isValid && urlArr?.length == 2;
        urlArr?.map((str) => {
            isValid = isValid && str.length > 0;
        });
        if (!isValid) {
            throw new Error(`Invalid email(${email})`);
        }
        this._email = email;
    }
}
exports.Email = Email;
