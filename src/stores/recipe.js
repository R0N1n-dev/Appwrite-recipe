import { ID, Query } from "appwrite";
import { databases } from "../appwrite";
const dbID = import.meta.env.VITE_APPWRITE_DB_ID; // Replace with your database ID
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your collection ID
//const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [],
    specificRecipe: null,
    loading: false
  }),
  actions: {
    async init() {
      const response = await databases.listDocuments(dbID, collectionId, [
        Query.orderDesc("$createdAt"),
        Query.limit(10)
      ]);
      this.recipes = response.documents;
    },
    async getSingleRecipe(docId) {
      try {
        const response = await databases.getDocument(dbID, collectionId, docId);
        console.log(response); // Success
        this.specificRecipe = response;
      } catch (error) {
        console.log(error); // Failure
      }
    },
    async add(newRecipe) {
      const response = await databases.createDocument(dbID, collectionId, ID.unique(), newRecipe);
      this.recipes = [response, ...this.recipes].slice(0, 10);
      await this.init();
    },
    async remove(id) {
      await databases.deleteDocument(dbID, collectionId, id);
      this.recipes = this.recipes.filter((recipe) => recipe.$id !== id);
      await this.init(); // Refetch recipes to ensure we have 10 items
    }
  }
});
