<template>
    <div class="editor-mode" :title="`${ modeName }(编辑、清洁、只读、表单、设计)`" @click="switchMode">
        {{ modeName }}
    </div>
</template>

<script>
    import { EditorMode } from '@hufe921/canvas-editor';
    import { eventBus, EVENTS } from '../../../../eventBus';

    export default {
        name: 'EditorMode',
        inject: [ 'editorInstance' ],
        data() {
            return {
                modeList: [
                    {
                        mode: EditorMode.EDIT,
                        name: '编辑模式'
                    },
                    {
                        mode: EditorMode.CLEAN,
                        name: '清洁模式'
                    },
                    {
                        mode: EditorMode.READONLY,
                        name: '只读模式'
                    },
                    {
                        mode: EditorMode.FORM,
                        name: '表单模式'
                    },
                    {
                        mode: EditorMode.PRINT,
                        name: '打印模式'
                    },
                    {
                        mode: EditorMode.DESIGN,
                        name: '设计模式'
                    }
                ],
                modeIndex: 0
            };
        },
        computed: {
            modeName() {
                return this.modeList[this.modeIndex].name;
            }
        },
        methods: {
            switchMode() {
                const instance = this.editorInstance();

                // 模式选择循环
                this.modeIndex === this.modeList.length - 1 ? (this.modeIndex = 0) : this.modeIndex++;
                // 设置模式
                const { mode } = this.modeList[this.modeIndex];
                instance.command.executeMode(mode);
                // 设置菜单栏权限视觉反馈
                const isReadonly = mode === EditorMode.READONLY
                const enableMenuList = ['search', 'print']
                eventBus.$emit(EVENTS.DISABLE_NON_EXCLUDE_TOOLBAR_BUTTONS, {
                    isReadonly,
                    exclude: enableMenuList
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
