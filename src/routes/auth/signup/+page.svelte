<script lang="ts">
    export let form: FormData
</script>




<form method="post">
    <label for="username">
        Username 
        <input type="text" name="username">
    </label>

    <label for="password">
        Password
        <input type="text" name="password">
    </label>

    <button type="submit">Sign up</button>
</form>

{#if form?.success === false}
    <p>Error: {form.error}</p>
{/if}