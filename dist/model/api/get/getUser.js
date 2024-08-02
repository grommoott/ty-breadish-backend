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
export default function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield bdClient.query(`select * from users where id='${userId}'`);
            const user = response.rows[0];
            if (!user) {
                return null;
            }
            const result = {
                id: user.id,
                username: user.username,
                passwordHash: user.password_hash,
                email: user.email,
                moment: user.moment
            };
            return result;
        }
        catch (e) {
            console.error("Error in getUser request:", e);
            return null;
        }
    });
}
