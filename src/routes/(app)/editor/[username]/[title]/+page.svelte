<script lang="ts">
	import { onMount } from "svelte";
    import { debounce } from "svelte-debounce"
	
	import type { PageData } from "./$types";


	export let data: PageData

    let html : string 
    let css : string
    let js : string

    let iframe
    onMount(() => {
        html = data.html
        css = data.css
        js = data.js
    })


    function save(html: string, css: string, js: string){
        let req = fetch(`/editor/${data.username}/${data.title}`, {
            method: "POST", 
            body: JSON.stringify({
                html: html, 
                css: css, 
                js: js
            })
        })
        req.then((val) => {
            setTimeout(() => {
                console.log("refreshing")
                iframe.contentWindow.location.reload()
            }, 500)
        })
    }
    const html_config = {
        delay: 250, 
        
        callback: (val: string) => {
            html = val
            save(html, css, js)
        }
    }

    const css_config = {
        delay: 250, 
        
        callback: (val: string) => {
            css = val
            save(html, css, js)
        }
    }

    const js_config = {
        delay: 250, 
        
        callback: (val: string) => {
            js = val
            save(html, css, js)
        }
    }

    
</script>

<div class="grid grid-cols-3 gap-3">
	<textarea use:debounce={html_config} bind:value={html} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea use:debounce={js_config} bind:value={js} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<textarea use:debounce={css_config} bind:value={css} name="" id="" cols="30" rows="10" class="border-2 border-black" />
	<div class="col-span-3">
        <iframe bind:this={iframe} src="/editor/{data.username}/{data.title}/view" title="Live View" frameborder="0" class="border-2 w-full h-full" />
    </div>
</div>

