import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../projects.slice.js";

export function useProjectsList() {
  const dispatch = useDispatch();
  const { items, listStatus, listError } = useSelector((state) => state.projects);

  const reload = useCallback(() => dispatch(fetchProjects()), [dispatch]);

  // Load the list every time the page opens.
  useEffect(() => {
    reload();
  }, [reload]);

  return { projects: items, status: listStatus, error: listError, reload };
}