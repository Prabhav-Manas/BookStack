import { useState } from "react";

const FormInput=({label, type, placeholder, register, name, error, rules, onChange})=>{
    const [showPassword, setShowPassword]=useState(false);

    // Check if type is password
    const isPassword = type === "password";

    const isTextarea = type === "textarea"; 

    const registerProps = register(name, rules);

    // Toggle Password eye-icon
    const togglePassword=()=>{
        setShowPassword(!showPassword);
    }

    return(
        <div className="">
            <label className="form-label">{label}</label>

            {isTextarea ? (
                <div>
                    <textarea
                        placeholder={placeholder}
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        rows={4}
                        {...registerProps}
                        onInput={(e) => {
                            registerProps.onChange(e);
                            onChange && onChange(e);
                        }}
                    />
                    {error && <small className="text-danger d-block mt-1">{error.message}</small>}
                </div>
            ) : isPassword ? (
                <div className="mb-4 position-relative">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        className={`form-control ${error ? "is-invalid" : ""}`} 
                        {...register(name, rules)} 
                        placeholder={placeholder} 
                    />

                    <span className="" onClick={togglePassword}>
                        <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} aria-hidden="true" 
                            style={{position:"absolute", top:"72%", right:"10px", transform:"translateY(-90%)", cursor:"pointer"}}
                        ></i>
                    </span>

                    {error && <small className="invalid-feedback text-danger position-absolute">{error.message}</small>}
                </div>
                ) : (
                    <div className="mb-4 position-relative">
                        <input 
                            type={type} 
                            placeholder={placeholder} 
                            className={`form-control ${error ? "is-invalid" :""}`} 
                            {...registerProps} 
                            onInput={(e)=>{
                                if(type === "email"){
                                    e.target.value = e.target.value
                                    .replace(/\s/g,'')
                                    .replace(/[^a-zA-Z0-9@.]/g,'');
                                }

                                registerProps.onChange(e);
                                onChange && onChange(e);
                            }}
                        />

                        {error && <small className="invalid-feedback text-danger position-absolute">{error.message}</small>}
                    </div>
                )
            }
        </div>
    )
}

export default FormInput;