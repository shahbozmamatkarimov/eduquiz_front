import { useSubscriptionStore } from './subscriptions';
import { useReytingStore } from './reyting';
import { useTestsStore } from './tests';
import { useAuthStore } from './auth';
import { useLoadingStore } from "./loading"
import { useUploadStore } from "./upload"
import { useChatStore } from './chat';
import { useCommentsStore } from './comment';
import { useStripeStore } from './stripe';
import { useLessonsStore } from './lesson';

export {
    useLoadingStore,
    useAuthStore,
    useTestsStore,
    useReytingStore,
    useSubscriptionStore,
    useUploadStore,
    useChatStore,
    useCommentsStore,
    useStripeStore,
    useLessonsStore,
}