<template>
    <div class="menu-item__radio" title="单选框" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Radio',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.editorInstance().command.executeInsertElementList([
                    {
                        type: ElementType.RADIO,
                        checkbox: {
                            value: false
                        },
                        value: ''
                    }
                ])
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
