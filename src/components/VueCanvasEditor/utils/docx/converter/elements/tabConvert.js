import { Tab, TextRun } from 'docx';

/**
 * 转换成 docx 的 制表符
 * @param element
 * @returns {TextRun}
 */
export function tabConvert(element) {
    return new TextRun({
        children: [new Tab()]
    });
}