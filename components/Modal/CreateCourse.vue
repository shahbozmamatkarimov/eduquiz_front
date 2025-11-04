<template>
    <div>
        <div class="space-y-6">
            <FloatingInput :id="'title'" :maxValue="50" class="w-full" :type="'text'" v-model="useLessons.create.title"
                :label="'Title'" required />
            <a-textarea v-model:value="useLessons.create.content" placeholder="Description"
                :auto-size="{ minRows: 2, maxRows: 10 }" />
            <div v-if="false" class="grid gap-5">
                <label @click="useLessons.create.group_type = 'private'" class="space-y-3 r_8 p-5 cursor-pointer"
                    :class="useLessons.create.group_type == 'private'
                        ? 'b_main'
                        : 'b_ccc'
                        ">
                    <div class="flex items-center gap-3">
                        <input @focus="useLessons.create.group_type = 'private'" v-model="useLessons.create.group_type"
                            :checked="useLessons.create.group_type == 'private'
                                ? true
                                : false
                                " id="private" class="rounded-full w-5" type="radio" name="type" />
                        <div class="full_flex gap-1 capitalize font-medium">
                            <!-- <img src="@/assets/svg/members/private.svg" alt="" /> -->
                            Private
                        </div>
                    </div>
                    <p>
                        Only members can see who's in the group and what they post. Content is hidden from search
                        engines.
                    </p>
                </label>
                <label @click="useLessons.create.group_type = 'public'" class="space-y-3 r_8 p-5 cursor-pointer" :class="useLessons.create.group_type == 'private'
                    ? 'b_main'
                    : 'b_ccc'
                    ">
                    <div class="flex items-center gap-3">
                        <input :checked="useLessons.create.group_type == 'public' ? true : false
                            " id="public" class="rounded-full w-5" type="radio" name="type" />
                        <div class="full_flex gap-1 capitalize font-medium">
                            <!-- <img src="@/assets/svg/members/public.svg" alt="" /> -->
                            Public
                        </div>
                    </div>
                    <p>
                        Anyone can see who's in the group and what they post. Content is discoverable by search
                        engines.
                    </p>
                </label>
            </div>
            <p class="c_red">{{ isLoading.store.errorMessage.message }}</p>
        </div>
    </div>
</template>

<script setup>
import {  useLessonsStore, useLoadingStore } from '~/store'; 
const useLessons = useLessonsStore();
const isLoading = useLoadingStore();

function handleImage(e) {
    const file = e.target.files[0];
    useLessons.store.image = URL.createObjectURL(file);
    useLessons.create.image = file;
}
</script>

<style lang="scss" scoped></style>