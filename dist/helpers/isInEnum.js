"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInEnum = isInEnum;
function isInEnum(enumObject, value) {
    for (const val of Object.values(enumObject)) {
        if (val == value) {
            return true;
        }
    }
    return false;
}
