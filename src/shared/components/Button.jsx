export default function Button({ loading = false, disabled = false, children, ...props }) {
  return (
    <button
      disabled={loading || disabled}
      className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}