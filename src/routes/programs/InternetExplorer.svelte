<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

    import '../webpage.css';
    import { onMount } from 'svelte';
    import { LEET } from '../../effects';
    import { TaskManager, type IProgramManager, CommandManager, WebsiteStage } from '../stores';

    import { CommandStatus } from '../../commands';

    let width = 1200;
    let height = 700;

    let program: ComputerProgram = ProgramFilter.Find('ie9')!;
    let iframeSrc: string = "https://example.com"; // 初期URL
    let newIframeSrc: string = ""; // 入力フォームのバインド変数

    // URLを更新する関数
    function updateIframeSrc() {
        iframeSrc = newIframeSrc;
    }

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
            <!-- 入力フォームとボタンを追加 -->
            <div class="input-section" style="margin-top: 20px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                <input 
                    type="text" 
                    placeholder="Enter URL here" 
                    bind:value={newIframeSrc} 
                    style="width: 300px; padding: 10px; margin-bottom: 10px;"
                />
                <button 
                    on:click={updateIframeSrc} 
                    style="padding: 10px 20px; cursor: pointer;"
                >
                    Update URL
                </button>
            </div>
        {/if}
    </div>
</WindowBase>
