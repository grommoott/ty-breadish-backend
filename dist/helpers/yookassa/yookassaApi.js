"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yookassaApi = void 0;
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
class YookassaApi {
    generateDefaultHeaders() {
        return {
            auth: {
                password: "test_93Etl27AQaZPLT_rwLrwpGuc5lsP2QarOaxI2cEcBAY",
                username: "441129"
            },
            headers: {
                "Idempotence-Key": (0, uuid_1.v4)()
            }
        };
    }
    _defaultAuth = {};
    async createPayment(amount, description, derirectUrl) {
        const response = await axios_1.default.post("https://api.yookassa.ru/v3/payments", {
            amount: {
                value: amount.price,
                currency: "RUB"
            },
            confirmation: {
                type: "redirect",
                return_url: derirectUrl
            },
            description: description
        }, this.generateDefaultHeaders());
        if (response.status !== 200) {
            return new Error("Error in createPayment request", { cause: response.status });
        }
        return response.data;
    }
}
const yookassaApi = new YookassaApi();
exports.yookassaApi = yookassaApi;
