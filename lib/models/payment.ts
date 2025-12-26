export class Payment {
    constructor(
        public paymentId: string,
        public orderId: string,
        public paymentMethod: string,
        public paymentStatus: string,
        public vnpTxnRef: string,
        public amount: string,
        public orderInfo: string,
        public bankCode: string,
        public responseCode: string,
        public status: string,
        public transactionNo: string,
        public cardType: string,
        public paymentDate: Date,
    ) { }

    static fromJson(json: {
        paymentId: string;
        orderId: string;
        paymentMethod: string;
        paymentStatus: string;
        vnpTxnRef: string;
        amount: string;
        orderInfo: string;
        bankCode: string;
        responseCode: string;
        status: string;
        transactionNo: string;
        cardType: string;
        paymentDate: string; // backend trả về string ISO
    }): Payment {
        return new Payment(
            json.paymentId,
            json.orderId,
            json.paymentMethod,
            json.paymentStatus,
            json.vnpTxnRef,
            json.amount,
            json.orderInfo,
            json.bankCode,
            json.responseCode,
            json.status,
            json.transactionNo,
            json.cardType,
            new Date(json.paymentDate)
        );
    }
}
