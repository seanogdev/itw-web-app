<template>
  <div class="empty-state">
    <span class="empty-state-emoji">😢</span>
    <span class="empty-state-text">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Not Found',
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

 .empty-state-emoji {
    font-size: 140px;
    line-height: 1.1;
    margin-bottom: $spacing-4;
    animation: slide-in-blurred-bottom 1s 0.8s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
  }


.empty-state-text {
  font-size: 36px;
  font-weight: 500;
  animation: focus-in-expand-fwd 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes focus-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-600px);
            transform: translateZ(-600px);
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
            transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}


</style>
