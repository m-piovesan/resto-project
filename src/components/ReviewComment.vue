<script setup>
    import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue';
    import { defineProps } from 'vue';

    import '../styles/ReviewComment.scss'

    const props = defineProps({
        imgUrl: String,
        imgAlt: String,
        text: String,
    });
</script>

<template> 
    <div class="comment mt-3">
        <AvatarRoot class="AvatarRoot">
            <AvatarImage
                class="AvatarImage"
                :src="props.imgUrl"
                :alt="props.imgAlt"
            />
            <AvatarFallback
                class="AvatarFallback"
                :delay-ms="600"
            >
                CT
            </AvatarFallback>
        </AvatarRoot>
    
        <span class="comment-text">
            {{ props.text }}
        </span>
    </div>
</template>