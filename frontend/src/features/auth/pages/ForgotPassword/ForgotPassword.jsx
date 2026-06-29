import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../../shared/components/form-inputs/Form-Input";
import Button from "../../../../shared/components/Button/Button";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { forgotPassword, loading, error, success } = useForgotPassword();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        let value = event.target.value
            .replace(/[^a-zA-Z0-9@.]/g, "")
            .replace(/\s/g, "");
        setValue("email", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    }

    const onSubmit = async (data) => {
        try {
            await forgotPassword(data);
            // Navigate to OTP page with email
            navigate('/auth/verify-otp', { state: { email: data.email } });
        } catch (error) {
            console.log('Forgot Password Error =>', error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 m-auto my-5 p-4 shadow">

                    {/* Back to Sign in */}
                    <div className="mb-3">
                        <Link to="/auth/signin" className="text-decoration-none">
                            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to Sign in
                        </Link>
                    </div>

                    <h2 className="mb-1">Forgot Password</h2>
                    <p className="text-muted mb-4">
                        Enter your email address and we'll send you an OTP to reset your password.
                    </p>

                    {/* Success Message */}
                    {success && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="mb-3">
                            <FormInput
                                type="email"
                                placeholder="Enter your email"
                                label="Email"
                                name="email"
                                register={register}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid Email"
                                    }
                                }}
                                onChange={handleEmailChange}
                                error={errors.email}
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button
                                type="submit"
                                color="primary"
                                label={loading ? 'Sending OTP...' : 'Send OTP'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;