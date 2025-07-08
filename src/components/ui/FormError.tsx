interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <div className="text-xs text-red-500 mt-1">{message}</div>;
};

export default FormError;
