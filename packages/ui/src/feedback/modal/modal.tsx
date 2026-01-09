interface ModalProps {
  readonly onClose: () => void;
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly size?: "small" | "medium" | "large";
  readonly open: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  size = "medium",
}: ModalProps) {
  if (!open) return null;
  const sizeClasses = {
    small: "max-w-2xl",
    medium: "max-w-4xl",
    large: "max-w-6xl",
  };

  return (
    <div className="bg-opacity-50 fixed  inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        className={`w-full h-auto max-h-dvh ${sizeClasses[size]} overflow-y-auto rounded-lg px-3 bg-gs-surface-light text-gs-black dark:bg-gs-surface-dark dark:text-gs-text-light`}
      >
        <div className="flex flex-col items-stretch">
          <button
            className="cursor-pointer text-right text-3xl font-bold text-gs-black hover:text-gray-700 dark:text-gs-text-light dark:hover:text-gs-tonal-dark"
            onClick={onClose}
          >
            &times;
          </button>
          {title && (
            <h2 className="font-bold text-gs-black dark:text-gs-text-light mb-8">
              {title}
            </h2>
          )}
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}
