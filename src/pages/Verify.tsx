import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Auth from "../layouts/Auth";
import Button from "../components/Button";

type FormDataType = {
    code: string;
}


function Verify() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormDataType>({
        
    });

    const onSubmit = (data: FormDataType) => {
        console.log(data);
    };

    return (
        <Auth>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <p className="text-left text-3xl font-extrabold text-gray-900 mb-3 p-3">Verify</p>
                <Input label={'Enter the code' }{...register("code")} error={errors.code?.message} type="number" />

                <Button type="submit" size="lg" className="font-bold ml-auto">
                    Verify
                </Button>
            </form>
        </Auth>
    );
}

export default Verify;