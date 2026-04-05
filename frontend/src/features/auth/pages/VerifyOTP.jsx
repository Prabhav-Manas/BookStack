import { useEffect, useRef, useState } from "react";
import { useVerifyOTP } from "../hooks/useVerifyOTP";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const inputsRef = useRef([]);
    const [verified, setVerified] = useState(false);
    
    const {verifyOTP, error}=useVerifyOTP();

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email
    
    // Countdown Timer
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // Handle Change
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto focus next input
        if (element.value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Handle Backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    // Paste OTP
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

    // Verify OTP
    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) return;

        try {
            setIsLoading(true);

            await verifyOTP({ email, otp: enteredOtp });

            // ✅ Don't navigate — backend sends reset link to email
            // Just show success message
            setVerified(true);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const handleResend = () => {
        setOtp(new Array(6).fill(""));
        setTimer(30);
        inputsRef.current[0].focus();
        console.log("OTP Resent");
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ width: "420px" }}>

                {verified && (
                    <div className="alert alert-success text-center" role="alert">
                        <i className="fa fa-check-circle me-2" aria-hidden="true"></i>
                        OTP Verified! Please check your email for the password reset link.
                    </div>
                )}
                
                {!verified && (
                    <div className="">
                <h4 className="text-center mb-2">Verify OTP</h4>
                <p className="text-muted text-center mb-4">
                    Enter 6 digit OTP sent to your email
                </p>


                <div 
                    className="d-flex gap-2 justify-content-center mb-3"
                    onPaste={handlePaste}
                >
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
                                <span 
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>
                                Verifying...
                            </>
                        ) : (
                            "Verify OTP"
                        )}
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
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
                </div>
                )}

            </div>
        </div>
    );
};

export default VerifyOTP;