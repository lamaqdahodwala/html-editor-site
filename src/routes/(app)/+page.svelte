<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.logged_in}
	<p class="text-2xl">Welcome back, <span class="font-bold">{data.user}</span></p>
{:else}
	<a href="/auth/login">Log in</a>
{/if}
{#if data.pens}
	{#if data.pens.length !== 0}
		<div class="flex flex-row justify-between">
			<p>Jump back in</p>
		</div>
		<div class="grid grid-cols-2 gap-3">
			<div>
				{#each data.pens as i}
					<div class="shadow-lg my-2 rounded-md p-2">
						<a href="/editor/{data.user}/{i.title}">{i.title}</a>
					</div>
				{/each}
			</div>
			<div>
				<p class="text-center">Make something new</p>
				<div class=" p-4 grid place-items-center">
					<form
						action="/editor/create"
						method="post"
						class="p-10 border-gray-100 border-solid border-2 rounded-md"
					>
						<label for="title">
							<p>Title</p>
							<p>
								<input
									type="text"
									name="title"
									class="h-10 text-lg border-2 border-gray-200 outline-none focus:outline-none focus:border-gray-400 rounded-lg"
								/>
							</p>
						</label>
						<button type="submit" class="rounded-full bg-blue-300 p-2 px-5 my-2 text-white"
							>Create</button
						>
					</form>
				</div>
			</div>
		</div>
	{:else}
		<p>You have no pens. <a class="text-blue-400" href="/editor/create">Create something!</a></p>
	{/if}
{/if}
