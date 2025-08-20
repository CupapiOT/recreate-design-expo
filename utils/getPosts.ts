import axios, { isAxiosError } from "axios";
import { Post } from "@/types/Post";

export async function getPosts(startFrom: number) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`,
      { params: { _start: startFrom, _limit: 10 } },
    );
    const posts: Post[] = await response.data;
    return posts;
  } catch (error) {
    if (isAxiosError(error)) console.error("Axios Error:", error);
    else console.error("Unexpected Error:", error);
  }
}
