import { Document, HeadingLevel, Packer, PageBreak, Paragraph, ShadingType, Tab, TextRun } from 'docx';
import { saveAs } from '@/components/VueCanvasEditor/utils/docx/utils';

export function docxTestDemo() {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        alignment: 'center',
                        heading: 'Heading1',
                        text: '哈经典回顾'
                    }),
                    new Paragraph({
                        alignment: 'left',
                        children: [
                            new TextRun({ text: '第一行文本' }),
                            new TextRun({ break: 1 }),
                            new TextRun({
                                text: "shading",
                                highlight: "yellow",
                            })
                        ]
                    }),
                ]
            }
        ]
    });
    console.log([
        new TextRun({ text: '第一行文本' }),
        new TextRun({ break: 1 }),
        new TextRun({ text: '制表符后文本' }),
    ]);
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${ '111' }.docx`);
    });
}