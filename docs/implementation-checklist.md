# Astro site implementation checklist

Status of the first version of the content site, built on branch `feat/astro-site`.

## Agreed design

Decisions reached in the design review before building. The ADR records the lasting ones.

| Area | Decision |
| --- | --- |
| Scope | Version one has a home page, Daily and Weekly lists, one page per Note, a Topics page, and automatic deploy. Search, RSS, a sitemap, a language toggle, React islands, a sidebar, and scheduled automation wait for later. |
| Project layout | The Astro project lives at the repo root. `notes/` stays in place and loads through the `glob()` loader, so Notes stay readable on GitHub. |
| Home page | The hand-written `index.html` is replaced by an Astro page that keeps its bilingual intro. It shows the latest Daily and Weekly note and a list of Topics. |
| Page shell | One shared layout with a header (site title, Daily, Weekly, Topics) and a footer. No sidebar, because two header links reach every section. |
| Bilingual display | Each Note shows the English half first, then Traditional Chinese, with "Jump to 繁體中文" and "Jump to English" links. There is no toggle. |
| Note identity | Type comes from the folder, the date or week from the filename, and the title from the first `#` heading. No front matter. `notes/templates/` is excluded. Bad filenames fail the build. |
| Summary excerpt | List pages show the first paragraph under `## Summary` (Daily) or `## Week in review` (Weekly) in the English half. Authors keep that paragraph first, as `AGENTS.md` requires. |
| Note links | Relative `.md` links between Notes are rewritten to site URLs. A missing target fails the build. |
| Topics | A Topic is a GitHub repository, listed in `research/topics.yaml` with a bilingual reason, tags, and an optional changelog path. They render at `/research/topics/`. Version one starts with `stablyai/orca`, `mattpocock/skills`, `anthropics/claude-code`, and `openai/codex`. |
| Signals | A Signal comes only from a Topic's releases and changelog. Tags are cited exactly as GitHub shows them, with no tag parsing. Stars are not Signals. |
| Authoring | Notes are written by hand or with an agent. No scheduled automation in version one. |
| Source registry | Dropped for version one, because every Source is a Topic's Releases page or changelog. Add it back with the first non-repository Source. |
| Styling | Plain CSS, reusing the earlier `index.html` styles. No Tailwind or UI library. |
| Tooling | `pnpm` is the package manager. Deploy with GitHub Actions and Pages. |

## Completed

