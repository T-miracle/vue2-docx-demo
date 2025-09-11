<template>
    <div class="canvas-editor__container">
        <div ref="test"></div>
        <Toolbar></Toolbar>
        <Catalog></Catalog>
        <div ref="editor" class="editor"></div>
        <Footer></Footer>
        <div style="position: absolute; width: auto; height: auto; top: 400px; right: 20px">
            <button @click="importFile({ instance: editorInstance })">导入</button>
            <button @click="exportFile({ instance: editorInstance })">导出</button>
        </div>
    </div>
</template>

<script>
    import Editor, { createDomFromElementList } from '@hufe921/canvas-editor';
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
        created() {
            const dom = createDomFromElementList([
                {
                    'value': '啊是大家的计划',
                    'size': 16,
                    'bold': false,
                    'color': 'rgb(0, 0, 0)',
                    'italic': false
                },
                {
                    'value': '\n\n\n'
                },
                {
                    'value': '阿斯顿哈工大计划',
                    'size': 16,
                    'bold': false,
                    'color': 'rgb(0, 0, 0)',
                    'italic': false
                },
                {
                    'value': '\n\n'
                },
                {
                    'value': '\n',
                    'rowFlex': 'center'
                },
                {
                    'value': '阿桑的歌哈工大换个环境',
                    'size': 16,
                    'bold': false,
                    'color': 'rgb(0, 0, 0)',
                    'italic': false,
                    'rowFlex': 'center'
                },
                {
                    'value': '\n\n'
                },
                {
                    'value': '撒旦把大家',
                    'size': 16,
                    'bold': false,
                    'color': 'rgb(0, 0, 0)',
                    'italic': false
                },
                {
                    'value': '\n\n'
                },
                {
                    'value': '\n',
                    'type': 'separator',
                    'dashArray': [],
                    'width': 554
                },
                {
                    'value': '\n\n'
                },
                {
                    'value': '俺是个大概好久打工会刚好经过',
                    'size': 16,
                    'bold': false,
                    'color': 'rgb(0, 0, 0)',
                    'italic': false
                },
                {
                    'value': '\n'
                },
                {
                    'value': 'data:image/png;base64,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',
                    'type': 'image',
                    'width': 38,
                    'height': 42
                },
                {
                    'value': '\n'
                },
                {
                    'value': '\n',
                    'type': 'table',
                    'trList': [
                        {
                            'height': 42,
                            'minHeight': 42,
                            'tdList': [
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [
                                        {
                                            'value': '1',
                                            'size': 16,
                                            'bold': false,
                                            'color': 'rgb(0, 0, 0)',
                                            'italic': false
                                        }
                                    ],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                }
                            ]
                        },
                        {
                            'height': 42,
                            'minHeight': 42,
                            'tdList': [
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [
                                        {
                                            'value': '2',
                                            'size': 16,
                                            'bold': false,
                                            'color': 'rgb(0, 0, 0)',
                                            'italic': false
                                        }
                                    ],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 2,
                                    'rowspan': 1,
                                    'value': [
                                        {
                                            'value': '1313112313131',
                                            'size': 16,
                                            'bold': false,
                                            'color': 'rgb(0, 0, 0)',
                                            'italic': false
                                        }
                                    ],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                }
                            ]
                        },
                        {
                            'height': 42,
                            'minHeight': 42,
                            'tdList': [
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [
                                        {
                                            'value': '3',
                                            'size': 16,
                                            'bold': false,
                                            'color': 'rgb(0, 0, 0)',
                                            'italic': false
                                        }
                                    ],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                }
                            ]
                        },
                        {
                            'height': 42,
                            'minHeight': 42,
                            'tdList': [
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [
                                        {
                                            'value': '4',
                                            'size': 16,
                                            'bold': false,
                                            'color': 'rgb(0, 0, 0)',
                                            'italic': false
                                        }
                                    ],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                },
                                {
                                    'colspan': 1,
                                    'rowspan': 1,
                                    'value': [],
                                    'verticalAlign': 'middle'
                                }
                            ]
                        }
                    ],
                    'width': 558,
                    'height': 168,
                    'colgroup': [
                        {
                            'width': 93
                        },
                        {
                            'width': 93
                        },
                        {
                            'width': 93
                        },
                        {
                            'width': 93
                        },
                        {
                            'width': 93
                        },
                        {
                            'width': 93
                        }
                    ]
                },
                {
                    'value': '\n\n'
                },
                {
                    'value': '',
                    'type': 'hyperlink',
                    'url': '213131',
                    'valueList': [
                        {
                            'value': '1313',
                            'color': '#0000FF',
                            'underline': true
                        }
                    ]
                }
            ]);
            this.$nextTick(() => {
                this.$refs.test.append(dom)
            })
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
