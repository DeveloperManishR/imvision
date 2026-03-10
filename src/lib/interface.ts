interface LocalizedText {
  en: string;
  sv: string;
}

interface Stat {
  label: LocalizedText;
  value: string;
  unit: string;
}

interface Tab {
  label: LocalizedText;
  description: LocalizedText;
  highlightStat: string;
  stats: Stat[];
  image: string;
}

export interface AboutDataInterface {
  _id: string;
  titleLine1: LocalizedText;
  titleLine2: LocalizedText;
  description: LocalizedText;
  cta: LocalizedText;
  title: LocalizedText;
  tabs: Tab[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}