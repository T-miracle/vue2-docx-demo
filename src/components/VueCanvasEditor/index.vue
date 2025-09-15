<template>
    <div class="canvas-editor__container">
        <Toolbar></Toolbar>
        <Catalog></Catalog>
        <div ref="editor" class="editor"></div>
        <Footer></Footer>
        <div style="position: absolute; width: auto; height: auto; top: 400px; right: 20px; display: flex; flex-direction: column; gap: 10px; z-index: 1000; align-items: center;">
            <button @click="importFile({ instance: editorInstance })">导入</button>
            <button @click="exportFile({ instance: editorInstance })">导出</button>
            <button @click="convertToHTML">转换成HTML</button>
            <button @click="convertToDocx">转换成docx</button>
            <input ref="fileRef" type="file" accept=".docx" style="display: none;">
        </div>
    </div>
</template>

<script>
    import Editor from '@hufe921/canvas-editor';
    import Toolbar from './components/toolbar/index.vue';
    import Footer from './components/footer/index.vue';
    import Catalog from './components/catalog/index.vue';
    import docxPlugin from './utils/docx/index';
    import { defaultEditorOptions } from './defaultOptions';
    import { eventBus, EVENTS } from './eventBus';
    import { contextMenu } from './contextMenu';
    import shortcut from '@/components/VueCanvasEditor/shortcut';
    import { importFile } from '@/components/VueCanvasEditor/utils/importFile';
    import { exportFile } from '@/components/VueCanvasEditor/utils/exportFile';
    import { debounce } from './utils/common';
    import demoData from '@/components/VueCanvasEditor/demoData';
    import { toDocx, toHtml } from 'docshift';
    import { toHtml as myToHtml } from '@/components/VueCanvasEditor/utils/docx/importDocx';
    import { convertImgBlobsInHtml } from '@/components/VueCanvasEditor/utils/htmlImageBlobConvertToBase64';

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

            // 测试数据
            this.setHTMLContent(demoData);
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
            exportFile,
            importFile,
            /** 初始化编辑器 */
            init() {
                const instance = new Editor(this.$refs.editor, [], defaultEditorOptions);
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
             * @param {Partial<IEditorHTML>} payload
             */
            setHTMLContent(payload) {
                if (!this.editorInstance) {
                    return;
                }
                this.editorInstance.command.executeSetHTML(payload);
            },
            convertToHTML() {
                this.$refs.fileRef.click();
                this.$refs.fileRef.onchange = async(e) => {
                    const file = e.target.files[0];
                    if (!file) {
                        return;
                    }
                    console.log('file: ', file);
                    let html = await toHtml(file);
                    html = html.replaceAll('text-align:distribute', 'text-align:justify')
                    html = await convertImgBlobsInHtml(html);
                    console.log('html: ', html);

                    let myHtml = await myToHtml(file)
                    console.log('my html: ', myHtml);

                    this.setHTMLContent({
                        main: html
                    });
                };
            },
            async convertToDocx() {
                const htmlAll = await this.editorInstance.command.getHTML();
                console.log('htmlAll: ', htmlAll);
                let html = htmlAll.main
                // html = html.replaceAll('<br>','<br/>')
                // html = html.replaceAll('text-align: justify', 'text-align:distribute')
                console.log('html: ', html);
                // const docxBlob = await toDocx(html);
                // const url = URL.createObjectURL(docxBlob);
                // const a = document.createElement('a');
                // a.href = url;
                // a.download = 'document.docx';
                // a.click();
                // URL.revokeObjectURL(url);
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
