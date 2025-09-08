<template>
    <div class="menu-item__hyperlink" @click="clickHandler">
        <i title="超链接"></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../../components/dialog/index'
    import { ElementType, splitText } from '@hufe921/canvas-editor';

    export default {
        name: 'Hyperlink',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance()
                new Dialog({
                    title: '超链接',
                    data: [
                        {
                            type: 'text',
                            label: '文本',
                            name: 'name',
                            required: true,
                            placeholder: '请输入文本',
                            value: instance.command.getRangeText()
                        },
                        {
                            type: 'text',
                            label: '链接',
                            name: 'url',
                            required: true,
                            placeholder: '请输入链接'
                        }
                    ],
                    onConfirm: payload => {
                        const name = payload.find(p => p.name === 'name')?.value
                        if (!name) return
                        const url = payload.find(p => p.name === 'url')?.value
                        if (!url) return
                        instance.command.executeHyperlink({
                            type: ElementType.HYPERLINK,
                            value: '',
                            url,
                            valueList: splitText(name).map(n => ({
                                value: n,
                                size: 16
                            }))
                        })
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
