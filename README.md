# Univboard
A universal clipboard-cum-notepad web app that allows you to copy and paste text and images across devices.

## TODO
- [ ] Server setup
  - [x] User schema profile photo
  - [x] Pin notes - route + unpin
  - [x] Archive route + unarchive
  - [x] Delete route
  - [x] Body Update - Conditional updates to title, body & color
  - [ ] Copy functionality
  - [x] Add labels - multiple labels (string[])
  - [ ] Photo upload - multiple photos (string[]) - gallery view
  - [ ] Add collaborators - multiple collaborators (string[])
- [ ] Client setup
  - [ ]  FAB for adding clips
  - [ ]  fetch request for each ActionIcon button
  - [ ]  Search bar for searching all notes in body & title
  - [ ]  Sidebar - set global zustand state for each filter & render accordingly in index.tsx
    - [ ]  Shared Notes [clip.author !== user._id]
    - [ ]  Archived Notes
    - [ ]  Deleted Notes
    - [ ]  Labels View
    - [ ]  Add Label
  - [ ] Card Styling
    - [ ] Last Modified Date
    - [ ] Cancel button for editing
    - [ ] Debounced title & body that updates on close
    - [ ] Color picker
    - [ ] Image Uploader
    - [ ] Collaborators - Modal for adding by ID
    - [ ] Labels - Modal for adding by ID
    - [ ] Chips for assigned labels
- [ ] Feedback Modal
- [ ] Report Bug Modal
- [ ] Settings ? 