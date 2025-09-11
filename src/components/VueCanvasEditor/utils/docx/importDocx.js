import mammoth from 'mammoth'

export default function (command) {
    return async function (options) {
        const { arrayBuffer } = options
        const result = await mammoth.convertToHtml({
            arrayBuffer
        })

        let html = result.value

        console.log('html', html);

        // 创建 DOM 片段解析图片
        const container = document.createElement('div')
        container.innerHTML = html

        const imgNodes = container.querySelectorAll('img')

        await Promise.all(
            Array.from(imgNodes).map(img => {
                return new Promise(resolve => {
                    const tmp = new Image()
                    tmp.onload = () => {
                        console.log('img loaded', img.src, tmp.width, tmp.height);
                        img.width = tmp.width
                        img.height = tmp.height
                        resolve()
                    }
                    tmp.onerror = () => resolve()
                    tmp.src = img.src
                })
            })
        )

        command.executeSetHTML({
            main: container.innerHTML
        })
    }
}