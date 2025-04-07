import React from "react";

const PasswordStrength = ({ strength }) => {
  const strengthLabels = ["Very Weak", "Weak", "Good", "Strong", "Very Strong"];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-full rounded-full ${
              i < strength ? "bg-indigo-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Password Strength: {strengthLabels[strength] || "None"}
      </p>
    </div>
  );
};

export default PasswordStrength;
