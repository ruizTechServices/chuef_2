import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Location for mock persistent storage – easy to migrate to Supabase later
const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'chat_history.jsonl');//todo:make this configurable; I want to make new JSONL files on new chats; i want the title of the jsonl files to be the context of the first three messages of the conversation

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '');
}

export function appendMessage(message: ChatMessage) {
  ensureFile();
  // One JSON object per line ➜ JSONL
  fs.appendFileSync(FILE_PATH, JSON.stringify(message) + '\n', 'utf8');
}

export function readMessages(limit = 50): ChatMessage[] {
  ensureFile();
  const lines = fs.readFileSync(FILE_PATH, 'utf8')
    .trim()
    .split('\n')
    .filter(Boolean);
  const msgs: ChatMessage[] = lines.map((l) => JSON.parse(l));
  return msgs.slice(-limit);
}

export function clearMessages() {
  ensureFile();
  fs.writeFileSync(FILE_PATH, '');
}
