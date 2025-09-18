import { TextRun } from 'docx';

/**
 * 转换成 docx 换行
 */
export function breakConvert() {
    return new TextRun({ break: 1 })
}