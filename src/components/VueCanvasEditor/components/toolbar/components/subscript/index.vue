<template>
    <div
        class="menu-item__subscript"
        :class="{ active }"
        :title="`下标(${isApple() ? '⌘' : 'Ctrl'}+Shift+,)`"
        @click="clickHandler"
    >
        <i></i>
    </div>
</template>

<script>
    import { ElementType } from '@hufe921/canvas-editor';
    import ActiveMixins from '../../mixins/activeMixins';

    export default {
        name: 'Subscript',
        inject: [ 'editorInstance', 'isApple' ],
        mixins: [ ActiveMixins ],
        methods: {
            clickHandler() {
                this.editorInstance()?.command.executeSubscript();
            },
            updateActiveStatus(payload) {
                this.active = payload.type === ElementType.SUBSCRIPT;
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
