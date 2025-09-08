<template>
    <div class="paper-margin" title="页边距" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog';

    export default {
        name: 'PagerMargin',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();

                const [ topMargin, rightMargin, bottomMargin, leftMargin ] = instance.command.getPaperMargin();
                new Dialog({
                    title: '页边距',
                    data: [
                        {
                            type: 'text',
                            label: '上边距',
                            name: 'top',
                            required: true,
                            value: `${ topMargin }`,
                            placeholder: '请输入上边距'
                        },
                        {
                            type: 'text',
                            label: '下边距',
                            name: 'bottom',
                            required: true,
                            value: `${ bottomMargin }`,
                            placeholder: '请输入下边距'
                        },
                        {
                            type: 'text',
                            label: '左边距',
                            name: 'left',
                            required: true,
                            value: `${ leftMargin }`,
                            placeholder: '请输入左边距'
                        },
                        {
                            type: 'text',
                            label: '右边距',
                            name: 'right',
                            required: true,
                            value: `${ rightMargin }`,
                            placeholder: '请输入右边距'
                        }
                    ],
                    onConfirm: payload => {
                        const top = payload.find(p => p.name === 'top')?.value;
                        if (!top) {
                            return;
                        }
                        const bottom = payload.find(p => p.name === 'bottom')?.value;
                        if (!bottom) {
                            return;
                        }
                        const left = payload.find(p => p.name === 'left')?.value;
                        if (!left) {
                            return;
                        }
                        const right = payload.find(p => p.name === 'right')?.value;
                        if (!right) {
                            return;
                        }
                        instance.command.executeSetPaperMargin([
                            Number(top),
                            Number(right),
                            Number(bottom),
                            Number(left)
                        ])
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
