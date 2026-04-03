const MultiSelect = ({ label, options, name, register, rules, error }) => {
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <select className={`form-select ${error ? 'is-invalid' : ''}`} {...register(name, rules)}>
                <option value="">-- Select {label} --</option>
                {options?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            
            {error && <small className="invalid-feedback text-danger">{error.message}</small>}
        </div>
    )
}

export default MultiSelect;