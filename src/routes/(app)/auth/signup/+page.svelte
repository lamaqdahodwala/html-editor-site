<script lang="ts">
	export let form: FormData;
</script>

<div class="grid place-items-center h-max">
	<div class="shadow-xl p-6 rounded-xl">
		<form method="post">
			<label for="username">
				<p class="text-xl text-center my-2">Username</p>
				<p>
					<input
						type="text"
						name="username"
						class="h-10 text-lg border-2 border-gray-200 outline-none focus:outline-none focus:border-gray-400 rounded-lg"
					/>
				</p>
			</label>

			<label for="password">
				<p class="text-xl text-center my-2">Password</p>
				<p>
					<input
						type="text"
						name="password"
						class="h-10 text-lg border-2 border-gray-200 outline-none focus:outline-none focus:border-gray-400 rounded-lg"
					/>
				</p>
			</label>

			<p class="flex flex-row justify-center my-3">
				<button type="submit" class="rounded-full bg-blue-300 p-2 px-5">Sign up</button>
			</p>
		</form>
	</div>
</div>

{#if form?.success === false}
	<p>Error: {form.error}</p>
{/if}
