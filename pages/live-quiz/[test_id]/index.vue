<template>
    <main id="main-session" class="max-w-7xl mx-auto px-6 py-8">

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="quiz-control-panel" class="lg:col-span-2 space-y-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ useLessons.store.lesson?.title }}</h1>
                    <p class="text-gray-600">{{ useLessons.store.lesson?.content }}</p>
                </div>
                <section v-if="!store.is_started" id="pin-code-section"
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div class="text-center mb-8">
                        <div
                            class="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-white text-2xl" data-fa-i2svg=""><svg width="20"
                                    class="svg-inline--fa fa-key" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                    data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z">
                                    </path>
                                </svg></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Quiz PIN Code</h2>
                        <p class="text-gray-600">Share this PIN with students to join the quiz</p>
                    </div>

                    <div class="bg-gray-50 rounded-xl p-8 mb-6">
                        <div class="text-center">
                            <div class="text-6xl font-bold text-blue-600 mb-4 tracking-wider" id="pin-display">748392
                            </div>
                            <button onclick="copyPin()"
                                class="full_flex mx-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-copy"
                                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z">
                                        </path>
                                    </svg></i>Copy PIN
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-600" id="participant-count">11</div>
                            <div class="text-sm text-blue-800">Participants</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600">25</div>
                            <div class="text-sm text-green-800">Questions</div>
                        </div>
                    </div>
                </section>

                <ClientOnly v-else>
                    <swiper @slider-move="changeSlide" :watchSlidesProgress="true" :slidesPerView="1" :spaceBetween="30"
                        :pagination="{ clickable: true }" :modules="modules"
                        class="flex lg:max-w-[50vw] max-w-[75vw] !pb-10 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200">
                        <swiper-slide :id="+index + 1" class="min-w-full" v-for="(i, index) in useTests.test">
                            <section
                                class="overflow-y-auto mt-10 space-y-3 max-w-fit mx-auto">
                                <h1 class="flex gap-1 font-bold text-2xl break-words">
                                    <span>{{ +index + 1 }}.</span>
                                    <span class="question" v-html="i.question"></span>
                                </h1>
                                <hr />
                                <ul v-if="i.type != 'fill'" class="space-y-4 pcursor">
                                    <li @click="selectedAnswer(+index, variant, i.type, 1)"
                                        v-for="(variant, v_index) in i.variants"
                                        class="flex gap-8 items-center border duration-700 pl-3 pr-5 py-[10px] max-w-fit r_10"
                                        :class="useTests.store.true_answers[+index + 1] &&
                                            useTests.store.true_answers[+index + 1][0] == variant
                                            ? 'orange border-[#FF852E]'
                                            : 'border-[#E1E1E1]'
                                            ">
                                        <p class="border duration-700 w-6 h-6 full_flex r_4 text-sm font-medium" :class="useTests.store.true_answers[+index + 1] &&
                                            useTests.store.true_answers[+index + 1][0] == variant
                                            ? 'orange border-[#FF852E]'
                                            : 'border-[#EDEDED]'
                                            ">
                                            {{ generateAlphabet(v_index) }}
                                        </p>
                                        <p v-html="variant"></p>
                                        <a-dropdown v-if="i.type != 'variant'">
                                            <div class="mentionstep">{{ getSelectedItem(variant) }}</div>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item v-for="mentionStep in 3"
                                                        @click="selectedAnswer(+mentionStep, variant, i.type, 2)">
                                                        <p>{{ mentionStep }}</p>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </li>
                                </ul>
                                <ClientOnly v-else>
                                    <EditorTiptapEditor id="questionEditor" class="w-full min-w-[20vw] bg_cf5 r_8"
                                        v-model="useTests.store.true_answers[useTests.store.slideStep]" :toolbar="false"
                                        :placeholder="'Savolingizni shu yerga yozing'" />
                                </ClientOnly>
                            </section>
                        </swiper-slide>
                        <!-- result -->
                        <swiper-slide :id="Object.keys(useTests.test)?.length + 1" class="min-w-full">
                            <section v-if="!useTests.store.testResBall.length"
                                class="full_flex w-full min-w-full">
                                <a-button :loading="isLoading.isLoadingType('checkAnswer')" @click="
                                    () => {
                                        useTests.checkAnswer(
                                            useTests.test[useTests.store.slideStep - 1]?.id,
                                            useTests.store.slideStep
                                        );
                                    }
                                " class="bg_main px-[54px] min-h-fit py-3 r_50 text-white">Natijani ko'rish</a-button>
                            </section>
                            <section v-else class="w-full min-w-full">
                                <div class="flex items-center justify-center min-w-full">
                                    <div class="p-5 sm:text-start text-center">
                                        <img loading="lazy" v-if="useTests.store.testResBall[0] >= 70"
                                            class="mx-auto mb-10 h-32" src="@/assets/svg/test/true.svg" alt="" />
                                        <img loading="lazy" v-else class="mx-auto mb-10 h-32"
                                            src="@/assets/svg/test/false.svg" alt="" />
                                        <h1 v-if="useTests.store.testResBall[0] >= 70"
                                            class="orange font-bold text-2xl">
                                            Siz muvaffaqiyatli o‘tdingiz
                                        </h1>
                                        <h1 v-else class="orange font-bold text-center text-2xl">
                                            Afsuski test mufaqqiyatsiz bo‘ldi
                                        </h1>
                                        <p v-if="useTests.store.testResBall[0] >= 70" class="_c66 mt-4 mb-10">
                                            Sinov tugallandi
                                        </p>
                                        <p v-else class="_c66 mt-4 mb-10 md:w-[60%] mx-auto">
                                            Yetarli bal to‘play olmadingiz. Hechqisi yo‘q qayta topshirib
                                            ko‘ring
                                        </p>
                                        <ul class="grid grid-cols-2 gap-[60px]">
                                            <li class="space-y-3 text-[#58CC02]">
                                                <div class="flex items-center gap-3 mx-auto">
                                                    <img loading="lazy" src="@/assets/svg/test/clarity.svg" alt="" />
                                                    <p>Aniqlik</p>
                                                </div>
                                                <p class="font-semibold text-2xl text-start">
                                                    {{ useTests.store.testResBall[0] }}%
                                                </p>
                                            </li>
                                            <li class="space-y-3 text-[#FF852E]">
                                                <div class="flex items-center gap-3">
                                                    <img loading="lazy" src="@/assets/svg/test/ball.svg" alt="" />
                                                    <p>Ball</p>
                                                </div>
                                                <p class="font-semibold text-2xl text-start">
                                                    {{ useTests.store.testResBall[1] }}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </swiper-slide>
                    </swiper>
                    <footer
                        v-if="Object.keys(useTests.test)?.length && useLessons.store.lesson.user_id != isLoading.user?.id"
                        class="w-full bg-white r_8 overflow-hidden" :class="useTests.store.true_answers[useTests.store.slideStep]
                            ? 'fixed bottom-0 left-0'
                            : ''
                            ">
                        <hr />
                        <ul class="flex items-center justify-around py-5">
                            <li class="md:!flex !hidden full_flex gap-3">
                                <img loading="lazy" src="@/assets/svg/test/help.svg" alt="" />
                                <p class="font-medium text-sm max-w-[112px] c_c65">
                                    Muammo haqida xabar bering
                                </p>
                            </li>
                            <ul class="md:!flex !hidden"
                                v-if="useTests.store.checked_answers[useTests.store.slideStep]?.length">
                                <li v-if="
                                    useTests.checkAnswerList(
                                        useTests.store.checked_answers[useTests.store.slideStep]
                                    )
                                " class="full_flex gap-3">
                                    <img loading="lazy" src="@/assets/svg/test/true.svg" alt="" />
                                    <p class="c_green font-bold">Javob to‘g‘ri!</p>
                                </li>
                                <li v-else="
                    !useTests.checkAnswerList(
                      useTests.store.checked_answers[useTests.store.slideStep]
                    )
                  " class="full_flex gap-3">
                                    <img loading="lazy" src="@/assets/svg/test/false.svg" alt="" />
                                    <p class="c_red font-bold">Javob noto‘g‘ri!</p>
                                </li>
                            </ul>
                            <li>
                                <button @click="$router.push(`/lesson/${useTests.store.tests.lesson_id}`)"
                                    v-if="useTests.store.testResBall?.length"
                                    class="bg_main px-[54px] py-3 r_50 text-white">
                                    Davom etish
                                </button>
                                <div v-else>
                                    <a-button :loading="isLoading.isLoadingType('checkAllAnswer')" v-if="
                                        Object.keys(useTests.store.checked_answers)?.length ==
                                        useTests.store.tests?.test?.length
                                    " @click="() => useTests.checkAllAnswers()"
                                        class="bg_main px-[54px] py-3 min-h-fit r_50 text-white">Yakunlash</a-button>
                                    <a-button :loading="isLoading.isLoadingType('checkAnswer')" v-else-if="
                                        isNaN(useTests.store.checked_answers[useTests.store.slideStep]) &&
                                        !useTests.store.checked_answers[useTests.store.slideStep]?.length
                                    " @click="
                                        () => {
                                            useTests.checkAnswer(
                                                useTests.test[useTests.store.slideStep - 1]?.id,
                                                useTests.store.slideStep
                                            );
                                        }
                                    " class="bg_main px-[54px] min-h-fit !py-3 r_50 text-white">Tekshirish</a-button>
                                    <button v-else @click="nextSlide('student')"
                                        class="bg_main px-[54px] py-3 r_50 text-white">
                                        Keyingisi
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </footer>
                </ClientOnly>

                <section id="quiz-actions" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-1">Quiz Controls</h3>
                            <p class="text-sm text-gray-600">Manage your live quiz session</p>
                        </div>
                        <div class="flex space-x-3">
                            <button v-if="!store.is_started" @click="startQuiz"
                                :class="store.is_started ? 'bg-gray-300' : 'bg-green-600'"
                                class="full_flex text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-play"
                                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                        data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">
                                        </path>
                                    </svg></i>Start Quiz
                            </button>
                            <button v-else @click="nextSlide('student')"
                                class="full_flex bg_main text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-play"
                                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                        data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">
                                        </path>
                                    </svg></i>Next
                            </button>
                            <button :disabled="store.is_started ? false : 'disabled'" @click="endSession"
                                :class="store.is_started ? 'bg-red-600' : 'bg-gray-300'"
                                class="full_flex text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                <i class="mr-2" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-stop"
                                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                        data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z">
                                        </path>
                                    </svg></i>End Session
                            </button>
                        </div>
                    </div>
                </section>

                <section id="chat-section" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Live Chat</h3>

                    <div id="chat-messages" class="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
                        <div class="flex items-start space-x-3">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                                alt="Teacher" class="w-8 h-8 rounded-full object-cover">
                            <div class="bg_main text-white px-3 py-2 rounded-lg rounded-tl-none">
                                <p class="text-sm">Welcome everyone! The quiz will start in 2 minutes.</p>
                                <span class="text-xs opacity-75">Teacher • 2 min ago</span>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                                alt="Student" class="w-8 h-8 rounded-full object-cover">
                            <div class="bg-white border px-3 py-2 rounded-lg rounded-tl-none">
                                <p class="text-sm">Ready for the quiz!</p>
                                <span class="text-xs text-gray-500">Sarah K. • 1 min ago</span>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                                alt="Student" class="w-8 h-8 rounded-full object-cover">
                            <div class="bg-white border px-3 py-2 rounded-lg rounded-tl-none">
                                <p class="text-sm">Can we have a practice question first?</p>
                                <span class="text-xs text-gray-500">Mike J. • 30 sec ago</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex space-x-3">
                        <input type="text" id="chat-input" placeholder="Type your message..."
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <button onclick="sendMessage()"
                            class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                            <i data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-paper-plane" aria-hidden="true"
                                    focusable="false" data-prefix="fas" data-icon="paper-plane" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z">
                                    </path>
                                </svg></i>
                        </button>
                    </div>
                </section>
            </div>

            <div id="participants-panel" class="space-y-6">

                <section id="participants-list" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-900">Participants</h3>
                        <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                            id="live-count">11
                            joined</span>
                    </div>

                    <div id="participants-container" class="space-y-3">
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Maria G.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">John D.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">John D.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Maria G.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Lisa M.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Alex R.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Alex R.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Anna S.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Sarah K.</p>
                                    <p class="text-sm text-gray-500">Just joined</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>

                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Mike J.</p>
                                    <p class="text-sm text-gray-500">2 min ago</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>

                        <div class="participant-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                                    alt="Student" class="w-10 h-10 rounded-full object-cover">
                                <div>
                                    <p class="font-medium text-gray-900">Emma L.</p>
                                    <p class="text-sm text-gray-500">3 min ago</p>
                                </div>
                            </div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <p class="full_flex text-sm text-gray-500 text-center">
                            <i class="mr-1" data-fa-i2svg=""><svg width="20" class="svg-inline--fa fa-clock"
                                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z">
                                    </path>
                                </svg></i>
                            Waiting for more participants...
                        </p>
                    </div>
                </section>

                <section id="session-stats" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Session Info</h3>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Duration:</span>
                            <span class="font-medium">30 minutes</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Started:</span>
                            <span class="font-medium">3 min ago</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Max Participants:</span>
                            <span class="font-medium">50</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Status:</span>
                            <span class="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">Active</span>
                        </div>
                    </div>
                </section>
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
import { useLessonsStore, useLoadingStore, useTestsStore, useUploadStore } from "~/store";
import { formatDate, formatDurationFromSeconds } from "@/composables";
import mammoth from "mammoth";

