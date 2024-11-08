"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodingApi = void 0;
const _primitives_1 = require("@primitives");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
class GeocodingApi {
    async fromCoords(coords) {
        try {
            const response = await axios_1.default.get(`https://api.maptiler.com/geocoding/${coords.longitude},${coords.latitude}.json?key=${config_1.default.maptilerApiKey}`);
            const features = Array.from(response.data.features);
            if (features.length == 0) {
                return "";
            }
            else {
                return features[0].place_name;
            }
        }
        catch (e) {
            const msg = "Error in fromCoords request: " + e;
            return new Error(msg);
        }
    }
    async fromQuery(query) {
        try {
            const response = await axios_1.default.get(`https://api.maptiler.com/geocoding/${query}.json?key=${config_1.default.maptilerApiKey}`);
            const features = Array.from(response.data.features);
            return features.map((feature) => _primitives_1.Coords.fromObject(feature.coordinates));
        }
        catch (e) {
            const msg = "Error in fromQuery request: " + e;
            return new Error(msg);
        }
    }
}
const geocodingApi = new GeocodingApi();
exports.geocodingApi = geocodingApi;
