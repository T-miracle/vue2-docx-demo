<template>
    <div class="menu-item__block" title="内容块" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog';
    import { BlockType, ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Block',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                new Dialog({
                    title: '内容块',
                    data: [
                        {
                            type: 'select',
                            label: '类型',
                            name: 'type',
                            value: 'iframe',
                            required: true,
                            options: [
                                {
                                    label: '网址',
                                    value: 'iframe'
                                },
                                {
                                    label: '视频',
                                    value: 'video'
                                }
                            ]
                        },
                        {
                            type: 'number',
                            label: '宽度',
                            name: 'width',
                            placeholder: '请输入宽度（默认页面内宽度）'
                        },
                        {
                            type: 'number',
                            label: '高度',
                            name: 'height',
                            required: true,
                            placeholder: '请输入高度'
                        },
                        {
                            type: 'input',
                            label: '地址',
                            name: 'src',
                            required: false,
                            placeholder: '请输入地址'
                        },
                        {
                            type: 'textarea',
                            label: 'HTML',
                            height: 100,
                            name: 'srcdoc',
                            required: false,
                            placeholder: '请输入HTML代码（仅网址类型有效）'
                        }
                    ],
                    onConfirm: payload => {
                        const type = payload.find(p => p.name === 'type')?.value;
                        if (!type) {
                            return;
                        }
                        const width = payload.find(p => p.name === 'width')?.value;
                        const height = payload.find(p => p.name === 'height')?.value;
                        if (!height) {
                            return;
                        }
                        // 地址或HTML代码至少存在一项
                        const src = payload.find(p => p.name === 'src')?.value;
                        const srcdoc = payload.find(p => p.name === 'srcdoc')?.value;
                        const block = {
                            type: type
                        };
                        if (block.type === BlockType.IFRAME) {
                            if (!src && !srcdoc) {
                                return;
                            }
                            block.iframeBlock = {
                                src,
                                srcdoc
                            };
                        } else if (block.type === BlockType.VIDEO) {
                            if (!src) {
                                return;
                            }
                            block.videoBlock = {
                                src
                            };
                        }
                        const blockElement = {
                            type: ElementType.BLOCK,
                            value: '',
                            height: Number(height),
                            block
                        };
                        if (width) {
                            blockElement.width = Number(width);
                        }
                        instance.command.executeInsertElementList([ blockElement ]);
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
