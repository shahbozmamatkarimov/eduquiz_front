<template>
    <div class="min-h-[calc(100vh-160px)] full_flex justify-center p-4 w-full">
        <!-- 3. Asosiy sahifa -->
        <div v-if="screen === 'home'" class="w-full max-w-md flex flex-col bg-white">
            <!-- Main Content -->
            <div class="flex-1 p-6">
                <div class="bg-black text-white rounded-3xl p-6 mb-6">
                    <h2 class="text-xl font-semibold text-center">Qanday test yaratmoqchisiz?</h2>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button @click="screen = 'create-test'; useTests.test.type = 'individual'"
                        class="bg-black text-white py-8 rounded-3xl text-xl font-semibold hover:bg-gray-900 transition">
                        Yakka
                    </button>
                    <button @click="screen = 'create-test'; useTests.test.type = 'community'"
                        class="bg-black text-white py-8 rounded-3xl text-xl font-semibold hover:bg-gray-900 transition">
                        Jamoaviy
                    </button>
                </div>
            </div>
        </div>

        <!-- 4. Yakka test yaratish -->
        <div v-else-if="screen === 'create-test'" class="w-full max-w-md flex flex-col bg-white">
            <div class="flex-1 p-6">
                <div class="bg-black text-white rounded-3xl p-6 mb-6">
                    <h2 class="text-xl font-semibold text-center">
                        {{ useTests.test.type == 'community' ? 'Jamoaviy' : 'Yakka tartibli' }} test yaratish
                    </h2>
                </div>

                <form @submit.prevent="useTests.createTest" class="space-y-4">
                    <input v-model="useTests.test.question" type="text" placeholder="Savol matnini kiriting"
                        class="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" required>

                    <div class="space-y-3">
                        <label class="text-sm text-gray-600">Javob arayantlarni kiriting</label>
                        <input v-for="index in useTests.test.variants?.length" v-model="useTests.test.variants[index-1]" type="text" :placeholder="generateAlphabet(index-1)"
                            class="w-full px-4 py-3 bg-gray-100 rounded-xl" required>
                        <button v-if="useTests.test.variants?.length < 4" @click="useTests.test.variants?.push(null)" class="w-full py-2 bg-gray-200 rounded-xl text-sm">Variant qo'shish +</button>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm text-gray-600">To'g'ri javobni tanlang</label>
                        <a-select v-model:value="useTests.test.true_answer" class="w-full" placeholder="calendar.time" required>
                            <a-select-option v-for="index in useTests.test.variants?.length" :label="item"
                                :value="index">{{ generateAlphabet(index-1) }}</a-select-option>
                            <template #suffixIcon>
                                <img class="w-4" src="@/assets/svg/icon/arrow.svg" alt="" />
                            </template>
                        </a-select>
                        <!-- <button class="w-full py-3 bg-green-500 text-white rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            A
                        </button> -->
                    </div>

                    <!-- <button @click="screen = 'enter-code'" -->
                    <a-button :loading="isLoading.isLoadingType('createTest')" htmlType="submit"
                        class="w-full bg-white border-2 border-black text-black font-semibold !py-3 h-12 rounded-xl hover:bg-gray-100 transition">
                        KEYINGI BOSQICH
                    </a-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoadingStore, useTestsStore } from '~/store';

const useTests = useTestsStore();
const isLoading = useLoadingStore();

const screen = ref('home') // register, login, home, create-personal, enter-code, test-start, results

function generateAlphabet(index) {
  return String.fromCharCode(65 + index);
}
</script>

<style scoped>
/* Qo'shimcha stil kerak bo'lsa */
</style>