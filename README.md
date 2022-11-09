# UnivBoard
_A universal cross-platform clipboard_

---
## Planned Features:
- Clipboard syncing between Mobile and Desktop
- Electron App for desktop and PWA for android
- Auto copies clipboard contents to the cloud and makes it available cross-platform on active internet connection
- Can take notes or attach images
---
## Working on:
### Frontend
- UI for editing notes and pushing to ``clips`` array of user model
- Options for Editor UI libraries:
  - [Mantine Editor](https://mantine.dev/others/rte/) [_Priority_]
  - [React-Markdown](https://www.npmjs.com/package/react-markdown) _(For markdown purposes)_
- Modal for Editing and New Note option _(FAB)_
- Option to pin notes
### Backend
-  Fetch last copied text from clipboard (navigator.clipboard doesn't seem to work)
-  [Excalidraw board](https://excalidraw.com/#json=z295gEhe-7IwLXQejayVN,InZfxj1f96mq9Bs_aJ3BSQ)


