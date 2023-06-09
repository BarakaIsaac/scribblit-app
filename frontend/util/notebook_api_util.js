export const getNotebooks = (success, error) => {
  $.ajax({
    method: "GET",
    url: "/api/notebooks",
    success,
    error,
  });
};

export const createNotebook = (data, success, error) => {
  $.ajax({
    method: "POST",
    url: "/api/notebooks",
    data: { notebook: data },
    success,
    error,
  });
};

export const updateNotebook = (data, success, error) => {
  $.ajax({
    method: "PATCH",
    url: `/api/notebooks/${data.id}`,
    data: { notebook: data },
    success,
    error,
  });
};

export const getNotebook = (id, success, error) => {
  $.ajax({
    method: "GET",
    url: `/api/notebooks/${id}`,
    success,
    error,
  });
};

export const destroyNotebook = (notebook, success, error) => {
  $.ajax({
    method: "DELETE",
    url: `/api/notebooks/${notebook.id}`,
    success,
    error,
  });
};
