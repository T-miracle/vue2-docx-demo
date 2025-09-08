import Vue from 'vue';

/**
 * 用于组件间通信的事件总线
 * 给 VueCanvasEditor 及其子组件使用
 * 提供了一个中央事件管理机制，方便组件之间的消息传递和事件处理
 */
export const eventBus = new Vue()

// 定义常用事件名称，避免硬编码字符串
export const EVENTS = {
    // 目录模式切换
    PAGE_MODE_CHANGE: 'page-mode-change',
    // 可视页码变化
    VISIBLE_PAGE_NO_LIST_CHANGE: 'visible-page-no-list-change',
    // 页数变化
    PAGE_SIZE_CHANGE: 'page-size-change',
    // 当前页码变化
    PAGE_NO_CHANGE: 'page-no-change',
    // 切换目录
    TOGGLE_CATALOG: 'toggle-catalog',
    // 重载目录
    RELOAD_CATALOG: 'reload-catalog',
    // 更新字数
    UPDATE_WORD_COUNT: 'update-word-count',
    // 更新行
    UPDATE_ROW_NO: 'update-row-no',
    // 更新列
    UPDATE_COL_NO: 'update-col-no',
    // 禁用非排除工具栏按钮
    DISABLE_NON_EXCLUDE_TOOLBAR_BUTTONS: 'disable-non-exclude-toolbar-buttons',
}