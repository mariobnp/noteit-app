const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, option = {}) {
  return fetch(url, {
    ...option,
    headers: {
      ...option.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

// fungsi register
async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      message: responseJson.message,
    };
  }

  return {
    error: false,
  };
}

// fungsi login
async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      message: responseJson.message,
      data: null,
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// ambil data user yang login
async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: null,
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// fungsi buat notes
async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: null,
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// fungsi buat get note -- tidak arsip
async function getNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: [],
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// fungsi buat ngambil arsip note
async function getArchiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: [],
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// fungsi buat detail catatan
async function getDetailNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: null,
    };
  }

  return {
    error: false,
    data: responseJson.data,
  };
}

// fungsi buat mengarsipkan notes
async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
    };
  }

  return {
    error: false,
  };
}

// fungsi buat membatalkan arsip
async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
    };
  }

  return {
    error: false,
  };
}

// fungsi buat delete notes
async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
    };
  }

  return {
    error: false,
  };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getNotes,
  getArchiveNotes,
  getDetailNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
