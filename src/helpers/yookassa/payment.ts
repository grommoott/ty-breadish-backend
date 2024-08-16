type Payment = {
    id: string,
    status: string,
    paid: boolean,
    amount: {
        value: string,
        currency: string
    },
    confirmation: {
        type: string,
        return_url: string,
        confirmation_url: string
    },
    created_at: string,
    description: string,
    metadata: object,
    payment_method: {
        type: string,
        id: string,
        saved: boolean
    },
    recipient: {
        account_id: string,
        gateway_id: string
    },
    refundable: boolean,
    test: boolean
}

export { Payment }
