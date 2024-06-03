<script setup>
    import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue';
    import { defineProps, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
    import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'

    import '../styles/ReviewComment.scss'

    const props = defineProps({
        imgUrl: String,
        imgAlt: String,
        text: String,
        fullName: String,
    });

    const textContainer = ref(null);
    const lineCount = ref(0);
    const textHeight = ref(0);

    const calculateLineCount = () => {
        nextTick(() => {
            if (textContainer.value) {
                const element = textContainer.value;
                const style = window.getComputedStyle(element);
                const lineHeight = parseFloat(style.lineHeight);
                const height = parseFloat(style.height);
                lineCount.value = Math.round(height / lineHeight);

                if (lineCount.value > 1) {
                    textHeight.value = height;
                }
            }
        });
    };

    onMounted(() => {
        calculateLineCount();
        window.addEventListener('resize', calculateLineCount);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', calculateLineCount);
    });
</script>

<template> 
    <div class="comment-block mt-3">
        <div 
            :class="{ 'avatar-block': lineCount > 1 }"
            :style="{ height: (lineCount > 3 ? textHeight + 'px' : 'auto') }"
        >
            <TooltipProvider>
                <TooltipRoot>
                    <TooltipTrigger>
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
                                PN
                            </AvatarFallback>
                        </AvatarRoot>
                    </TooltipTrigger>

                    <TooltipPortal>
                        <TooltipContent
                            as-child
                            class="TooltipContent"
                            :side-offset="-5"
                        >
                            <h4>
                                {{ props.fullName }}
                            </h4>    
                        </TooltipContent>
                    </TooltipPortal>
                </TooltipRoot>
            </TooltipProvider>
        </div>

        <span ref="textContainer">
            {{ props.text }}
        </span>
    </div>
</template>