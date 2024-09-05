<script setup lang="ts">
const config = useRuntimeConfig()
useAdsenseScript()
</script>

<template>
  <div class="mb-4">
    <ins
      class="adsbygoogle"
      style="display: block; max-width: 728px; max-height: 90px"
      :data-ad-client="config.public.ADSENSE_ID"
      data-ad-slot="9175316972"></ins>
  </div>
</template>

<style scoped>
.adsbygoogle {
  display: block;
  margin: 0 auto;
  max-width: 728px;
  max-height: 90px;
}

@media screen and (max-width: 768px) {
  .adsbygoogle {
    max-width: 90vw;
    max-height: 90px;
  }
}
</style>
