<template>
    <div
        class="menu-item__separator"
        :class="{ active }"
        @click="clickHandler"
    >
        <i title="分割线"></i>
        <div ref="options" class="options" @mousedown="selectSeparatorStyleHandler">
            <ul>
                <li data-separator='0,0'>
                    <i></i>
                </li>
                <li data-separator="1,1">
                    <i></i>
                </li>
                <li data-separator="3,1">
                    <i></i>
                </li>
                <li data-separator="4,4">
                    <i></i>
                </li>
                <li data-separator="7,3,3,3">
                    <i></i>
                </li>
                <li data-separator="6,2,2,2,2,2">
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ActiveMixins from '../../mixins/activeMixins';
    import { ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Separator',
        inject: [ 'editorInstance' ],
        mixins: [ ActiveMixins ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            selectSeparatorStyleHandler(evt) {
                let payload = [];
                const li = evt.target;
                const separatorDash = li.dataset.separator?.split(',').map(Number);
                if (separatorDash) {
                    const isSingleLine = separatorDash.every(d => d === 0);
                    if (!isSingleLine) {
                        payload = separatorDash;
                    }
                }
                this.editorInstance().command.executeSeparator(payload);
            },
            updateActiveStatus(payload) {
                this.active = payload.type === ElementType.SEPARATOR;

                const separatorOptionDom = this.$refs.options;
                separatorOptionDom
                    .querySelectorAll('li')
                    .forEach(li => li.classList.remove('active'));
                const separator = payload.dashArray.join(',') || '0,0';
                const curSeparatorDom = separatorOptionDom.querySelector(
                    `[data-separator='${ separator }']`
                );
                if (curSeparatorDom) {
                    curSeparatorDom.classList.add('active');
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
