<template>

  <div 
    v-if="props.content"
    class="my-3 w-fit"
  >
          
    <div
      class="
      max-w-[20ch] sm:max-w-[30ch]
      pl-1 pb-1 text-zinc-400 text-sm
      overflow-hidden whitespace-nowrap text-ellipsis
      "
      :title="props.name"
    > 
      {{ props.name }}
    </div>

    <div 
      class="
      bg-zinc-800 w-fit 
      px-4 py-2 rounded-2xl mr-auto leading-[1.4]
      max-w-[30ch] sm:max-w-[40ch] text-white
      "
    >
      {{ props.content }}
    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  content: {
    type: String,
  },
  name: {
    type: String,
  },
})

</script>


<style>

</style>
