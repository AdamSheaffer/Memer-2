import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import data from "./data";

const clearData = async (): Promise<any> => {
  const categories = await admin.firestore()
      .collection("categories")
      .get();

  const requests: Promise<FirebaseFirestore.WriteResult>[] = [];

  categories.forEach((cat) => {
    requests.push(cat.ref.delete());
  });

  const captions = await admin.firestore()
      .collection("captions")
      .get();

  captions.forEach((cap) => {
    requests.push(cap.ref.delete());
  });

  return Promise.all(requests);
};

export const emulatorPopulate = functions.https
    .onRequest(async (req, res) => {
      if (!process.env.FUNCTIONS_EMULATOR) {
        throw Error("DUMMY DATA POPULATION IS ONLY TO BE USED IN FB EMULATOR");
      }

      await clearData();

      const {captions, categories} = data;
      const captionBatch = admin.firestore().batch();

      captions.forEach((caption) => {
        const captionRef = admin.firestore().collection("captions").doc();
        captionBatch.set(captionRef, caption);
      });

      await captionBatch.commit();

      console.log("Added captions");

      const categoryBatch = admin.firestore().batch();

      categories.forEach((caption) => {
        const captionRef = admin.firestore().collection("categories").doc();
        categoryBatch.set(captionRef, caption);
      });

      await categoryBatch.commit();

      console.log("Added categories");

      res.json({success: true});
    });


