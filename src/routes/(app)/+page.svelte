<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Logged in as {data.user}</p>

{#if data.pens}
	{#if data.pens.length !== 0}
		<p>Jump back in</p>
		{#each data.pens as i}
			<a href="/editor/{data.user}/{i.title}">{i.title}</a>
		{/each}
	{:else}
	
	<p>You have no pens</p>
	
	{/if}
{/if}