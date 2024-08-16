import { Price } from "@primitives";
import { Payment } from "./payment";
import { v4 as uuid } from "uuid"
import axios from "axios";

class YookassaApi {
    private generateDefaultHeaders() {
        return {
            auth: {
                password: "test_93Etl27AQaZPLT_rwLrwpGuc5lsP2QarOaxI2cEcBAY",
                username: "441129"
            },
            headers: {
                "Idempotence-Key": uuid()
            }
        }
    }

    public async createPayment(amount: Price, description: string, derirectUrl: string): Promise<Payment | Error> {
        const response = await axios.post("https://api.yookassa.ru/v3/payments", {
            amount: {
                value: amount.price,
                currency: "RUB"
            },
            capture: true,
            confirmation: {
                type: "redirect",
                return_url: derirectUrl
            },
            description: description
        }, this.generateDefaultHeaders())

        if (response.status !== 200) {
            return new Error("Error in createPayment request", { cause: response.status })
        }

        return response.data as Payment
    }
}

const yookassaApi = new YookassaApi()

export { yookassaApi }
