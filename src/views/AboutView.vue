<template>
  <div class="about">
    <h1>This is an about page</h1>
    <vs-row vs-justify="center">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        class="mx6"
        v-for="recipe in recipeStore.recipes"
        :key="recipe.$id"
      >
        <vs-card class="" actionable>
          <template #header>
            <h3>
              {{ recipe.name }}
            </h3>
          </template>
          <template #media>
            <img :src="recipe.image" />
          </template>
          <div>
            <h2>
              {{ recipe.origin }}
            </h2>
          </div>
          <template #footer>
            <vs-row vs-justify="flex-end">
              <vs-button
                type="gradient"
                color="danger"
                icon="favorite"
                :to="`/recipe/${recipe.$id}`"
              ></vs-button>
              <vs-button
                v-if="userStore.user !== null && recipe.userId === userStore.user.$id"
                @click="recipeStore.remove(recipe.$id)"
                color="primary"
                icon-pack="bx"
                icon="bxs-trash"
              ></vs-button>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script setup>
import { useRecipeStore } from "../stores/recipe";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const recipeStore = useRecipeStore();
onMounted(async () => {
  await recipeStore.init();
});
</script>

<style></style>
