// CSS を動的に挿入
const style = `
body {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
}

.copy-container {
    position: relative;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fce4ec;
    border-radius: 15px;
    border: 1px solid #f1a7c4;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: fit-content;
    max-width: 100%;
}

.copy-container:hover {
    background-color: #f8bbd0;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.copy-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
}

.copy-label {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-right: auto;
}

.copy-btn {
    background-color: #ff66b2;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.copy-btn:hover {
    background-color: #ff3385;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.copied {
    background-color: #28a745;
}

.copied:hover {
    background-color: #218838;
}

.code-block code {
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid #ddd;
}

.separator {
    border-top: 2px dotted #ff66b2;
    margin: 5px 20px;
}
`;

// CSS を <style> タグに挿入
const styleTag = document.createElement('style');
styleTag.textContent = style;
document.head.appendChild(styleTag);

// コピー用のコンテナを作成
function createCopyContainer(code) {
    const container = document.createElement('div');
    container.classList.add('copy-container');

    // ヘッダー（label + button）を追加
    const header = document.createElement('div');
    header.classList.add('copy-header');
    
    // テキストラベルを追加
    const label = document.createElement('span');
    label.classList.add('copy-label');
    label.textContent = 'liniuxchan-copy.v1';

    // ボタンを追加
    const button = document.createElement('div');
    button.classList.add('copy-btn');
    button.textContent = 'Copy';
    button.onclick = () => copyCode(button, code);

    // ヘッダーにラベルとボタンを追加
    header.appendChild(label);
    header.appendChild(button);

    // セパレータラインを追加
    const separator = document.createElement('div');
    separator.classList.add('separator');

    // コードブロックを追加
    const codeElement = document.createElement('div');
    codeElement.classList.add('code-block');

    // codeタグでコードを囲む
    const codeTag = document.createElement('code');
    codeTag.textContent = code;
    codeElement.appendChild(codeTag);

    // コンテナにヘッダー、セパレータ、コードを追加
    container.appendChild(header);
    container.appendChild(separator);
    container.appendChild(codeElement);

    document.body.appendChild(container);
}

// コピー機能
function copyCode(button, code) {
    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 3000);
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// コピー対象の要素を処理
const copyElements = document.querySelectorAll('copy');
copyElements.forEach(copyElement => {
    const code = copyElement.textContent;

    // コピーコンテナを生成
    createCopyContainer(code);

    // 元の <copy> 要素を削除
    copyElement.remove();
});
