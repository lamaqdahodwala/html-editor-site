<script lang="ts">
	import { onMount } from "svelte";

	
	import type { PageData } from "./$types";


	export let data: PageData

    let html : String 
    let css : String
    let js : String
    onMount(() => {
        html = data.html
        css = data.css
        js = data.js
    })

    
</script>

<div class="grid grid-cols-3 gap-3">
	<textarea bind:value={html} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea bind:value={css} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea bind:value={js} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<div class="col-span-3">
        <iframe src="/editor/{data.username}/{data.title}/view" title="Live View" frameborder="0" class="border-2 w-full h-full" />
    </div>
</div>

<p>{html}</p>
<p>{css}</p>
<p>{js}</p>
