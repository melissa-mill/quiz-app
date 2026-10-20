const BASE_URL = "https://opentdb.com/api.php";

export const getQuestions = async (category = 9) => {
  const res = await fetch(`${BASE_URL}?amount=10&category=${category}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
