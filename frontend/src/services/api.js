const BASE_URL = "http://localhost:5000";

export async function searchSymptoms(query) {
  const response = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
}