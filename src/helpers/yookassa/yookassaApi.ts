import { Price } from "@primitives";
import { Payment } from "./payment";
import { v4 as uuid } from "uuid"
import axios from "axios";
import config from "../../config";

class YookassaApi {
    private generateDefaultHeaders() {
        return {
            auth: {
                password: config.yookassaPassword,
                username: config.yookassaUsername
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

    public async refundPayment(amount: Price, paymentId: string): Promise<boolean | Error> {
        console.log("refundPayment")


        const response = await axios.post("https://api.yookassa.ru/v3/refunds", {
            amount: {
                value: amount.price,
                currency: "RUB"
            },
            paymentId
        }, this.generateDefaultHeaders())

        console.log(response)

        if (response.status !== 200) {
            return new Error("Error in refundPayment request", { cause: response.status })
        }

        return response.data.status === "succeeded"
    }
}

const yookassaApi = new YookassaApi()

export { yookassaApi }
