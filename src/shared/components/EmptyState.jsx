export default function EmptyState({ title, message, children }) {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{message}</p>
      {children && <div className="mt-4 flex justify-center">{children}</div>}
    </div>
  );
}