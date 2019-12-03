<template>
  <div class="loader">
    <div />
    <div />
    <div />
  </div>
</template>

<style lang="scss" scoped>
$size: $spacing;

@keyframes loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -$size, 0);
  }
}

.loader {
  display: flex;
  justify-content: center;
}

.loader > div {
  width: $size;
  height: $size;
  margin: $size * 2 $size/4;
  background: $app-primary;
  border-radius: 50%;
  animation: loader 0.6s infinite alternate;
}

.loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
