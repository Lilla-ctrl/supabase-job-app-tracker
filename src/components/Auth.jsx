import { useEffect, useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { supabase } from "../helpers/supabase-client";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { error, setError } = useJobs();

  useEffect(() => {
    setError(null);
  }, [isSigningUp, setError]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSigningUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        console.error(signUpError.message);
        return;
      }

      if (data.user && !data.session) {
        toast.success("Check your inbox to confirm your email!", {
          duration: 6000,
          icon: "📧",
        });

        setEmail("");
        setPassword("");
        setFirstName("");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error(signInError.message);
        setError(signInError.message);
        return;
      }
      toast.success("Welcome back!");
    }
  }

  const isPasswordValid = password.length >= 6;
  const showPasswordHint = isSigningUp && password.length > 0;
  const canSubmit = isSigningUp && isPasswordValid;

  return (
    <>
      <div className="bg-primary transition-colors duration-500 fixed inset-0 flex items-center justify-center min-h-screen ">
        <div className="bg-secondary p-8 flex flex-col justify-center rounded-2xl shadow-xl border border-jobcard-border/60 w-80 transition-colors duration-500">
          <div>
            <div className="text-text text-xl mb-4 tracking-tight font-semibold">
              <h2>{isSigningUp ? "Create an account" : "Welcome back"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <div className="text-sm text-text/70 mb-1">Email address</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm p-2 mb-5 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                />
              </div>

              {/* Password */}
              <div>
                <div className="text-sm text-text/70 mb-1">Password</div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm px-2 py-2 pr-12 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                  />
                  <button
                    className="absolute right-2 p-1 text-xs text-text/50 hover:text-text mt-1 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <Eye /> : <EyeOff />}
                  </button>
                  <div className="min-h-5 mt-0.5">
                    {showPasswordHint && (
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isPasswordValid ? `text-green-500` : `text-text/50`
                        }`}
                      >
                        {isPasswordValid
                          ? "Valid password. ✅"
                          : `Need ${6 - password.length} more characters.`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              {isSigningUp && (
                <>
                  <div className="text-sm text-text/70 mb-1">First name</div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm p-2 mb-5 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                  />
                </>
              )}

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border-red-500/50 rounded-xl">
                  <p className="text-xs text-red-500 font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSigningUp && !canSubmit}
                  className="bg-button text-button-text text-sm font-semibold py-2.5 px-4 mb-1 rounded-xl w-full hover:bg-button-hover hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer shadow-md disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-slate-300"
                >
                  {isSigningUp ? "Sign up" : "Sign in"}
                </button>
              </div>

              {/* Sign in/up */}
              <div className="flex justify-center">
                <div className="text-sm text-text mb-">
                  {isSigningUp ? "Already a member?" : "Not a member yet?"}
                  <button
                    type="button"
                    onClick={() => setIsSigningUp(!isSigningUp)}
                    className="cursor-pointer font-semibold text-button hover:text-button-hover ml-1"
                  >
                    {isSigningUp ? "Sign in!" : "Sign up!"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
