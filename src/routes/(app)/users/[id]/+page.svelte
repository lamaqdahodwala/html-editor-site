<script lang="ts">
	import type { PageData } from "./$types";


    export let data: PageData
</script>

<p class="text-3xl text-center"><span class="text-blue-400">{data.profile?.username}</span></p>

<div class="grid grid-cols-2 gap-3">
    <div>
        <p class='text-center text-xl'>Posts</p>
        {#each data.profile.posts as i}
            <p class="shadow-lg p-4 rounded-lg my-3"><a href="/posts/post/{i.id}">{i.title}</a></p>
        {:else}
        
            <p>This user has no posts</p>
        {/each}
    </div>
    
    <div>
        <p class='text-center text-xl'>Pens</p>
        {#each data.profile.pens as i}
            <p class="shadow-lg p-4 rounded-lg my-3"><a href="/editor/{data.profile.username}/{i.title}">{i.title}</a></p>
        {:else}
            <p>This user has no pens</p>
        {/each}
    </div>
</div>

