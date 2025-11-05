import { io } from "socket.io-client";
import { useLoadingStore } from "./loading";
import { useTestsStore } from "./tests";
import { useApiRequest } from "~/composables";


export const useChatStore = defineStore("chat", () => {
    const isLoading = useLoadingStore();
    const useTests = useTestsStore();
    const router = useRouter();
      const apiRequest = useApiRequest();
    
    // const endPoint: string = isLoading.checkCurrentUrl();
    const store: any = reactive({
        userlist: [],
        userScreen: 'enter-code',
        countdown: 60,
        trueAnswer: {
            variant: null,
            countdown: null,
        },
    });

    let socket: any;
    if (process.client) {
        console.log(isLoading.store.baseUrl.slice(0, -5), 2333333);
        socket = io(isLoading.store.baseUrl?.slice(0, -5), {
            reconnectionDelayMax: 10000000, // Maximum delay between reconnection attempts (milliseconds)
            reconnectionAttempts: 5,
            query: {
                id: isLoading.user.id,
            },
            extraHeaders: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

    function connectUser(code: string, name: string) {
        const isTeacher = useTests.store.test.user_id == isLoading.user.id;
        socket.emit('join', { code, name: isTeacher ? isLoading.user.name : name, role: isTeacher ? 'teacher' : 'student' });

        socket.on('userList', (list: any) => {
            console.log(list);
            store.userlist = list;
        });

        socket.on('testStarted', (test: any) => {
            store.userScreen = 'question';
            console.log(test);
            store.test = test;
        });

        socket.on('countdown', (data: any) => {
            store.countdown = data.seconds
        })

        socket.on('testFinished', (data: any) => {
            store.userScreen = 'results';
            store.result = data.result;
        })
    }

    function startTest() {
        console.log('starttest', 22222222);

        socket.emit('startTest', { id: router.currentRoute.value.params?.test_id });
    }

    async function setAnswer() {
        apiRequest
            .post(`chat/set-answer`, {...store.trueAnswer, name: store.username, countdown: store.countdown, code: store.code}, 'answer')
            .then((res: any) => {
                // openNotification('success', '', 'Saved successfully');
                // router.push(`/test/${res?.data?.test?.id}`)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        store,
        connectUser,
        startTest,
        setAnswer,
    };
});
