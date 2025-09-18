import { paragraphChildrenConvert } from '../paragraphChildrenConvert';

/**
 * 转换成 docx 日期
 * @param element
 */
export function dateConvert(element) {
    return element.valueList?.map(child => paragraphChildrenConvert(child)) || []
}