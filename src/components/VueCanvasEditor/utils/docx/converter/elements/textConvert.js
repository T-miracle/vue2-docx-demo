import { TextRun } from 'docx';
import Color from 'color';
import { ElementType } from '@hufe921/canvas-editor';

/**
 * 转换成 docx 的 文本
 * @param element
 */
export function textConvert(element) {
    return new TextRun({
        font: element.font,
        text: element.value.toString(),
        bold: element.bold,
        size: `${ (element.size || 16) / 0.75 }pt`,
        color: Color(element.color).hex() || '#000000',
        italics: element.italic,
        strike: element.strikeout,
        highlight: element.highlight ? Color(element.highlight).hex() : undefined,
        superScript: element.type === ElementType.SUPERSCRIPT,
        subScript: element.type === ElementType.SUBSCRIPT,
        underline: element.underline ? {} : undefined
    });
}