<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-2xl font-bold">{data.post.title}</h1>
<p class="text-gray-500 text-sm">Written by {data.post.owner.username}</p>
<a href="/editor/{data.post.owner.username}/{data.post.pen.title}">View in editor</a>
<hr class="my-3">
<p>{data.post.content}</p>

<a href="/posts">Back</a>
