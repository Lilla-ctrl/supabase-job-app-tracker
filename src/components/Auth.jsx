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
      <div className="bg-gray-300 fixed inset-0 flex items-center justify-center min-h-screen ">
        <div className="bg-gray-100 p-6 flex justify-center rounded-xl shadow-lg w-64">
          <div>
            <div className="text-xl mb-4">
              <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm mb-1">Email address</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm border border-gray-300 shadow-sm p-1 mb-5 w-full focus:border-teal-400 focus:ring-teal-600"
                />
              </div>
              <div>
                <div className="text-sm mb-1">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 shadow-sm p-1 mb-5 w-full focus:border-teal-400 focus:ring-teal-600"
                />
              </div>

              {isSigningUp && (
                <>
                  <div className="text-sm mb-1">User name</div>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="border border-gray-300 shadow-sm p-1 mb-5 w-full focus:border-teal-400 focus:ring-teal-600"
                  />
                </>
              )}

              <div>
                <button
                  type="submit"
                  className="bg-teal-500 text-white text-sm font-medium py-2 px-3 rounded-full w-full hover:bg-teal-600 cursor-pointer"
                >
                  {isSigningUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
              <div className="flex justify-center">
                <div className="text-sm mb-3">
                  {isSigningUp ? "Already a member?" : "Not a member yet?"}
                  <button
                    onClick={() => setIsSigningUp(!isSigningUp)}
                    className="cursor-pointer text-teal-500 ml-1"
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
