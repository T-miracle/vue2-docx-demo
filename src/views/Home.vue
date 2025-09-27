<template>
    <div class="container">
        <VueCanvasEditor/>
    </div>
</template>

<script>
    import VueCanvasEditor from '@/components/VueCanvasEditor/index.vue';

    export default {
        name: 'Home',
        components: { VueCanvasEditor },
        created() {

        },
        methods: {}
    };
</script>

<style lang="scss">
    .container {
        padding: 0;
        margin: 0;
        width: 100vw;
        height: 100vh;
    }
</style>
