"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgFormat = pgFormat;
function pgFormat(value) {
    if (typeof value !== "string") {
        return value?.toString();
    }
    return value.replaceAll("'", "''");
}
