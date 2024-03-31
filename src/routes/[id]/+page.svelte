<script>
    import Icon from "$lib/Icon.svelte";

    export let data;

    import { PUBLIC_CDN_URL } from '$env/static/public'
</script>

{#if data?.exist}
    <pre>{@html data.highlight}</pre>
    <a target="_blank" class="btn" href="{PUBLIC_CDN_URL + data.id}"><Icon size="11" icon="open_in_new_tab" />&nbsp;Raw code</a>
{:else}
    <p>This paste doesn't exist.</p>
    <a class="btn" href="/"><Icon size="11" icon="back" />&nbsp;Back to main page</a>
{/if}