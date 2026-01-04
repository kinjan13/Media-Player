import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert("Check your email to confirm");
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={register} style={styles.card}>
        <h2>Create Account 🎶</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #805ad5, #6b46c1)",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};