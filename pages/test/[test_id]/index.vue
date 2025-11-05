<template>
  <main class="full_flex">
    <!-- 5. Kod kiritish -->
    <!-- {{ useTests.store.test }} -->
    <template v-if="useChat.store.userScreen !== 'results'">
      <div v-if="screen === 'enter-code'" class="w-full max-w-md flex flex-col">
        <div class="p-6 full_flex md:flex-row max-h-fit gap-20 flex-col space-y-8">
          <div class="space-y-8">
            <h2 class="text-xl font-semibold">Kirish uchun kod</h2>
            <div class="bg-black text-white text-6xl font-bold py-8 px-16 rounded-3xl">
              {{ useTests.store.test?.code }}
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-black text-white rounded-3xl p-6 w-full min-w-[200px] min-h-[50vh]">
              <p class="text-lg font-bold whitespace-nowrap">O'quvchilar 3/20</p>
              <ol class="mt-3 space-y-2 text-sm">
                <li v-for="(item, index) in useChat.store.userlist">{{ index + 1 }}. <b>{{ item.name }}</b></li>
              </ol>
            </div>

            <button @click="startTest"
              class="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
              BOSHLASH
            </button>
          </div>
        </div>
      </div>

      <!-- 6. Test boshlandi -->
      <div v-else-if="screen === 'test-start'" class="w-full max-w-md flex flex-col bg-white">
        <div>
          <div class="bg-black text-white rounded-3xl mb-[60px] p-5 text-center">
            <h2 class="text-2xl font-semibold mb-4">Test boshlandi</h2>
          </div>
          <div class="bg-black text-white rounded-3xl p-12 text-center">
            <p class="text-4xl font-bold">Tugashiga {{ useChat.store.countdown }} soniya qoldi</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 7. Natijalar -->
    <div v-if="useChat.store.userScreen === 'results'" class="w-full max-w-md flex flex-col bg-white">
      <div class="flex-1 p-6 flex flex-col items-center justify-center space-y-8">
        <div class="bg-black text-white rounded-3xl mb-[60px] p-5 text-center">
          <h2 class="text-2xl font-semibold">Natijalar</h2>
        </div>
        <p class="text-lg">G'olib:</p>
        <div v-if="useChat.store.result.find(user => user.score == 100)"
          class="bg-black text-white rounded-3xl p-6 text-center">
          <p class="font-bold">{{ useChat.store.result.find(user => user.score == 100)?.name }} {{ useChat.store.result.find(user => user.score == 100)?.score }}% to‘g‘ri</p>
          <p class="text-sm">{{ useChat.store.result.find(user => user.score == 100)?.countdown }} Soniyada bajardi</p>
        </div>
        <div v-else>G'olib topilmadi</div>
      </div>
    </div>
  </main>
</template>

<script setup>
// const route = useRoute();
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import time from "@/assets/svg/test/time.svg";
import pen from "@/assets/svg/test/pen.svg";
import calculator from "@/assets/svg/test/calculator.svg";
import periodic from "@/assets/svg/test/periodic.svg";
import { useChatStore, useLoadingStore, useTestsStore, useUploadStore } from "~/store";
import { formatDate, formatDurationFromSeconds } from "@/composables";
import mammoth from "mammoth";
import { onBeforeRouteLeave } from 'vue-router'
const screen = ref('enter-code')
const useChat = useChatStore();
const useTests = useTestsStore();
const isLoading = useLoadingStore();

const store = reactive({
  timer: null,
  time: 60,
});

async function getModels() {
  await useTests.getById();
  useChat.connectUser(useTests.store.test.code);
}

getModels();

function deleteVariants(index, v_index) {
  console.log(index, v_index);

  useTests.test[index]?.variants?.splice(v_index, 1);
}

function generateAlphabet(index) {
  return String.fromCharCode(65 + index);
}

function convertMinutePeriod(e) {
  const val = Number(e.target.value);
  const hours = Math.floor(val / 60);
  const minutes = val % 60;
  const seconds = val * 60;
  useTests.test_settings.period = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function startTest() {
  useChat.startTest();
  // store.timer = setInterval(() => {
  //   if (store.time == 0) {
  //     screen.value = 'results';
  //     clearInterval(store.timer);
  //   }
  //   store.time--;
  // }, 1000);
  screen.value = 'test-start';
}

function handleVariant(index) {
  useTests.test[index].true_answer = [useTests.test[index].true_answer.pop()];
}

onBeforeMount(() => {
  window.addEventListener("beforeunload", function (event) {
    // Ogohlantiruv matni
    const message = "Sahifani tark etmoqchimisiz? Test yopiladi!";

    // Ba'zi brauzerlar uchun
    event.preventDefault();
    event.returnValue = message;

    // Foydalanuvchiga alert ko‘rsatiladi (brauzer standart ko‘rinishda chiqaradi)
    return message;
  });
})

onBeforeRouteLeave((to, from, next) => {
  if (!confirm("Sahifani tark etmoqchimisiz? Test yopiladi!")) {
    next(false) // bekor qiladi, sahifadan chiqmaydi
  } else {
    next()
  }
})

// Eventni tozalash
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', () => { })
  clearInterval(store.timer);
})
</script>

<style lang="scss" scoped></style>
