import { Paragraph, Tab, TextRun } from 'docx';
import { tabConvert } from './tabConvert';
import { paragraphChildrenConvert } from '../paragraphChildrenConvert';
import { ElementType, ListType } from '@hufe921/canvas-editor';
import { rowFlexToAlignmentType } from '@/components/VueCanvasEditor/utils/docx/converter/utils/map';
import { imageConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/imageConvert';
import { linkConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/linkConvert';
import { latexConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/latexConvert';
import { pageBreakConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/pageBreakConvert';
import { checkboxConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/checkboxConvert';
import { textConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/textConvert';
import { breakConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/breakConvert';

/**
 * 列表转换
 * @param element
 */
export function listConvert(element) {
    // 列表类型
    const listType = element.listType;
    // 列表项
    const items = element.valueList || [];

    return listItemsAnalyzer(items, listType);
}

/**
 * 列表项解析
 * @param items
 * @param listType
 * @return {Paragraph[]}
 */
function listItemsAnalyzer(items, listType) {
    let list = [];
    let paragraphItems = [];
    let currentRowFlex = 'left';

    items.forEach((item, index) => {
        if (item.type === ElementType.IMAGE) {
            paragraphItems.push(imageConvert(item));
        } else if (item.type === ElementType.HYPERLINK) {
            paragraphItems.push(linkConvert(item));
        } else if (item.type === ElementType.TAB) {
            paragraphItems.push(tabConvert(item));
        } else if (item.type === ElementType.LATEX) {
            paragraphItems.push(latexConvert(item));
        } else if (item.type === ElementType.PAGE_BREAK) {
            paragraphItems.push(pageBreakConvert(item));
        } else if (item.type === ElementType.CHECKBOX) {
            paragraphItems.push(checkboxConvert(item));
        } else {
            const textArr = splitWithNewlines(item.value);
            const textRowFlex = item.rowFlex ?? 'left';
            const isListWrap = !!item.listWrap;
            textArr.forEach((text, idx) => {
                if (index === 0 && idx === 0 && text === '\n') {
                    // 省略掉第一个元素的第一个换行符
                } else if (text === '\n' && isListWrap) {
                    paragraphItems.push(new TextRun({
                        break: 1,
                        children: [
                            new Tab()
                        ]
                    }));
                } else if (text !== '\n') {
                    paragraphItems.push(textConvert({
                        ...item,
                        value: text
                    }));
                } else if (text === '\n') {
                    list.push({
                        rowFlex: currentRowFlex,
                        items: paragraphItems
                    });
                    paragraphItems = [];
                    currentRowFlex = textRowFlex;
                }
            });
        }
    });

    paragraphItems.length && list.push({
        rowFlex: currentRowFlex,
        items: paragraphItems
    });

    return list.map(item => {
        return new Paragraph({
            alignment: rowFlexToAlignmentType[item.rowFlex] ?? 'left',
            children: item.items,
            numbering: {
                reference: listType === ListType.OL ? 'numbering-1' : 'bullet-points-1',
                level: 0
            }
        });
    });
}

function splitWithNewlines(str) {
    return str.split(/(\n)/).filter(s => s !== '');
}