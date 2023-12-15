const crypto = require('crypto');
const dateFormat = require('date-and-time') 
const moment = require('moment');
class VnpayService {
    constructor() { };
    // Contains only allowed characters
    async getIpAddress(req) {
        let ipAddress;
        try {
            ipAddress = req.headers['X-FORWARDED-FOR'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        } catch (error) {
            ipAddress = `Invalid IP: ${error.message}`;
        }
        return ipAddress;
    }

    async hmacSHA512(secret, data) {
        return crypto.createHmac('sha512', secret).update(data).digest('hex');
    }
    
    async vnpRequest(orderDto, req) {
        // var date = new Date();
        // var createDate = await dateFormat.format(date, 'yyyymmddHHmmss');
        // var orderId = String(orderDto.orderId);
        // var amount = req.body.amount;
        // var bankCode = req.body.bankCode;

        // var orderInfo = req.body.orderDescription;
        // var orderType = req.body.orderType;
        // var locale = req.body.language;
        // if(locale === null || locale === ''){
        //     locale = 'vn';
        // }
        

        // var currCode = 'VND';
        // var vnp_Params = {};
        // vnp_Params['vnp_Version'] = '2.1.0';
        // vnp_Params['vnp_Command'] = 'pay';
        // vnp_Params['vnp_TmnCode'] = '5BMOFXWN';
        // // vnp_Params['vnp_Merchant'] = ''
        // vnp_Params['vnp_Locale'] = locale;
        // vnp_Params['vnp_CurrCode'] = currCode;
        // vnp_Params['vnp_TxnRef'] = orderId;
        // vnp_Params['vnp_OrderInfo'] = orderInfo;
        // vnp_Params['vnp_OrderType'] = orderType;
        // vnp_Params['vnp_Amount'] = String(orderDto.total * 100);
        // vnp_Params['vnp_ReturnUrl'] = "http://localhost:3030/payment/vnpay";
        // vnp_Params['vnp_IpAddr'] = await this.getIpAddress(req);
        // vnp_Params['vnp_CreateDate'] = createDate;
        // if(bankCode !== null && bankCode !== ''){
        //     vnp_Params['vnp_BankCode'] = bankCode;
        // }
        // var vnp_Params = {
        //     vnp_Version: '2.1.0',
        //     vnp_Command: 'pay',
        //     vnp_TmnCode: '5BMOFXWN',
        //     vnp_Locale: locale,
        //     vnp_CurrCode: currCode,
        //     vnp_TxnRef: orderId,
        //     vnp_OrderInfo: orderInfo,
        //     vnp_OrderType: orderType,
        //     vnp_Amount: String(orderDto.total * 100),
        //     vnp_ReturnUrl: 'http://localhost:3030/payment/vnpay',
        //     vnp_IpAddr: await this.getIpAddress(req),
        //     vnp_CreateDate: createDate
        // };

        // var querystring = require('qs');
        // var signData = querystring.stringify(vnp_Params, { encode: false });
        // var crypto = require("crypto");     
        // var hmac = crypto.createHmac("sha512", 'OAJTTSQYWOLVPDJAONKYCNXLXMLVNUCE');
        // var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        // vnp_Params['vnp_SecureHash'] = signed;
        // var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        // vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        // return vnpUrl;

        const vnp_CreateDate = moment().format('YYYYMMDDHHmmss');
        const vnp_ExpireDate = moment().add(15, 'minutes').format('YYYYMMDDHHmmss');
        console.log(vnp_CreateDate);
        console.log(vnp_ExpireDate);
    
        const request = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_Amount: String(orderDto.total),
            vnp_TxnRef: String(orderDto.orderId),
            vnp_BankCode: '',
            vnp_IpAddr: await this.getIpAddress(req),
            vnp_TmnCode: '5BMOFXWN', // Set your environment variable
            vnp_CurrCode: 'VND',
            vnp_Inv_Company: 'FILTRO',
            vnp_OrderType: 'other',
            vnp_OrderInfo: 'VnpayPayment',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: "http://localhost:3030/payment/vnpay",
            vnp_CreateDate,
            vnp_ExpireDate,
        };
    
        const rawData = await this.hashAllFields(request);
        const secureHash = await this.hmacSHA512('OAJTTSQYWOLVPDJAONKYCNXLXMLVNUCE', rawData);
    
        return `${'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'}?${rawData}&vnp_SecureHash=${secureHash}`;
    }
    
    async hashAllFields(request) {
        const sortedKeys = Object.keys(request).sort();
        const hashData = sortedKeys
            .map((key) => `${key}=${request[key]}`)
            .join('&');
        return hashData;
    }
    async sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
    
}
module.exports = VnpayService;