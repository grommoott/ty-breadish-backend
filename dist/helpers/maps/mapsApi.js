"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapsApi = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
class MapsApi {
    async getTile(x, y, z) {
        try {
            const response = await axios_1.default.get(`https://api.maptiler.com/maps/streets-v2/256/${z}/${x}/${y}.png?key=${config_1.default.maptilerApiKey}`, { responseType: "arraybuffer" });
            return response.data;
        }
        catch (e) {
            const msg = "Error in getTile request: " + e;
            return new Error(msg);
        }
    }
}
const mapsApi = new MapsApi();
exports.mapsApi = mapsApi;
