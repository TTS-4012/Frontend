import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

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
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const onSubmit = (data: FormDataType) => {
        axios.post('https://api.ocontest.ir/v1/auth/verify', {
            user_id: state.user_id,
            otp: data.otp,
        }).then(() => {
            navigate('/login');
        })
        .catch(() => {
            // TODO show error
        });
    };

    if (!state?.user_id) {
        return <Navigate to='/register' />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Verify</p>
            <Input label="Enter the code" {...register("otp")} error={errors.otp?.message} type="number" />
            <Button type="submit" size="md" className="font-bold ml-auto">
            Verify
            </Button>
        </form>
    );
}

export default Verify;