<script lang="ts">
    export let form: FormData
</script>

<form method="post">
    <label for="title">
        <p>Title</p>
        <input type="text" name="title">
    </label>
    <button type="submit">Create</button>
</form>

{#if form?.success === false}
    <p>Error: {form.error}</p>
{/if}