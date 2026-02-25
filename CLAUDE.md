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
- **Tailwind CSS** (darkMode: "class") — カスタムカラー `primary-*` がブルー系で定義済み
- **MDX** (next-mdx-remote/rsc) + gray-matter でコンテンツ管理
- フォント: Noto Sans JP (Google Fonts 経由)
- 出力: `standalone` モード

## アーキテクチャ

### コンテンツシステム
- 記事は `content/*.mdx` にフラットに配置。frontmatter で title/description/date/category/tags/thumbnail を管理
- `lib/mdx.ts` がファイルシステムから MDX を読み取り、`PostMeta` / `Post` 型を返す
- 記事ページは `app/[slug]/page.tsx` で動的ルーティング。`generateStaticParams` で SSG
- MDX レンダリングは `components/MdxContent.tsx` で RSC 対応の `MDXRemote` を使用。remark-gfm / rehype-slug / rehype-autolink-headings プラグイン付き

### ページ構成
- `/` — ヒーロー + 最新記事一覧（ArticleCard グリッド）
- `/[slug]` — 記事詳細（パンくず、JSON-LD 構造化データ、OGP メタデータ）
- SEO: sitemap.ts, robots.ts, 各ページの OGP/Twitter Card メタデータ

### ダークモード
- `Header.tsx` (Client Component) で localStorage ベースのテーマ切り替えを実装
- `<html>` に `dark` クラスを付与する方式

### パスエイリアス
- `@/*` → プロジェクトルート（tsconfig.json で設定）

### サイト設定
- `lib/constants.ts` に SITE_NAME / SITE_DESCRIPTION / SITE_URL を集約

## 記事の追加方法

`content/` に `.mdx` ファイルを作成。frontmatter 例:

```yaml
---
title: "記事タイトル"
description: "記事の説明"
date: "2025-01-15"
category: "カテゴリ名"
tags: ["タグ1", "タグ2"]
thumbnail: "/images/thumbnail.png"  # 省略可
---
```
