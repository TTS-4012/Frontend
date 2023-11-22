import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import Password from "../components/Password";
import Link from "../components/Link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
   username: string;
   password: string;
}

const validationSchema = yup
   .object({
      username: yup.string().required(),
      password: yup.string().required()
   }).required();

function Login() {
   const {
      register,
      watch,
      handleSubmit,
      formState: { errors }
   } = useForm<FormDataType>({
      resolver: yupResolver(validationSchema)
   });

   const [errorMessage, setErrorMessage] = useState<string>();

   const navigate = useNavigate();

   const handleLogin = (data: FormDataType) => {
      axios.post('https://api.ocontest.ir/v1/auth/login', data)
         .then((res) => {
            localStorage.setItem('auth.access_token', res.data.access_token);
            localStorage.setItem('auth.refresh_token', res.data.refresh_token);
            navigate('/home');
         })
         .catch((err: AxiosError<any>) => {
            setErrorMessage(err.response?.data.message ?? err.message);
         });
   };

   useEffect(() => {
      const subscription = watch(() => setErrorMessage(undefined));
      return () => subscription.unsubscribe();
   }, [watch]);

   return (
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
         <p className="text-left text-3xl font-extrabold text-indigo-700 mb-3 p-3">Login</p>
         <Input label="Username" {...register("username")} error={errors.username?.message}/>
         <Password label="Password" {...register("password")} error={errors.password?.message} />
         {/* <Link className="self-start ml-3 text-sm" address="/aaaaaa">Forgot password</Link> */}
         <Link className="self-start ml-3 text-sm" address="/register">Register</Link>
         <div className="flex flex-row items-center">
            <span className="text-red-700 ml-3">{errorMessage}</span>
            <Button type="submit" size="md" className="font-bold ml-auto mr-2 flex-end">Login</Button>
         </div>
      </form>
   );
}
export default Login;