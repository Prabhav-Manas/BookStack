import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom"; // ✅ useParams not useLocation
import FormInput from "../../../../shared/components/form-inputs/Form-Input";
import Button from "../../../../shared/components/Button/Button";
import { useResetPassword } from "../../hooks/useResetPassword";

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { resetPassword, loading, error, success } = useResetPassword();
    const navigate = useNavigate();
    const { token } = useParams(); // ✅ get token from URL

    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            await resetPassword({
                token,          // ✅ send token not email
                password: data.password
            });

            setTimeout(() => {
                navigate('/auth/signin');
            }, 2000);

        } catch (error) {
            console.log('Reset Password Error =>', error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 m-auto my-5 p-4 shadow">

                    <div className="text-center mb-3">
                        <i className="fa fa-lock text-primary"
                            style={{ fontSize: '3rem' }}
                            aria-hidden="true">
                        </i>
                    </div>

                    <h2 className="text-center mb-1">Reset Password</h2>
                    <p className="text-muted text-center mb-4">
                        Create a new strong password for your account
                    </p>

                    {success && (
                        <div className="alert alert-success" role="alert">
                            <i className="fa fa-check-circle me-2" aria-hidden="true"></i>
                            {success} Redirecting to Sign in...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-circle me-2" aria-hidden="true"></i>
                            {error}
                        </div>
                    )}

                    {!success && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <FormInput
                                    type="password"
                                    placeholder="Enter new password"
                                    label="New Password"
                                    name="password"
                                    register={register}
                                    rules={{
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/,
                                            message: "Must include uppercase, lowercase, number and special character"
                                        }
                                    }}
                                    error={errors.password}
                                />
                            </div>

                            <div className="mb-3">
                                <FormInput
                                    type="password"
                                    placeholder="Confirm new password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    register={register}
                                    rules={{
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === password || "Passwords do not match"
                                    }}
                                    error={errors.confirmPassword}
                                />
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    Password must contain:
                                    <ul className="mt-1">
                                        <li>At least 6 characters</li>
                                        <li>One uppercase letter (A-Z)</li>
                                        <li>One lowercase letter (a-z)</li>
                                        <li>One number (0-9)</li>
                                        <li>One special character (!@#$...)</li>
                                    </ul>
                                </small>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Button
                                    type="submit"
                                    color="primary"
                                    label={loading ? 'Resetting...' : 'Reset Password'}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;