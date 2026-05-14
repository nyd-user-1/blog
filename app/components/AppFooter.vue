<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <template v-for="(link, index) of footer?.links" :key="index">
          <a
            v-if="link.img"
            :href="link.to"
            :target="link.target"
            :aria-label="link['aria-label']"
            class="inline-flex items-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <img :src="link.img" :alt="link['aria-label']" class="size-5" />
          </a>
          <UButton
            v-else
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>
      </template>
    </template>
  </UFooter>
</template>
