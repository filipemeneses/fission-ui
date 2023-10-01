<template>
  <div class="App">
    <div class="App__list">
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </div>
    <div class="App__function-context">
      <div class="App__header">
        <h1>function-name</h1>
        <div class="App__actions">
          <button>Deploy</button>
        </div>
      </div>
      <div class="App__ide">
        <div class="App__ide-editor">
          <textarea></textarea>
        </div>
        <div class="App__ide-preview">
          <div class="App__bar">
            <input />
            <button>GET</button>
          </div>
          <iframe class="App__ide-contents" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.App {
  display: flex;
  width: 100vw;
}

.App__list {
  width: 200px;
}

.App__list ul {
  margin: 0;
  padding: 0;
}

.App__function-context {
  flex: 1;
}

.App__header {
  display: flex;
}

.App__header {
  display: flex;
  height: 48px;
}

.App__header h1 {
  flex: 1;
  font-size: 1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
}

.App__ide {
  display: flex;
  height: calc(100vh - 48px);
}

.App__ide-editor {
  flex: 2;
}

.App__ide-editor textarea {
  width: 100%;
  height: 100%;
}

.App__ide-preview {
  flex: 1;
}

.App__bar {
  height: 32px;

}

.App__ide-contents {
  height: calc(100vh - 80px);
  margin: 0;
  border: 0;
}
</style>