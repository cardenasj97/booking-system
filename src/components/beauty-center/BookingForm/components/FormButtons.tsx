interface FormButtonsProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export default function FormButtons({
  onCancel,
  submitLabel = "Book Appointment",
  cancelLabel = "Cancel",
}: FormButtonsProps) {
  return (
    <div className="flex space-x-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors duration-300"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-300"
      >
        {submitLabel}
      </button>
    </div>
  );
}
