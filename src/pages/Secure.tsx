import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";

type FormDataType = {
    email: string;
    pass: string;
    passConfirm: string;
}

const validationSchema = yup
    .object({
        email: yup.string().email().required(),
        pass: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must hava a digit, a letter and lengh at least 8").required(),
        passConfirm: yup.string().oneOf([yup.ref('pass')], 'Passwords must match').required()
    })
    .required();


function Secure() {
    const { state } = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: state.email
        }
    });

    const navigate = useNavigate();

    const onSubmit = (data: FormDataType) => {
        console.log(data);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Verify</p>
            <Input label="Email" {...register("email")} error={errors.email?.message} readOnly />
            <Input label="Password" {...register("pass")} error={errors.pass?.message} />
            <Input label="Repeat password" {...register("passConfirm")} error={errors.passConfirm?.message} />
            <Button type="submit" size="md" className="font-bold ml-auto">
                Set Password
            </Button>
        </form>
    );
}

export default Secure;