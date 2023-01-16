<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p class="text-2xl">Posts</p>
{#each data.posts as i}
	<p class="shadow-lg rounded-xl p-3"><a href="/posts/post/{i.id}">{i.title}</a></p>
{:else}
	<p>Posts will show up here</p>
{/each}
