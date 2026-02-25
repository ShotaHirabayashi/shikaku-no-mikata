export const SITE_NAME = "シカクのミカタ";
export const SITE_DESCRIPTION =
  "マイナー資格・通信講座の徹底比較メディア。合格のコツ、おすすめ講座、費用比較をわかりやすく解説。";
export const SITE_URL = "https://shikaku-no-mikata.com";

export const CATEGORIES = [
  {
    name: "資格比較",
    icon: "scale" as const,
    description: "複数の資格や通信講座を徹底比較",
    color: "primary",
  },
  {
    name: "ライフスタイル",
    icon: "heart" as const,
    description: "暮らしを豊かにする資格",
    color: "pink",
  },
  {
    name: "ビジネス",
    icon: "briefcase" as const,
    description: "キャリアアップに直結する資格",
    color: "amber",
  },
  {
    name: "IT・Web",
    icon: "code" as const,
    description: "デジタル時代のスキル認定",
    color: "emerald",
  },
  {
    name: "医療・健康",
    icon: "activity" as const,
    description: "健康・医療・福祉分野の資格",
    color: "rose",
  },
  {
    name: "クリエイティブ",
    icon: "palette" as const,
    description: "デザイン・色彩・ものづくり系",
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
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  2: {
    label: "初級",
    className: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  },
  3: {
    label: "中級",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  4: {
    label: "上級",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  5: {
    label: "難関",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};
