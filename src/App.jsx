import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Tracker from "./components/Tracker";
import Footer from "./components/Footer";
import { supabase } from "./helpers/supabase-client";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [session, setSession] = useState(null);

  async function fetchSession() {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  }

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <ThemeToggle />

      {session ? <Tracker session={session} /> : <Auth />}
      <Footer />
    </>
  );
}

export default App;
