# Graph Report - Z:\bookmark system - electron project  (2026-07-26)

## Corpus Check
- Corpus is ~974 words - fits in a single context window. You may not need a graph.

## Summary
- 42 nodes · 45 edges · 6 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Renderer App UI
- Main Process
- Package Config
- Dependencies
- Items Management
- NPM Scripts

## God Nodes (most connected - your core abstractions)
1. `addItem()` - 4 edges
2. `deleteItem()` - 4 edges
3. `scripts` - 3 edges
4. `saveItems()` - 3 edges
5. `checkNoItems()` - 3 edges
6. `windowStateKeeper` - 2 edges
7. `createWindow()` - 2 edges
8. `electron` - 2 edges
9. `electron-window-state` - 2 edges
10. `nodemon` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (6 total, 0 thin omitted)

### Community 0 - "Renderer App UI"
Cohesion: 0.20
Nodes (8): addItem, closeModal, { ipcRenderer }, items, itemUrl, modal, search, showModal

### Community 1 - "Main Process"
Cohesion: 0.29
Nodes (6): { app, BrowserWindow, ipcMain, Menu }, createWindow(), path, readItem, windowStateKeeper, { BrowserWindow }

### Community 2 - "Package Config"
Cohesion: 0.25
Nodes (7): author, description, keywords, license, main, name, version

### Community 3 - "Dependencies"
Cohesion: 0.29
Nodes (7): electron, electron-window-state, nodemon, dependencies, electron, electron-window-state, nodemon

### Community 4 - "Items Management"
Cohesion: 0.67
Nodes (5): addItem(), checkNoItems(), deleteItem(), items, saveItems()

### Community 5 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, dev, start

## Knowledge Gaps
- **25 isolated node(s):** `{ app, BrowserWindow, ipcMain, Menu }`, `path`, `readItem`, `name`, `version` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Dependencies` to `Package Config`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Package Config`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `{ app, BrowserWindow, ipcMain, Menu }`, `path`, `readItem` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._