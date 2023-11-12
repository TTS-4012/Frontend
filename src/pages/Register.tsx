import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

type FormDataType = {
    username: string;
    email: string;
    password: string;
}

const validationSchema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
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

    const handleRegister = (data: FormDataType) => {
        axios.post('/auth/register', data)
        .then((res) => {
           navigate('/verify', {state: {userId: res.data.user_id}});
        })
        .catch(() => {
           // TODO show error
        });    
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col">
            <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Register</p>
            <Input label="Username" {...register("username")} error={errors.username?.message} />
            <Input label="Email" {...register("email")} error={errors.email?.message} />
            {/* TODO password fields */}
            <Button type="submit" size="md" className="font-bold ml-auto">
                Register
            </Button>
        </form>
    );
}

export default Register;