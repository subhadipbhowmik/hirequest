import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../components/FormInput";
import PasswordStrength from "../components/PasswordStrength";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  course: yup.string().required("Course name is required"),
  uid: yup
    .string()
    .required("Student ID is required")
    .matches(/^[A-Za-z0-9-]+$/, "Invalid student ID format"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Must be 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Requires at least one lowercase letter")
    .matches(/[A-Z]/, "Requires at least one uppercase letter")
    .matches(/\d/, "Requires at least one number"),
});

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [serverError, setServerError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      course: "",
      uid: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const onSubmit = async (data) => {
    try {
      const success = await signup(data);
      if (success) {
        toast.success("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/profile"), 2000);
      }
    } catch (error) {
      setServerError(error.message);
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto pt-12 px-4"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Student Account
            </h1>
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <div className="space-y-5">
              <FormInput
                name="name"
                label="Full Name"
                control={control}
                error={errors.name}
                placeholder="John Doe"
              />

              <FormInput
                name="course"
                label="Course Name"
                control={control}
                error={errors.course}
                placeholder="B.Tech Computer Science"
              />

              <FormInput
                name="uid"
                label="Student ID"
                control={control}
                error={errors.uid}
                placeholder="CS-2020-001"
              />

              <FormInput
                name="phoneNumber"
                label="Phone Number"
                control={control}
                error={errors.phoneNumber}
                type="tel"
                placeholder="9876543210"
              />

              <FormInput
                name="email"
                label="Email Address"
                control={control}
                error={errors.email}
                type="email"
                placeholder="john@university.edu"
              />

              <div className="space-y-2">
                <FormInput
                  name="password"
                  label="Password"
                  control={control}
                  error={errors.password}
                  type="password"
                  placeholder="••••••••"
                />
                <PasswordStrength strength={passwordStrength} />
              </div>

              {serverError && (
                <div className="text-red-600 text-sm text-center">
                  {serverError}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Create Account
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
