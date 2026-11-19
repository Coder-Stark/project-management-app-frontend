import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../tasks.slice.js";

export function useTasks(projectId) {
  const dispatch = useDispatch();
  const { items, status, error, projectId: loadedProjectId } = useSelector(
    (state) => state.tasks
  );

  const reload = useCallback(() => dispatch(fetchTasks({ projectId })), [dispatch, projectId]);

  useEffect(() => {
    reload();
  }, [reload]);

  // Until the tasks of this project arrive, do not show the tasks of another project.
  const isCurrent = loadedProjectId === projectId;

  return {
    tasks: isCurrent ? items : [],
    status: isCurrent ? status : "loading",
    error,
    reload,
  };
}