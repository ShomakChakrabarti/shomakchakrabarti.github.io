# Your course website: the simple guide

This guide covers everything: where each file lives, what to upload where, how to make changes, and how to turn your other Beamer decks into web slides. Read section 1 once. After that you only need section 5.

---

## 1. The big picture

There are **three places**:

| Place | What it is | Who sees it |
|---|---|---|
| **Your Mac** | Where you **edit**: your LaTeX textbook and Beamer slides | Only you |
| **GitHub** | Your **public website**: your homepage plus the online textbook | Anyone with the link |
| **Canvas** | Where the **slides** live | Only students on the course |

And there is **one button**: the file **Update website.command**. You edit your LaTeX, double-click it, and it produces two things:

```
   You edit your LaTeX (textbook chapters or Beamer slides)
                         │
                         ▼
          Double-click  "Update website.command"
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
   (A) The online textbook     (B) One file per slide deck
   is copied into your         is put in the folder
   website folder              "Canvas upload"
           │                           │
           ▼                           ▼
   GitHub Desktop:             Canvas: Files → Upload
   Commit, then Push
           │                           │
           ▼                           ▼
   Live on your website        Live in Canvas
```

Nothing goes online until **you** press Push (GitHub) or Upload (Canvas).

---

## 2. Your folders, and what each one is for

Key: ✏️ = you edit this · ▶️ = you double-click this · 📤 = you upload this · 🚫 = never touch

### Folder 1: the textbook folder (your workshop)

`Documents › University of Manchester Folders › Scholarship Projects › Textbook - Intermediate Microeconomic Theory`

```
Textbook - Intermediate Microeconomic Theory/
│
├── ▶️  Set up (do once).command      ← double-click ONCE per Mac
├── ▶️  Update website.command        ← double-click after EVERY change
├── ✏️  website-settings.txt          ← three settings (section 3, step C)
├── 📖  GUIDE - Website, textbook and slides.md   ← this guide
│
├── 📤  Canvas upload/                ← slide files for Canvas appear here
│       └── HA2 - Hidden actions, Lecture 2 ... .html
│
├── 5-source/
│   ├── textbook/
│   │   └── ✏️ chapters/              ← YOUR TEXTBOOK CHAPTERS (.tex)
│   ├── slides/
│   │   ├── ✏️ decks.txt              ← the list of decks to convert (section 6)
│   │   ├── ✏️ 1_factor_markets/      ← YOUR BEAMER SLIDES (.tex), one folder per topic
│   │   ├── ✏️ 2_choice_under_uncertainty/
│   │   ├── ✏️ 3_hidden_actions/
│   │   ├── ✏️ 4_hidden_information/
│   │   ├── ✏️ 5_signalling/
│   │   └── 🚫 html-settings/         ← diagram descriptions etc. (Claude fills these)
│   └── 🚫 online/                    ← the machinery; Update uses it
│
└── 🚫 1-website, 2-instructor-website, 3-pdf, 4-interactive-pages, Backups
```

**You only ever edit two kinds of file:** the chapters in `5-source/textbook/chapters/` and the Beamer decks in `5-source/slides/`. Edit them exactly as you do now, in your usual LaTeX editor. You can still compile your PDFs from them as normal.

### Folder 2: your website folder (what goes on GitHub)

At the moment this is `Documents › Personal Webpage › site-ready-23-nov`. Once you set up GitHub (section 3), your website lives in a GitHub folder instead, and this is what it contains:

```
YOURNAME.github.io/            ← your website, exactly as visitors see it
├── 📤 index.html               ← your homepage
├── 📤 .nojekyll                ← hidden, empty, but essential (do not delete)
├── 📤 images/                  ← your portrait, background, photos
├── 📤 documents/               ← CV, papers
└── 📤 textbooks/
        └── information-economics/   ← the online textbook (Update fills this)
```

**Upload everything in this folder, and nothing else.** Never upload the textbook folder, `5-source`, or your .tex files.

---

## 3. First-time setup (do this once, about 30 minutes)

### Step A: install the tools (5 minutes)

1. In the textbook folder, double-click **Set up (do once).command**.
   - If the Mac says it *cannot be opened*, right-click the file, choose **Open**, then **Open** again.
   - If the Mac offers to install *Command Line Tools*, click **Install**, wait, then double-click Set up again.
2. Wait until it says **Done**, then press Return.

### Step B: put your website on GitHub (15 minutes)

1. Go to **github.com** and create a free account. Note your **username**; below it is called YOURNAME.
2. Click **+** (top right) → **New repository**.
   - Repository name: exactly **YOURNAME.github.io**
   - Choose **Public**
   - Click **Create repository**.
3. Download and install **GitHub Desktop** (desktop.github.com), and sign in with your GitHub account.
4. In GitHub Desktop: **File → Clone repository** → choose **YOURNAME.github.io** → **Clone**. This creates the folder `Documents › GitHub › YOURNAME.github.io` on your Mac.
5. Open `Documents › Personal Webpage › site-ready-23-nov` in Finder.
   - Press **Cmd + Shift + .** (full stop) to show hidden files, so you can see `.nojekyll`.
   - Select **everything inside** (index.html, .nojekyll, images, documents, textbooks) and **copy** it into `Documents › GitHub › YOURNAME.github.io`.
   - Also copy your two photos into its `images` folder, named `shomak_photowebsite.jpg` and `background_website.jpg`.
