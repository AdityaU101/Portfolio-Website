# Deploying the project sites to Vercel

There are 16 sites in total: the hub and 15 project frontends. Each one is a static Vite build with a `vercel.json`, so Vercel only needs to know which folder to build. A single Vercel project can serve one folder, so a repository that holds several sites (`Projects`) gets one Vercel project per folder.

## One-time setup

1. Push each repository to GitHub as usual (nothing was committed for you).
2. Sign in at vercel.com with your GitHub account and allow it to read the repositories below.

## For each site

1. In Vercel, choose **Add New → Project** and import the repository in the table.
2. Next to **Root Directory**, click **Edit** and pick the folder in the table.
3. Leave the framework preset on **Vite**. The build command (`npm run build`) and output folder (`dist`) come from `vercel.json`.
4. Click **Deploy**. Rename the project if you want a nicer URL (Settings → General → Project Name).

| # | Site | Repository | Root Directory |
|---|---|---|---|
| 0 | Hub (portfolio) | `Portfolio-Website` | `./` (repository root) |
| 1 | CloudArch | `CloudArch` | `web` |
| 2 | ClearChart | `SecondOpinion` | `web` |
| 3 | LinkedIn Assistant | `LinkedIn-Conversational-Assistant` | `web` |
| 4 | PR Code Review Assistant | `Projects` | `pr-code-review-assistant/web` |
| 5 | Drowsiness Detection | `Projects` | `Drowsiness Detection System/web` |
| 6 | Data Processing at Scale | `Projects` | `Data Processing at Scale Sem Project/web` |
| 7 | ML-Driven VM Selection | `Projects` | `ML Driven VM Instance Selection for Cloud Workloads/web` |
| 8 | Loan Management | `Projects` | `Loan-Management-System/web` |
| 9 | Inventory Management | `Projects` | `Inventory Management App/web` |
| 10 | Poetry Haven | `Projects` | `Poetry Haven Website/web` |
| 11 | ToDo List | `Projects` | `ToDo_List/web` |
| 12 | Color Flipper | `Projects` | `Color Flipper/web` |
| 13 | Counter App | `Projects` | `CounterApp/web` |
| 14 | ML Notebooks (gallery plus 4 live models) | `ML_Projects` | `web` |
| 15 | LeetCode explorer | `Programs` | `web` |

### Notes

- **Projects repository:** it backs ten Vercel projects. To stop every push from rebuilding all ten, open each project's **Settings → Git → Ignored Build Step** and set the command to `git diff --quiet HEAD^ HEAD -- .` so a project only rebuilds when its own folder changed.
- **LeetCode explorer:** its build reads `../Codes` to regenerate the card index. Keep **Include files outside the root directory in the Build Step** switched on (the default) in Settings → Build and Deployment.
- **Folder names with spaces** work in the Root Directory field; pick them from the folder browser rather than typing them.

## After deploying: link the hub

Open `Portfolio-Website/src/data/projects.ts` and replace each `demo: null` with the site's URL. Cards then say "Live demo" instead of "Source".

The three ML predictors listed on the hub are pages inside the ML Notebooks site:

| Hub entry (`id`) | Demo URL |
|---|---|
| `ml-notebooks` | `https://<ml-site>.vercel.app/` |
| `diabetes` | `https://<ml-site>.vercel.app/#/diabetes` |
| `loan-prediction` | `https://<ml-site>.vercel.app/#/loan` |
| `fake-news` | `https://<ml-site>.vercel.app/#/fake-news` |

The sonar model is at `#/sonar` and is reached from the ML gallery.

Commit and push the hub again and it redeploys on its own.

## Cleanup before you commit

These folders hold old or wrongly copied files that I could not delete. Remove them before committing:

- `Portfolio-Website/_old_site/` (your previous portfolio, kept for reference)
- `CloudArch/web/_to_delete/`
- `Projects/pr-code-review-assistant/_to_delete/`
- `Projects/Drowsiness Detection System/_to_delete/`
- `Programs/_to_delete/`
- `GitHub/_claude_transfer/` (transfer archives; not inside any repository)

Also check that `Projects/pr-code-review-assistant/.env` is listed in `.gitignore` and was never committed.
