interface ModalProps {
  readonly onClose: () => void;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly size?: 'small' | 'medium' | 'large';
}

export default function Modal({
  onClose,
  children,
  title,
  size = 'medium',
}: ModalProps) {
  const sizeClasses = {
    small: 'max-w-2xl',
    medium: 'max-w-4xl',
    large: 'max-w-6xl',
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        className={`w-full ${sizeClasses[size]} overflow-y-auto rounded-lg bg-white px-3`}
      >
        <div className="flex flex-col items-stretch">
          <button
            className="cursor-pointer text-right text-3xl font-bold text-black hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="font-bold text-indigo-600">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
