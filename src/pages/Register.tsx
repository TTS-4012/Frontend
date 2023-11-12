import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
    username: string;
    email: string;
    password: string;
    passConfirm: string;
}

const validationSchema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must hava a digit, a letter and lengh at least 8").required(),
        passConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
    })
    .required();

function Register() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(validationSchema)
    });

    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (data: FormDataType) => {
        axios.post('https://api.ocontest.ir/v1/auth/register', data)
        .then((res) => {
           navigate('/verify', {state: {user_id: res.data.user_id}});
        })
        .catch(() => {
           // TODO show error
        });    
    };

    useEffect(() => {
        const subscription = watch(() => setShowError(false));
        return () => subscription.unsubscribe();
      }, [watch]);

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Register</p>
            <Input label="Username" {...register("username")} error={errors.username?.message} />
            <Input label="Email" {...register("email")} error={errors.email?.message} />
            <Input label="Password" {...register("password")} type="password" error={errors.passConfirm?.message} />
            <Input label="Repeat password" {...register("passConfirm")} type="password" error={errors.passConfirm?.message} />
            <div className="flex flex-row items-center">
                <span className="text-red-700 ml-3">{showError && 'Login Failed'}</span>
                <Button type="submit" size="md" className="font-bold ml-auto">Register</Button>
            </div>
        </form>
    );
}

export default Register;