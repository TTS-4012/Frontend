import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import Password from "../components/Password";
import Link from "../components/Link";

type FormDataType = {
   email: string;
   pass: string;
}

const validationSchema = yup
   .object({
      email: yup.string().email().required(),
      pass: yup.string().required()
   })
   .required();

function Login() {
   const {
      register,
      handleSubmit,
   } = useForm<FormDataType>({
      resolver: yupResolver(validationSchema)
   });

   const navigate = useNavigate();

   const onSubmit = (data: FormDataType) => {
      console.log(data);
      navigate('/');
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
         <p className="text-left text-3xl font-extrabold text-indigo-700 mb-3 p-3">Login</p>
         <Input label="Username" {...register("email")} />
         <Password label="Password" {...register("pass")} />
         <Link className="self-start ml-2 text-sm" address="/aaaaaa">Forgot password</Link>
         <Link className="self-start ml-2 text-sm" address="/register">Register</Link>
         <Button type="submit" size="md" className="font-bold ml-auto">
            Login
         </Button>
      </form>
   );
}
export default Login;