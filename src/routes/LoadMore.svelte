<script lang="ts">
  import { Loader } from 'lucide-svelte';
  export let onLoad: () => any;

  function intersect(node: HTMLElement) {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoad();
        }
      },
      {
        threshold: 0.5,
      }
    );
    intersectionObserver.observe(node);

    return {
      destroy() {
        intersectionObserver.disconnect();
      },
    };
  }
</script>

<div use:intersect class="w-full py-10 grid place-items-center md:col-span-2 lg:col-span-3 xl:col-span-4"><Loader class="animate-spin" /></div>
