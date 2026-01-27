import { useState } from "react";
import { supabase } from "../helpers/supabase-client";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSigningUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in:", signInError.message);
        return;
      }
    }
  }

  return (
    <>
      <div className="bg-primary transition-colors duration-500 fixed inset-0 flex items-center justify-center min-h-screen ">
        <div className="bg-secondary p-8 flex flex-col justify-center rounded-2xl shadow-xl border border-jobcard-border/60 w-80 transition-colors duration-500">
          <div>
            <div className="text-text text-xl mb-4 tracking-tight font-semibold">
              <h2>{isSigningUp ? "Create an account" : "Welcome back"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm text-text/70 mb-1">Email address</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm p-2 mb-5 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                />
              </div>
              <div>
                <div className="text-sm text-text/70 mb-1">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm p-2 mb-5 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                />
              </div>

              {isSigningUp && (
                <>
                  <div className="text-sm text-text/70 mb-1">First name</div>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setUser(e.target.value)}
                    className="text-sm text-text transition-all duration-300 bg-primary border border-jobcard-border rounded-lg outline-none  shadow-sm p-2 mb-5 w-full focus:ring-2 focus:ring-button/50 focus:border-button"
                  />
                </>
              )}

              <div>
                <button
                  type="submit"
                  className="bg-button text-button-text text-sm font-semibold py-2.5 px-4 mb-1 rounded-xl w-full hover:bg-button-hover hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
                >
                  {isSigningUp ? "Sign up" : "Sign in"}
                </button>
              </div>
              <div className="flex justify-center">
                <div className="text-sm text-text mb-">
                  {isSigningUp ? "Already a member?" : "Not a member yet?"}
                  <button
                    onClick={() => setIsSigningUp(!isSigningUp)}
                    className="cursor-pointer text-button hover:text-button-hover ml-1"
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
