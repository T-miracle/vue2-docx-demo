import { MathRun } from 'docx';

/**
 * 转换为 docx 的 latex 公式
 * @param element
 */
export function latexConvert(element) {
    return new MathRun(element.value);
}