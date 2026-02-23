import { createContext, useState } from "react";

export const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const showError = (message) => {
        setError(message);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ error, showError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorProvider;