import type { Router } from "vue-router";
import { useApiRequest } from "~/composables";
// import { useUploadStore } from "./upload";
import { useNotification } from "~/composables";
// import dayjs from 'dayjs';
export const useTestsStore = defineStore("tests", () => {
  const apiRequest = useApiRequest();
  const router: Router = useRouter();
  // const useUpload = useUploadStore()
  const { openNotification } = useNotification();

  const store: any = reactive({
    test: {},
    code: null,
    username: null,
    tests: [],
    true_answers: {},
    checked_true_answers: null,
    checked_answers: {},
    is_checked: false,
    questions_count: 1,
    test_step: 1,
    testResBall: [],
    slideStep: 1,
    isChecked: false,
    deletedTestList: [],
    calculateHours: null,
    time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      percentage: 0,
    },
  });

  const test: any = reactive({
    question: null,
    variants: [null, null],
    type: null,
    true_answer: null,
  });

  // async function getByLesson() {
  //   const data: any = await apiRequest.get(
  //     `tests/${router.currentRoute.value.params.test_id}`,
  //     "getById"
  //   );
  //   console.log(data);
  //   if (data.data?.test_settings) {
  //     for (let i in test_settings) {
  //       test_settings[i] = data.data?.test_settings[i];
  //     }
  //     test_settings.start_date = dayjs(test_settings.start_date)
  //     test_settings.end_date = dayjs(test_settings.end_date)
  //   }
  //   test_settings.sort_level = [[]];
  //   test_settings.sort_level[0] = [data.data?.category_id]
  //   clearInterval(store.timeInterval);
  //   store.calculateHours = test_settings.period?.split(":") || [0, 0];
  //   store.calculateHours = +store.calculateHours[0] * 60 + +store.calculateHours[1];
  //   if (store.calculateHours > 0) {
  //     setTestTime()
  //   } else {
  //     test_settings.period = null;
  //   }
  //   store.tests = data.data;
  //   for (let i = 0; i < data.data?.test?.length; i++) {
  //     test[i] = { ...data.data?.test[i], is_action: 'old' }
  //   }
  // }

  async function checkAnswer(id: number, step: number) {
    if (Object.keys(test)?.length == step - 1) {
      return checkAllAnswers();
    }
    console.log(store.true_answers);
    console.log(store.true_answers[step]);
    store.true_answers[step] = Array.isArray(store.true_answers[step]) ? store.true_answers[step] : [store.true_answers[step]];
    console.log(store.true_answers[step]);

    const data: any = await apiRequest.post(
      `tests/check/${id}`,
      { answer: store.true_answers[step] || [] },
      "checkAnswer"
    );
    store.isChecked = true;
    store.checked_answers[step] = data.data[1];
    store.checked_true_answers = data.data[2];
  }
  function checkAnswerList(list: boolean[]): boolean {
    return list?.every(item => item === true);
  }

  async function checkAllAnswers() {
    const results = [];
    for (let i = 1; i <= Object.keys(test)?.length; i++) {
      results.push([test[i - 1].id, store.true_answers[i]]);
    }
    const data: any = await apiRequest.post(
      `tests/check_answers/${router.currentRoute.value.params.test_id}`,
      { answers: results }, 'checkAllAnswer'
    );
    store.testResBall = data?.data?.ball;
    openNotification('success', "Muvaffaqiyatli", data?.data?.message)

    // store.testResBall = data?.data?.message;
    // isLoading.show
    clearInterval(store.timeInterval);
    setTimeout(() => {
      store.slideStep = Object.keys(test)?.length + 1
    }, 1000);
  }

  function deleteTest() {
    // test[store.slideStep].type = 'deleted';
    if (store.deletedTestList.includes(store.slideStep)) {
      store.deletedTestList.splice(store.deletedTestList.indexOf(store.slideStep), 1);
    } else {
      store.deletedTestList.push(store.slideStep);
    }
  }

  async function createTest() {
    await apiRequest
      .post(`tests/create`, test, 'createTest')
      .then((res: any) => {
        openNotification('success', '', 'Saved successfully');
        router.push(`/test/${res?.data?.test?.id}`)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getById() {
    const res: any = await apiRequest.get(`tests/${router.currentRoute.value.params.test_id}`, 'createTest')
    console.log(res);
    store.test = res.data;
  }

  async function checkCode(code: string) {
    const res: any = await apiRequest.get(`tests/code/${code}`, 'createTest')
    console.log(res);
    return res.data;
  }


  return {
    store,
    test,
    getById,
    checkAnswer,
    checkCode,
    checkAllAnswers,
    deleteTest,
    createTest,
    checkAnswerList,
  };
});
