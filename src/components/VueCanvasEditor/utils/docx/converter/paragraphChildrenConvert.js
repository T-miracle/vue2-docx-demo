import { ElementType } from '@hufe921/canvas-editor';
import { imageConvert } from './elements/imageConvert';
import { linkConvert } from './elements/linkConvert';
import { tabConvert } from './elements/tabConvert';
import { latexConvert } from './elements/latexConvert';
import { pageBreakConvert } from './elements/pageBreakConvert';
import { checkboxConvert } from './elements/checkboxConvert';
import { textConvert } from './elements/textConvert';

/**
 * 转换成 docx 段落子元素对象
 * @param element
 */
export function paragraphChildrenConvert(element) {
    if (element.type === ElementType.IMAGE) {
        return imageConvert(element);
    } else if (element.type === ElementType.HYPERLINK) {
        return linkConvert(element);
    } else if (element.type === ElementType.TAB) {
        return tabConvert(element);
    } else if (element.type === ElementType.LATEX) {
        return latexConvert(element);
    } else if (element.type === ElementType.PAGE_BREAK) {
        return pageBreakConvert(element);
    } else if (element.type === ElementType.CHECKBOX) {
        return checkboxConvert(element);
    } else {
        return textConvert(element);
    }
}