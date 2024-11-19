export type Damage = {
  superficial: number;
  aggravated: number;
  penalty: number;
};

export type AdvantageFlaw = {
  [name: string]: number
}

export type Character = {
  versionstamp: string | null;
  id: string;
  details: string;
  image: string;
  name: string;
  player: string;
  resonance: string;
  ambition: string;
  desire: string;
  predator: string;
  clan: string;
  generation: number;
  attributes: {
    physical: {
      strength: number;
      dexterity: number;
      stamina: number;
    };
    social: {
      charisma: number;
      manipulation: number;
      composure: number;
    };
    mental: {
      intelligence: number;
      wits: number;
      resolve: number;
    };
  };
  skills: {
    physical: {
      athletics: number;
      brawl: number;
      craft: number;
      drive: number;
      firearms: number;
      melee: number;
      larceny: number;
      stealth: number;
      survival: number;
    };
    social: {
      animalKen: number;
      etiquette: number;
      insight: number;
      intimidation: number;
      leadership: number;
      performance: number;
      persuasion: number;
      streetwise: number;
      subterfuge: number;
    };
    mental: {
      academics: number;
      awareness: number;
      finance: number;
      investigation: number;
      medicine: number;
      occult: number;
      politics: number;
      science: number;
      technology: number;
    };
  };
  health: Damage;
  willpower: Damage;
  humanity: {
    total: number;
    stains: number;
  };
  bloodPotency: number;
  hunger: number;
  experience: {
    total: number;
    spent: number;
  };
  specialties: {
    [skill: string]: string[];
  };
  advantages: AdvantageFlaw;
  flaws: AdvantageFlaw;
  disciplines: {
    animalism?: string[];
    auspex?: string[];
    dominate?: string[];
    bloodSorcery?: string[];
    fortitude?: string[];
    protean?: string[];
    obfuscate?: string[];
    potence?: string[];
    presence?: string[];
    celerity?: string[];
    rituals?: string[];
    thinBloodAlchemy?: string[];
  };
};
