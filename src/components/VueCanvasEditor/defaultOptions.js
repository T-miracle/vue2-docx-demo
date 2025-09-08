/* 默认编辑器配置选项 */
export const defaultEditorOptions =  {
    // 纸张边距
    margins: [100, 120, 100, 120],
    // 水印
    // watermark: {
    //     data: 'CANVAS-EDITOR',
    //     size: 120
    // },
    pageNumber: {
        format: '第{pageNo}页/共{pageCount}页'
    },
    placeholder: {
        data: '请输入正文'
    },
    zone: {
        tipDisabled: false
    },
    // 菜单栏高度60，底部工具栏30为遮盖层
    maskMargin: [60, 0, 30, 0]
}