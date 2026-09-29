# Content guide

Profile copy, project summaries and experience highlights live in
`messages/uk.json` and `messages/en.json`. The data files only keep structure:
ids, dates, stack and image paths. Keep the key trees identical between the two
message files.

## Profile

`src/entities/profile/model/experience.ts` lists timeline entries as
`{ id, company, period? }`. `period` is `{ start, end }` and is omitted when the
dates are not shown. `end` is `null` for a current role. When `start` and `end`
are the same year, the timeline shows that year once. The role and the highlight
list come from
`experience.items.<id>` in the messages. An empty highlight list is not rendered.

`src/entities/profile/model/skills.ts` groups skills by `daily`, `confident` and
`familiar`. A group with no skills is not rendered.

Contact links and the site metadata live in `src/shared/config/links.ts` and
`src/shared/config/site.ts`. `siteConfig.url` stays a placeholder until there is
a real domain.

## Projects

Add an entry to the `projects` array in `src/entities/project/model/data.ts`:

```ts
{
  slug: "my-project",
  stack: ["Next.js", "TypeScript"],
  image: "/projects/my-project.svg",
}
```

Add the same slug under `projects.items` in both message files, with `title`,
`summary` and `period`. The period is a string, so "дотепер" and "present" can
differ by locale.

Put the image at `public/projects/<slug>.svg` (or `.png` / `.webp`). The card
links to `/<locale>/projects/<slug>`.

## Case studies

For every project create two files:

```
content/projects/<slug>/uk.mdx
content/projects/<slug>/en.mdx
```

Each file starts with the metadata export and continues with the write-up:

```mdx
export const metadata = {
  title: "My Project",
  role: "Frontend Engineer",
  stack: ["Next.js", "TypeScript"],
  period: "2026",
  demo: "https://example.com",
  source: "https://github.com/example/my-project",
};

## The problem

What was wrong or missing.

## My role

What you personally owned.

## Key decisions

- The choices you made and why.

## The result

- Outcomes you can actually stand behind.
```

`demo` and `source` are optional. Leave them out when there is no public demo
or repository. The page renders whatever headings and lists you write; keep the
four sections so the cases stay comparable.

The slug must match an entry in the projects data, otherwise the page returns a 404. Because pages are enumerated at build time, a new case appears after the
next build.

### NDA work

NDA work is one generalized case, not a set of feature-level write-ups. Do not
name the client and do not use screenshots of the real interface. Describe the
product as parts of one SPA, keep the outcome qualitative, and do not add
metrics, dates or techniques that are not in the CV or in something you can
point at.

Card images for NDA cases are abstract graphics in `public/projects`, not UI
captures.

## CV

`public/cv/cv-uk.pdf` and `public/cv/cv-en.pdf` are the files the download
buttons serve. The paths are mapped in `src/shared/config/links.ts`.
