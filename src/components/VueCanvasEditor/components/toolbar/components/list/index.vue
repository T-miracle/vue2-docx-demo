<template>
    <div class="menu-item__list" :title="`列表(${isApple() ? '⌘' : 'Ctrl'}+Shift+U)`" @click="clickHandler">
        <i></i>
        <div ref="options" class="options" @click="setListStyleHandler">
            <ul>
                <li>
                    <label>取消列表</label>
                </li>
                <li data-list-type="ol" data-list-style='decimal'>
                    <label>有序列表：</label>
                    <ol>
                        <li>________</li>
                    </ol>
                </li>
                <li data-list-type="ul" data-list-style='checkbox'>
                    <label>复选框列表：</label>
                    <ul style="list-style-type: '☑️ ';">
                        <li>________</li>
                    </ul>
                </li>
                <li data-list-type="ul" data-list-style='disc'>
                    <label>实心圆点列表：</label>
                    <ul style="list-style-type: disc;">
                        <li>________</li>
                    </ul>
                </li>
                <li data-list-type="ul" data-list-style='circle'>
                    <label>空心圆点列表：</label>
                    <ul style="list-style-type: circle;">
                        <li>________</li>
                    </ul>
                </li>
                <li data-list-type="ul" data-list-style='square'>
                    <label>空心方块列表：</label>
                    <ul style="list-style-type: '☐ ';">
                        <li>________</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';
    import { ListStyle, ListType } from '@hufe921/canvas-editor';

    export default {
        name: 'List',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            setListStyleHandler(evt) {
                const li = evt.target;
                const listType = li.dataset.listType || null;
                const listStyle = li.dataset.listStyle;
                this.editorInstance().command.executeList(listType, listStyle);
            },
            updateActiveStatus(payload) {
                const listOptionDom = this.$refs.options;
                const listDom = this.$el;

                listOptionDom
                    .querySelectorAll('li')
                    .forEach(li => li.classList.remove('active'));
                if (payload.listType) {
                    listDom.classList.add('active');
                    const listType = payload.listType;
                    const listStyle = payload.listType === ListType.OL ? ListStyle.DECIMAL : payload.listStyle;
                    const curListDom = listOptionDom.querySelector(
                        `[data-list-type='${ listType }'][data-list-style='${ listStyle }']`
                    );
                    if (curListDom) {
                        curListDom.classList.add('active');
                    }
                } else {
                    listDom.classList.remove('active');
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>