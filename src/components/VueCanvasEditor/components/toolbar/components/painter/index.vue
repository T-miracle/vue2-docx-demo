<template>
    <div class="menu-item__painter" :title="title" @click="clickHandler" @dblclick="dblclickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: "Painter",
        inject: [ 'editorInstance', 'isApple' ],
        data() {
            return {
                isFirstClick: true,
                painterTimeout: null
            }
        },
        computed: {
            title() {
                return `格式刷(双击可连续使用)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                if (this.isFirstClick) {
                    this.isFirstClick = false
                    this.painterTimeout = setTimeout(() => {
                        this.isFirstClick = true
                        instance.command.executePainter({
                            isDblclick: false
                        })
                    }, 200)
                } else {
                    clearTimeout(this.painterTimeout)
                }
            },
            dblclickHandler() {
                const instance = this.editorInstance();
                this.isFirstClick = true
                clearTimeout(this.painterTimeout)
                instance.command.executePainter({
                    isDblclick: true
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
