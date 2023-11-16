import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
    otp: string;
}

const validationSchema = yup
    .object({
        otp: yup.string().length(6).required()
    })
    .required();

function Verify() {
    const { state } = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(validationSchema),
    });

    const [errorMessage, setErrorMessage] = useState<string>();

    const navigate = useNavigate();

    const onSubmit = (data: FormDataType) => {
        axios.post('https://api.ocontest.ir/v1/auth/verify', {
            user_id: state.user_id,
            otp: data.otp,
        }).then(() => {
            navigate('/login');
        })
            .catch((err: AxiosError<any>) => {
                // err.response?.data.message is empty. discuss with morti.
                setErrorMessage(err.response?.data.message ?? err.message);
            });
    };

    useEffect(() => {
        const subscription = watch(() => setErrorMessage(undefined));
        return () => subscription.unsubscribe();
    }, [watch]);

    if (!state?.user_id) {
        return <Navigate to='/register' />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Verify</p>
            <Input label="Enter the code" {...register("otp")} error={errors.otp?.message} type="number" />
            <div className="flex flex-row items-center">
                <span className="text-red-700 ml-3">{errorMessage}</span>
                <Button type="submit" size="md" className="font-bold ml-auto">
                    Verify
                </Button>
            </div>
        </form>
    );
}

export default Verify;