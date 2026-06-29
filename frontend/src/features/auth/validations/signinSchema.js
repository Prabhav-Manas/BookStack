import * as yup from "yup";

export const signinSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        ),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
});