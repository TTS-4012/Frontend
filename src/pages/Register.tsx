import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";

type FormDataType = {
    email: string;
}

const validationSchema = yup
    .object({
        email: yup.string().email().required()
    })
    .required();

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(validationSchema)
    });

    const navigate = useNavigate();

    const onSubmit = (data: FormDataType) => {
        console.log(data);
        navigate('/verify', { state: { email: data.email } });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Register</p>
            <Input label="Email" {...register("email")} error={errors.email?.message} />
            <Button type="submit" size="md" className="font-bold ml-auto">
                Register
            </Button>
        </form>
    );
}

export default Register;