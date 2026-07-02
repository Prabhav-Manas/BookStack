import * as yup from "yup";

export const signupSchema = yup.object({
    role: yup
        .string()
        .oneOf(["user", "admin"])
        .required(),

    fullname: yup
        .string()
        .required("Fullname is required")
        .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
        .trim(),

    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email"),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/,
            "Password must contain uppercase, lowercase, number and special character."
        ),

    cnfPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match"
        )

});