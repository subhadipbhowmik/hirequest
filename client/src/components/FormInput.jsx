import React from "react";
import { Controller } from "react-hook-form";

const FormInput = ({ name, label, control, error, ...props }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          {...props}
          className={`block w-full px-4 py-2 border rounded-lg ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
      )}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default FormInput;