const testBar = [time, pen, calculator, periodic];
const modules = [Pagination];
const route = useRoute();
const editorData = ref("");
const editorData2 = ref("");
const watchStep = ref("0");

const testSettingsType = [{
    label: "Yakka",
    defination: "Faqat bir kishi uchun",
    value: 'general_test',
    color: 'bg-blue-100',
    icon: new URL('@/assets/svg/test/test_type/general_test.svg', import.meta.url).href
}, {
    label: "Jamoaviy",
    defination: "Bir necha kishi uchun",
    value: 'vocabulary',
    color: 'bg-green-100',
    icon: new URL('@/assets/svg/test/test_type/vocabulary.svg', import.meta.url).href
},
    // {
    //   label: "IELTS",
    //   defination: "English proficiency test",
    //   value: 'ielts',
    //   color: 'bg-purple-100',
    //   icon: new URL('@/assets/svg/test/test_type/ielts.svg', import.meta.url).href
    // }, {
    //   label: "Academic",
    //   defination: "Subject-specific questions",
    //   value: 'academic',
    //   color: 'bg-orange-100',
    //   icon: new URL('@/assets/svg/test/test_type/academic.svg', import.meta.url).href
    // },
];

const testType = [
    { value: "variant", label: "Variantli" },
    { value: "multiple", label: "Multiple choise" },
    { value: "fill", label: "To‘ldiriladigan" },
    { value: "customizable", label: "Moslashtiriladigan" },
];

