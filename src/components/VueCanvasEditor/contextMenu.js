import { EditorZone, ElementType } from '@hufe921/canvas-editor';
import { Dialog } from './components/dialog';
import { Signature } from './components/signature';

export const contextMenu = {
    // 批注
    'annotations': annotations(),
    // 签名
    'signature': signature(),
    // 格式整理
    'wordTool': wordTool()
};

function annotations() {
    return {
        name: '批注',
        when: payload => {
            return (
                !payload.isReadonly &&
                payload.editorHasSelection &&
                payload.zone === EditorZone.MAIN
            );
        },
        callback: command => {
            new Dialog({
                title: '批注',
                data: [
                    {
                        type: 'textarea',
                        label: '批注',
                        height: 100,
                        name: 'value',
                        required: true,
                        placeholder: '请输入批注'
                    }
                ],
                onConfirm: payload => {
                    const value = payload.find(p => p.name === 'value')?.value;
                    if (!value) {
                        return;
                    }
                    const groupId = command.executeSetGroup();
                    if (!groupId) {
                        return;
                    }
                    /* commentList.push({
                        id: groupId,
                        content: value,
                        userName: 'Hufe',
                        rangeText: command.getRangeText(),
                        createdDate: new Date().toLocaleString()
                    }) */
                }
            });
        }
    };
};

function signature() {
    return {
        name: '签名',
        icon: 'signature',
        when: payload => {
            return !payload.isReadonly && payload.editorTextFocus;
        },
        callback: command => {
            new Signature({
                onConfirm(payload) {
                    if (!payload) {
                        return;
                    }
                    const { value, width, height } = payload;
                    if (!value || !width || !height) {
                        return;
                    }
                    command.executeInsertElementList([
                        {
                            value,
                            width,
                            height,
                            type: ElementType.IMAGE
                        }
                    ])
                }
            })
        }
    }
}

function wordTool() {
    return {
        name: '格式整理',
        icon: 'word-tool',
        when: payload => {
            return !payload.isReadonly
        },
        callback: command => {
            command.executeWordTool()
        }
    }
}