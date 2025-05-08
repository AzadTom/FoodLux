import axios from 'axios';
import {BASE_URL} from '../services/service.js';

  /*script function */
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

export const razorPayHandler  = async(amount,openSucessage,openFailure)=>{

    const {data:{key}} = await axios.get(`${BASE_URL}/payment/getkey`);
    const {data:{order}} = await axios.post(`${BASE_URL}/payment/checkout`,{amount:amount});
     
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
     /*if razorpay fails to load */
     if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
     }

    
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
    }
    // Removed custom config to allow Razorpay to show all UPI options
};
 

    const razor  = new window.Razorpay(options);
    razor.open();

}
