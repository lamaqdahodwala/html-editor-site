<script lang="ts">
	export let form: FormData;
</script>

<form method="post">
	<label for="username">
		<p>Username</p>
		<input type="text" id="" name="username" />
	</label>

	<label for="password">
		<p>Password</p>
		<input type="password" name="password" id="" />
	</label>

	<button type="submit">Log in</button>
</form>

{#if form?.success === false}
	<p>Error: {form.error}</p>
{/if}
