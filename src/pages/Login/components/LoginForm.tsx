import { useState } from "preact/hooks";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) return "Invalid email address";
    return undefined;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email") setEmailError(validateEmail(email));
  };

  const isFormValid = !validateEmail(email) && password && email;

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-2 text-center">Log in</h2>
      <form className="flex flex-col gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          onBlur={() => handleBlur("email")}
          error={touched.email ? emailError : undefined}
          autoComplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          onBlur={() => handleBlur("password")}
          error={undefined}
          autoComplete="current-password"
        />
        <Button type="submit" disabled={!isFormValid}>
          Log in
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </div>
    </Card>
  );
};

export default LoginForm;
