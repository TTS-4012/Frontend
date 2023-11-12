import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import Password from "../components/Password";
import Link from "../components/Link";
import axios from "axios";

type FormDataType = {
   username: string;
   password: string;
}

const validationSchema = yup
   .object({
      username: yup.string().required(),
      password: yup.string().required()
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

   const handleLogin = (data: FormDataType) => {
      axios.post('https://api.ocontest.ir/auth/login', data)
      .then((res) => {
         localStorage.setItem('auth.access_token', res.data.access_token);
         localStorage.setItem('auth.refresh_token', res.data.refresh_token);
         navigate('/home');
      })
      .catch(() => {
         // TODO show error
      });
   };

   return (
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
         <p className="text-left text-3xl font-extrabold text-indigo-700 mb-3 p-3">Login</p>
         <Input label="Username" {...register("username")} />
         <Password label="Password" {...register("password")} />
         <Link className="self-start ml-2 text-sm" address="/aaaaaa">Forgot password</Link>
         <Link className="self-start ml-2 text-sm" address="/register">Register</Link>
         <Button type="submit" size="md" className="font-bold ml-auto">Login</Button>
      </form>
   );
}
export default Login;