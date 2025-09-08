<template>
    <div class="menu-item__checkbox" title="复选框" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Checkbox',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.editorInstance().command.executeInsertElementList([
                    {
                        type: ElementType.CHECKBOX,
                        checkbox: {
                            value: false
                        },
                        value: ''
                    }
                ]);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
