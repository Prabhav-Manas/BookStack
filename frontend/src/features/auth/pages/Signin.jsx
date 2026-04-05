import FormInput from "../../../shared/components/form-inputs/Form-Input";
import Button from '../../../shared/components/Button/Button';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";
import { useNavigate } from "react-router-dom";

const SignIn=()=>{
    const {register, handleSubmit, setValue, reset, formState:{errors}}=useForm();
    const {signin, error}=useSignin();

    const navigate=useNavigate();

    const handleEmailChange = (event) => {
        let value = event.target.value
            .replace(/[^a-zA-Z0-9@.]/g, "")   // remove special chars
            .replace(/\s/g, "");              // remove whitespace

        setValue("email", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const onSubmit = async (data) => {
        try {
            const response = await signin(data);
            console.log('Signin Response =>', response);

            // Navigate based on role
            if (response.user?.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }

            reset();
        } catch (error) {
            console.log('Signin Error =>', error.message || error);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 m-auto my-5 p-4 shadow">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex justify-content-between">
                            <h2 className="">Sign in</h2>

                            {/* User Role Select */}
                            <select className="form-select w-25" {...register("role")}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {error && 
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }

                        {/* Email */}
                        <div className="mb-3">
                            <FormInput 
                                type="email" 
                                placeholder="Enter Email" 
                                label="Email" 
                                name="email" 
                                register={register}
                                rules={{
                                    required:"Email is required", 
                                    pattern:{
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message:"Invalid Email"
                                    }
                                }}
                                onChange={handleEmailChange}
                                error={errors.email}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <FormInput 
                                type="password" 
                                placeholder="Enter Password" 
                                label="Password" 
                                name="password" 
                                register={register} 
                                rules={{
                                    required:"Password is required", 
                                    pattern:{
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/,
                                        message: "Invalid Password Pattern"
                                    }
                                }}
                                error={errors.password} 
                            />
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <small><Link to="/signup">Don't have account ? Sign up</Link></small>
                            <small><Link to="">Forgot Password</Link></small>
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button type='submit' color="primary" label='Sign in' />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SignIn;