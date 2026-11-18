import { useSelector } from "react-redux";

export function useAuth() {
  // useSelector reads from the store and re-renders the component when this value changes.
  const { user, token, isRestoring } = useSelector((state) => state.auth);

  return { user, token, isRestoring, isAuthenticated: Boolean(user) };
}