6. Back in GitHub Desktop: type **First upload** in the Summary box (bottom left), click **Commit to main**, then **Push origin** (top).
7. On github.com, open your repository → **Settings** → **Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
8. Wait about five minutes, then visit **https://YOURNAME.github.io**. Your homepage should appear, and the Textbooks card should open the book.

### Step C: fill in the settings (2 minutes)

Open **website-settings.txt** in the textbook folder (TextEdit is fine) and change the three lines that do not start with `#`:

```
website-folder: ~/Documents/GitHub/YOURNAME.github.io/textbooks/information-economics
book-address: https://YOURNAME.github.io/textbooks/information-economics/
slides-on-website: no
```

Replace **YOURNAME** with your GitHub username in both places. `slides-on-website: no` means the slides are only in Canvas (recommended, because GitHub is public). Save the file.

### Step D: test the button (2 minutes)

Double-click **Update website.command**. It shows five steps and ends with **Done**. Then commit and push in GitHub Desktop (see section 5).

### Step E: put the slides in Canvas (5 minutes)

See section 4.

---

## 4. Putting slides in Canvas

The **Canvas upload** folder has **one .html file per slide deck**. Each file contains everything it needs, so you upload just that one file.

**First time, for each deck:**

1. In your Canvas course, click **Files** → **Upload** → choose the file from **Canvas upload** → **Open**.
2. Click **Modules**. In the week's module, click **+**, choose **File** from the drop-down, select the slides file, then click **Add Item**.
3. Click the grey cloud next to the new item so it turns green (**Published**).
4. Click the item yourself to check that the slides appear and the arrow keys work.

**When you have changed a deck:** run Update, then upload the new file in **Files** with the same name, and choose **Replace** when Canvas asks. The module item updates by itself.

**Please test once with your learning technologist.** Some Canvas setups download .html files instead of displaying them, or block the buttons. If that happens with yours, they can switch it on or suggest the university's preferred way.

*Good to know:* Canvas always allows students to download files. A downloaded copy still blocks copying and printing, but it does work offline.

---

## 5. Every time you change something (the everyday routine)

### You changed the textbook

1. **Edit** the chapter in `5-source/textbook/chapters/` and save.
2. **Double-click Update website.command.** Wait for **Done**, about a minute. Type `y` and press Return if you want to preview the result in your browser.
3. **Open GitHub Desktop.** It lists the changed files. Type a summary (for example *Fix typo in chapter 3*), click **Commit to main**, then **Push origin**.

The website updates within about five minutes.

### You changed a slide deck

1. **Edit** the deck in `5-source/slides/…` and save.
2. **Double-click Update website.command.**
3. **Canvas:** Files → Upload the new file from **Canvas upload** → **Replace**.

(If `slides-on-website` is `yes`, also do step 3 of the textbook routine.)

---

## 6. Converting your other slide decks

All ten decks are already listed in **5-source/slides/decks.txt**. Only HA2 is switched on at the moment. The others have a `#` at the start of their line, which means *ignore*.

### The easy way: ask Claude (recommended)

Just say, for example: **"Convert HA1 and HA3"** or **"Convert all the remaining decks"**.

I will do the parts that need care:

- **Numbering:** some decks still use the textbook's old numbers (for example *Theorem 4.6*). I check each against the current book and correct the web version. Your .tex file is not changed.
- **Diagram descriptions:** each diagram gets a written description for blind and partially sighted students.
- **Textbook links:** each deck's textbook badges are pointed at the right pages.
- **Checking:** I look at the result slide by slide.

You then just double-click **Update website** and upload the new files to Canvas.

### The do-it-yourself way

1. Open **5-source/slides/decks.txt**.
2. Delete the `#` at the start of the deck's line, for example change
   `# ha1 | 3_hidden_actions/HA1_model_firstbest.tex | 3 | Hidden actions, Lecture 1: …`
   to
   `ha1 | 3_hidden_actions/HA1_model_firstbest.tex | 3 | Hidden actions, Lecture 1: …`
3. Save, then double-click **Update website.command**.
4. The new file appears in **Canvas upload**. Upload it as in section 4.

The slides work straight away. Two things are left for later, which I can add whenever you like: the update will say *"no description yet"* for each diagram, and any old theorem numbers stay as they are in your .tex file.

### Adding a brand-new deck

Put the .tex file (and its preamble, if it has its own) into the right topic folder in `5-source/slides/`. Add a line to `decks.txt` in the same format, with a new short name such as `ha4`, then run Update.

---

## 7. If something goes wrong

| What you see | What to do |
|---|---|
| The window says **STOPPED** | Read the one-line reason. Your website has not been changed. The usual cause is a LaTeX error: fix it, then run Update again. Full details are in `5-source/online/last-update-log.txt`. |
| *"cannot be opened"* when double-clicking | Right-click the file → **Open** → **Open**. |
| Double-clicking does nothing | Open **Terminal**, type `bash ` (with a space), drag the .command file into the window, press Return. |
| The website looks unstyled (plain text, no colours) | `.nojekyll` is missing from the website folder. Copy it back from `site-ready-23-nov` (press Cmd + Shift + . to see it), then commit and push. |
| Canvas downloads the file instead of showing it | Ask your learning technologist; this is a Canvas setting. |
| Anything else | Ask Claude, and paste the last lines of `last-update-log.txt`. |

---

## 8. Words used in this guide

- **Commit**: GitHub Desktop takes a snapshot of your changes, on your Mac.
- **Push**: GitHub Desktop sends that snapshot to GitHub, and your website updates.
- **Repository**: your website's folder on GitHub.
- **.command file**: a file you double-click to run a task on a Mac.
- **Deck**: one Beamer lecture file.