const useTests = useTestsStore();
const useLessons = useLessonsStore();
const isLoading = useLoadingStore();
// const useCategory = useCategoryStore();
const useUpload = useUploadStore();

const store = reactive({
    convertedContent: [],
    currentStep: 1,
    innerStep: 0,
    listKey: 0,
    importModal: false,
    is_started: false,
});

function startQuiz() {
    store.is_started = true;
}

function endSession() {
    store.is_started = false;
}

async function getModels() {
    // useCategory.getCategory();
    useLessons.getById(route.params.test_id);
    await useTests.getByLesson();
    if (useTests.store.tests?.test?.length) {
        store.currentStep = 2;
    }
}

getModels();

function prevInnerStep() {
    if (store.innerStep == 0) {
    } else {
        store.innerStep--;
    }
}
function nextInnerStep() {
    if (store.innerStep == 3) {
        store.currentStep = 2;
    } else {
        store.innerStep++;
    }
}

function handleImage(e, type, index, v_index) {
    const file = e.target.files[0];

    useUpload.create_url(file).then(res => {
        console.log(res.url);

        console.log(useTests.test[index].question);

        if (type == 'question') {
            useTests.test[index].question = useTests.test[index].question ? useTests.test[index].question + `<img src="${res?.url}" alt=""/>` : `<img src="${res?.url}" alt=""/>`
        } else {
            useTests.test[index][type][v_index] = useTests.test[index][type][v_index] ? useTests.test[index][type][v_index] + `<img src="${res?.url}" alt=""/>` : `<img src="${res?.url}" alt=""/>`
        }
    })
}

