import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button";
import FormInput from "../../../../shared/components/form-inputs/Form-Input";

import { useSignin } from "../../hooks/useSignin";
import { signinSchema } from "../../validations/signinSchema";

import signinBanner from "../../../../assets/images/auth/signin-banner.png";

import "./Signin.css";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(signinSchema),
        mode: "onChange"
    });

    const { signin, error, isLoading } = useSignin();

    const navigate = useNavigate();

    // Handle Email
    const handleEmailChange = (event) => {
        let value = event.target.value
            .replace(/[^a-zA-Z0-9@.]/g, "")
            .replace(/\s/g, "");

        setValue("email", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    // Submit
    const onSubmit = async (data) => {
        try {
            const response = await signin(data);

            console.log("Signin Response =>", response);

            if (response.user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }

            reset();

        } catch (error) {
            console.log("Signin Error =>", error.message || error);
            console.log("Signin Error =>", error.message);
        }
    };

    return (
        <div className="container-fluid vh-100 overflow-hidden">
            <div className="row h-100 g-0">

                {/* Left Image */}

                <div className="col-lg-7 col-sm-6 d-none d-sm-block h-100 position-relative auth-image">

                    <img
                        src={signinBanner}
                        alt="Sign In"
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
                                Welcome Back
                            </h2>

                            <p className="text-muted mb-4">
                                Sign in to continue exploring your favorite books.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

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
                                        placeholder="Enter your password"
                                        name="password"
                                        label="Password"
                                        register={register}
                                        error={errors.password}
                                    />
                                </div>

                                {/* Links */}

                                <div className="d-flex justify-content-between mb-4">

                                    <Link
                                        to="/signup"
                                        className="text-decoration-none"
                                    >
                                        Don't have an account?
                                    </Link>

                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                {/* Submit */}

                                <div className="d-flex justify-content-end">

                                    <Button
                                        type="submit"
                                        color="primary"
                                        disabled={isLoading}
                                        label={
                                            isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                "Sign In"
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
};

export default SignIn;