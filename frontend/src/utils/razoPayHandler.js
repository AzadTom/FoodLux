import axios from 'axios';
import {BASE_URL} from '../services/service.js';



export const razorPayHandler  = async(amount,openSucessage,openFailure)=>{



     console.log(amount);


    const {data:{key}} = await axios.get(`${BASE_URL}/payment/getkey`);

    const {data:{order}} = await axios.post(`${BASE_URL}/payment/checkout`,{amount:amount});

    const options = {
    key: key,
    amount: order.amount,
    currency: "INR",
    name: "AzadTom",
    description: "Test Transaction",
    image: "https://pbs.twimg.com/profile_images/1712013937737445376/4gjg_BmM_400x400.jpg",
    order_id: order.id,
    handler: async (response) => {
        const verify = await axios.post(`${BASE_URL}/payment/verification`, response);
        if (verify.status === 200) {
            openSucessage();
            console.log("success!");
        } else {
            openFailure();
            console.log("failure");
        }
    },
    prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
    },
    notes: {
        address: "Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    },
    method: {
        upi: true, // Enable UPI
        card: false,
        netbanking: false,
        wallet: false,
    },
    config: {
        display: {
            blocks: {
                upi: {
                    name: "UPI Options",
                    instruments: [
                        {
                            method: "upi",
                            flows: ["intent"] // <- Enables UPI Intent (Google Pay, PhonePe, etc.)
                        }
                    ]
                }
            },
            sequence: ["upi"], // Prioritize UPI
            preferences: {
                show_default_blocks: false
            }
        }
    }
};

    const razor  = new window.Razorpay(options);
    razor.open();

}
