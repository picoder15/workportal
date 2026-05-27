README for the WorkPortal repository,

---

# WorkPortal 🚀

**Your Personal Workspace for Notes, Knowledge, and Collaboration**  
A modern, self-hosted knowledge management system that helps you capture, organize, and connect your ideas like never before—all synced across every device on your network.

**Version:** 1.0.0 | **Status:** Active Development | **License:** MIT

---

## ✨ Why WorkPortal?

*   **Knowledge base** – Create and manage rich-text pages, nest sub-pages, and build a personal wiki.
*   **Graph & backlinks** – Visualize connections between your notes and never lose context.
*   **Dashboard & calendar** – Track creation activity and get high-level insights at a glance.
*   **Version history** – Every change is saved; restore any previous version with one click.
*   **Cross‑device sync** – Run the backend once; all devices on your local network stay in sync automatically.
*   **Self‑hosted & private** – No cloud dependencies, no subscription fees. All your data stays on your server.

---

## 🖼️ Showcase

> **Add your visuals here!** Replace the placeholders with your own screenshots or GIFs to give visitors an immediate sense of WorkPortal.

```plaintext
[Screenshot: Editor with formatting toolbar]
[Screenshot: Graph view showing node connections]
[Screenshot: Dashboard with stats and activity]
[Screenshot: Calendar view of page creation dates]
[GIF: Creating a page and watching it sync to a second device]
```

---

## 🛠️ Tech Stack

| Area             | Technology                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Frontend**     | React 19, TypeScript, Vite 7, Tailwind CSS 4                                                                           |
| **Editor**       | Custom `contentEditable` rich-text editor with commands (`bold`, `italic`, `underline`, `strikethrough`, lists, etc.) |
| **Backend**      | Node.js (ES modules), Express                                                                                          |
| **Data Storage** | JSON file (`server/state.json`) – simple, portable, zero external dependencies                                        |
| **Sync**         | Optimistic polling with debounced writes and timestamp checks                                                          |
| **UI Components**| Fully custom components built with Tailwind, including toolbars, modals, and panels                                   |

---

## ⚡ Core Features in Detail

### ✍️ Rich Text Editor
- Full formatting toolbar (bold, italic, underline, strikethrough, headings, lists, alignment).
- **Internal links** – link to any page or subpage using a visual modal. Links are stored as special `portal-internal-link` tags with `data-pid` and optional `data-spid` / `data-anchor` attributes.
- **Image upload** – paste or upload images directly; they are base64‑encoded and embedded (no external storage needed).
- **Auto‑save** – content is saved 800 ms after you stop typing. A subtle indicator shows the latest save time.
- **Lock mode** – prevent accidental edits with a per‑page/per‑subpage lock toggle.

### 🌐 Graph View
- Force‑directed graph showing pages, subpages, and the internal links between them.
- **Drag & drop** – reposition nodes to see connections more clearly.
- **Filtering** – search for node labels to highlight specific parts of your graph.
- **Navigation** – click any node to jump directly to that page or subpage.
- Mutual links (bi‑directional) are highlighted with thicker, dashed lines.

### 📊 Dashboard & Analytics
- **Pages & Sub‑pages** – browse all pages, subpages, and pinned items in a searchable list.
- **Global Activity** – view a timeline of all changes (creations, renames, content updates, subpage events) across your entire workspace.
- **Backlinks** – see which pages link to a given page; the dashboard also shows outgoing links.
- **Quick stats** – total pages, subpages, activities, and pinned items are displayed at the top.

### 📅 Calendar View
- Every page records its creation date, which is displayed on a month‑by‑month calendar.
- Click any day to see all pages created on that day; click a page to open it directly.
- Month stats show total pages, active days, and pages created in the selected month.

### 🔗 Backlinks Panel
- Open the panel from the editor to see both incoming and outgoing links for the current page.
- A mini‑graph preview illustrates the connections.
- Click any linked page to navigate instantly.

### ⌨️ Keyboard Shortcuts
- Fully customizable shortcuts (Ctrl+K for search, Ctrl+L for insert link, Ctrl+H for version history, Ctrl+D for dashboard, Ctrl+G for graph, etc.).
- Manage them from the shortcuts modal in the top bar.

### 🔄 Cross‑Device Sync
- One backend instance stores the master `state.json` file.
- All frontend instances poll the backend every 3 seconds; they fetch the full state only when the timestamp changes.
- Writes are debounced and sent to the backend; the backend broadcasts no changes – clients ask for updates.
- This simple, robust approach works instantly on any local network without complex WebSocket setup.

### 🎨 Appearance
- Light and dark themes – toggle via the top bar or your system preference.
- The entire UI adapts seamlessly, including the editor, graph, calendar, and all modals.

