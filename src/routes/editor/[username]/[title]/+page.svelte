<script>
	let html = '';
	let css = '';
	let js = '';
</script>

<div class="grid grid-cols-3 gap-3">
	<textarea bind:value={html} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea bind:value={css} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea bind:value={js} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<div class="col-span-3">
        <iframe src="/" frameborder="0" class="border-2 w-full h-full" />
    </div>
</div>
