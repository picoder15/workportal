import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8063;  // default 8063
const STATE_FILE = path.join(__dirname, 'state.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper: read state from file
async function readState() {
  try {
    const data = await fs.readFile(STATE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, return default state
    return {
      pages: [],
      sidebarTitle: 'My Workspace',
      sidebarTitleLocked: false,
      activePageId: null,
      activeSubPageId: null,
      theme: 'light',
      currentView: 'editor',
      recentPages: [],
      shortcuts: [], // will be populated later
      pinnedPages: [],
    };
  }
}

// Helper: write state + update timestamp
async function writeState(state) {
  const dataToStore = {
    ...state,
    _updatedAt: Date.now(), // internal timestamp for polling
  };
  await fs.writeFile(STATE_FILE, JSON.stringify(dataToStore, null, 2));
}

// GET current state
app.get('/api/state', async (req, res) => {
  const state = await readState();
  // Remove internal field before sending
  const { _updatedAt, ...cleanState } = state;
  res.json(cleanState);
});

// PUT (overwrite) state
app.put('/api/state', async (req, res) => {
  const newState = req.body;
  await writeState(newState);
  res.json({ ok: true });
});

// GET last update timestamp (for polling)
app.get('/api/state/timestamp', async (req, res) => {
  const state = await readState();
  res.json({ updatedAt: state._updatedAt || 0 });
});

// Serve frontend static files (production)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`State file: ${STATE_FILE}`);
});