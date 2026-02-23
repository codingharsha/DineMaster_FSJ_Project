import "./ErrorPopup.scss";

const ErrorPopup = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="error-backdrop">
            <div className="error-popup">
                <h3>⚠️ Error</h3>
                <p>{message}</p>
                <button onClick={onClose}>Okay</button>
            </div>
        </div>
    );
};

export default ErrorPopup;