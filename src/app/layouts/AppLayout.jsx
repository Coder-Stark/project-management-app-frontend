import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice.js";
import { useAuth } from "../../features/auth/hooks/useAuth.js";

export default function AppLayout() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold text-gray-900">Mini Project Manager</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}