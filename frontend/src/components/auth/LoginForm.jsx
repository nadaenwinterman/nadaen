import { useState } from "react";
import GlassInput from "../ui/GlassInput";
import GlassButton from "../ui/GlassButton";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl text-white font-bold text-center">Login</h2>
      <GlassInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <GlassInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <GlassButton type="submit" className="w-full">
        Sign In
      </GlassButton>
    </form>
  );
};

export default LoginForm;
