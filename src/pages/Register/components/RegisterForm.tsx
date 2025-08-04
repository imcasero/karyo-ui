import { useState } from "preact/hooks";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordChecks = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "A number", test: (v: string) => /\d/.test(v) },
  { label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "A symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function validateEmail(value: string): string | undefined {
  if (!emailRegex.test(value)) return "Invalid email address";
  return undefined;
}

function validatePassword(value: string): string[] {
  return passwordChecks.filter((c) => !c.test(value)).map((c) => c.label);
}

function validateConfirm(password: string, value: string): string | undefined {
  if (value !== password) return "Passwords do not match";
  return undefined;
}

const useRegisterForm = () => {
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

  const handleEmailChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setEmail(val);
    setEmailError(validateEmail(val));
  };

  const handlePasswordChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setPassword(val);
    setPasswordErrors(validatePassword(val));
  };

  const handleConfirmChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setConfirm(val);
    setConfirmError(validateConfirm(password, val));
  };

  const handleBlur = (field: "email" | "password" | "confirm") => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email") setEmailError(validateEmail(email));
    if (field === "password") setPasswordErrors(validatePassword(password));
    if (field === "confirm")
      setConfirmError(validateConfirm(password, confirm));
  };

  const isFormValid =
    !validateEmail(email) &&
    validatePassword(password).length === 0 &&
    !validateConfirm(password, confirm) &&
    email &&
    password &&
    confirm;

  return {
    email,
    emailError,
    password,
    passwordErrors,
    confirm,
    confirmError,
    touched,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmChange,
    handleBlur,
    isFormValid,
  };
};

const RegisterForm = () => {
  const {
    email,
    emailError,
    password,
    passwordErrors,
    confirm,
    confirmError,
    touched,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmChange,
    handleBlur,
    isFormValid,
  } = useRegisterForm();

  const { register } = useAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await register(email, password);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-2 text-center">Sign up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
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
