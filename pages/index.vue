<template>
    <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 space-y-8">

        <!-- 1. Kod kiritish sahifasi -->
        <div v-if="useChat.store.userScreen === 'enter-code'" class="w-full max-w-sm space-y-6">
            <div class="bg-black text-white rounded-full py-3 px-8 text-center font-semibold">
                Kirish uchun kodni kiriting
            </div>
            <input v-model="useChat.store.code" type="text" placeholder="____"
                class="w-full px-6 py-4 bg-white border-2 border-black rounded-full text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-4 focus:ring-green-300"
                maxlength="4" @input="submitCode" />
            <p v-if="isLoading.isLoadingType('createTest')">Checking...</p>
            <p v-else-if="useChat.store.code && store.isCode !== true">Code is not found</p>
        </div>

        <!-- 2. Ism kiritish -->
        <div v-else-if="useChat.store.userScreen === 'enter-name'" class="w-full max-w-sm space-y-6">
            <div class="bg-black text-white rounded-full py-3 px-8 text-center font-semibold">
                Ismingizni kiriting
            </div>
            <input v-model="useChat.store.username" type="text" placeholder="Ismingiz"
                class="w-full px-6 py-4 bg-white border-2 border-black rounded-full text-center text-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                @keyup.enter="submitName" />
        </div>

        <!-- 3. Boshlanishiga oz qoldi -->
        <div v-else-if="useChat.store.userScreen === 'waiting'" class="w-full max-w-sm space-y-6">
            <div class="bg-black text-white rounded-full py-3 px-8 text-center font-semibold">
                Boshlanishiga oz qoldi
            </div>
            <div class="bg-black text-white rounded-3xl p-6 w-full min-w-[200px] min-h-[50vh]">
                <p class="text-lg font-bold whitespace-nowrap">O'quvchilar 3/20</p>
                <ol class="mt-3 space-y-2 text-sm">
                    <li v-for="(item, index) in useChat.store.userlist">{{ index + 1 }}. <b>{{ item.name }}</b></li>
                </ol>
            </div>
            <button class="w-full bg-black text-white py-3 rounded-full font-semibold opacity-50 cursor-not-allowed">
                Biroz kuting
            </button>
        </div>

        <!-- 4. Test savoli -->
        <div v-else-if="useChat.store.userScreen === 'question'" class="w-full max-w-lg space-y-6">
            <div class="bg-black text-white rounded-full py-3 px-8 text-center font-semibold">
                To‘g‘ri javobni tanlang
            </div>
            <div class="bg-black text-white rounded-3xl p-6 text-center">
                <p class="text-xl font-medium">{{ useChat.store.test?.question }}</p>
            </div>
            <div class="grid grid-cols-1 gap-4">
                <button v-for="(variant, index) in useChat.store.test?.variants" @click="selectAnswer(index)"
                    class="bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-800 transition"
                    :class="useChat.store.trueAnswer?.variant == index ? 'bg-green-700 hover:bg-green-500' : ''">
                    {{ variant }}
                </button>
                <!-- <button @click="selectAnswer('Andijon')"
                    class="bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-800 transition">
                    Andijon
                </button>
                <button @click="selectAnswer('Toshkent')"
                    class="bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-800 transition ring-4 ring-green-400">
                    Toshkent
                </button> -->
            </div>
            <div class="bg-black text-white rounded-full py-2 px-6 text-center text-sm">
                Tugashiga {{ useChat.store.countdown }} soniya qoldi
            </div>
        </div>

        <!-- 5. Natijalar -->
        <div v-else-if="useChat.store.userScreen === 'results'" class="w-full max-w-sm space-y-8">
            <div class="bg-black text-white rounded-full py-3 px-8 text-center font-semibold">
                Natijalar
            </div>
            <div class="bg-black text-white rounded-3xl p-6 text-center space-y-2">
                <p class="text-lg">Sizning natijangiz {{useChat.store.result.find(user => user.name ==
                    useChat.store.username)?.score}}% to‘g‘ri</p>
                <p class="text-sm">{{useChat.store.result.find(user => user.name == useChat.store.username)?.countdown
                }} soniyada</p>
            </div>
            <div class="space-y-4">
                <p class="text-center text-lg font-medium">G‘olib:</p>
                <div v-if="useChat.store.result.find(user => user.score == 100)"
                    class="bg-black text-white rounded-3xl p-6 text-center">
                    <p class="font-bold">{{useChat.store.result.find(user => user.score == 100).name}} {{
                        useChat.store.result.find(user => user.score == 100).score }}% to‘g‘ri</p>
                    <p class="text-sm">{{useChat.store.result.find(user => user.score == 100).countdown}} soniyada
                        bajardi</p>
                </div>
                <div v-else>G'olib topilmadi</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore, useLoadingStore, useTestsStore } from '~/store'

definePageMeta({
    layout: false,
})

const useTests = useTestsStore();
const isLoading = useLoadingStore();
const useChat = useChatStore();

const store = reactive({
    isCode: false,
})

const submitCode = async () => {
    if (useChat.store.code?.length == 4) {
        store.isCode = await useTests.checkCode(useChat.store.code);
        if (store.isCode !== true) {
            alert('Noto‘g‘ri kod!')
            useChat.store.code = '';
        } else {
            useChat.store.userScreen = 'enter-name'
        }
    } else {
        useChat.store.code.length = 4;
    }
}

const submitName = () => {
    if (useChat.store.username.trim()) {
        useChat.connectUser(useChat.store.code, useChat.store.username.trim());
        useChat.store.userScreen = 'waiting'
        // setTimeout(() => {
        //     useChat.store.userScreen = 'question'
        // }, 3000)
    }
}

const selectAnswer = (variant) => {
    useChat.store.trueAnswer = {
        variant,
        countdown: useChat.store.countdown,
    }
    useChat.setAnswer();
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
</script>

<style scoped>
/* Qo‘shimcha stil */
input::placeholder {
    color: #999;
    font-weight: 500;
}
</style>