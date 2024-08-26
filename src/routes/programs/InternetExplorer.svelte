<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import '../webpage.css';
    import { onMount } from 'svelte';
    import { TaskManager, type IProgramManager, CommandManager, WebsiteStage } from '../stores';

    let width = 1200;
    let height = 700;
    let program: ComputerProgram = ProgramFilter.Find('ie9')!;

    // 初期URLをBingに設定
    let iframeSrc: string = "https://www.bing.com";
    // 入力フォーム用のURL
    let newUrl: string = "";

    function updateIframeSrc() {
        iframeSrc = newUrl;
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
            <!-- コンテンツがない場合の表示を削除 -->
        {/if}

        {#if $WebsiteStage == 3}
            <!-- 入力フォームとボタンを追加 -->
            <div class="url-input">
                <input 
                    type="text" 
                    placeholder="Enter URL here" 
                    bind:value={newUrl} 
                    style="width: calc(100% - 110px); padding: 5px;"
                />
                <button on:click={updateIframeSrc} style="padding: 5px 10px;">Update URL</button>
            </div>
        {/if}
    </div>
</WindowBase>

<style>
    .url-input {
        display: flex;
        margin: 10px;
        align-items: center;
    }
</style>
