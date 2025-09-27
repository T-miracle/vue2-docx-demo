import { RenderMode } from '@hufe921/canvas-editor';

/* 默认编辑器配置选项 */
export const defaultEditorOptions =  {
    scrollContainerSelector: '.canvas-editor__scroll-container',
    // 默认字体
    defaultFont: '宋体',
    // 默认字号
    defaultFontSize: 16,
    // 纸张边距
    margins: [100, 120, 100, 120],
    // 行高
    defaultBasicRowMarginHeight: 6,
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
    table: {
        tdPadding: [ 0, 5, 0, 5 ],
        defaultTrMinHeight: 18
    },
    // 菜单栏高度60，底部工具栏30为遮盖层
    maskMargin: [60, 0, 30, 0],
    renderMode: RenderMode.COMPATIBILITY
}