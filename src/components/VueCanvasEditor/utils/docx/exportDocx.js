import {
    Document,
    Packer,
    AlignmentType,
    LevelFormat,
} from 'docx';
import { convertPxToSize, saveAs } from './utils';
import { toDocx } from './converter';
import xmlJs from 'xml-js';

export default function (command) {
    return async function (options) {
        const { fileName } = options;
        const { data: { header, main, footer } } = command.getValue();
        // console.log('command.getValue()', command.getValue());
        // console.log('----------HTML----------');
        console.log(htmlToXmlJson(command.getHTML().main));
        console.log('----------主界面内容----------');
        console.log(main);
        console.log('------------------------\n\n');
        const [top, right, bottom, left] = command.getOptions().margins;
        const doc = new Document({
            sections: [
                {
                    /* headers: {
                        default: new Header({
                            children: toDocx(header || [], command.getOptions())
                        })
                    },
                    footers: {
                        default: new Footer({
                            children: toDocx(footer || [], command.getOptions())
                        })
                    }, */
                    children: toDocx(main || [], command.getOptions()),
                    properties: {
                        page: {
                            margin: {
                                top: convertPxToSize(top),
                                right: convertPxToSize(right),
                                bottom: convertPxToSize(bottom),
                                left: convertPxToSize(left)
                            }
                        }
                    }
                }
            ],
            numbering: {
                config: [
                    {
                        reference: 'bullet-points-1',
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.BULLET,
                                alignment: AlignmentType.LEFT
                            }
                        ]
                    },
                    {
                        reference: 'numbering-1',
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: '%1.',
                                alignment: AlignmentType.START
                            }
                        ]
                    }
                ]
            }
        });
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${ fileName }.docx`);
        });
    };
}

function htmlToXmlJson(html) {
    // 包裹根节点
    let fixed = `<root>${html}</root>`;

    console.log("原始 HTML:", fixed.toString());

    // 转换常见 HTML 空标签为自闭合（这里只处理一些常见的，必要时可补充）
    fixed = htmlToStrictXml(fixed)

    console.log("转换后的 XML:", fixed.toString());

    // 使用 xml-js 转换
    try {
        return xmlJs.xml2js(fixed, { compact: false, spaces: 2 });
    } catch (err) {
        console.error("解析失败:", err.message);
        return null;
    }
}

function htmlToStrictXml(html) {
    // 使用 DOMParser 解析 HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 递归处理节点，将所有标签改为显式闭合
    function nodeToXml(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.nodeValue
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return '';

        const tagName = node.tagName.toLowerCase();
        const attrs = Array.from(node.attributes)
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ');

        const openTag = attrs ? `<${tagName} ${attrs}>` : `<${tagName}>`;

        // 递归处理子节点
        const childrenXml = Array.from(node.childNodes).map(nodeToXml).join('');

        // 如果没有子节点，也强制闭合
        return `${openTag}${childrenXml}</${tagName}>`;
    }

    // 处理 body 内的内容
    return Array.from(doc.body.childNodes).map(nodeToXml).join('');
}