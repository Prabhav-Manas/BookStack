import { useForm } from "react-hook-form"
import Button from "../../../shared/components/Button/Button"
import FormInput from "../components/Form-Input"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignUp=()=>{
    const {register, handleSubmit, reset, watch, setValue, formState:{errors}}=useForm({mode:"onChange"});
    const {signup, error}=useSignup();

    // Handle Fullname Input
    const handleFullNameChange=(event)=>{
        let value=event.target.value
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/^\s+/g, '')
        .replace(/\s{2,}/g, ' ');

        setValue("fullname", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    }

    // Handle Email Input
    const handleEmailChange = (event) => {
        let value = event.target.value
            .replace(/[^a-zA-Z0-9@.]/g, "")   // remove special chars
            .replace(/\s/g, "");              // remove whitespace

        setValue("email", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };
    
    // Handle Password & Confirm Password Match
    const password=watch("password");

    const navigate = useNavigate();

    // Handle SignUp Form Submit
    const onSubmit=async(data)=>{
        try{
            const response=await signup({
                ...data,
                role:data.role || "user"
            })
            console.log('SignUp Form Data:=>', response);

            navigate('/');
            reset();

        }catch(error){
            console.log('Sign up Error:=>', error);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 m-auto my-5 p-4 shadow">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex justify-content-between">
                            <h2 className="">Sign up</h2>

                            <select className="form-select w-25" name="" id="" {...register("role")}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {error && 
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }

                        {/* Fullname */}
                        <div className="mb-3">
                            <FormInput type="text" placeholder="Enter your fullname" 
                                name="fullname" 
                                label="Fullname" 
                                register={register} 
                                rules={{required:"Fullname is required"}} 
                                onChange={handleFullNameChange} error={errors.fullname}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <FormInput type="email" placeholder="Enetr your email" 
                                name="email" 
                                label="Email" 
                                register={register} 
                                rules={{
                                    required:"Email is required",
                                    pattern:{
                                        value:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
                                        message:'Invalid Email'
                                    },
                                    message:'Invalid Email'
                                }} 
                                onChange={handleEmailChange} 
                                error={errors.email} 
                            />
                        </div>
                        
                        {/* Password */}
                        <div className="mb-3">
                            <FormInput type="password" placeholder="Password" 
                                name="password" 
                                label="Password" 
                                register={register} 
                                rules={{
                                    required:"Password is required", 
                                    pattern:{
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/, 
                                        message:"Invalid Password"
                                    }, 
                                    minLength:{
                                        value:6,
                                        message:'Minimum 6 characters required'
                                    }
                                }} 
                                error={errors.password} 
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <FormInput type="password" placeholder="Confirm Password" 
                                name="cnfPassword" 
                                label="Confirm Password" 
                                register={register} 
                                rules={{
                                    required:"Confirm Password is required", 
                                    validate: value => value===password || 'Passwords do not match'
                                }} 
                                error={errors.cnfPassword} 
                            />
                        </div>
                        
                        {/* Actions */}
                        <div className="mb-3 d-flex justify-content-between">
                            <p><Link to="/">Already have account ? Sign in</Link></p>
                            <Button type="submit" color="primary" label="Sign up"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;