
const axios = require('axios');

let config = {
    // replace this key with yours
    "publicKey": "test_public_key_8fca9f8a93064f128c73600c7d3698e8",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://localhost:3000/",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log("Done");
            ;

            let data = {
                "token": payload.token,
                "amount": payload.amount
            };
            let config = {
                headers: { 'Authorization': 'Key test_secret_key_22b294dcfe1b46d88ed73dc3f6c2828c' }
            };
            

            // axios.post(`https://meslaforum.herokuapp.com/khalti${payload.token}/${data.amount}/test_secret_key_22b294dcfe1b46d88ed73dc3f6c2828c`)
            //     .then(response => {
            //         console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.log(error.message);
            //     });
        },
        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};
export default config;

