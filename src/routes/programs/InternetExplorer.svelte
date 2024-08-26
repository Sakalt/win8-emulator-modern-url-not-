<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

    import '../webpage.css';
    import { onMount } from 'svelte';
    import { LEET } from '../../effects';
    import { TaskManager, type IProgramManager, CommandManager, WebsiteStage } from '../stores';

    import { CommandStatus } from '../../commands';

    export let iframeSrc: string = "https://example.com"; // 外部から指定できるURL
    let width = 1200;
    let height = 700;

    let program: ComputerProgram = ProgramFilter.Find('ie9')!;

    onMount(() => {});
</script>

<WindowBase {program} isWebSite={true} showTitle={false} openOnVisit={true} {width} {height}>
    <div
        id={program.GetWebPage().string()}
        class="webpage"
        style={$WebsiteStage != 3 ? 'height:100%;' : 'height:fit-content;'}
    >
        {#if $WebsiteStage == 3}
            <iframe src={iframeSrc} width="100%" height="100%" style="border:none;"></iframe>
        {/if}

        {#if $WebsiteStage != 3}
            <div class="group center full-height full-width">
                <div class="command-injection" style="text-align: center;position:relative;right:13px">
                    {#if $WebsiteStage == 0}
                        <div class="command">
                            Unlock the website by running '<span class="emphasis">ovrs authenticate</span>' in the cmd.
                        </div>
                    {/if}

                    {#if $WebsiteStage == 1}
                        <div class="command">Processing...</div>
                    {/if}

                    {#if $WebsiteStage == 2}
                        <div class="command">something went wrong rerun the command.</div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</WindowBase>
