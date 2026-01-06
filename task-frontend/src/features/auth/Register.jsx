import { useState } from "react";
import api from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
 
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.length >= 6;

  const submitHandler = async (e) => {
  e.preventDefault();
  if (!isFormValid || isLoading) return;

  setIsLoading(true);

  try {
    await api.post("/auth/register", form);
    alert("Registration successful. Please login.");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  } finally {
    setIsLoading(false);
  }
};

  const inputStyle =
    "w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all";

  const iconStyle =
    "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400";
return (
  <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">

    {/* Smoky white glow */}
    <div className="pointer-events-none absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[140px]" />
    <div className="pointer-events-none absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[140px]" />

    {/* Card */}
    <div className="relative w-full max-w-[420px] px-4">
      <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_40px_120px_rgba(255,255,255,0.15)] border border-white/40">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-xl">
            <UserIcon className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl font-black text-black mb-2">
            Create Account
          </h2>
          <p className="text-slate-600">
            Start your journey with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-black placeholder:text-slate-400 focus:ring-4 focus:ring-black/10 focus:border-black outline-none"
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-black placeholder:text-slate-400 focus:ring-4 focus:ring-black/10 focus:border-black outline-none"
              placeholder="Email address"
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                required
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white border border-slate-300 text-black placeholder:text-slate-400 focus:ring-4 focus:ring-black/10 focus:border-black outline-none"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1 ml-1">
              Minimum 6 characters
            </p>
          </div>

          {/* Submit */}
          <button
            disabled={!isFormValid || isLoading}
            className="w-full bg-black hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-500 font-semibold">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 border border-slate-300 rounded-xl hover:bg-slate-100 font-medium">
            Google
          </button>
          <button className="py-3 border border-slate-300 rounded-xl hover:bg-slate-100 font-medium">
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-600">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-black font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  </div>
);

}