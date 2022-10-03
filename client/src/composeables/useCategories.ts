import { collection, getDocs } from "@firebase/firestore";
import { ref } from "vue";
import { Category } from "../../../types";
import { db } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

const categories = ref<Category[]>([]);

export const useCategories = () => {
  const loading = ref(false);

  const load = async () => {
    loading.value = true;
    if (!categories.value.length) {
      const firestoreCategoriesRef = collection(db, "categories");
      const snapshot = await getDocs(firestoreCategoriesRef);
      categories.value = mapCollection<Category>(snapshot);
    }
    loading.value = false;
  };

  const getSomeCategories = async (count = 4) => {
    await load();

    return Array(count)
      .fill(null)
      .map(() => {
        const index = Math.floor(Math.random() * categories.value.length);
        return categories.value[index].description;
      });
  };

  load();

  return { categories, getSomeCategories, load, loading };
};
