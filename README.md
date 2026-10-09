# LMCP — Claude Code Plugin

> Give Claude Code native access to Mail, Calendar, Contacts, Teams, Slack, WhatsApp, OneDrive, Google Drive, Notion, Notes, OmniFocus and more, with tools that run on your computer.

[![npm](https://img.shields.io/npm/v/local-mcp)](https://www.npmjs.com/package/local-mcp)
[![platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows-blue)](https://local-mcp.com)
[![smithery badge](https://smithery.ai/badge/@lanchuske/local-mcp)](https://smithery.ai/server/@lanchuske/local-mcp)

---

## Install

LMCP runs on your computer, so install the LMCP app first: download it from
[local-mcp.com/download](https://www.local-mcp.com/download?ref=claude-plugin) (macOS 13+ or Windows 10+).

**Option 1: Claude Code plugin** (run these inside Claude Code):

```
/plugin marketplace add colibird-ai/local-mcp-claude-plugin
/plugin install local-mcp@local-mcp
```

From a terminal, the same thing:

```bash
claude plugin marketplace add colibird-ai/local-mcp-claude-plugin
claude plugin install local-mcp@local-mcp
```

Restart Claude Code after installing; MCP tools load at startup.

**Option 2: One command** (run it in your terminal, not inside Claude Code):

```bash
claude mcp add local-mcp -- npx -y local-mcp@latest
```

**Option 3: Manual config** (`.mcp.json` in your project, or `~/.claude.json` for every project):

```json
{
  "mcpServers": {
    "local-mcp": {
      "command": "npx",
      "args": ["-y", "local-mcp@latest"]
    }
  }
}
```

**Option 4: Full setup** (also configures Cursor, Windsurf, VS Code):

```bash
curl -fsSL https://local-mcp.com/install | bash
```

### Other AI tools

The plugin also installs through GitHub Copilot CLI:

```bash
copilot plugin marketplace add colibird-ai/local-mcp-claude-plugin
copilot plugin install local-mcp@local-mcp
```

Codex, Gemini CLI, Cursor and more: see
[Install LMCP in your AI tool](https://github.com/colibird-ai/local-mcp-releases#install-lmcp-in-your-ai-tool).

---

## What Claude Code can access

| Service | Tools |
|---------|-------|
| **Mail** | Read, search, send, reply, move emails · Save attachments · Multiple accounts |
| **Calendar** | List, create, delete events · Multi-account (iCloud, Google, Exchange) |
| **Contacts** | Search and list from Contacts.app |
| **Microsoft Teams** | Read chats and channels · No tokens or OAuth needed |
| **Slack** | List workspaces/channels · Read and search messages · No tokens needed (IndexedDB cache) |
| **WhatsApp** | List chats · Read/search messages · Send text + files *(via the unofficial Wacli client — requires QR-code sign-in; accounts may be restricted for ToS violations)* |
| **OneDrive** | List, read, write, move, delete, search files |
| **Microsoft Outlook** | Read, search, send emails · List and create calendar events |
| **Word / Excel / PowerPoint** | Read and create Office documents |
| **PDF** | Extract and summarize text |
| **Reminders** | List, create, complete · Includes Microsoft To Do via macOS sync |
| **OmniFocus** | Tasks, projects, tags · Create and complete |
| **Notes** | List, read, search, create in Apple Notes |
| **Messages** | List chats, read and search iMessages |
| **Finder** | Search and list files on your Mac |
| **Safari** | List bookmarks |
| **Stocks** | Real-time quotes, charts, symbol search |
| **NordVPN** | Connection status · Server recommendations · Diagnostics |
| **Google Drive** | List, read, write, search files |
| **Notion** | Search, read, list pages and databases |

192+ tools on macOS. Windows has a subset: the Apple-native ones (Mail, Calendar, Contacts,
Reminders, Notes, Messages, Finder, Safari, OmniFocus) exist only on macOS.

---

## Example prompts with Claude Code

```
Search my emails for the Figma invoice and save it to my Downloads folder

Create a calendar event: "Deploy review" tomorrow at 11am in my Work calendar

What did the #backend channel in Teams say about the outage?

Read the contract PDF in my OneDrive Legal folder and list the key dates

Add a reminder to follow up with Marco on Friday at 9am

Create a new Apple Note with a summary of what we discussed today
```

---

## Safety

- **Read operations** run immediately with no confirmation
- **Destructive operations** (send email, delete event, write file) show a preview and ask for confirmation before executing
- No tool can take any action without a preceding read to verify the correct target

---

## Privacy

Tools run on your computer, and there are no API keys or tokens to manage. LMCP does not make
your AI provider local: the assistant you use receives the content you ask it to read, under its
own terms. Connecting a browser-based assistant (claude.ai or ChatGPT on the web) additionally
routes through an encrypted relay. Details: https://local-mcp.com/en/privacy

---

## Requirements

- macOS 13 Ventura or later (Apple Silicon or Intel), or Windows 10 or later
- Node.js 18+

---

## Links

- [Website](https://local-mcp.com?utm_source=claude-plugin)
- [npm](https://www.npmjs.com/package/local-mcp)
- [Smithery listing](https://smithery.ai/server/@lanchuske/local-mcp)
- Support: support@local-mcp.com

## 📬 Stay Updated

Get notified about new tools, bug fixes and major releases — no spam.

**[Subscribe to release notes →](https://local-mcp.com/#newsletter)**
