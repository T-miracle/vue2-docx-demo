<template>
    <div ref="fs" class="fullscreen" title="全屏显示" @click="toggleFullscreen">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Fullscreen',
        mounted() {
            window.addEventListener('keydown', evt => {
                if (evt.key === 'F11') {
                    this.toggleFullscreen();
                    evt.preventDefault();
                }
            });
            document.addEventListener('fullscreenchange', () => {
                this.$refs.fs.classList.toggle('exist');
            });
        },
        methods: {
            toggleFullscreen() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
