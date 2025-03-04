import axios from "axios";

export async function fetchArticles(username: string) {
  try {
    const response = await axios.get(
      `https://qiita.com/api/v2/items?query=user:${username}`
    );
    return response.data.slice(0, 12);
  } catch (error) {
    console.error("自分の記事の取得に失敗しました", error);
    return [];
  }
}