| # | Step | Result | Main files |
| --- | --- | --- | --- |
| 1 | Scaffold Astro | Astro 7 at the repo root with `pnpm`, base path `/agentic-coding-trending`, shared layout and home page. The hand-written `index.html` is replaced. | `astro.config.mjs`, `package.json`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro` |
| 2 | Notes collection and pages | Daily and Weekly notes load from `notes/` with type and date taken from the path. Note pages have jump links and previous/next links. List pages show a Summary excerpt. | `src/content.config.ts`, `src/lib/notes.ts`, `src/pages/notes/[type]/` |
| 3 | Note links | A remark plugin rewrites relative `.md` links to site URLs and fails the build on a missing target. Three `node:test` cases cover it. | `src/plugins/remark-note-links.mjs`, `src/plugins/remark-note-links.test.mjs` |
| 4 | Topics watchlist | Four repositories are tracked, validated by a `topics` collection, and rendered at `/research/topics/` and on the home page. | `research/topics.yaml`, `src/lib/topics.ts`, `src/pages/research/topics.astro` |
| 5 | Deploy workflow | GitHub Actions builds on push to `main` and publishes with `actions/deploy-pages`. `pnpm` is pinned through `packageManager`. | `.github/workflows/deploy.yml` |

## Supporting changes

- `GLOSSARY.md` defines Note, Daily note, Weekly note, Topic, Signal, Confidence, Source, Coverage gap, and Note link.
- `docs/adr/0001-astro-site-and-v1-scope.md` records the Astro choice, the notes-in-place layout, Topics as repositories, and the dropped source registry.
- `AGENTS.md` adds the `pnpm` rule, the Summary-first rule, and the Agent skills block. The two note templates mention the Summary excerpt.
- `.gitignore` ignores `node_modules/`, `.astro/`, and local skill files. It re-includes `src/lib/`, which the Python `lib/` rule ignored.
- `docs/agents/` holds the issue tracker, triage label, and domain doc settings.

## Verified

- `pnpm build` produces 6 pages.
- `pnpm test` passes 3 tests.
- `pnpm install --frozen-lockfile` passes.
- A broken Note link fails the build with `does not point to an existing published note`.
- `pnpm dev` was checked by the repository owner for step 1.

## Still open

| Item | Owner | Note |
| --- | --- | --- |
| Set Settings → Pages → Source to "GitHub Actions" | Repository owner | Pages is still on the legacy `main` branch source. |
| Merge `feat/astro-site` into `main` | Repository owner | The workflow runs only on push to `main`, so it is untested. |
| Edit the Topic reasons in `research/topics.yaml` | Repository owner | The reasons are drafts written from repository descriptions. |
| Check pages in a browser for steps 2 to 4 | Repository owner | Sticky jump bar and mobile layout are not yet checked. |

## Deferred past version one

Search, RSS, a sitemap, a language toggle, scheduled automation, a sidebar, and a source registry.

---

# Astro 網站實作清單（繁體中文）

內容網站第一版的進度，位於分支 `feat/astro-site`。

## 已達成共識的設計

建置前，在設計審查中達成的決定。長期有效的決定已記錄於 ADR。

| 面向 | 決定 |
| --- | --- |
| 範圍 | 第一版包含首頁、每日與每週列表、每篇筆記一頁、主題頁，以及自動部署。搜尋、RSS、網站地圖、語言切換、React islands、側邊欄與排程自動化留待之後。 |
| 專案配置 | Astro 專案位於儲存庫根目錄。`notes/` 留在原處，透過 `glob()` 載入器載入，因此筆記仍可在 GitHub 上直接閱讀。 |
| 首頁 | 手寫的 `index.html` 改由 Astro 頁面取代，並保留雙語簡介。首頁顯示最新的每日與每週筆記，以及主題清單。 |
| 頁面外殼 | 共用一個版面，含頁首（網站標題、每日、每週、主題）與頁尾。不做側邊欄，因為兩個頁首連結已可到達所有區塊。 |
| 雙語顯示 | 每篇筆記先顯示英文，再顯示繁體中文，並提供「Jump to 繁體中文」與「Jump to English」連結。不做切換開關。 |
| 筆記識別 | 類型取自資料夾，日期或週次取自檔名，標題取自第一個 `#` 標題。不使用 front matter。`notes/templates/` 不納入。檔名不合規則時建置失敗。 |
| 摘要摘錄 | 列表頁顯示英文區段中 `## Summary`（每日）或 `## Week in review`（每週）下的第一個段落。作者須依 `AGENTS.md` 的要求，將該段落放在最前面。 |
| 筆記連結 | 筆記之間的相對 `.md` 連結會改寫為網站網址。目標不存在時建置失敗。 |
| 主題 | 主題是一個 GitHub 儲存庫，列於 `research/topics.yaml`，含雙語說明、標籤與選填的變更紀錄路徑，顯示於 `/research/topics/`。第一版從 `stablyai/orca`、`mattpocock/skills`、`anthropics/claude-code` 與 `openai/codex` 開始。 |
| 訊號 | 訊號只來自主題的版本發布與變更紀錄。標籤依 GitHub 顯示的內容原樣引用，不解析標籤。星數不算訊號。 |
| 撰寫方式 | 筆記由人工或在代理協助下撰寫。第一版不做排程自動化。 |
| 來源登錄表 | 第一版捨棄，因為每個來源都是主題的版本發布頁或變更紀錄。遇到第一個非儲存庫的來源時再加回。 |
| 樣式 | 純 CSS，沿用先前 `index.html` 的樣式。不使用 Tailwind 或 UI 套件。 |
| 工具 | 使用 `pnpm` 作為套件管理工具。以 GitHub Actions 與 Pages 部署。 |

