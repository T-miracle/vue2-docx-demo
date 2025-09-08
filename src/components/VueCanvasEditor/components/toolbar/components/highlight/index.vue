<template>
    <div class="menu-item__highlight" title="高亮" @click="clickHandler">
        <i></i>
        <span></span>
        <input ref="color" type="color" id="highlight" @input="setColorHandler">
    </div>
</template>

<script>
    export default {
        name: 'Highlight',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.color.click();
            },
            setColorHandler(e) {
                const instance = this.editorInstance();
                instance.command.executeHighlight(e.target.value);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
