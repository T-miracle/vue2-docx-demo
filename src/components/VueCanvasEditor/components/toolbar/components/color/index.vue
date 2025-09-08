<template>
    <div class="menu-item__color" title="字体颜色" @click="clickHandler">
        <i></i>
        <span></span>
        <input ref="color" type="color" id="color" @input="setColorHandler"/>
    </div>
</template>

<script>
    export default {
        name: 'Superscript',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.color.click();
            },
            setColorHandler(e) {
                const instance = this.editorInstance();
                instance.command.executeColor(e.target.value);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
