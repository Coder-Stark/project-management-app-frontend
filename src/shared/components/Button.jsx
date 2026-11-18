const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  loading = false,
  disabled = false,
  variant = "primary",
  fullWidth = true,
  children,
  ...props
}) {
  return (
    <button
      disabled={loading || disabled}
      className={`${fullWidth ? "w-full" : ""} rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}