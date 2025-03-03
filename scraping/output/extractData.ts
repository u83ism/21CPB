import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import { Promotion, Prowrestler } from '../input/types';

// HTMLファイルを読み込む
const htmlPath = path.join(__dirname, 'business', 'age.htm');
const html = fs.readFileSync(htmlPath, 'utf-8');

// JSDOMでHTMLを解析
const dom = new JSDOM(html);
const document = dom.window.document;

// プロレスラーのデータを格納する配列
const wrestlers: Prowrestler[] = [];

// テーブルの行を取得
const rows = document.querySelectorAll('.ageTable tr');

// 各行を処理
for (let i = 1; i < rows.length; i++) { // ヘッダー行をスキップ
  const row = rows[i];
  const cells = row.querySelectorAll('td');

  if (cells.length >= 2) {
    // age.jsの処理ロジックから年齢と生年を計算
    // 1行目は30歳、2行目は31歳、...と増えていく
    const age = 30 + (i - 1);
    const birthYear = 2025 - age; // 2025年から年齢を引く

    // 国内のレスラー（日本人）
    processCell(cells[0], true, birthYear);

    // 海外のレスラー（外国人）
    processCell(cells[1], false, birthYear);
  }
}

// セルからレスラーのデータを抽出する関数
function processCell(cell: Element, isJapanese: boolean, birthYear: number) {
  if (!cell.textContent?.trim()) return;

  // 複数のレスラーがいる場合は改行で区切られている
  const wrestlerTexts = cell.innerHTML.split('<br>');

  for (const wrestlerText of wrestlerTexts) {
    if (!wrestlerText.trim()) continue;

    // 正規表現でデータを抽出
    // 誕生日（MM/DD）と残りのテキスト（名前と所属団体を含む）を抽出
    const dateRegex = /(\d{2})\/(\d{2})　(.+)/;
    const dateMatch = wrestlerText.trim().match(dateRegex);

    if (dateMatch) {
      const [, month, day, fullText] = dateMatch;

      // 名前と所属団体の処理
      let name = '';
      let mainPromotion = '' as Promotion;

      // 最後のカッコを所属団体として抽出
      const promotionRegex = /（([^（）]+)）$/;
      const promotionMatch = fullText.match(promotionRegex);

      if (promotionMatch) {
        mainPromotion = promotionMatch[1] as Promotion;

        // 所属団体を除いた部分から名前を抽出
        const nameText = fullText.substring(0, fullText.lastIndexOf('（')).trim();

        // 名前に別名義がある場合（カッコがある場合）は、カッコを除いた部分を名前とする
        if (nameText.includes('（') && nameText.includes('）')) {
          name = nameText.substring(0, nameText.indexOf('（')).trim();
        } else {
          name = nameText;
        }
      } else {
        // 所属団体が見つからない場合（通常はここに来ないはず）
        name = fullText;
        mainPromotion = 'フリー' as Promotion; // デフォルト値
      }

      // 生年月日の作成（年はage.jsから計算した生年を使用）
      const dateOfBirth = new Date(birthYear, parseInt(month) - 1, parseInt(day));

      // レスラーのデータを追加
      wrestlers.push({
        name,
        dateOfBirth,
        mainPromotion,
        isJapanese
      });
    }
  }
}

// データをエクスポート
export const wrestlerData = wrestlers;

// データをファイルに保存
if (require.main === module) {
  const outputPath = path.join(__dirname, 'data.ts');
  const output = `import { Prowrestler } from './types';\n\nexport const wrestlerData: Prowrestler[] = ${JSON.stringify(wrestlers, null, 2)};\n`;
  fs.writeFileSync(outputPath, output);
  console.log(`データを ${outputPath} に保存しました。`);
}
