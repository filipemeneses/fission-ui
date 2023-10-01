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
}

hr {
  margin: 12px 0;
  border: 1px solid var(--color-line);
  padding: 0;

}

button {
  background-color: black;
  font-family: "Poppins", sans-serif;

  border: 0;
  font-size: 0.75rem;
  color: #fff;
  padding: 0 24px;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;

  transition: box-shadow .12s ease;
  user-select: none;
}

button:hover {
  box-shadow: inset 0 0 0 2px var(--color-line);
}

button:active {
  transition: background-color .01s ease;
  filter: brightness(1.5);
}


:modal {
  box-shadow: 0px 3px 5px rgba(0 0 0 / 0.2), 0px 15px 15px rgba(0 0 0 / 0.2);
  border-radius: 12px;
  border: 0;
}


@media (prefers-color-scheme: dark) {
  body {
    background-color: #04060c;
    color: #fff;
  }
}
</style>