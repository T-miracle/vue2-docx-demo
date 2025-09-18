import { ImageRun } from 'docx';

/**
 * 转换为 docx 图片
 * @param element
 * @returns {ImageRun}
 */
export function imageConvert(element) {
    return new ImageRun({
        data: element.value,
        transformation: {
            width: element.width,
            height: element.height
        }
    });
}