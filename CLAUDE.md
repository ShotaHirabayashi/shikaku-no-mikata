# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「シカクのミカタ」— マイナー資格・通信講座の徹底比較メディアサイト（`https://shikaku-no-mikata.com`）。
日本語コンテンツサイトのため、UI テキストやコメントは日本語で記述する。

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint 実行
```

## 技術スタック

- **Next.js 14** (App Router) + TypeScript (strict mode)
- **Tailwind CSS 3.4** (darkMode: "class") — カスタムカラー `primary-*`（ティール系）/ `accent-*`（アンバー系）
- **MDX** (next-mdx-remote/rsc) + gray-matter でコンテンツ管理
- フォント: Noto Sans JP (Google Fonts 経由)
- 出力: `standalone` モード
- 分析: Google Analytics 4 (G-FRHH5NDL94)

## アーキテクチャ

### コンテンツシステム（記事）
- 記事は `content/*.mdx` にフラットに配置
- `lib/mdx.ts` がファイルシステムから MDX を読み取り、`PostMeta` / `Post` 型を返す
- frontmatter フィールド: `title`, `description`, `date`, `category`, `tags[]`, `keyword`（資格名＋検索意図）, `thumbnail`, `difficulty`（1-5）, `costRange`, `studyPeriod`, `examInfo`, `passingRate`, `officialUrl`, `featured`
- `keyword` の先頭部分（スペース区切りの前半）が資格名として抽出され、同一資格記事の関連付けに使用される（`getSameQualificationPosts`）
- FAQ 抽出: `extractFaqFromContent()` が MDX 内の「よくある質問」「FAQ」H2 セクションから `**Q. 〜**` / `A. 〜` ペアを自動抽出し、FAQPage JSON-LD を生成

### コンテンツシステム（クイズ）
- `content/quiz/{qualification-slug}/` に配置
- `_index.mdx` が資格メタデータ（`qualification`, `qualificationName`, `group`, `totalQuestions`, `relatedArticleSlugs`）
- トピック別 `.mdx` ファイルに `<QuizAnswer>` コンポーネントで Q&A を記述
- `lib/quiz.ts` が `QualificationMeta` / `QuizTopicMeta` 型で管理
- `getQualificationsByGroup()` でカテゴリ別グルーピング

### ページ構成
- `/` — ヒーロー + カテゴリグリッド + 注目記事 + 最新記事一覧
- `/[slug]` — 記事詳細（パンくず、QualificationSummary、JSON-LD Article＋FAQPage、サイドバー TOC、関連記事、関連クイズバナー）
- `/category/[category]` — カテゴリ別記事一覧
- `/tag/[tag]` — タグ別記事一覧
- `/categories` — カテゴリ一覧（記事数カウント付き）
- `/quiz` — クイズ一覧（グループ別）
- `/quiz/[qualification]` — 資格別クイズ（トピックリスト＋問題数）
- `/quiz/[qualification]/[topic]` — トピック詳細（問題＋前後ナビゲーション）
- `/about`, `/contact`, `/privacy` — 静的ページ
- `sitemap.ts`, `robots.ts` — SEO

### コンポーネント構成
- `components/home/` — トップページ専用（HeroSection, CategoryGrid, FeaturedArticle, QuickFinder, LatestArticles, CtaSection）
- `components/sidebar/` — サイドバー（SidebarToc with IntersectionObserver, SidebarPopularPosts, SidebarCategories）
- `components/quiz/` — クイズ系（QuizAnswer[Client], QuizQualificationCard, QuizTopicList, QuizTopicNav, QuizTopicSummary, ImportanceStars, RelatedQuizBanner）
- `components/MdxContent.tsx` — RSC 対応 MDXRemote。remark-gfm / rehype-slug / rehype-autolink-headings プラグイン。カスタム要素として `QuizAnswer` を登録
- `components/Header.tsx` — Client Component。ダークモード（localStorage）＋検索モーダル（Cmd+K）

### JSON-LD 構造化データ
- トップページ: Organization
- 記事ページ: Article ＋ FAQPage（FAQ セクションがある場合に自動生成）
- クイズ一覧: CollectionPage
- クイズトピック: Quiz

### パスエイリアス
- `@/*` → プロジェクトルート（tsconfig.json で設定）

### サイト設定
- `lib/constants.ts` に SITE_NAME / SITE_DESCRIPTION / SITE_URL / CATEGORIES（6カテゴリ＋アイコン＋カラー）/ DIFFICULTY_LABELS（5段階）を集約

## 記事の追加方法

`content/` に `.mdx` ファイルを作成。frontmatter 例:

```yaml
---
title: "記事タイトル"
description: "記事の説明（150文字以内）"
date: "2026-03-17"
category: "ライフスタイル"
tags: ["整理収納アドバイザー", "独学", "通信講座"]
keyword: "整理収納アドバイザー 独学"
thumbnail: "/thumbnails/filename.png"
difficulty: 2
costRange: "49,000〜111,600円"
studyPeriod: "標準4ヶ月"
passingRate: "ほぼ100%（2級）"
officialUrl: "https://example.com"
featured: true
---
```

記事内に `## よくある質問（FAQ）` セクションを `**Q. 〜**` / `A. 〜` 形式で書くと、FAQPage JSON-LD が自動生成される。

## クイズの追加方法

`content/quiz/{qualification-slug}/` ディレクトリを作成し、`_index.mdx` と各トピックの `.mdx` ファイルを配置。トピック内では `<QuizAnswer>` コンポーネントで解答を折りたたみ表示する。
