<template>
    <div class="paper-direction" @click="clickHandler">
        <i title="纸张方向"></i>
        <div ref="options" class="options" @click="optionsClickHandler">
            <ul>
                <li data-paper-direction="vertical" class="active">纵向</li>
                <li data-paper-direction="horizontal">横向</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PagerDirection',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            optionsClickHandler(evt) {
                const instance = this.editorInstance();

                const li = evt.target;
                const paperDirection = li.dataset.paperDirection;
                instance.command.executePaperDirection(paperDirection);
                // 纸张方向状态回显
                this.$refs.options
                    .querySelectorAll('li')
                    .forEach(child => child.classList.remove('active'));
                li.classList.add('active');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
