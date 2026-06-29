import { useForm } from "react-hook-form"
import Button from "../../../../shared/components/Button/Button";
import FormInput from "../../../../shared/components/form-inputs/Form-Input"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { yupResolver } from "@hookform/resolvers/yup";
import {signupSchema } from "../../validations/signupSchema";
import signupBanner from "../../../../assets/images/auth/signup-banner.png";
import './Signup.css';

const SignUp=()=>{
    const {register, handleSubmit, reset, setValue, formState:{errors}}=useForm({resolver: yupResolver(signupSchema), mode:"onChange", defaultValues:{role:"user"}});

    const {signup, error, isLoading}=useSignup();

    // Handle Fullname Input
    const handleFullNameChange = (event) => {
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
    }

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

return (
    <div className="container-fluid vh-100 overflow-hidden">
        <div className="row h-100 g-0">

            {/* Left Image */}

            <div className="col-lg-7 col-sm-6 d-none d-sm-block h-100 position-relative auth-image">

                <img
                    src={signupBanner}
                    alt="Signup"
                    className="img-fluid w-100 h-100 object-fit-cover"
    style={{
        objectPosition: "center center"
    }}
                />

            </div>

            {/* Right Form */}

            <div className="col-lg-5 col-sm-6 col-12 bg-white h-100">

                <div className="h-100 d-flex align-items-center justify-content-center">

                    <div
                        className="w-100 px-4 px-lg-5"
                        style={{ maxWidth: "500px" }}
                    >

                        <h2 className="fw-bold mb-2">
                            Create your account
                        </h2>

                        <p className="text-muted mb-4">
                            Join BookStack and start exploring thousands of books.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {/* Role */}

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Register As
                                </label>

                                <select
                                    className="form-select"
                                    {...register("role")}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Fullname */}

                            <div className="mb-3">
                                <FormInput
                                    type="text"
                                    placeholder="Enter your fullname"
                                    name="fullname"
                                    label="Fullname"
                                    register={register}
                                    onChange={handleFullNameChange}
                                    error={errors.fullname}
                                />
                            </div>

                            {/* Email */}

                            <div className="mb-3">
                                <FormInput
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    label="Email"
                                    register={register}
                                    onChange={handleEmailChange}
                                    error={errors.email}
                                />
                            </div>

                            {/* Password */}

                            <div className="mb-3">
                                <FormInput
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    label="Password"
                                    register={register}
                                    error={errors.password}
                                />
                            </div>

                            {/* Confirm Password */}

                            <div className="mb-4">
                                <FormInput
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="cnfPassword"
                                    label="Confirm Password"
                                    register={register}
                                    error={errors.cnfPassword}
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <Link
                                    to="/"
                                    className="text-decoration-none"
                                >
                                    Already have an account?
                                </Link>

                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={isLoading}
                                    label={
                                        isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Signing up...
                                            </>
                                        ) : (
                                            "Sign Up"
                                        )
                                    }
                                />

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    </div>
);
}

export default SignUp;