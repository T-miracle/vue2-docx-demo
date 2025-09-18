import { ExternalHyperlink, TextRun } from 'docx';

/**
 * 转换成 docx 超链接
 * @param element
 * @returns {ExternalHyperlink}
 */
export function linkConvert(element) {
    return new ExternalHyperlink({
        children: [
            new TextRun({
                text: element.valueList?.map(child => child.value).join(''),
                style: 'Hyperlink'
            })
        ],
        link: element.url
    });
}