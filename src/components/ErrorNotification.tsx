interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

export const ErrorNotification = ({
  message,
  onClose,
}: ErrorNotificationProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
      <div className="flex items-center justify-between">
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-red-500 hover:text-red-700 font-bold text-lg leading-none"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};
