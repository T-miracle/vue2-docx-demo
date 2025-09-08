<template>
    <div class="menu-item__format" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: "Format",
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `清除格式`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeFormat()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
