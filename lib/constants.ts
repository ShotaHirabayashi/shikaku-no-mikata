export const SITE_NAME = "シカクのミカタ";
export const SITE_DESCRIPTION =
  "マイナー資格・通信講座の徹底比較メディア。合格のコツ、おすすめ講座、費用比較をわかりやすく解説。";
export const SITE_URL = "https://shikaku-no-mikata.com";

export const CATEGORIES = [
  {
    name: "資格比較",
    icon: "scale" as const,
    description: "複数の資格や通信講座を徹底比較。あなたに最適な選択を見つけましょう。",
    color: "primary",
  },
  {
    name: "ライフスタイル",
    icon: "heart" as const,
    description: "暮らしを豊かにする資格。整理収納、食育、ペット関連など。",
    color: "pink",
  },
  {
    name: "ビジネス",
    icon: "briefcase" as const,
    description: "キャリアアップに直結するビジネス系資格。FP、簿記、秘書検定など。",
    color: "amber",
  },
  {
    name: "IT・Web",
    icon: "code" as const,
    description: "デジタル時代に求められるIT・Web系の資格やスキル認定。",
    color: "emerald",
  },
  {
    name: "医療・健康",
    icon: "activity" as const,
    description: "健康・医療・福祉分野の資格。薬膳、アロマ、メンタルヘルスなど。",
    color: "rose",
  },
  {
    name: "クリエイティブ",
    icon: "palette" as const,
    description: "デザイン・色彩・ハンドメイドなどクリエイティブ系の資格。",
    color: "violet",
  },
] as const;

export type CategoryInfo = (typeof CATEGORIES)[number];

export const DIFFICULTY_LABELS: Record<
  1 | 2 | 3 | 4 | 5,
  { label: string; className: string }
> = {
  1: {
    label: "入門",
    className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  2: {
    label: "初級",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  3: {
    label: "中級",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  4: {
    label: "上級",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  },
  5: {
    label: "難関",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};
