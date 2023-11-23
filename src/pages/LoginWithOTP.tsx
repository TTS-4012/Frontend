import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
   email: string;
}

const validationSchema = yup
   .object({
      email: yup.string().email().required(),
   }).required();

function LWOTP() {
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
      axios.post('https://api.ocontest.ir/v1/auth/', data)
         .then((res) => {
            navigate('/verify',{state:{email: res.data.email }});
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
         <p className="text-left text-3xl font-extrabold text-indigo-700 mb-3 p-3">One time password</p>
         <Input label="Email" {...register("email")} error={errors.email?.message} />
         <div className="flex flex-row items-center">
            <span className="text-red-700 ml-3">{errorMessage}</span>
            <Button type="submit" size="md" className="font-bold ml-auto mr-2 flex-end">Login</Button>
         </div>
      </form>
   );
}
export default LWOTP;