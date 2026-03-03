import "server-only";

import {
  fallbackAchievements,
  fallbackAboutContent,
  fallbackExpertise,
  fallbackProjects,
  fallbackResumeItems,
  fallbackStats,
  type AchievementItem,
  type AboutContent,
  type ExpertiseIcon,
  type ExpertiseItem,
  type ProjectItem,
  type ResumeAccent,
  type ResumeIcon,
  type ResumeItem,
  type ResumeSide,
  type StatItem,
} from "@/lib/portfolio-data";

type SpreadsheetRow = Record<string, string>;

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const cleanedText = csvText.startsWith("\uFEFF") ? csvText.slice(1) : csvText;

  for (let i = 0; i < cleanedText.length; i += 1) {
    const char = cleanedText[i];

    if (inQuotes) {
      if (char === '"') {
        if (cleanedText[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      row.push(field.trim());
      field = "";
      continue;
    }

    if (char === "\n") {
      row.push(field.trim());
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows;
}

function parseRows(csvText: string): SpreadsheetRow[] {
  const matrix = parseCsv(csvText);
  if (matrix.length === 0) {
    return [];
  }

  const headers = matrix[0].map((header) => normalizeKey(header));
  const rows = matrix.slice(1);

  return rows
    .map((values) => {
      const record: SpreadsheetRow = {};
      headers.forEach((header, index) => {
        if (!header) {
          return;
        }
        record[header] = (values[index] ?? "").trim();
      });
      return record;
    })
    .filter((record) => Object.values(record).some((value) => value.length > 0));
}

function getCell(record: SpreadsheetRow, ...keys: string[]): string {
  for (const key of keys) {
    const normalized = normalizeKey(key);
    const value = record[normalized];
    if (value && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
}

function parseList(value: string): string[] {
  if (!value.trim()) {
    return [];
  }
  return value
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseResumeAccent(value: string): ResumeAccent {
  return value.toLowerCase() === "secondary" ? "secondary" : "primary";
}

function parseResumeIcon(value: string): ResumeIcon {
  const lowered = value.toLowerCase();
  if (lowered === "graduation") {
    return "graduation";
  }
  if (lowered === "pen") {
    return "pen";
  }
  return "code";
}

function parseResumeSide(value: string): ResumeSide {
  return value.toLowerCase() === "right" ? "right" : "left";
}

function parseExpertiseIcon(value: string): ExpertiseIcon {
  const lowered = value.toLowerCase();
  if (lowered === "layout" || lowered === "ui" || lowered === "ux") {
    return "layout";
  }
  if (lowered === "cpu" || lowered === "backend" || lowered === "chip") {
    return "cpu";
  }
  if (lowered === "box" || lowered === "cube") {
    return "box";
  }
  return "code";
}

function mapAboutContent(records: SpreadsheetRow[]): AboutContent | null {
  if (records.length === 0) {
    return null;
  }

  const record = records[0];
  const singleCellBio = parseList(getCell(record, "bio", "about", "paragraphs", "bioParagraphs"));
  const lineByLineBio = [
    getCell(record, "bio1", "paragraph1"),
    getCell(record, "bio2", "paragraph2"),
    getCell(record, "bio3", "paragraph3"),
  ].filter((line) => line.length > 0);

  const bioParagraphs = singleCellBio.length > 0 ? singleCellBio : lineByLineBio;

  return {
    badge: getCell(record, "badge") || fallbackAboutContent.badge,
    headlineMain: getCell(record, "headlineMain", "headline", "headlineTop") || fallbackAboutContent.headlineMain,
    headlineHighlight: getCell(record, "headlineHighlight", "headlineAccent") || fallbackAboutContent.headlineHighlight,
    name: getCell(record, "name", "fullName") || fallbackAboutContent.name,
    bioParagraphs: bioParagraphs.length > 0 ? bioParagraphs : fallbackAboutContent.bioParagraphs,
    profileImageId:
      getCell(record, "profileImageId", "imageId", "profilePhotoId") || fallbackAboutContent.profileImageId,
  };
}

function mapStats(records: SpreadsheetRow[]): StatItem[] {
  return records
    .map((record, index) => {
      const rawId = Number.parseInt(getCell(record, "id"), 10);
      const id = Number.isFinite(rawId) ? rawId : index + 1;
      return {
        id,
        label: getCell(record, "label"),
        value: getCell(record, "value"),
      };
    })
    .filter((stat) => stat.label.length > 0 && stat.value.length > 0);
}

function mapExpertise(records: SpreadsheetRow[]): ExpertiseItem[] {
  return records
    .map((record, index) => {
      const rawId = Number.parseInt(getCell(record, "id"), 10);
      const id = Number.isFinite(rawId) ? rawId : index + 1;
      const title = getCell(record, "title");
      const description = getCell(record, "description", "desc");

      return {
        id,
        icon: parseExpertiseIcon(getCell(record, "icon")),
        title,
        description,
      };
    })
    .filter((item) => item.title.length > 0 && item.description.length > 0);
}

function mapAchievements(records: SpreadsheetRow[]): AchievementItem[] {
  return records
    .map((record, index) => {
      const rawId = Number.parseInt(getCell(record, "id"), 10);
      const id = Number.isFinite(rawId) ? rawId : index + 1;
      const title = getCell(record, "title");
      const issuer = getCell(record, "issuer", "organizer", "institution");
      const period = getCell(record, "period", "date", "year");
      const category = getCell(record, "category") || "Achievement";
      const description = getCell(record, "description", "summary");
      const tags = parseList(getCell(record, "tags", "chips"));
      const proofUrl = getCell(record, "proofurl", "url", "link");

      return {
        id,
        title,
        issuer,
        period,
        category,
        description,
        tags,
        ...(proofUrl ? { proofUrl } : {}),
      };
    })
    .filter((item) => item.title.length > 0 && item.issuer.length > 0);
}

function mapProjects(records: SpreadsheetRow[]): ProjectItem[] {
  return records
    .map((record, index) => {
      const rawId = Number.parseInt(getCell(record, "id"), 10);
      const id = Number.isFinite(rawId) ? rawId : index + 1;
      const github = getCell(record, "github", "githuburl");
      const demo = getCell(record, "demo", "demourl", "live", "liveurl");

      const links: ProjectItem["links"] = {};
      if (github) {
        links.github = github;
      }
      if (demo) {
        links.demo = demo;
      }

      const description = getCell(record, "description");

      return {
        id,
        title: getCell(record, "title") || `Project ${index + 1}`,
        category: getCell(record, "category") || "Web Development",
        date: getCell(record, "date") || "2024-01-01",
        imageId: getCell(record, "imageid", "image", "imagekey") || `project${index + 1}`,
        tags: parseList(getCell(record, "tags", "techstack")),
        description: description || "No description available yet.",
        fullDescription:
          getCell(record, "fulldescription", "overview", "details", "detail") ||
          description ||
          "No project details available yet.",
        features: parseList(getCell(record, "features", "keyfeatures")),
        ...(Object.keys(links).length > 0 ? { links } : {}),
      };
    })
    .filter((project) => project.title.trim().length > 0);
}

function mapResumeItems(records: SpreadsheetRow[]): ResumeItem[] {
  return records
    .map((record, index) => {
      const rawId = Number.parseInt(getCell(record, "id"), 10);
      const id = Number.isFinite(rawId) ? rawId : index + 1;

      return {
        id,
        period: getCell(record, "period", "year", "years"),
        title: getCell(record, "title"),
        organization: getCell(record, "organization", "company", "institution"),
        description: getCell(record, "description", "summary") || undefined,
        highlights: parseList(getCell(record, "highlights", "bullets", "points")),
        chips: parseList(getCell(record, "chips", "badges", "tags")),
        accent: parseResumeAccent(getCell(record, "accent")),
        icon: parseResumeIcon(getCell(record, "icon")),
        side: parseResumeSide(getCell(record, "side")),
      };
    })
    .filter((item) => item.title.trim().length > 0 && item.organization.trim().length > 0);
}

function getRevalidateSeconds(): number {
  const rawValue = process.env.PORTFOLIO_REVALIDATE_SECONDS;
  if (!rawValue) {
    return 0;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function getSheetCsvUrl(sheetName: string): string | null {
  const spreadsheetId = process.env.PORTFOLIO_SPREADSHEET_ID?.trim();
  if (!spreadsheetId) {
    return null;
  }

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

async function fetchSheetRecords(sheetName: string): Promise<SpreadsheetRow[] | null> {
  const sheetUrl = getSheetCsvUrl(sheetName);
  if (!sheetUrl) {
    return null;
  }

  const revalidate = getRevalidateSeconds();
  const requestOptions =
    revalidate === 0
      ? { cache: "no-store" as const }
      : { next: { revalidate } };

  try {
    const response = await fetch(sheetUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`Spreadsheet request failed (${response.status})`);
    }

    const csvText = await response.text();
    return parseRows(csvText);
  } catch (error) {
    console.warn(`[spreadsheet] Failed to fetch "${sheetName}"`, error);
    return null;
  }
}

export async function getPortfolioData(): Promise<{
  about: AboutContent;
  stats: StatItem[];
  expertise: ExpertiseItem[];
  projects: ProjectItem[];
  resumeItems: ResumeItem[];
}> {
  const aboutSheetName = process.env.PORTFOLIO_ABOUT_SHEET?.trim() || "About";
  const statsSheetName = process.env.PORTFOLIO_STATS_SHEET?.trim() || "Stats";
  const expertiseSheetName = process.env.PORTFOLIO_EXPERTISE_SHEET?.trim() || "Expertise";
  const projectsSheetName = process.env.PORTFOLIO_PROJECTS_SHEET?.trim() || "Projects";
  const resumeSheetName = process.env.PORTFOLIO_RESUME_SHEET?.trim() || "Resume";

  const [aboutRecords, statsRecords, expertiseRecords, projectRecords, resumeRecords] = await Promise.all([
    fetchSheetRecords(aboutSheetName),
    fetchSheetRecords(statsSheetName),
    fetchSheetRecords(expertiseSheetName),
    fetchSheetRecords(projectsSheetName),
    fetchSheetRecords(resumeSheetName),
  ]);

  const about = aboutRecords ? mapAboutContent(aboutRecords) : null;
  const stats = statsRecords ? mapStats(statsRecords) : [];
  const expertise = expertiseRecords ? mapExpertise(expertiseRecords) : [];
  const projects = projectRecords ? mapProjects(projectRecords) : [];
  const resumeItems = resumeRecords ? mapResumeItems(resumeRecords) : [];

  return {
    about: about ?? fallbackAboutContent,
    stats: stats.length > 0 ? stats : fallbackStats,
    expertise: expertise.length > 0 ? expertise : fallbackExpertise,
    projects: projects.length > 0 ? projects : fallbackProjects,
    resumeItems: resumeItems.length > 0 ? resumeItems : fallbackResumeItems,
  };
}

export async function getAchievementData(): Promise<AchievementItem[]> {
  const achievementsSheetName = process.env.PORTFOLIO_ACHIEVEMENTS_SHEET?.trim() || "Achievements";
  const achievementRecords = await fetchSheetRecords(achievementsSheetName);

  if (!achievementRecords) {
    return fallbackAchievements;
  }

  const achievements = mapAchievements(achievementRecords);
  return achievements.length > 0 ? achievements : fallbackAchievements;
}
