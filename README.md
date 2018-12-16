# AutoSuggestFaqUI
QnA Makerを使ってオートサジェスト型テキストボックスでFAQに答えるUI

## 環境情報
- Angular 4 , TypeScript
- Visual Studio Code
- npm
- angular cli

## 使い方

①Visual Studio Code でフォルダ「AutoSuggestFaqUI」を開く

②./app/app.config.tsを修正する

~~~ts
// QnA Makerから取得する情報
export const QnAAuthKey = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX';
export const QnAEndpointURL = 'https://XXXX.azurewebsites.net/qnamaker/knowledgebases/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX/generateAnswer';
export const QnAGetCnt = '5';
~~~

③ターミナルで「npm install」してパッケージをセットアップ

④「ng s --open」で実行
