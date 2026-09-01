
export const validateUserDetail = (userDetail)=>{

    let isValid = true;

    let error = {

        first:"",
        last:"",
        email:"",
        password:"",
        comfirm:""
    }

    const {first,last,email,password,comfirm} = userDetail;

    
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(!first)
    {   
        error.first ="please enter your firstname!";
        isValid  = false;

    }

    if(!last)
    {   
        error.last ="please enter your firstname!";
        isValid  = false;

    }


    if(!email)
    {
        error.email = "please enter your email!";
        isValid = false;
    }
    else if(!email.match(emailRegex))
    {
        error.email ="invalid email!";
        isValid = false;
    }


    if(!password)
    {
        error.password = "please enter your password!";
        isValid = false;
    }
    else if(!password.match(passwordRegex))
    {
        error.password ="password should contains uppercase letter , lowercase letter and number";
        isValid = false;
    }


    if(!comfirm)
    {
        error.comfirm = "please enter your comfirmpassword!";
        isValid = false;
    }
    else if(!comfirm.match(password))
    {
        error.comfirm = "password does not match!"
        isValid = false;
    }

    return {isValid,error};
}


export const SignUpFormData = {
    inputName: [
        {
            id: 1,
            name: "first",
            type: "text",
            label: "First name",
            placeholder: "First name",
        },
        {
            id: 2,
            name: "last",
            label: "Last name",
            type: "text",
            placeholder: "Last name",
        },
    ],
    inputOther: [
        {
            id: 3,
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email",
        },
        {
            id: 4,
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
        {
            id: 5,
            name: "comfirm",
            label: "Comfirm password",
            type: "password",
            placeholder: "Comfirm password",
        },
    ],
} 

export const SigninFormData = {
     input:[
        {
            id: 4,
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email",
        },
        {
            id: 5,
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
    ]
}