<template>
    <div class="canvas-editor__container">
        <Toolbar></Toolbar>
        <Catalog></Catalog>
        <div ref="editor" class="editor"></div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Toolbar from './components/toolbar/index.vue';
    import Editor from '@hufe921/canvas-editor';
    import { defaultEditorOptions } from './defaultOptions';
    import Footer from './components/footer/index.vue';
    import Catalog from './components/catalog/index.vue';
    import { eventBus, EVENTS } from './eventBus';
    import { debounce } from './utils';
    import { contextMenu } from './contextMenu';

    export default {
        name: 'VueCanvasEditor',
        components: {
            Catalog,
            Footer,
            Toolbar
        },
        data() {
            return {
                // 画布编辑器实例
                editorInstance: null,
                // 是否是苹果设备
                isApple: false
            };
        },
        provide() {
            return {
                editorInstance: () => this.editorInstance,
                isApple: () => this.isApple
            };
        },
        mounted() {
            this.isApple = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
            this.init();

            window?.addEventListener('click', this.closeAllOptionsHandler, { capture: true });
        },
        beforeDestroy() {
            window?.removeEventListener('click', this.closeAllOptionsHandler, { capture: true });
            if (this.editorInstance) {
                this.editorInstance.destroy();
                this.editorInstance = null;
            }
        },
        methods: {
            /** 初始化编辑器 */
            init() {
                const instance = new Editor(
                    this.$refs.editor,
                    [],
                    defaultEditorOptions
                );
                this.editorInstance = instance;

                // 监听内容变化，进行相应处理
                instance.listener.contentChange = debounce(this.handleContentChange, 200)
                // 初始化时触发一次内容变化处理
                this.handleContentChange()

                // 监听保存事件
                instance.listener.saved = (payload) => {
                    console.log('elementList: ', payload)
                }

                // 初始化右键菜单
                instance.register.contextMenuList(Object.values(contextMenu))

                // 监听目录模式变化
                instance.listener.pageModeChange = mode => {
                    eventBus.$emit(EVENTS.PAGE_MODE_CHANGE, mode);
                }

                // 监听可见页码变化
                instance.listener.visiblePageNoListChange = payload => {
                    eventBus.$emit(EVENTS.VISIBLE_PAGE_NO_LIST_CHANGE, payload);
                }

                // 监听页数变化
                instance.listener.pageSizeChange = payload => {
                    eventBus.$emit(EVENTS.PAGE_SIZE_CHANGE, payload);
                }

                // 监听页码变化
                instance.listener.intersectionPageNoChange = payload => {
                    eventBus.$emit(EVENTS.PAGE_NO_CHANGE, payload);
                }

                instance.listener.rangeStyleChange = (payload) => {
                    // 行列信息
                    const rangeContext = instance.command.getRangeContext()
                    if (rangeContext) {
                        eventBus.$emit(EVENTS.UPDATE_ROW_NO, rangeContext.startRowNo + 1);
                        eventBus.$emit(EVENTS.UPDATE_COL_NO, rangeContext.startColNo + 1);
                    }
                }
            },
            /** 关闭所有选项面板 */
            closeAllOptionsHandler(evt) {
                const visibleDom = document.querySelector('.visible');
                if (!visibleDom || visibleDom.contains(evt.target)) {
                    return;
                }
                visibleDom.classList.remove('visible');
            },
            /** 内容变化时触发 */
            async handleContentChange() {
                console.log('内容变化了');
                // 更新字数
                eventBus.$emit(EVENTS.UPDATE_WORD_COUNT);
                // 重载目录
                eventBus.$emit(EVENTS.RELOAD_CATALOG);
                // 批注
                /* nextTick(() => {
                    updateComment()
                }) */
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "./index.css";

    .canvas-editor__container {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
