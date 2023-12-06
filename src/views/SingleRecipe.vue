<template>
  <div>
    <p>Single recipe</p>
    <vs-button @click="router.go(-1)">Back</vs-button>
    <div v-if="recipeStore.specificRecipe !== null">
      {{ recipeStore.specificRecipe?.name }}- submitted from by
      <span>{{ recipeStore.specificRecipe?.origin }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from "../stores/recipe";
const recipeStore = useRecipeStore();
const route = useRoute();
const router = useRouter();
onMounted(() => {
  recipeStore.getSingleRecipe(route.params.id);
});
</script>
