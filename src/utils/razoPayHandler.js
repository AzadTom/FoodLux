import axios from 'axios';
import {BASE_URL} from '../services/service.js';



export const razorPayHandler  = async(amount =5000)=>{



     console.log(amount);


    const {data:{key}} = await axios.get(`${BASE_URL}/payment/getkey`);

    const {data:{order}} = await axios.post(`${BASE_URL}/payment/checkout`,{amount:amount});

    const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "AzadTom",
        description: "Test Transaction",
        image: "https://pbs.twimg.com/profile_images/1712013937737445376/4gjg_BmM_400x400.jpg",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
        handler:async(response)=>{

            const verify  = await axios.post(`${BASE_URL}/payment/verification`,response);

            console.log(verify);

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
    };

    const razor  = new window.Razorpay(options);
    razor.open();

}