import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Tracker from "./components/Tracker";
import Footer from "./components/Footer";
import { supabase } from "./helpers/supabase-client";
import ThemeToggle from "./components/ThemeToggle";
import { Toaster } from "react-hot-toast";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSession() {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
    setLoading(false);
  }

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    if (!loading) {
      document.body.classList.add("loaded");
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [loading]);

  if (loading) {
    return <div className="min-h-screen bg-primary" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <ThemeToggle />
      {!session ? (
        <Auth />
      ) : (
        <>
          <main className="grow">
            <Tracker session={session} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
