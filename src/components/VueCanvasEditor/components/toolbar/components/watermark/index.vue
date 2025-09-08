<template>
    <div class="menu-item__watermark" @click="clickHandler">
        <i title="水印(添加、删除)"></i>
        <div ref="options" class="options" @mousedown="setWatermarkHandler">
            <ul>
                <li data-menu="add">添加水印</li>
                <li data-menu="delete">删除水印</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog/index';

    export default {
        name: 'Watermark',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            setWatermarkHandler(evt) {
                const li = evt.target;
                const menu = li.dataset.menu;
                this.$refs.options.classList.toggle('visible');
                if (menu === 'add') {
                    new Dialog({
                        title: '水印',
                        data: [
                            {
                                type: 'text',
                                label: '内容',
                                name: 'data',
                                required: true,
                                placeholder: '请输入内容'
                            },
                            {
                                type: 'color',
                                label: '颜色',
                                name: 'color',
                                required: true,
                                value: '#AEB5C0'
                            },
                            {
                                type: 'number',
                                label: '字体大小',
                                name: 'size',
                                required: true,
                                value: '120'
                            },
                            {
                                type: 'number',
                                label: '透明度',
                                name: 'opacity',
                                required: true,
                                value: '0.3'
                            },
                            {
                                type: 'select',
                                label: '重复',
                                name: 'repeat',
                                value: '0',
                                required: false,
                                options: [
                                    {
                                        label: '不重复',
                                        value: '0'
                                    },
                                    {
                                        label: '重复',
                                        value: '1'
                                    }
                                ]
                            },
                            {
                                type: 'number',
                                label: '水平间隔',
                                name: 'horizontalGap',
                                required: false,
                                value: '10'
                            },
                            {
                                type: 'number',
                                label: '垂直间隔',
                                name: 'verticalGap',
                                required: false,
                                value: '10'
                            }
                        ],
                        onConfirm: payload => {
                            const nullableIndex = payload.findIndex(p => !p.value);
                            if (~nullableIndex) {
                                return;
                            }
                            const watermark = payload.reduce((pre, cur) => {
                                pre[cur.name] = cur.value;
                                return pre;
                            }, {});
                            const repeat = watermark.repeat === '1';
                            this.editorInstance().command.executeAddWatermark({
                                data: watermark.data,
                                color: watermark.color,
                                size: Number(watermark.size),
                                opacity: Number(watermark.opacity),
                                repeat,
                                gap:
                                    repeat && watermark.horizontalGap && watermark.verticalGap
                                        ? [
                                            Number(watermark.horizontalGap),
                                            Number(watermark.verticalGap)
                                        ]
                                        : undefined
                            });
                        }
                    });
                } else {
                    this.editorInstance().command.executeDeleteWatermark();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
