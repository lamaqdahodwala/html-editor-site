<script lang="ts">
	export let form: FormData;
</script>

<div class="grid place-items-center">
	<div class="shadow-lg rounded-xl p-4">
		<form method="post">
			<label for="username">
				<p class="m-2 text-xl text-center">Username</p>
				<input
					type="text"
					id=""
					name="username"
					class="h-10 text-lg border-2 border-gray-200 outline-none focus:outline-none focus:border-gray-400 rounded-lg"
				/>
			</label>

			<label for="password">
				<p class="m-2 text-xl text-center">Password</p>
				<input
					type="password"
					name="password"
					id=""
					class="h-10 text-lg border-2 border-gray-200 outline-none focus:outline-none focus:border-gray-400 rounded-lg"
				/>
			</label>

			<p class="my-3 flex flex-row justify-center">
				<button type="submit" class="rounded-full bg-blue-300 p-2 px-5">Log in</button>
			</p>
		</form>
	</div>
</div>

{#if form?.success === false}
	<p>Error: {form.error}</p>
{/if}
