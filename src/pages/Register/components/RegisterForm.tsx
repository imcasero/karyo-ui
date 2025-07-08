import { useState } from "preact/hooks";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FormError from "../../../components/ui/FormError";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordChecks = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "A number", test: (v: string) => /\d/.test(v) },
  { label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "A symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState<string | undefined>();
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirm: false,
  });

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) return "Invalid email address";
    return undefined;
  };

  const validatePassword = (value: string) => {
    // Asegura que el símbolo no sea solo espacio
    return passwordChecks.filter((c) => !c.test(value)).map((c) => c.label);
  };

  const validateConfirm = (value: string) => {
    if (value !== password) return "Passwords do not match";
    return undefined;
  };

  // Validación en tiempo real para password
  const handlePasswordChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setPassword(val);
    setPasswordErrors(validatePassword(val));
  };

  // Validación en tiempo real para confirm
  const handleConfirmChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setConfirm(val);
    setConfirmError(validateConfirm(val));
  };

  const handleBlur = (field: "email" | "password" | "confirm") => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email") setEmailError(validateEmail(email));
    if (field === "password") setPasswordErrors(validatePassword(password));
    if (field === "confirm") setConfirmError(validateConfirm(confirm));
  };

  const isFormValid =
    !validateEmail(email) &&
    validatePassword(password).length === 0 &&
    !validateConfirm(confirm) &&
    email &&
    password &&
    confirm;

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-2 text-center">Sign up</h2>
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
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur("password")}
            error={undefined}
            autoComplete="new-password"
          />
          {(touched.password || password) && passwordErrors.length > 0 && (
            <ul className="mt-1 ml-1 text-xs text-red-500 list-disc list-inside animate-fade-in">
              {passwordErrors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
        </div>
        <Input
          label="Repeat password"
          name="confirm"
          type="password"
          value={confirm}
          onChange={handleConfirmChange}
          onBlur={() => handleBlur("confirm")}
          error={touched.confirm ? confirmError : undefined}
          autoComplete="new-password"
        />
        <Button type="submit" disabled={!isFormValid}>
          Sign up
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </div>
    </Card>
  );
};

export default RegisterForm;
