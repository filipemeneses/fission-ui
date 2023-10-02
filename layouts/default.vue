<template>
  <slot />
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  --color-primary: #2453ff;
  --color-primary-hover: #0800ff;
  --color-font: #fff;
  --color-line: rgba(255, 255, 255, 0.2);
  --color-danger: rgb(182, 19, 19);
  --color-danger-line: rgb(129, 45, 45);
  background-color: black;
  color: #fff;
}

hr {
  margin: 12px 0;
  border: 1px solid var(--color-line);
  padding: 0;
}

button {
  background-color: black;
  color: #fff;
  font-family: "Poppins", sans-serif;
  border: 0;
  font-size: 0.75rem;
  padding: 0 12px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  transition: box-shadow .12s ease;
  user-select: none;
}

button.isIcon {
  padding: 0;
  background-color: transparent;
  font-size: 0;
  line-height: 0;
}

button.isDanger {
  background-color: var(--color-danger);
  color: #fff;
}

button:hover:not(.isIcon):not(button[disabled]) {
  box-shadow: inset 0 0 0 2px var(--color-line);
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

button:active:not(button[disabled]) {
  transition: background-color .01s ease;
  filter: brightness(1.5);
}

::selection {
  color: #fff;
  background-color: var(--color-primary);
}

dialog {
  background-color: rgb(40, 40, 40);
  border: 0;
}

dialog::backdrop {
  background-color: rgba(20, 20, 20, 0.7);
}

input {
  padding: 12px;
  background-color: black;
  color: #fff;
  border: 0;
  font-size: 14px;
  outline: none;
}

input:focus {
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

:modal {
  box-shadow: 0px 3px 5px rgba(0 0 0 / 0.2), 0px 15px 15px rgba(0 0 0 / 0.2);
  border-radius: 12px;
  border: 0;
}

pre,
code {
  margin: 12px 0;
}
</style>