function handleModal(value) {
    if (value == "OK") {
        store.importModal = false;
        if (isLoading.modal.delete) {
            // useCourses.deleteCourse();
        } else if (isLoading.modal.create && !isLoading.modal.edit) {
            // useCourses.createCourse();
        } else {
            // useCourses.updateCourse();
        }
    } else {
        store.importModal = false;
        isLoading.modal.create = false;
        isLoading.modal.delete = false;
        // useCourses.clearData();
    }
}

function deleteVariants(index, v_index) {
    console.log(index, v_index);

    useTests.test[index]?.variants?.splice(v_index, 1);
}

const disableSwiper = () => {
    document.querySelector(".swiper").swiper.allowTouchMove = false;
};

const enableSwiper = () => {
    store.listKey++;
    if (useTests.test[useTests.store.slideStep - 1]?.id) {
        useTests.test[useTests.store.slideStep - 1].is_action = "edited";
    }
    document.querySelector(".swiper").swiper.allowTouchMove = true;
};

function handleInput(e) { }

function generateAlphabet(index) {
    return String.fromCharCode(65 + index);
}

function checkCurrentType(type, is_inline) {
    if (type == "variant") {
        return is_inline ? "mb-2" : "space-y-2";
    } else if (type == "multiple" || type == "fill") {
        return "bg_cf5";
    } else if (type == "customizable") {
        return is_inline ? "mb-2" : "grid grid-cols-2 -mt-5 gap-2";
    }
}