### 🧩 Sub‑pages & Trackers
- Every page can have multiple sub‑pages, which behave like independent notes but live under a parent page.
- **Tracker sub‑pages** are automatically created for each page; they log every activity (create, rename, content change, subpage add/delete) in a readable table format.

### 🏷️ Tags
- Add, remove, and filter tags on pages and subpages.
- Tags are currently a simple list (search integration is planned for a future release).

### 📦 Export & Import
- **Export** any page or subpage as Markdown, HTML, JSON, or PDF (via the browser’s print dialog).
- **Full workspace export/import** is available in the Settings modal – you can back up the entire `state.json` or restore a previous backup.

### 📝 Templates
- Six built‑in templates: Meeting Notes, Task List, General Notes, Project Plan, Weekly Review, Bug Report.
- Insert a template directly into the editor to start writing faster.

### 🚀 Production Script (`portal.js`)
- Single‑command management: `node portal.js start --bg` starts the backend in the background and builds the frontend automatically.
- Commands: `start`, `stop`, `restart`, `status`, `logs`.
- Supports `--fg` (foreground) for debugging and `--dev` for development mode with live‑reload.
- The backend serves the built frontend; no separate HTTP server is needed.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20.x or later (v22+ recommended)
- **npm** 9.x or later
- A device on your local network to act as the server (can be a Raspberry Pi, an old laptop, or even your main computer)

### Quick Install

```bash
git clone https://github.com/picoder15/workportal.git
cd workportal
npm install               # install frontend dependencies
cd server && npm install  # install backend dependencies
```

### Running WorkPortal

#### Production Mode (Recommended)

```bash
# From the project root
node portal.js start --bg
```

This command will:
1. Build the frontend (`npm run build`)
2. Start the backend on port **8063** in the background
3. Serve the frontend from the `dist/` folder

Now open a browser on **any device on the same network** and go to `http://<server-ip>:8063`.

#### Development Mode (with hot‑reload)

```bash
node portal.js start --dev --fg
```

This runs both the backend and Vite dev server in the foreground, giving you live‑reload during development.

### Managing the Service

| Command                            | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| `node portal.js start --bg`        | Start in production mode (background)          |
| `node portal.js stop`              | Stop the background process                    |
| `node portal.js restart`           | Restart the background process                 |
| `node portal.js status`            | Check if the service is running                |
| `node portal.js logs`              | Show logs (if any)                             |
| `node portal.js start --fg`        | Start in foreground (logs to console)          |
| `node portal.js start --dev --fg`  | Development mode with live‑reload              |

### Autostart on Termux (Android)

Add this to your `~/.bashrc`:

```bash
WORKPORTAL_DIR="/path/to/workportal"
workportal() {
    (cd "$WORKPORTAL_DIR" && npm run "$1")
}
if [ -f "$WORKPORTAL_DIR/.portal.pid" ] && kill -0 $(cat "$WORKPORTAL_DIR/.portal.pid") 2>/dev/null; then
    : # Already running
else
    (cd "$WORKPORTAL_DIR" && npm run start > /dev/null 2>&1 &)
fi
```

Then use `workportal start`, `workportal stop`, etc., from anywhere.

---

## 📁 Project Structure

```
workportal/
├── server/                 # Backend (Node.js + Express)
│   ├── index.js            # Main server file (API + static hosting)
│   ├── state.json          # Workspace data (auto‑created)
│   └── package.json
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # All UI components
│   ├── context/            # PortalContext (state management + sync)
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Helper functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── portal.js               # Unified management script
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔌 API Endpoints

| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/state`            | Get the full workspace state        |
| PUT    | `/api/state`            | Overwrite the workspace state       |
| GET    | `/api/state/timestamp`  | Get the last modification timestamp |

All other routes serve the built frontend (single‑page app fallback).

---

## 📝 Configuration

- **Port**: Default is `8063`. Change it by setting the `PORT` environment variable or passing `--port <number>` to `portal.js`.
- **State file location**: `server/state.json`. You can back this file up, move it to another server, or share it between instances.
- **Network access**: The server binds to `0.0.0.0` so it is reachable from any device on your local network.

---

## 🧪 Testing & Debugging

- **Foreground mode** (`--fg`) shows all backend logs in the terminal – useful for debugging sync issues.
- **Check sync**: Open WorkPortal on two different devices, create a page on one, and after ~3 seconds it should appear on the other.
- **View state file**: `cat server/state.json | jq '.pages | length'` shows how many pages are stored.
- **Monitor polling**: Open your browser’s DevTools → Network tab and filter for `/api/state/timestamp`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Inspired by Obsidian, Notion, and Roam Research

---

**WorkPortal** – because your knowledge should grow with you, not be locked in a cloud.

---
 help with any specific section or if you need additional features documented.
