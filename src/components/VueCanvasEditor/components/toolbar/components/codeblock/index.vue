<template>
    <div class="menu-item__codeblock" title="代码块" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog/index';
    import prism from 'prismjs';
    import { formatPrismToken } from '../../../../utils/prism'
    import { splitText } from '@hufe921/canvas-editor';

    export default {
        name: 'Codeblock',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                new Dialog({
                    title: '代码块',
                    data: [
                        {
                            type: 'textarea',
                            name: 'codeblock',
                            placeholder: '请输入代码',
                            width: 500,
                            height: 300
                        }
                    ],
                    onConfirm: payload => {
                        const codeblock = payload.find(p => p.name === 'codeblock')?.value
                        if (!codeblock) return
                        const tokenList = prism.tokenize(codeblock, prism.languages.javascript)
                        const formatTokenList = formatPrismToken(tokenList)
                        const elementList = []
                        for (let i = 0; i < formatTokenList.length; i++) {
                            const formatToken = formatTokenList[i]
                            const tokenStringList = splitText(formatToken.content)
                            for (let j = 0; j < tokenStringList.length; j++) {
                                const value = tokenStringList[j]
                                const element = {
                                    value
                                }
                                if (formatToken.color) {
                                    element.color = formatToken.color
                                }
                                if (formatToken.bold) {
                                    element.bold = true
                                }
                                if (formatToken.italic) {
                                    element.italic = true
                                }
                                elementList.push(element)
                            }
                        }
                        elementList.unshift({
                            value: '\n'
                        })
                        this.editorInstance().command.executeInsertElementList(elementList)
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
