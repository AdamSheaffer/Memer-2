import axios from 'axios';

const BASE_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = process.env.VUE_APP_GIPHY_KEY;

const getRandomImages = async (category: string): Promise<string[]> => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      q: category,
      limit: 5,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.data.map((g: any) => g.images.fixed_height.url as string);
};

export default {
  getRandomImages,
};
