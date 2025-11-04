<template>
    <!-- <table>
        <thead>
            <tr>
                <th>Test nomi</th>
                <td>Tavsifi</td>
            </tr>
        </thead>
        <tbody>
            <tr @click="$router.push(`/test/${i.id}`)" v-for="i in useLessons.store.lessons">
                <td>{{i.title}}</td>
                <td>{{i.content}}</td>
            </tr>
        </tbody>
    </table> -->
    <main id="main-dashboard" class="max-w-7xl mx-auto px-6 py-8">
        <section id="dashboard-header" class="mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">Available Live Quizzes</h2>
                    <p class="text-gray-600">Select a quiz to start your live session</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span class="text-sm text-gray-500">Total Quizzes:</span>
                        <span class="font-bold text-gray-900 ml-1">{{ useLessons.store.lessons?.length || 0 }}</span>
                    </div>
                    <button @click="store.create = true"
                        class="flex  gap-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        <i class="mr-2 w-2 h-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-plus"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">
                                </path>
                            </svg></i>Create New Quiz
                    </button>
                </div>
            </div>
        </section>

        <section id="quiz-grid" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

            <div v-for="i in useLessons.store.lessons" id="quiz-card-1"
                class="quiz-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i v-if="i.tests_count" class="text-blue-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-brain" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="brain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M184 0c30.9 0 56 25.1 56 56V456c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56V56c0-30.9 25.1-56 56-56z">
                                </path>
                            </svg></i>
                        <i v-else class="text-indigo-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-book" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z">
                                </path>
                            </svg></i>
                    </div>
                    <span v-if="i.tests_count"
                        class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Ready</span>
                    <span v-else
                        class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Unfinished</span>

                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ i.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ i.content }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-circle-question"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-question"
                                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z">
                                </path>
                            </svg></i>
                        <span>{{ i.tests_count }} Questions</span>
                    </div>
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-clock"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                                </path>
                            </svg></i>
                        <span>30 min</span>
                    </div>
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-users"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z">
                                </path>
                            </svg></i>
                        <span>0/50</span>
                    </div>
                </div>
                <router-link v-if="i.tests_count" :to="`/live-quiz/${i.id}`">
                    <button
                        class="full_flex w-full bg-gradient-to-r from-blue-600 to-blue-200 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-play"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">
                                </path>
                            </svg></i>Start Live Quiz
                    </button>
                </router-link>
                <router-link v-else :to="`/test/${i.id}`">
                    <button class="full_flex w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold">
                    <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-pen-to-square"
                            aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z">
                            </path>
                        </svg></i>Complete Setup
                </button>
                </router-link>
            </div>

            <div id="quiz-card-5"
                class="quiz-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i class="text-indigo-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-book" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z">
                                </path>
                            </svg></i>
                    </div>
                    <span
                        class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Unfinished</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">World Geography</h3>
                <p class="text-gray-600 text-sm mb-4">Countries, capitals, and major landmarks</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-circle-question"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-question"
                                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z">
                                </path>
                            </svg></i>
                        <span>22 Questions</span>
                    </div>
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-clock"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                                </path>
                            </svg></i>
                        <span>25 min</span>
                    </div>
                    <div class="flex items-center">
                        <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-users"
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z">
                                </path>
                            </svg></i>
                        <span>0/45</span>
                    </div>
                </div>
                <button class="full_flex w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold">
                    <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-pen-to-square"
                            aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z">
                            </path>
                        </svg></i>Complete Setup
                </button>
            </div>
        </section>

        <section id="quick-stats" class="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Quick Statistics</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-chart-line" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="chart-line" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z">
                                </path>
                            </svg></i>
                    </div>
                    <p class="text-2xl font-bold text-gray-900">156</p>
                    <p class="text-sm text-gray-600">Total Participants</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="text-green-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-trophy" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="trophy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z">
                                </path>
                            </svg></i>
                    </div>
                    <p class="text-2xl font-bold text-gray-900">89%</p>
                    <p class="text-sm text-gray-600">Average Score</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="text-purple-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-clock" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                                </path>
                            </svg></i>
                    </div>
                    <p class="text-2xl font-bold text-gray-900">23m</p>
                    <p class="text-sm text-gray-600">Avg. Completion</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="text-orange-600 text-xl" data-fa-i2svg=""><svg width="20"
                                class="svg-inline--fa fa-star" aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                                </path>
                            </svg></i>
                    </div>
                    <p class="text-2xl font-bold text-gray-900">4.8</p>
                    <p class="text-sm text-gray-600">User Rating</p>
                </div>
            </div>
        </section>

        <UIModal @update:isOpen="(value) => handleModal(value, 'course')" :title="'Test yaratish'"
            :isOpen="store.create" :loadingType="'createLesson'">
            <ModalCreateCourse />
        </UIModal>
    </main>
</template>

<script setup>
import { useLoadingStore, useLessonsStore } from "@/store"
const useLessons = useLessonsStore();
// const useCategory = useCategoryStore();
// const useCourses = useCoursesStore();
// const useLessons = useLessonsStore();
const isLoading = useLoadingStore();
const router = useRouter();

const store = reactive({
    create: false,
})

watch(() => router.currentRoute.value, () => {
    getData();
})


function getData() {
    useLessons.getLessons();
    // useGroups.getGroups();
    // useLessons.getLessons();
    // useCourses.getCourses();
}

async function handleModal(value) {
    // modalType = modalType || 'lesson'
    if (value == "OK") {
        if (store.delete) {
            if (modalType == 'lesson') {
                useLessons.deleteLesson();
            } else {
                useCourses.deleteCourse();
            }
        } else if (store.create && !store.edit) {
            useLessons.createLesson();
            store.create = false;
        } else {
            if (modalType == 'lesson') {
                // useLessons.updateModule();
            } else {
                useCourses.updateCourse();
            }
        }
    } else {
        store.create = false;
        store.delete = false;
        useCourses.clearData();
    }
}

onBeforeMount(() => {
    // useCategory.getCategory();
    getData();
    isLoading.filter.category_id = router.currentRoute.value.category_id;
})

watch(() => isLoading.filter.category_id, () => {
    isLoading.store.subcategory_id = [];
    isLoading.applyFilters();
})
</script>

<style lang="scss" scoped></style>