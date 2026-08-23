import { useDispatch, useSelector } from "react-redux";
import { validateUserDetail } from "./utils";
import { setUserNull, signIn, signUp } from "../../reducers/userSlice";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import { setToken } from "@/reducers/tokenSlice";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, user } = useSelector((state) => state.user);

    const [userDetails, setUserDetails] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        comfirm: "",
        error: {
            first: "",
            last: "",
            email: "",
            password: "",
            comfirm: "",
        },
    });

    const onChangeHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const onFocusHandler = (e) => {
        e.preventDefault();
        setUserDetails((prevState) => ({
            ...prevState,
            error: {
                ...prevState.error,
                [e.target.name]: "",
            },
        }));
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
        const { isValid, error } = validateUserDetail(userDetails);
        if (isValid) {
            dispatch(signUp(userDetails));
        } else {
            setUserDetails((prevState) => ({ ...prevState, error }));
        }
    };

    function showErrorToast() {
        const id = toast.add({
            type: "error",
            title: "Something Went Wrong",
            description: String(user),
            priority: "high",
            actionProps: {
                children: "Undo",
                onClick() {
                    toast.close(id)
                },
            },
        })
    }

    function showSuccessToast() {
        const id = toast.add({
            type: "success",
            title: "Login Successful",
            description: "You have been logged in successfully.",
            priority: "high",
            actionProps: {
                children: "Undo",
                onClick() {
                    toast.close(id)
                },
            },
        })
    }

    useEffect(() => {
        if (status === "error") {
            showErrorToast();
            return;
        }
        if (status === "success") {
            showSuccessToast();
            dispatch(setToken(user));
            navigate("/home");
            return;
        }
    }, [status]);

    useEffect(() => {
        dispatch(setUserNull());
    }, [])


    return {
        userDetails,
        onChangeHandler,
        onFocusHandler,
        submitFormHandler,
        status,
        user
    }

}



export const useSignin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { status, user } = useSelector((state) => state.user);
    const [loader1, setLoader1] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });



    const onChangeHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };



    const submitFormHandler = (e) => {
        e.preventDefault();
        setLoader1(true);
        dispatch(signIn(userDetails));
    };

    const submitGuestUserHandler = (e) => {
        e.preventDefault();
        setLoader2(true);
        setUserDetails({
            email: "kumarazad2917@gmail.com",
            password: "Qwer1234asdf",
        });
        dispatch(
            signIn({ email: "kumarazad2917@gmail.com", password: "Qwer1234asdf" }),
        );
    };

    function showErrorToast() {
        const id = toast.add({
            type: "error",
            title: "Something Went Wrong",
            description: String(user),
            priority: "high",
            actionProps: {
                children: "Undo",
                onClick() {
                    toast.close(id)
                },
            },
        })
    }

    function showSuccessToast() {
        const id = toast.add({
            type: "success",
            title: "Login Successful",
            description: "You have been logged in successfully.",
            priority: "high",
            actionProps: {
                children: "Undo",
                onClick() {
                    toast.close(id)
                },
            },
        })
    }

    useEffect(() => {
        if (status === "error") {
            showErrorToast();
            setLoader1(false);
            setLoader2(false);
            return;
        }
        if (status === "success") {
            setLoader1(false);
            setLoader2(false);
            showSuccessToast();
            dispatch(setToken(user));
            navigate("/home");
            return;
        }
    }, [status]);


    useEffect(() => {
        dispatch(setUserNull());
    }, []);

    return {
        userDetails,
        onChangeHandler,
        submitFormHandler,
        submitGuestUserHandler,
        loader1,
        loader2,
    }
}