## 已完成

| # | 步驟 | 結果 | 主要檔案 |
| --- | --- | --- | --- |
| 1 | 建立 Astro 專案 | 在儲存庫根目錄建立 Astro 7，使用 `pnpm`，基底路徑為 `/agentic-coding-trending`，並加入共用版面與首頁。手寫的 `index.html` 已被取代。 | `astro.config.mjs`、`package.json`、`src/layouts/BaseLayout.astro`、`src/pages/index.astro` |
| 2 | 筆記集合與頁面 | 每日與每週筆記由 `notes/` 載入，類型與日期取自路徑。筆記頁含跳轉連結與上一篇／下一篇連結，列表頁顯示摘要摘錄。 | `src/content.config.ts`、`src/lib/notes.ts`、`src/pages/notes/[type]/` |
| 3 | 筆記連結 | remark 外掛將相對 `.md` 連結改寫為網站網址，目標不存在時建置失敗。三個 `node:test` 測試涵蓋此功能。 | `src/plugins/remark-note-links.mjs`、`src/plugins/remark-note-links.test.mjs` |
| 4 | 追蹤主題清單 | 追蹤四個儲存庫，由 `topics` 集合驗證，並顯示於 `/research/topics/` 與首頁。 | `research/topics.yaml`、`src/lib/topics.ts`、`src/pages/research/topics.astro` |
| 5 | 部署工作流程 | GitHub Actions 在推送至 `main` 時建置，並以 `actions/deploy-pages` 發布。透過 `packageManager` 固定 `pnpm` 版本。 | `.github/workflows/deploy.yml` |

## 配套變更

- `GLOSSARY.md` 定義了筆記、每日筆記、每週筆記、主題、訊號、信心程度、來源、涵蓋缺口與筆記連結。
- `docs/adr/0001-astro-site-and-v1-scope.md` 記錄選用 Astro、筆記留在原處、以儲存庫作為主題，以及捨棄來源登錄表的決策。
- `AGENTS.md` 新增 `pnpm` 規則、摘要置前規則與 Agent skills 區塊；兩份筆記範本註明摘要摘錄。
- `.gitignore` 忽略 `node_modules/`、`.astro/` 與本機技能檔案，並重新納入被 Python 的 `lib/` 規則忽略的 `src/lib/`。
- `docs/agents/` 存放議題追蹤、分類標籤與領域文件設定。

## 已驗證

- `pnpm build` 產生 6 個頁面。
- `pnpm test` 通過 3 個測試。
- `pnpm install --frozen-lockfile` 通過。
- 損壞的筆記連結會使建置失敗，並顯示 `does not point to an existing published note`。
- 儲存庫擁有者已在第 1 步以 `pnpm dev` 確認。

## 尚未完成

| 項目 | 負責人 | 說明 |
| --- | --- | --- |
| 將 Settings → Pages → Source 設為「GitHub Actions」 | 儲存庫擁有者 | Pages 目前仍使用舊式的 `main` 分支來源。 |
| 將 `feat/astro-site` 合併至 `main` | 儲存庫擁有者 | 工作流程只在推送至 `main` 時執行，因此尚未實際測試。 |
| 修改 `research/topics.yaml` 中的主題說明 | 儲存庫擁有者 | 目前的說明是依儲存庫描述撰寫的草稿。 |
| 在瀏覽器中檢查第 2 至 4 步的頁面 | 儲存庫擁有者 | 固定跳轉列與行動版版面尚未檢查。 |

## 第一版之後再做

搜尋、RSS、網站地圖、語言切換、排程自動化、側邊欄與來源登錄表。
