// import type { Router } from "vue-router";
import { useApiRequest } from "~/composables";
// import { useLoadingStore } from "./loading";

export const useLessonsStore = defineStore("lesson", () => {
  const apiRequest = useApiRequest();
  // const isLoading = useLoadingStore();
  // const router: Router = useRouter();

  const store: any = reactive({
    lessons: [],
    lesson: {},
  });

  const create: any = reactive({
    title: '',
    content: '',
  });

  async function getLessons() {
    const data: any = await apiRequest.get(
      `lesson`,
      "getLesson"
    );
    store.lessons = data.data;
  }

  async function getById(id: number) {
    const data: any = await apiRequest.get(
      `lesson/getById/${id}`,
      "getLesson"
    );
    store.lesson = data.data;
  }

  async function createLesson() {
    await apiRequest.post(
      "lesson/create",
      create,
      "createLesson"
    );

    getLessons();
  }

  return {
    store,
    create,
    getById,
    getLessons,
    createLesson,
  };
});
