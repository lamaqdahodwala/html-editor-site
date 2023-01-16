<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: FormData;
</script>

<form method="post">
	<label for="title">
		<p>Title</p>
		<input type="text" name="title" id="" />
	</label>

	<label for="content">
		<p>Body</p>
		<textarea name="content" id="" cols="30" rows="10" />
	</label>

	<label for="pen_title">
		<p>Pen to post</p>
		<p>
			<select name="pen_title" id="">
				{#each data.titles as i}
					<option value={i.title}>{i.title}</option>
				{/each}
			</select>
		</p>
	</label>

	<button type="submit">Create post</button>
</form>

{#if form?.success === false}
	<p>Error: {form.error}</p>
{/if}
