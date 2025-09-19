import { ElementType } from '@hufe921/canvas-editor';
import { titleConvert } from './elements/titleConvert';
import { breakConvert } from './elements/breakConvert';
import { Paragraph } from 'docx';
import { rowFlexToAlignmentType } from './utils/map';
import { parseText } from './utils/textAnalyze';
import { tableConvert } from './elements/tableConvert';
import { dateConvert } from './elements/dateConvert';
import { paragraphChildrenConvert } from './paragraphChildrenConvert';
import { listConvert } from '@/components/VueCanvasEditor/utils/docx/converter/elements/listConvert';

/**
 * 将元素列表进行段落分析，组装成 docx 段落对象列表
 * @param elementList
 */
export function paragraphAnalyzer(elementList) {
    // 需要返回的段落列表
    const paragraphList = [];
    // 当前解析的段落子内容列表
    let currentParagraphChildList = [];
    // 当前段落对齐方式
    let currentAlignment = null;

    // 如果当前段落对齐方式和上次不一样，说明是一个新的段落，需要先将上一个段落存储
    function alignmentChange(alignment) {
        if (currentAlignment !== alignment) {
            saveCurrentParagraph()
            currentParagraphChildList = [];
            currentAlignment = alignment;
        }
    }

    function saveCurrentParagraph() {
        currentParagraphChildList.length && paragraphList.push(new Paragraph({
            alignment: rowFlexToAlignmentType[currentAlignment] ?? 'left',
            children: currentParagraphChildList
        }));
    }

    // 循环解析
    for (const element of elementList) {
        if (element.type === ElementType.TITLE) { // 标题
            saveCurrentParagraph()
            paragraphList.push(titleConvert(element));
            currentParagraphChildList = [];
            currentAlignment = null;
        } else if (element.type === ElementType.LIST) { // 列表
            saveCurrentParagraph()
            paragraphList.push(...listConvert(element));
            currentParagraphChildList = [];
            currentAlignment = null;
        } else if (element.type === ElementType.TABLE) { // 表格
            saveCurrentParagraph()
            paragraphList.push(tableConvert(element))
            currentParagraphChildList = [];
            currentAlignment = null;
        } else if (element.type === ElementType.DATE) { // 日期
            const alignment = element.valueList?.[0]?.rowFlex ?? 'left';
            alignmentChange(alignment)
            const dateTextList = dateConvert(element);
            dateTextList.length && currentParagraphChildList.push(...dateTextList);
        } else if (element.type === ElementType.IMAGE) { // 图片
            const alignment = element.rowFlex ?? 'left';
            alignmentChange(alignment)
            currentParagraphChildList.push(paragraphChildrenConvert(element));
        }  else if (element.type === ElementType.HYPERLINK) { // 链接
            const alignment = element.valueList?.[0]?.rowFlex ?? 'left';
            alignmentChange(alignment)
            currentParagraphChildList.push(paragraphChildrenConvert(element));
        } else { // 普通文本
            const alignment = element.rowFlex ?? 'left';
            alignmentChange(alignment)
            const textList = parseText(element.value);
            // console.log('textList -->', textList);
            const childList = [];
            textList.forEach(text => {
                if (text === '\n') {
                    childList.push(breakConvert());
                } else if (text.length) {
                    childList.push(paragraphChildrenConvert({ ...element, value: text }));
                }
            });
            // console.log('childList -->', childList);
            childList.length && currentParagraphChildList.push(...childList);
        }
    }

    if (currentParagraphChildList.length) {
        // 将最后一个段落存储
        paragraphList.push(new Paragraph({
            alignment: rowFlexToAlignmentType[currentAlignment] ?? 'left',
            children: currentParagraphChildList
        }));
    }

    console.log('paragraphList -->', paragraphList);

    return paragraphList;
}