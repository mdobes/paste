<script>
    import Icon from "$lib/Icon.svelte";

    let isMac = null;
    if (typeof window !== 'undefined') {
        isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        document.addEventListener('keydown', function(e) {
            if((e.keyCode == 13 && e.metaKey) || (e.keyCode == 13 && e.ctrlKey)) {

                let target = document.querySelector("form");
                if (target.checkValidity()) {
                    target.submit();
                }else{
                    target.reportValidity();
                }
            }
        });
    }

    export let form;
</script>

<!-- svelte-ignore a11y-autofocus -->

{#if form?.fail}
    <div class="error">
        Your text is too large.
    </div>
{/if}

<form method="POST">
    <div class="textarea_outer">
        <textarea rows="20" autofocus required spellcheck="false" name="text">{form?.text ?? ''}</textarea>
    </div>

    <button><Icon icon="plus" size="14"/>&nbsp;Paste</button>
    <p class="nocopy">
        Or you can use
        {#if isMac}<Icon size="11" icon="command_macos" />&nbsp;{:else}control{/if}+ enter.
    </p>
</form>