import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../projects.slice.js";

export function useProject(projectId) {
  const dispatch = useDispatch();
  const { current, currentStatus, currentError } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProject(projectId));
  }, [dispatch, projectId]);

  return { project: current, status: currentStatus, error: currentError };
}