import instance from "@/lib/services/axios-config";

const confirmVnPayPayment = async (orderId: string): Promise<{
    code: number;
}> => {
    try {
        const placeOrderFromCartUrl = `orders/order/${orderId}/confirm-vnpay-payment`;
        await instance.put(placeOrderFromCartUrl);

        return {
            code: 1,
        };
    } catch {
        return {
            code: -1,
        };
    }
};

const confirmCashPayment = async (orderId: string): Promise<{
    code: number;
}> => {
    try {
        const placeOrderFromCartUrl = `orders/order/${orderId}/confirm-cash-payment`;
        await instance.put(placeOrderFromCartUrl);

        return {
            code: 1,
        };
    } catch {
        return {
            code: -1,
        };
    }
};

const confirmPayment = async (orderId: string, isCash: boolean): Promise<{
    code: number;
}> => {
    let res;
    if (isCash)
        res = await confirmCashPayment(orderId);

    else
        res = await confirmVnPayPayment(orderId);

    return { code: res.code }
};

export {
    confirmPayment
};
