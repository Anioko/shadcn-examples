export const routes = [
  {
    url: `/`,
    meta: {
      title: "shadcn/ui Examples",
      description: "Shadcn UI examples for your project. Get the code and add it to your project.",
      image: ""
    }
  },
  {
    url: `/mail-app`,
    meta: {
      title: "Music App",
      description: "",
      image: ""
    }
  },
  {
    url: `/music-app`,
    meta: {
      title: "Music App",
      description: "",
      image: ""
    }
  },
  {
    url: `/context-graph`,
    meta: {
      title: "Context Graph & Relationship Intelligence",
      description: "Interactive graph visualization and analysis of entity relationships in your architecture. Features impact analysis, AI recommendations, and centrality metrics.",
      image: ""
    }
  },
  {
    url: `/universal-connector`,
    meta: {
      title: "Universal Connector Interface - 100+ Pre-Built Integrations",
      description: "Plug-and-play integration hub with unified interface, AI-powered field mapping, and 5-minute time to first import across 100+ enterprise systems.",
      image: ""
    }
  }
] as const;

export type Route = (typeof routes)[number];