// function convertMinutePeriod(e) {
//   const val = e.target.value;
//   useTests.test_settings.period = val / 60 + ':' + val % 60;
//   // String(mins).padStart(2, '0')
// }

function convertMinutePeriod(e) {
    const val = Number(e.target.value);
    const hours = Math.floor(val / 60);
    const minutes = val % 60;
    const seconds = val * 60;
    useTests.test_settings.period = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


function addTestStep(type, index) {
    if (type == "add") {
        useTests.test_settings.sort_level[index + 1] = [null];
        useTests.store.test_step += 1;
    } else {
        useTests.test_settings.sort_level.splice(index, 1);
        useTests.store.test_step -= 1;
    }
}

async function importFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const result = await convertFileToHtml(file);
    store.convertedContent = result.value;
    htmlTableToArray(result.value);
}

function htmlTableToArray(htmlTable) {
    const rows = htmlTable.match(/<tr>.*?<\/tr>/gs); // Extract rows
    if (!rows) return [];

    let result = rows.map((row) => {
        const cells = row.match(/<td>(.*?)<\/td>/gs); // Extract cells
        if (!cells) return [];
        return cells.map((cell) => cell.replace(/<\/?td>/g, "")); // Remove <td> tags
    });

    result.shift();
    let test = {};
    useTests.store.questions_count = result.length;
    try {
        useTests.test_settings.sort_level[0][1] =
            useTests.test_settings.sort_level[0][1] || result.length;
        useTests.test_settings.sort_level[0][2] =
            useTests.test_settings.sort_level[0][2] || result.length;
    } catch (_) { }

    useTests.test[0] = { question: null, variants: [], type: "variant" };
    for (let i = 0; i < result.length; i++) {
        // Initialize `useTests.test[i + 1]` as an object if it hasn't been initialized yet
        if (!useTests.test[i]) {
            useTests.test[i] = { question: null, variants: [], type: "variant" };
        }
        // Set the question
        useTests.test[i].question = result[i][1];
        // Initialize and populate variants
        for (let j = 2; j < result[i]?.length; j++) {
            useTests.test[i].variants[j - 2] = result[i][j];
        }
    }
}

