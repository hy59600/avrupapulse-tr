const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export async function getPublishedArticles() {
  const response = await fetch(`${apiBaseUrl}/api/articles`);

  if (!response.ok) {
    throw new Error("Failed to load articles.");
  }

  return response.json();
}

export async function getDraftArticles() {
  const response = await fetch(`${apiBaseUrl}/api/articles/drafts`);

  if (!response.ok) {
    throw new Error("Failed to load draft articles.");
  }

  return response.json();
}

export async function getPublishedArticle(id) {
  const response = await fetch(`${apiBaseUrl}/api/articles/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load the article.");
  }

  return response.json();
}

export async function createArticle(payload) {
  const response = await fetch(`${apiBaseUrl}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create the article.");
  }

  return response.json();
}

export async function updateArticle(id, payload) {
  const response = await fetch(`${apiBaseUrl}/api/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update the article.");
  }

  return response.json();
}

export async function deleteArticle(id) {
  const response = await fetch(`${apiBaseUrl}/api/articles/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete the article.");
  }
}

export async function publishArticle(id) {
  const response = await fetch(`${apiBaseUrl}/api/articles/${id}/publish`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Failed to publish the article.");
  }

  return response.json();
}
