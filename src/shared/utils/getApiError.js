export function getApiError(error) {
  if (!error.response) {
    return {
      message: "Cannot reach the server. Please try again.",
      fieldErrors: {},
    };
  }

  const data = error.response.data;
  const fieldErrors = {};

  if (Array.isArray(data?.details)) {
    data.details.forEach(({ path, message }) => {
      if (path && !fieldErrors[path]) fieldErrors[path] = message;
    });
  }

  return {
    message: data?.message || "Something went wrong. Please try again.",
    fieldErrors,
    status: error.response.status,
  };
}