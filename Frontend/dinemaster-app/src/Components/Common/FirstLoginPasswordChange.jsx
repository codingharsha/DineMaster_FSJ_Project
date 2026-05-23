import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const FirstLoginPasswordChange = () => {
    const { changePasswordOnFirstLogin } = useContext(StoreContext);
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword.trim().length < 6) {
            alert("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        setSaving(true);
        try {
            await changePasswordOnFirstLogin({ currentPassword, newPassword });
            alert("Password updated successfully.");
            const role = (localStorage.getItem("userRole") || "").toUpperCase();
            if (role === "ADMIN") navigate("/admin/dashboard");
            else if (role === "KITCHEN_STAFF") navigate("/kitchen");
            else navigate("/");
        } catch (error) {
            alert(error.message || "Failed to update password");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "16px" }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                }}
            >
                <h2 style={{ marginTop: 0 }}>Change Password</h2>
                <p style={{ color: "#555" }}>This is required before you continue.</p>
                <input
                    type="password"
                    placeholder="Current temporary password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: "12px", padding: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: "16px", padding: "10px" }}
                />
                <button
                    type="submit"
                    disabled={saving}
                    style={{ width: "100%", padding: "10px", cursor: saving ? "not-allowed" : "pointer" }}
                >
                    {saving ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default FirstLoginPasswordChange;
