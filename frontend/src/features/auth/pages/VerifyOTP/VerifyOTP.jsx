import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOTP } from "../../hooks/useVerifyOTP";
import { useResendOTP } from "../../hooks/useResendOTP";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const inputsRef = useRef([]);

    const { verifyOTP, error } = useVerifyOTP();
    const { resendOTP, loading: resendLoading, error: resendError, success: resendSuccess } = useResendOTP();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    // Countdown Timer
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasteData)) return;
        const newOtp = pasteData.split("");
        setOtp(newOtp);
        newOtp.forEach((value, index) => {
            if (inputsRef.current[index]) {
                inputsRef.current[index].value = value;
            }
        });
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) return;

        try {
            setIsLoading(true);
            await verifyOTP({ email, otp: enteredOtp });
            setVerified(true);
        } catch (error) {
            console.log('Verify OTP Error =>', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP handler
    const handleResend = async () => {
        try {
            await resendOTP({ email });
            // Reset OTP inputs and restart timer
            setOtp(new Array(6).fill(""));
            setTimer(30);
            inputsRef.current[0].focus();
        } catch (error) {
            console.log('Resend OTP Error =>', error);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ width: "420px" }}>
                <h4 className="text-center mb-2">Verify OTP</h4>
                <p className="text-muted text-center mb-4">
                    Enter 6 digit OTP sent to <strong>{email}</strong>
                </p>

                {/* Verified success message */}
                {verified && (
                    <div className="alert alert-success text-center" role="alert">
                        <i className="fa fa-check-circle me-2" aria-hidden="true"></i>
                        OTP Verified! Please check your email for the password reset link.
                    </div>
                )}

                {/* Verify error */}
                {error && !verified && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-exclamation-circle me-2" aria-hidden="true"></i>
                        {error}
                    </div>
                )}

                {/* Resend success */}
                {resendSuccess && (
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle me-2" aria-hidden="true"></i>
                        {resendSuccess}
                    </div>
                )}

                {/* Resend error */}
                {resendError && (
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-exclamation-circle me-2" aria-hidden="true"></i>
                        {resendError}
                    </div>
                )}

                {/* OTP Inputs — hide when verified */}
                {!verified && (
                    <>
                        <div className="d-flex gap-2 justify-content-center mb-3" onPaste={handlePaste}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="form-control text-center"
                                    style={{ width: "50px", height: "50px", fontSize: "20px" }}
                                    value={data}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <div className="d-grid mb-3">
                            <button
                                className="btn btn-primary"
                                onClick={handleVerify}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Verifying...
                                    </>
                                ) : "Verify OTP"}
                            </button>
                        </div>

                        {/* Resend OTP */}
                        <div className="text-center">
                            {timer > 0 ? (
                                <span className="text-muted">
                                    Resend OTP in <strong>00:{timer < 10 ? `0${timer}` : timer}</strong>
                                </span>
                            ) : (
                                <button
                                    className="btn btn-link p-0"
                                    onClick={handleResend}
                                    disabled={resendLoading}
                                >
                                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;