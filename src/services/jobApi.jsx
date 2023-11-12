const API_URL = "https://job-finder-qkja.onrender.com";

export async function getJobsApi(type) {
  let url = `${API_URL}/jobs`;
  if (type) url += `?q=${type.split("-").join(" ")}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("could not load jobs");

  const data = await response.json();
  return data;
}

export async function getJobApi(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createJobApi(newJob) {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.message = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function updateJobApi({ id, data }) {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const updatedData = await response.json();
  return updatedData;
}

export async function deleteJobApi(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }
}
