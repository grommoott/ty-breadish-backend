"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = isEmpty;
function isEmpty(obj) {
    let fields = 0;
    for (const _ in obj) {
        fields++;
    }
    return fields == 0;
}
