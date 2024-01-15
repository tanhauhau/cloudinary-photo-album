<script lang="ts">
  import { CldImage } from 'svelte-cloudinary';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  export let data;

  $: description = data.image.info?.detection?.captioning?.data?.caption;
  $: tags = data.image.tags;
  $: applyEffectFromProps(data);

  let effects: any[] = [];

  function applyEffectFromProps(data: any) {
    try {
      const parsedEffect = JSON.parse(data.image.context.custom.effect);
      effects.splice(0, effects.length);
      for (const effect of parsedEffect) {
        effects.push(effect);
      }
      effects = effects;
    } catch {}
  }

  function applyEffect(effect: any) {
    effects.push(effect);
    effects = effects;

    syncEffects(effects);
  }

  async function syncEffects(effects: any[]) {
    await fetch(`/api/images/apply-effects?id=${data.image.public_id}`, {
      method: 'POST',
      body: JSON.stringify(effects),
    });
  }
</script>

<div class="flex flex-col lg:flex-row gap-4 py-4">
  <div class="w-[800px] max-w-full">
    <CldImage width="800" height="800" src={data.image.public_id} {effects} />
  </div>
  <div class="flex-1 space-y-3">
    {#if description}
      <div class="font-bold">Description</div>
      <div>{description}</div>
    {/if}
    {#if tags}
      <div class="font-bold">Tags</div>
      <div class="space-x-1">
        {#each tags as tag}
          <Badge>{tag}</Badge>
        {/each}
      </div>
    {/if}
    <div class="font-bold">Filters</div>
    <div>
      <Button on:click={() => applyEffect({ tint: '70:blue:green:purple' })}>
        Tint
      </Button>
      <Button on:click={() => applyEffect({ blur: 200 })}>Blur</Button>
      <Button on:click={() => applyEffect({ grayscale: true })}>
        Grayscale
      </Button>
      <Button on:click={() => applyEffect({ pixelate: true })}>Pixelate</Button>
    </div>
  </div>
</div>
