# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Spreadsheet as Database

Portfolio content can be loaded from Google Spreadsheet.

1. Copy `.env.example` to `.env.local`
2. Fill `PORTFOLIO_SPREADSHEET_ID`
3. Keep these tabs in your spreadsheet: `About`, `Stats`, `Expertise`, `Projects`, `Resume`, `Achievements`
4. Set spreadsheet visibility to `Anyone with the link (Viewer)`
5. Use `PORTFOLIO_REVALIDATE_SECONDS=0` so manual browser refresh always pulls latest sheet data

Resume download button reads PDF from the local `assets` folder via `/api/resume`.
Set filename with `PORTFOLIO_RESUME_FILE` if needed.

Image strategy:
- Store images in `assets/images`
- Map image IDs in `src/lib/placeholder-images.json` using filenames (e.g. `project1.jpg`)
- Images are served by `/api/images/<filename>`
