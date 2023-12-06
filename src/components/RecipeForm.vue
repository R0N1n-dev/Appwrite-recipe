<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center">
        <form>
          <vs-input v-model="name" placeholder="Name" />
          <vs-input v-model="origin" placeholder="Origin" />
          <vs-input v-model="serves" placeholder="No. of servings" type="number" />
          <vs-select
            v-model="selected"
            label="Category"
            placeholder="select category"
            icon-pack="bx"
            icon="bx-down-arrow"
            multiple
          >
            <vs-select-item
              v-for="category in categories"
              :key="category.id"
              :text="category.label"
              :modelValue="category.value"
            ></vs-select-item>
          </vs-select>
          <vs-row>
            <vs-col>
              <vs-input v-model="inMeasure" placeholder="Ingredient" />
              <vs-button
                radius
                color="primary"
                type="border"
                icon-pack="bx"
                icon="bx-plus"
                @click="addIn()"
              ></vs-button>
            </vs-col>
            <vs-col v-if="ingredients.length">
              <vs-chip color="primary" v-for="(ingredient, index) in ingredients" :key="index">
                <vs-avatar icon-pack="bx" icon="bx-x" @click="removeIngredient(index)" />
                {{ ingredient }}
              </vs-chip>
            </vs-col>
          </vs-row>
          <vs-row>
            <vs-col>
              <vs-textarea
                v-model="prepStep"
                placeholder="Cooking steps"
                counter="1000"
                :counter-danger.sync="counterDanger"
              />
              <vs-button
                radius
                color="primary"
                type="border"
                icon-pack="bx"
                icon="bx-plus"
                @click="addStep()"
              ></vs-button>
            </vs-col>
            <vs-col v-if="cookingSteps.length">
              <vs-chip color="primary" v-for="(step, index) in cookingSteps" :key="index">
                <vs-avatar icon-pack="bx" icon="bx-x" @click="removeCookingStep(index)" />
                {{ step }}
              </vs-chip>
            </vs-col>
          </vs-row>
          <vs-button @click="open" type="relief" id="upload_widget">Upload</vs-button>
          <img width="400" id="uploadedimage" src="" />
          <vs-button @click.prevent="addNewRecipe" type="relief">Add recipe</vs-button>
        </form>
      </vs-col>
    </vs-row>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRecipeStore } from "../stores/recipe";
const userStore = useUserStore();
const recipeStore = useRecipeStore();
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
let myWidget;
const name = ref("");
const origin = ref("");
const serves = ref(null);
const categories = ref([
  { id: 1, label: "Appetizer", value: "appetiser" },
  { id: 2, label: "Snack", value: "snack" },
  { id: 3, label: "Sides", value: "side" },
  { id: 4, label: "Main course", value: "main course" },
  { id: 5, label: "Dessert", value: "dessert" },
  { id: 6, label: "Fastfood", value: "fast food" },
  { id: 7, label: "Pastries", value: "pastries" }
]);
const selected = ref([]);
const inMeasure = ref("");
const ingredients = ref([]);
const prepStep = ref("");
const cookingSteps = ref([]);
const image = ref("");
const counterDanger = ref(false);
function addIn() {
  if (inMeasure.value !== "") {
    ingredients.value.push(inMeasure.value);
    inMeasure.value = "";
    console.log("Succesfully added ingredient");
    console.log(ingredients.value);
  } else {
    alert("No ingredient, please add");
    return;
  }
}
function removeIngredient(item) {
  ingredients.value.length > 0 && ingredients.value.splice(item, 1);
}
function removeCookingStep(step) {
  cookingSteps.value.length > 0 && cookingSteps.value.splice(step, 1);
}
function addStep() {
  if (prepStep.value !== "") {
    cookingSteps.value.push(prepStep.value);
    prepStep.value = "";
    console.log("Added cooking step");
  } else {
    alert("Step not added, add first");
    return;
  }
}

function addNewRecipe() {
  const newRecipe = {
    userId: userStore.user.$id,
    name: name.value,
    origin: origin.value,
    serves: serves.value,
    category: selected.value,
    ingredients: ingredients.value,
    steps: cookingSteps.value,
    image: image.value
  };
  recipeStore.add(newRecipe);
}

onMounted(() => {
  myWidget = cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      folder: "recipe-images" //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
        //console.log(result.info.secure_url);
        // console.log(image.value);
        image.value = result.info.secure_url;
        console.log("Image", image.value);
      }
      //image.value = result.info.secure_url;
      //console.log(image.value);
    }
  );
});

function open() {
  myWidget.open();
}
</script>
