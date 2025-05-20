document.addEventListener('DOMContentLoaded', () => {
  // フォーム要素を取得
  const form = document.getElementById('form');
  
  // フォーム送信イベントをリッスン
  form.addEventListener('submit', function(event) {
    // デフォルトの送信動作を防止
    event.preventDefault();
    
    // 入力フィールドの値を取得
    const inputAccount = document.getElementById('accountInput').value;
    const inputUrl = document.getElementById('urlInput').value;
    
    // 既存の結果エリアがあれば削除
    const existingResultArea = document.getElementById('resultArea');
    if (existingResultArea) {
      existingResultArea.remove();
    }

    // URLを生成
    const generatedUrl = `https://accounts.google.com/AccountChooser?continue=${inputUrl}/&Email=${inputAccount}`;
    
    const resultAreaWrapper = document.createElement('div');
    resultAreaWrapper.style.display = 'flex';
    resultAreaWrapper.style.width = '500px';
    resultAreaWrapper.style.margin = '0 auto';

    // 結果を表示するエリアを作成
    const resultArea = document.createElement('div');
    resultArea.id = 'resultArea';
    resultArea.style.width = '100%';
    
    // 結果ラベルを作成
    const resultLabel = document.createElement('div');
    resultLabel.textContent = '生成されたURL';
    resultLabel.style.fontWeight = 'bold';
    resultLabel.style.marginBottom = '10px';
    
    // URL表示用のコンテナ
    const urlContainer = document.createElement('div');
    urlContainer.style.display = 'flex';
    urlContainer.style.flexDirection = 'column';
    urlContainer.style.alignItems = 'center';
    
    // URLを表示するインプットフィールドを作成
    const urlDisplay = document.createElement('input');
    urlDisplay.type = 'text';
    urlDisplay.value = generatedUrl;
    urlDisplay.readOnly = true;
    urlDisplay.className = 'url-display';
    urlDisplay.style.flex = '1';
    urlDisplay.style.marginRight = '10px';
    
    // コピーボタンを作成
    const copyButton = document.createElement('button');
    copyButton.textContent = 'コピー';
    copyButton.style.minWidth = '80px';
    
    // コピーボタンのクリックイベント
    copyButton.addEventListener('click', () => {
      urlDisplay.select();
      navigator.clipboard.writeText(urlDisplay.value)
      
      // コピー成功メッセージ
      const message = document.createElement('div');
      message.textContent = 'URLをコピーしました！';
      message.style.color = 'green';
      message.style.marginTop = '5px';
      resultArea.appendChild(message);
      
      // 数秒後にメッセージを消す
      setTimeout(() => {
        message.remove();
      }, 2000);
    });
    
    // 要素を追加
    
    resultAreaWrapper.appendChild(resultArea);
    resultArea.appendChild(resultLabel);
    urlContainer.appendChild(urlDisplay);
    urlContainer.appendChild(copyButton);
    resultArea.appendChild(urlContainer);
    
    // フォームの後に結果エリアを追加
    form.after(resultAreaWrapper);
  });
});