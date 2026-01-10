import { useState } from "react";
import { supabase } from "../helpers/supabase-client";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSigningUp ? "Sign Up" : "Sign In"}</button>
        <button onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? "Already a member? Sign in!" : "Not a member yet? Sign up!"}
        </button>
      </form>
    </>
  );
}
