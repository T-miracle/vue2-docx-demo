<template>
    <div
        class="menu-item__superscript"
        :class="{ active }"
        :title="`上标(${isApple() ? '⌘' : 'Ctrl'}+Shift+,)`"
        @click="clickHandler"
    >
        <i></i>
    </div>
</template>

<script>
    import { ElementType } from '@hufe921/canvas-editor';
    import ActiveMixins from '../../mixins/activeMixins';

    export default {
        name: 'Superscript',
        inject: [ 'editorInstance', 'isApple' ],
        mixins: [ ActiveMixins ],
        methods: {
            updateActiveStatus(payload) {
                this.active = payload.type === ElementType.SUPERSCRIPT;
            },
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeSuperscript();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
