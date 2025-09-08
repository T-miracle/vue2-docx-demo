<template>
    <div class="menu-item__title" @click="clickHandler">
        <i></i>
        <span class="select" title="切换标题">正文</span>
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
    export default {
        name: 'Size',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            switchTitleLevelHandler(e) {
                const level = e.target.dataset.level;
                const instance = this.editorInstance();
                instance.command.executeTitle(level || null);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
