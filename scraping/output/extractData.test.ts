import { describe, it, expect } from 'vitest';
import { wrestlerData } from './extractData';
import { Promotion, Prowrestler } from '../input/types';

describe('プロレスラーデータのテスト', () => {
  it('データが空ではないこと', () => {
    expect(wrestlerData.length).toBeGreaterThan(0);
  });

  it('すべてのレスラーが正しい型を持っていること', () => {
    wrestlerData.forEach((wrestler) => {
      // 名前が文字列であること
      expect(typeof wrestler.name).toBe('string');
      expect(wrestler.name.length).toBeGreaterThan(0);

      // 生年月日がDateオブジェクトであること
      expect(wrestler.dateOfBirth).toBeInstanceOf(Date);

      // 所属団体が有効な値であること
      const validPromotions: Promotion[] = [
        "全日本", "新日本", "ノア", "ドラゴンゲート", "DDT", "W-1", "ZERO1",
        "大日本", "みちのく", "IGF", "STYLE-E", "K-DOJO", "666", "FREEDOMS",
        "ユニオン", "パンクラスmission", "ドラディション", "ダイヤモンド", "闘龍門", "リアルジャパン",
        "WWE", "TNA", "ROH", "CHIKARA", "AAA",
        "フリー", "半引退", "引退", "故人", "？"
      ];
      expect(validPromotions).toContain(wrestler.mainPromotion);

      // 日本人かどうかがブール値であること
      expect(typeof wrestler.isJapanese).toBe('boolean');
    });
  });

  it('日本人と外国人の両方が含まれていること', () => {
    const hasJapanese = wrestlerData.some(wrestler => wrestler.isJapanese);
    const hasForeigner = wrestlerData.some(wrestler => !wrestler.isJapanese);

    expect(hasJapanese).toBe(true);
    expect(hasForeigner).toBe(true);
  });

  it('すべての所属団体が有効であること', () => {
    const promotions = new Set(wrestlerData.map(wrestler => wrestler.mainPromotion));

    // すべての所属団体をログに出力
    console.log('検出された所属団体:', Array.from(promotions));

    // 所属団体が型定義に含まれているかチェック
    const validPromotions: Promotion[] = [
      "全日本", "新日本", "ノア", "ドラゴンゲート", "DDT", "W-1", "ZERO1",
      "大日本", "みちのく", "IGF", "STYLE-E", "K-DOJO", "666", "FREEDOMS",
      "ユニオン", "パンクラスmission", "ドラディション", "ダイヤモンド", "闘龍門", "リアルジャパン",
      "WWE", "TNA", "ROH", "CHIKARA", "AAA",
      "フリー", "半引退", "引退", "故人", "？"
    ];

    promotions.forEach(promotion => {
      expect(validPromotions).toContain(promotion);
    });
  });
});
