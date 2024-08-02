var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bdClient from "../bdClient.js";
export default function getFeatured(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield bdClient.query(`select * from featured where from=${userId}`);
            const result = new Array();
            for (let featured of response.rows) {
                result.push({
                    id: featured.id,
                    from: featured.from,
                    target: featured.target
                });
            }
            return result;
        }
        catch (e) {
            console.error("Error in getFeatured request:", e);
            return null;
        }
    });
}
