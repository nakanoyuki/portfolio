import axios from "axios";

const API_TOKEN = "66e6eb0564a29cd9e507d71efd5bce7f1f40609b";
const CACHE_DURATION = 60 * 1000;
let cachedArticles: { [key: string]: any[] } = {};
let lastFetchTime: { [key: string]: number } = {};

export async function fetchArticles(username: string) {
  const now = Date.now();

  if (
    cachedArticles[username] &&
    now - lastFetchTime[username] < CACHE_DURATION
  ) {
    console.log(`キャッシュから ${username} の記事を取得`);
    return cachedArticles[username];
  }

  try {
    const response = await axios.get(
      `https://qiita.com/api/v2/items?query=user:${username}`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }
    );

    cachedArticles[username] = response.data;
    lastFetchTime[username] = now;

    return cachedArticles[username];
  } catch (error) {
    console.error("自分の記事の取得に失敗しました", error);
    return [];
  }
}
