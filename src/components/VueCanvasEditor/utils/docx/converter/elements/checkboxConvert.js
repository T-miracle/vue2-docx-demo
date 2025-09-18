import { CheckBox } from 'docx';

/**
 * 转换为 docx 复选框
 * @param element
 * @returns {CheckBox}
 */
export function checkboxConvert(element) {
    return new CheckBox({
        checked: true
    });
}