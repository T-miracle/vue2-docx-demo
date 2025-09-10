<template>
    <div class="menu-item__title" @click="clickHandler">
        <i></i>
        <span ref="select" class="select" title="切换标题">正文</span>
        <div ref="options" class="options" @click="switchTitleLevelHandler">
            <ul>
                <li style="font-size:16px;">正文</li>
                <li data-level="first" style="font-size:26px;">标题1</li>
                <li data-level="second" style="font-size:24px;">标题2</li>
                <li data-level="third" style="font-size:22px;">标题3</li>
                <li data-level="fourth" style="font-size:20px;">标题4</li>
                <li data-level="fifth" style="font-size:18px;">标题5</li>
                <li data-level="sixth" style="font-size:16px;">标题6</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Size',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            switchTitleLevelHandler(e) {
                const level = e.target.dataset.level;
                const instance = this.editorInstance();
                instance.command.executeTitle(level || null);
            },
            updateActiveStatus(payload) {
                const titleOptionDom = this.$refs.options;
                const titleSelectDom = this.$refs.select;

                titleOptionDom
                    .querySelectorAll('li')
                    .forEach(li => li.classList.remove('active'));
                if (payload.level) {
                    const curTitleDom = titleOptionDom.querySelector(
                        `[data-level='${ payload.level }']`
                    );
                    titleSelectDom.innerText = curTitleDom.innerText;
                    curTitleDom.classList.add('active');
                } else {
                    titleSelectDom.innerText = '正文';
                    titleOptionDom.querySelector('li:first-child').classList.add('active');
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
