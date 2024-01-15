<script lang="ts">
  import { CldImage } from 'svelte-cloudinary';
  import { pushState, preloadData, goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LoadMore from './LoadMore.svelte';
  import Detail from './images/[id]/+page.svelte';
  import { Button } from '$lib/components/ui/button';
  import { X, ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { get } from 'svelte/store';
  export let data;

  let images = data.images;
  let nextCursor = data.nextCursor;

  $: updateOnPropsChange(data);

  function updateOnPropsChange(data) {
    images = data.images;
    nextCursor = data.nextCursor;
  }

  async function navigate(direction: number) {
    const nextIndex = get(page).state.index! + direction;
    if (nextIndex >= 0 && nextIndex < images.length) {
      const url = `/images/${images[nextIndex].public_id}`;
      const data = await preloadData(url);
      if (data.status === 200) {
        return pushState(url, { image: data.data.image, index: nextIndex });
      }
    }
  }
</script>

{#if $page.state.image}
  <div class="fixed top-0 bottom-0 left-0 right-0">
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div
      class="backdrop-blur fixed top-0 bottom-0 left-0 right-0 z-0"
      on:click={() => pushState('/', {})}
    />
    <div class="relative container z-10 my-8 bg-white drop-shadow-xl">
      <Button
        class="absolute top-0 right-0 mr-2 mt-2"
        on:click={() => pushState('/', {})}
        variant="ghost"
      >
        <X />
      </Button>
      <Detail data={{ image: $page.state.image }} />
      {#if $page.state.index > 0}
        <Button
          class="absolute top-[50%] left-0 mr-2 mt-2 translate-x-[-105%]"
          on:click={() => navigate(-1)}
          variant="ghost"
        >
          <ArrowLeft />
        </Button>
      {/if}
      {#if $page.state.index < images.length - 1}
        <Button
          class="absolute top-[50%] right-0 mr-2 mt-2 translate-x-[105%]"
          on:click={() => navigate(1)}
          variant="ghost"
        >
          <ArrowRight />
        </Button>
      {/if}
    </div>
  </div>
{/if}

<div
  class="grid auto-cols-400 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center py-4"
>
  {#each images as { public_id }, index}
    {@const url = `/images/${public_id}`}
    <a
      href={url}
      class="w-full h-full grid place-items-center"
      on:click={async (event) => {
        try {
          event.preventDefault();
          const data = await preloadData(url);
          if (data.status === 200) {
            return pushState(url, { image: data.data.image, index });
          }
        } catch {}
        goto(url);
      }}
    >
      <CldImage src={public_id} width="400" height="400" />
    </a>
  {/each}

  {#if nextCursor}
    <LoadMore
      onLoad={async () => {
        const response = await fetch(`/api/images?next=${nextCursor}`);
        const { data, next_cursor } = await response.json();
        images = [...images, ...data];
        nextCursor = next_cursor;
      }}
    />
  {/if}
</div>
