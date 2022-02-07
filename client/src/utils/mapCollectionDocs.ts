import { DocumentData, QuerySnapshot } from "firebase/firestore";

type Identity = { uid?: string };

export const mapDoc = <T extends Identity>(doc: DocumentData): T => {
  const data = doc.data() as T;
  return {
    ...data,
    uid: doc.id,
  };
};

export const mapCollection = <T extends Identity>(snapshot: QuerySnapshot): T[] => {
  const items = snapshot.docs.map((doc) => mapDoc<T>(doc));
  return items;
};
