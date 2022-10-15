import axios from "axios";
import { ref } from "vue";

const BASE_URL = "https://api.giphy.com/v1/gifs/search";
const API_KEY = import.meta.env.VITE_GIPHY_KEY;

export const useGiphy = () => {
  const isLoading = ref(false);

  const getGifs = async (category: string, count = 8): Promise<string[]> => {
    isLoading.value = true;

    const { data } = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        q: category,
        limit: count,
        offset: Math.floor(Math.random() * 50),
      },
    });

    isLoading.value = false;

    return data.data.map((g: any) => g.images.fixed_height.url as string);
  };

  return { getGifs, isLoading };
};
