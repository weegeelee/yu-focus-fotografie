import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, id, textarea, ...props }, ref) {
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            {textarea ? (
                <textarea id={id} name={id} required={props.required} {...props} />
            ) : (
                <input ref={ref} id={id} name={id} {...props} />
            )}
        </p>
    );
});

export default Input;