<template>
    <div class="menu-item__date" @click="clickHandler">
        <i title="日期"></i>
        <div ref="options" class="options" @mousedown="setDateHandler">
            <ul>
                <li data-format="yyyy-MM-dd"></li>
                <li data-format="yyyy-MM-dd hh:mm:ss"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { ElementType } from '@hufe921/canvas-editor';

    export default {
        name: 'Date',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const dateDomOptionDom = this.$refs.options;
                dateDomOptionDom.classList.toggle('visible');
                // 定位调整
                const bodyRect = document.body.getBoundingClientRect();
                const dateDomOptionRect = dateDomOptionDom.getBoundingClientRect();
                if (dateDomOptionRect.left + dateDomOptionRect.width > bodyRect.width) {
                    dateDomOptionDom.style.right = '0px';
                    dateDomOptionDom.style.left = 'unset';
                } else {
                    dateDomOptionDom.style.right = 'unset';
                    dateDomOptionDom.style.left = '0px';
                }
                // 当前日期
                const date = new Date();
                const year = date.getFullYear().toString();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                const second = date.getSeconds().toString().padStart(2, '0');
                const dateString = `${ year }-${ month }-${ day }`;
                const dateTimeString = `${ dateString } ${ hour }:${ minute }:${ second }`;
                dateDomOptionDom.querySelector('li:first-child').innerText = dateString;
                dateDomOptionDom.querySelector('li:last-child').innerText = dateTimeString;
            },
            setDateHandler(evt) {
                const instance = this.editorInstance();
                const dateDomOptionDom = this.$refs.options;
                const li = evt.target;
                const dateFormat = li.dataset.format;
                dateDomOptionDom.classList.toggle('visible');
                instance.command.executeInsertElementList([
                    {
                        type: ElementType.DATE,
                        value: '',
                        dateFormat,
                        valueList: [
                            {
                                value: li.innerText.trim()
                            }
                        ]
                    }
                ]);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
