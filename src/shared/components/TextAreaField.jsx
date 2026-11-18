export default function TextAreaField({ label, id, error, ...textAreaProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...textAreaProps}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}