function convertFileToHtml(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target.result;
            const result = await mammoth.convertToHtml(
                { arrayBuffer },
                {
                    styleMap: ["p[style-name='Equation'] => span.math-display:fresh"],
                }
            );
            resolve(result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function selectedAnswer(id, variant, type, step) {
    let l;
    if (isNaN(useTests.store.checked_answers[useTests.store.slideStep])) {
        if (type == "variant" && step == 1) {
            useTests.store.true_answers[useTests.store.slideStep] = [[variant]];
        } else if (step != 1) {
            useTests.store.true_answers[useTests.store.slideStep] = useTests.store.true_answers[
                useTests.store.slideStep
            ] || [{}];
            for (let i in useTests.store.true_answers[useTests.store.slideStep][0]) {
                if (useTests.store.true_answers[useTests.store.slideStep][0][i - 1] == variant) {
                    delete useTests.store.true_answers[useTests.store.slideStep][0][i - 1];
                }
            }
            useTests.store.true_answers[useTests.store.slideStep][0][id - 1] = variant;
            for (let i = 0; i < 3; i++) {
                const element = document
                    .getElementById(useTests.store.slideStep)
                    ?.querySelector(`[data-id="${String.fromCharCode(65 + i)}"]`);
                if (element && useTests.store.true_answers[useTests.store.slideStep][0][i])
                    element.innerHTML = `<span>${i + 1}</span> <span class="questionInfo">${useTests.store.true_answers[useTests.store.slideStep][0][i]
                        }</span>`;
                else element.innerHTML = `<span>${i + 1}</span> ...`;
            }

            // useTests.store.true_answers = useTests.store.true_answers || [];
            // useTests.store.true_answers.push(variant);
        }
    }
}

function getSelectedItem(variant) {
    if (!useTests.store.true_answers[useTests.store.slideStep]) return;
    for (let i in useTests.store.true_answers[useTests.store.slideStep][0]) {
        if (
            useTests.store.true_answers[useTests.store.slideStep] &&
            useTests.store.true_answers[useTests.store.slideStep][0][i] == variant
        ) {
            return +i + 1;
        }
    }
}

function changeSlide() {
    setTimeout(() => {
        useTests.store.slideStep = +document.querySelector(".swiper-slide-active")?.id;
    }, 200);
}

function nextSlide(type) {
    useTests.store.isChecked = false;
    if (type == "student") {
        if (Object.keys(useTests.test)?.length == useTests.store.slideStep) {
            for (let i = 0; i < Object.keys(useTests.test)?.length; i++) {
                if (!useTests.store.checked_answers[i + 1]?.length) {
                    useTests.store.slideStep = +i + 1;
                    return;
                }
            }
        } else {
            useTests.store.slideStep++;
        }
    } else {
        if (Object.keys(useTests.test)?.length == useTests.store.slideStep) {
            if (!useTests.test[+useTests.store.slideStep]) {
                useTests.test[+useTests.store.slideStep] = {
                    question: null,
                    variants: [null],
                    type: "variant",
                    true_answer: [0],
                };
                setTimeout(() => {
                    useTests.store.slideStep = +useTests.store.slideStep + 1;
                }, 100);
            } else {
                useTests.store.slideStep = +useTests.store.slideStep + 1;
            }
        } else {
            if (useTests.store.true_answers?.length != Object.keys(useTests.test)?.length) {
                return;
            }
            useTests.store.slideStep = +useTests.store.slideStep + 1;
        }
    }
}

function handleVariant(index) {
    useTests.test[index].true_answer = [useTests.test[index].true_answer.pop()];
}

function addVariant(index) {
    useTests.test[index]?.variants.push(null);
}

watch(
    () => useTests.store.slideStep,
    () => {
        watchStep.value = 0;
        const swiper = document?.querySelector(".swiper-pagination-clickable");
        const swiperCount = document?.querySelectorAll(".swiper-wrapper>div");
        if (swiper && swiper.children.length >= useTests.store.slideStep) {
            const secondChild = swiper.children[useTests.store.slideStep - 1];
            if (secondChild) {
                secondChild.click();
            }
        }
    }
);

watch(
    () => useTests.test[useTests.store.slideStep - 1]?.question,
    () => {
        if (useTests.test[useTests.store.slideStep - 1]) {
            const mentionList = document.querySelector("#questionEditor");
            const l = mentionList?.querySelectorAll('[data-type="mention"]') || [];
            useTests.test[useTests.store.slideStep - 1].true_answer = [];
            for (let i of l) {
                useTests.test[useTests.store.slideStep - 1].true_answer.push(
                    i.getAttribute("data-id").charCodeAt(0) - 65
                );
            }
        }
    }
);

watch(
    () => useTests.test[useTests.store.slideStep - 1],
    () => {
        if (watchStep.value != 0) {
            useTests.test[useTests.store.slideStep - 1].is_action = "edited";
        }
        watchStep.value++;
    },
    { deep: true }
);

onBeforeMount(() => {
    isLoading.store.suggestions.list = [];
    for (let i = 0; i < 26; i++) {
        isLoading.store.suggestions.list.push(generateAlphabet(i));
    }
});

onBeforeUnmount(() => {
    useTests.store.slideStep = 1;
    useTests.store.testResBall = [];
    useTests.store.true_answers = {};
    useTests.store.checked_answers = {};
    useTests.store.is_checked = false;
    useTests.store.checked_answers = {};
});
</script>