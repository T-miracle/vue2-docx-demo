async function blobUrlToBase64(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);  // 完整 data URL，比如 "data:image/png;base64,xxxxx"
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export async function convertImgBlobsInHtml(htmlString) {
    // 创建一个 DOM parser 把 HTML 字符串转 DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const imgElements = doc.querySelectorAll('img');
    for (const img of imgElements) {
        const src = img.getAttribute('src');
        if (src && src.startsWith('blob:')) {
            try {
                const dataUrl = await blobUrlToBase64(src);
                img.setAttribute('src', dataUrl);
            } catch (err) {
                console.error('转换 blob to base64 出错', err);
            }
        }
    }

    // 把 DOM 转回字符串
    const serialized = doc.body.innerHTML;
    return serialized;
}
