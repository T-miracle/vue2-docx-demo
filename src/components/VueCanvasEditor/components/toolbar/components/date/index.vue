<template>
    <div class="menu-item__latex" title="LateX" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog';
    import { ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Latex',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                new Dialog({
                    title: 'LaTeX',
                    data: [
                        {
                            type: 'textarea',
                            height: 100,
                            name: 'value',
                            placeholder: '请输入LaTeX文本'
                        }
                    ],
                    onConfirm: payload => {
                        const value = payload.find(p => p.name === 'value')?.value
                        if (!value) return
                        instance.command.executeInsertElementList([
                            {
                                type: ElementType.LATEX,
                                value
                            }
                        ])
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
