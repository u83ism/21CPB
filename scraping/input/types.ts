export type Promotion = "全日本" | "新日本" | "ノア" | "ドラゴンゲート" | "DDT" | "W-1" | "ZERO1" | "大日本" | "みちのく" | "IGF" | "STYLE-E" | "K-DOJO" | "666" | "FREEDOMS" | "ユニオン" | "パンクラスmission" | "ドラディション" | "ダイヤモンド" | "闘龍門" | "リアルジャパン" |
  "WWE" | "TNA" | "ROH" | "CHIKARA" | "AAA" |
  "フリー" | "半引退" | "引退" | "故人" | "？"

export type Prowrestler = {
  name: string,
  dateOfBirth: Date,
  mainPromotion: Promotion,
  isJapanese: boolean
  // 現在の年齢や平成等の和暦は生年月日から逆算するので不要
}
