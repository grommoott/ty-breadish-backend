"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToImage = queryRowToImage;
function queryRowToImage(row) {
    if (!("id" in row && "category" in row && "extension" in row)) {
        throw new Error("Invalid query row to convert into IImage");
    }
    return {
        id: row.id,
        category: row.category,
        extension: row.extension
    };
}
