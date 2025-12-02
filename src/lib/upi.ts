interface UpiOptions {
    payeeVpa: string; // VPA of the payee
    payeeName: string; // Name of the payee
    amount: number; // Transaction amount
    currency?: string; // Currency code (INR)
    transactionNote?: string; // Note for the transaction
    transactionId?: string; // Unique transaction ID
}

export function generateUpiUrl(options: UpiOptions): string {
    const { 
        payeeVpa, 
        payeeName, 
        amount, 
        currency = 'INR', 
        transactionNote,
        transactionId
    } = options;

    const params = new URLSearchParams();
    params.set('pa', payeeVpa);
    params.set('pn', payeeName);
    params.set('am', amount.toString());
    params.set('cu', currency);
    if (transactionNote) {
        params.set('tn', transactionNote);
    }
    if (transactionId) {
        params.set('tr', transactionId);
    }

    return `upi://pay?${params.toString()}`;
}
