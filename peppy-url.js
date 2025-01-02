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
    background-color: #fff3e6;
    border-radius: 15px;
    border: 1px solid #ffb84d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: fit-content;
    max-width: 100%;
}

.copy-container:hover {
    background-color: #ffecb3;
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
    color: #ff6600;
    font-weight: bold;
    margin-right: auto;
}

.copy-btn {
    background-color: #ff6600;
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
    background-color: #e65c00;
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

.error-message {
    color: #800080; /* 紫色 */
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    background-color: #f2e6ff; /* 紫基調 */
    border: 1px solid #d1a3ff; /* 紫色の薄いボーダー */
    border-radius: 10px;
    text-align: center;
}

.separator {
    border-top: 2px dotted #ff6600;
    margin: 5px 20px;
}
`;

// CSS を <style> タグに挿入
const styleTag = document.createElement('style');
styleTag.textContent = style;
document.head.appendChild(styleTag);

// コピー用のコンテナを作成
function createCopyContainer(content, label = 'liniuxchan-url.v1', isError = false) {
    const container = document.createElement('div');
    container.classList.add('copy-container');

    // ヘッダー（label + button）を追加
    const header = document.createElement('div');
    header.classList.add('copy-header');
    
    // テキストラベルを追加
    const labelElement = document.createElement('span');
    labelElement.classList.add('copy-label');
    labelElement.textContent = label;

    // ボタンを追加
    const button = document.createElement('div');
    button.classList.add('copy-btn');
    button.textContent = isError ? 'Error' : 'Copy';
    button.onclick = () => {
        if (!isError) {
            copyCode(button, content);
        }
    };

    // ヘッダーにラベルとボタンを追加
    header.appendChild(labelElement);
    header.appendChild(button);

    // セパレータラインを追加
    const separator = document.createElement('div');
    separator.classList.add('separator');

    // コードブロックまたはエラーメッセージを追加
    const contentElement = document.createElement('div');
    if (isError) {
        contentElement.classList.add('error-message');
        contentElement.textContent = content; // エラーメッセージ
    } else {
        contentElement.classList.add('code-block');
        const codeTag = document.createElement('code');
        codeTag.textContent = content;
        contentElement.appendChild(codeTag);
    }

    // コンテナにヘッダー、セパレータ、コンテンツを追加
    container.appendChild(header);
    container.appendChild(separator);
    container.appendChild(contentElement);

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

// URLからデータを取得して処理
async function loadContentFromUrl(url, label) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${response.status}`);
        }
        const code = await response.text();

        // コピーコンテナを生成
        createCopyContainer(code, label);
    } catch (error) {
        console.error('Error loading content:', error);
        createCopyContainer('URLを読み込めませんでした: ' + url, label, true);
    }
}

// <load> 要素を探して処理
document.querySelectorAll('load').forEach(loadElement => {
    const url = loadElement.getAttribute('url');
    const label = 'liniuxchan-url.v1'; // 固定ラベル

    if (url) {
        loadContentFromUrl(url, label);
    } else {
        console.error('<load> 要素に url 属性がありません');
        createCopyContainer('URLが指定されていません', label, true);
    }

    // 元の <load> 要素を削除
    loadElement.remove();
});
