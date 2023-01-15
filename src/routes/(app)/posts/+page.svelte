<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData
</script>

{#each data.posts as i}
    <a href="/posts/post/{i.id}">{i.title}</a>
{:else}
    <p>Posts will show up here</p>
{/each}