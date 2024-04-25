<template>
  <div class="flex flex-col lg:gap-y-10 gap-y-4">
    <breadcrumb class="lg:hidden px-6" :pages="pages" />
    <div class="bg-primary bg-opacity-10">
      <div class="px-6 lg:px-40 relative">
        <p class="font-redressed text-4xl py-10 text-center">Liste des écoles</p>
        <breadcrumb class="hidden lg:block absolute top-0 mt-3" :pages="pages" />
      </div>
    </div>

    <!-- list of school -->
    <div class="flex justify-center">
      <div class="w-full md:w-3/4 lg:w-1/2">
        <!-- button add new school -->
        <div class="flex justify-end mb-2">
          <button @click="openModalNewSchool"
            class="bg-primary px-8 py-2 rounded-xl text-white cursor-pointer mt-4 mr-4">
            Nouvelle école
          </button>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="item in ecoles" :key="item.id" class="py-4 flex justify-between items-center">
            <div>
              <p class="text-xl font-bold">{{ item.ecoleName }}</p>
              <p class="text-gray-600">{{ item.desc }}</p>
            </div>
            <div class="flex space-x-4">
              <nuxt-link @click="openModalEditSchool(item)"
                class="bg-white-500 px-2 py-1 rounded-md text-red cursor-pointer">
                Modifier
              </nuxt-link>
              <nuxt-link @click="openModalDelete(item.ecoleId)"
                class="bg-white-500 px-2 py-1 rounded-md text-red cursor-pointer">
                Supprimer
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <!-- Modal pour l'ajout -->
  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg">
      <!-- Contenu du modal -->
      <form class="flex flex-col gap-y-4">
        <label for="ecoleName" class="font-redressed text-xl">Ajouter une nouvelle école</label>
        <input v-model="formNewEcole.ecoleName" />
        <!-- <input v-model="formName.ecoleName" required type="text" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
        <button @click="validFormEcole()" type="submit"
          class="bg-primary px-8 py-2 rounded-l text-white cursor-pointer mt-4">
          Créer
        </button>
        <button @click="closeModalNewSchool" class="bg-white-500 px-8 rounded-l text-black cursor-pointer mt-4">
          Annuler
        </button>
      </form>
    </div>
  </div>

  <!-- Modal pour la modification -->
  <div v-if="isModalOpenEdit" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg">
      <!-- Contenu du modal -->
      <form class="flex flex-col gap-y-4">
        <label class="font-redressed text-xl">Modifier le nom de l'école</label>
        <input v-model="ecoleNameTemp" />
        <button @click="validFormEcole()" type="submit"
          class="bg-primary px-8 py-2 rounded-l text-white cursor-pointer mt-4">
          Enregistrer
        </button>
        <button @click="closeModalEditSchool" class="bg-white-500 px-8 rounded-l text-black cursor-pointer mt-4">
          Annuler
        </button>
      </form>
    </div>
  </div>

  <!-- Modal pour delete -->
  <div v-if="isModalOpenDelete" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg">
      <!-- Contenu du modal -->
      <form class="flex flex-col gap-y-4">
        <label for="ecoleName" class="font-redressed text-xl">Etes-vous sur de vouloir le supprimer ?</label>
        <button @click="confirmDelete(item)" class="bg-primary px-8 py-2 rounded-l text-white cursor-pointer mt-4">
          Supprimer
        </button>
        <button @click="closeModalDelete" class="bg-white-500 px-8 rounded-l text-black cursor-pointer mt-4">
          Annuler
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useEcoleStore } from "~/stores/ecole.js";
import { ref } from "vue";

const ecoleStore = useEcoleStore();

const pages = [
  { name: 'Liste des ecoles', href: '/liste-ecole' },
];

const ecoles = ref(null);

const formNewEcole = ref({
  ecoleName: null
})

const fetchEcoles = async () => {
  try {
    const result = await fetch("https://localhost:7110/api/Ecole", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    const ecoleResult = await result.json();
    ecoles.value = ecoleResult;
  } catch (error) {
    console.error("Erreur lors de la récupération des écoles :", error);
  }
};

fetchEcoles();

// Gestion du modal
const isModalOpen = ref(false);

const openModalNewSchool = () => {
  isModalOpen.value = true;
};

const closeModalNewSchool = () => {
  isModalOpen.value = false;
  ecoleToDelete.value = 0;
};

const isModalOpenEdit = ref(false);
const formEditEcole = ref({
  ecoleId: null,
  ecoleName: null
})

const ecoleNameTemp = ref(null)

const openModalEditSchool = (ecole) => {
  isModalOpenEdit.value = true;
  formEditEcole.value = ecole;
  ecoleNameTemp.value = ecole.ecoleName;
};

const closeModalEditSchool = () => {
  isModalOpenEdit.value = false;
  formEditEcole.value = null;
  ecoleNameTemp.value = null;
};

const confirmDelete = function () {
  deleteEcole(ecoleToDelete.value);
  this.closeModalDelete();
}

const isModalOpenDelete = ref(false);
const ecoleToDelete = ref(0);
const openModalDelete = (ecoleId) => {
  ecoleToDelete.value = ecoleId;
  isModalOpenDelete.value = true;
};
const closeModalDelete = () => {
  isModalOpenDelete.value = false;
};

const deleteEcole = async (ecoleId) => {
  try {
    const result = await fetch(`https://localhost:7110/api/Ecole/${ecoleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    if (result.ok) {
      fetchEcoles();
    } else {
      console.error("Failed to delete ecole:", result.status);
    }
  } catch (error) {
    console.error("Error deleting ecole:", error);
  }
};

const validFormEcole = async () => {
  try {
    formEditEcole.value.ecoleName = ecoleNameTemp.value;

    const url = formNewEcole.value.ecoleName ? "https://localhost:7110/api/Ecole" : `https://localhost:7110/api/Ecole/${formEditEcole.value.ecoleId}`;

    const result = await fetch(url, {
      method: formNewEcole.value.ecoleName ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(formNewEcole.value.ecoleName ? formNewEcole.value : formEditEcole.value)
    }).then((result) => {
      if (result.ok) {
        fetchEcoles();
      } else {
        console.error("Failed to create ecole:", result.status);
      }
    });
  } catch (error) {
    console.error("Error updating ecole:", error);
  }
}
</script>