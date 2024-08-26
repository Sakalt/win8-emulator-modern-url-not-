<script lang="ts">
    import { onMount } from 'svelte';

    let notes: string[] = [];
    let newNote: string = '';
    let editingIndex: number | null = null;

    // ページロード時にメモを読み込む
    onMount(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            notes = JSON.parse(savedNotes);
        }
    });

    // メモを追加または更新
    function saveNote() {
        if (editingIndex !== null) {
            notes[editingIndex] = newNote;
            editingIndex = null;
        } else {
            notes = [...notes, newNote];
        }
        newNote = '';
        saveToLocalStorage();
    }

    // メモを削除
    function deleteNote(index: number) {
        notes = notes.filter((_, i) => i !== index);
        saveToLocalStorage();
    }

    // メモを編集
    function editNote(index: number) {
        newNote = notes[index];
        editingIndex = index;
    }

    // メモをローカルストレージに保存
    function saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
</script>

<main>
    <div class="window">
        <div class="title-bar">
            <span class="title">メモ帳</span>
            <div class="title-bar-buttons">
                <button class="title-bar-button">-</button>
                <button class="title-bar-button">□</button>
                <button class="title-bar-button">×</button>
            </div>
        </div>
        <textarea 
            bind:value={newNote} 
            placeholder="新しいメモを入力..." 
            rows="10" 
            cols="50"
        ></textarea>
        <div class="controls">
            <button on:click={saveNote} class="save-button">
                {#if editingIndex !== null} 更新 {#else} 保存 {/if}
            </button>
        </div>
        <ul class="note-list">
            {#each notes as note, index}
                <li>
                    {note}
                    <button on:click={() => editNote(index)} class="edit-button">編集</button>
                    <button on:click={() => deleteNote(index)} class="delete-button">削除</button>
                </li>
            {/each}
        </ul>
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .window {
        width: 500px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .title-bar {
        background: #0078d4;
        color: #fff;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .title {
        font-weight: bold;
    }

    .title-bar-buttons {
        display: flex;
        gap: 5px;
    }

    .title-bar-button {
        width: 15px;
        height: 15px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        background: #fff;
        color: #000;
    }

    .title-bar-button:hover {
        background: #ccc;
    }

    textarea {
        width: 100%;
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .controls {
        padding: 10px;
        text-align: center;
    }

    .save-button {
        background: #0078d4;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        cursor: pointer;
    }

    .save-button:hover {
        background: #005a9e;
    }

    .note-list {
        list-style: none;
        padding: 0;
        margin: 0;
        border-top: 1px solid #ccc;
    }

    .note-list li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .edit-button, .delete-button {
        background: #0078d4;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 5px;
    }

    .edit-button:hover, .delete-button:hover {
        background: #005a9e;
    }

    .delete-button {
        background: #d83b01;
    }

    .delete-button:hover {
        background: #a8321f;
    }
</style>
