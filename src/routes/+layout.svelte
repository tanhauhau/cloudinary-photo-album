<script>
  import '../app.pcss';
  import { Camera, Upload } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { CldUploadWidget } from 'svelte-cloudinary';
  import { invalidate } from '$app/navigation'
</script>

<!-- nav bar -->
<div class="border-b fixed top-0 w-full bg-white">
  <div class="container h-16 flex items-center">
    <a href="/"><Camera /></a>
    <div class="ml-auto">
      <CldUploadWidget
        uploadPreset="auto_tagging_captioning"
        signatureEndpoint="/api/image/signature"
        onUpload={() => {
          invalidate('app:home-page-image-list')
        }}
        let:open
        let:isLoading
      >
        <Button class="space-x-1" on:click={open} disabled={isLoading}>
          <Upload class="h-[1rem]" />
          <span>Upload</span>
        </Button>
      </CldUploadWidget>
    </div>
  </div>
</div>

<div class="pt-16 container">
  <!-- container -->
  <slot />
</div>
