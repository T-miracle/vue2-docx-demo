<template>
    <div class="menu-item__separator" @click="clickHandler">
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
    export default {
        name: 'Separator',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible')
            },
            selectSeparatorStyleHandler(evt) {
                console.log(evt.target);
                let payload = []
                const li = evt.target
                const separatorDash = li.dataset.separator?.split(',').map(Number)
                if (separatorDash) {
                    const isSingleLine = separatorDash.every(d => d === 0)
                    if (!isSingleLine) {
                        payload = separatorDash
                    }
                }
                this.editorInstance().command.executeSeparator(payload)
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
