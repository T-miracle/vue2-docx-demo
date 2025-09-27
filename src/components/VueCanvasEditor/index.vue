<template>
    <div class="canvas-editor__container">
        <Toolbar></Toolbar>
        <Catalog></Catalog>
        <div class="canvas-editor__scroll-container">
            <div ref="editor" class="editor"></div>
        </div>
        <Footer></Footer>
        <div class="test-button">
            <button @click="importDocx">导入</button>
            <button @click="exportDocx">导出</button>
            <!--<button @click="exportFileTmp({ instance: editorInstance })">导出Tmp</button>-->
            <!--<button @click="docxTestDemo">测试docx</button>-->
            <input ref="fileRef" type="file" accept=".docx" style="display: none;">
        </div>
    </div>
</template>

<script>
    import Editor, { getElementListByHTML } from '@hufe921/canvas-editor';
    import Toolbar from './components/toolbar/index.vue';
    import Footer from './components/footer/index.vue';
    import Catalog from './components/catalog/index.vue';
    import docxPlugin from './utils/docx/index';
    import { defaultEditorOptions } from './config/defaultOptions';
    import { eventBus, EVENTS } from './config/eventBus';
    import { contextMenu } from './config/contextMenu';
    import shortcut from './config/shortcut';
    import { exportFile, exportFileTmp } from './utils/exportFile';
    import { debounce } from './utils/common';
    import { toHtml } from 'docshift';
    import { convertImgBlobsInHtml } from './utils/imageConvert';
    import { docxTestDemo } from './utils/docx/docx-test-demo';

    export default {
        name: 'VueCanvasEditor',
        components: {
            Toolbar,
            Footer,
            Catalog
        },
        data() {
            return {
                // 编辑器实例
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

            window?.addEventListener('click', this.closeAllOptionsHandler, {
                capture: true
            });
        },
        beforeDestroy() {
            window?.removeEventListener('click', this.closeAllOptionsHandler, {
                capture: true
            });
            if (this.editorInstance) {
                this.editorInstance.destroy();
                this.editorInstance = null;
            }
        },
        methods: {
            exportFileTmp,
            docxTestDemo,
            /** 初始化编辑器 */
            init() {
                const instance = new Editor(
                    this.$refs.editor,
                    [],
                    defaultEditorOptions
                );
                instance.use(docxPlugin);
                this.editorInstance = instance;

                // 监听内容变化，进行相应处理
                instance.listener.contentChange = debounce(this.handleContentChange, 200);
                // 初始化时触发一次内容变化处理
                this.handleContentChange();

                // 监听保存事件
                instance.listener.saved = (payload) => {
                    console.log('elementList: ', payload);
                };

                // 初始化右键菜单
                instance.register.contextMenuList(Object.values(contextMenu));

                // 监听目录模式变化
                instance.listener.pageModeChange = (mode) => eventBus.$emit(EVENTS.PAGE_MODE_CHANGE, mode);

                // 监听可见页码变化
                instance.listener.visiblePageNoListChange = (payload) => eventBus.$emit(EVENTS.VISIBLE_PAGE_NO_LIST_CHANGE,
                    payload);

                // 监听页数变化
                instance.listener.pageSizeChange = (payload) => eventBus.$emit(EVENTS.PAGE_SIZE_CHANGE, payload);

                // 监听页码变化
                instance.listener.intersectionPageNoChange = (payload) => eventBus.$emit(EVENTS.PAGE_NO_CHANGE,
                    payload);

                // 监听选区样式变化
                instance.listener.rangeStyleChange = (payload) => eventBus.$emit(EVENTS.RANGE_STYLE_CHANGE, payload);

                // 监听控件变化
                instance.listener.controlChange = (payload) => eventBus.$emit(EVENTS.CONTROL_CHANGE, payload);

                // 监听缩放变化
                instance.listener.pageScaleChange = (payload) => eventBus.$emit(EVENTS.PAGE_SCALE_CHANGE, payload);

                // 注册快捷键
                instance.register.shortcutList(shortcut);
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
                // 更新字数
                eventBus.$emit(EVENTS.UPDATE_WORD_COUNT);
                // 重载目录
                eventBus.$emit(EVENTS.RELOAD_CATALOG);
                // 批注
                /* nextTick(() => {
                    updateComment()
                }) */
            },
            /**
             * 设置HTML内容
             * @param payload
             */
            setHTMLContent(payload) {
                if (!this.editorInstance) {
                    return;
                }
                const { width, margins } = this.editorInstance.command.getOptions();
                const elements = {
                    header: getElementListByHTML(payload.header || ''),
                    main: getElementListByHTML(payload.main || '', { innerWidth: width - margins[1] - margins[3] }),
                    footer: getElementListByHTML(payload.footer || '')
                };
                // console.log('elements: ', elements);
                this.editorInstance.command.executeSetValue(elements);
            },
            importDocx() {
                this.$refs.fileRef.click();
                this.$refs.fileRef.onchange = async(e) => {
                    const file = e.target.files[0];
                    if (!file) {
                        return;
                    }
                    let html = await toHtml(file);
                    html = html.replaceAll('text-align:distribute', 'text-align:justify-all');
                    html = html.replaceAll('text-align:both', 'text-align:justify');
                    html = await convertImgBlobsInHtml(html);
                    // console.log('html: ', html);

                    this.setHTMLContent({
                        main: html
                    });
                };
            },
            exportDocx() {
                exportFile({ instance: this.editorInstance })
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "styles/index.css";

    .canvas-editor__container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .test-button {
            position: absolute;
            top: 16px;
            right: 20px;
            width: auto;
            height: auto;
            display: flex;
            gap: 10px;
            z-index: 1000;
            align-items: center;

            button {
                padding: 0 10px;
            }
        }
    }
</style>
