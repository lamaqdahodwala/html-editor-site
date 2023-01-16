<script lang="ts">
	import '../../app.postcss';
	import type { LayoutData, PageData } from './$types';
	export let data: LayoutData
</script>

<nav class="flex flex-row justify-between m-2">
	<div class="flex flex-row gap-3 items-center">
		<a href="/" class="text-3xl">HTML Editor site</a>
		<a href="/" class="text-gray-500">Home</a>
		<a href="/posts" class="text-gray-500">Recent posts</a>
	</div>
	<div class="flex flex-row gap-3 items-center">
		{#if data.logged_in}
			<a href="/users/{data.user_id}" class="text-gray-500">Logged in as {data.user}</a>
		{:else}
			<a href="/auth/login" class="text-gray-500">Log in</a>
			<a href="/auth/signup" class="text-gray-500">Sign up</a>
		{/if}
	</div>
</nav>
<div class="p-3">
	<slot />
</div>
