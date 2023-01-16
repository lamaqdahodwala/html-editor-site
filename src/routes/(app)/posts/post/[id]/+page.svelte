<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.post.title}</h1>
<a href="/editor/{data.post.owner.username}/{data.post.pen.title}">Editor view</a>
<p>Written by {data.post.owner.username}</p>
<p>{data.post.content}</p>
