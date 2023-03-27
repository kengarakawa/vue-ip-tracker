<script setup lang="ts">
defineProps({
    info: Object 
})   

</script>


<template>
    <div class="absolute -bottom-64 lg:-bottom-20 flex flex-col lg:flex-row gap-y-4 gap-x-12 px-8 pt-8 pb-12  bg-white rounded-md p-10 text-center z-1 wth" >
        
        <!-- item #1 -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">IP Address</h3>
            <span class="text-2xl">{{ $props.info.ip }}</span>
        </div>
        <!-- item #2 -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">Location</h3>
            <span class="text-2xl">{{ $props.info.location }}</span>
        </div>
        <!-- item #3 -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">Timezone</h3>
            <span class="text-2xl">{{ $props.info.timezone }}</span>
        </div>
        <!-- item #4 -->
        <div class="flex flex-col">
            <h3 class="text-xs mb-2 uppercase">ISP</h3>
            <span class="text-2xl">{{ $props.info.isp }}</span>
        </div>
        
        <!-- {{  info }} -->
    </div>
</template>


