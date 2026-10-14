export type FolderColor = "lavender" | "mint" | "peach" | "sky";

export interface Folder {
  id: string;
  name: string;
  color: FolderColor;
  emoji: string;
}

export interface NoteSection {
  heading: string;
  bullets: string[];
}

export interface Note {
  id: string;
  title: string;
  folderId: string;
  updated: string;
  summary: string;
  sections: NoteSection[];
}

export const folders: Folder[] = [
  { id: "physics", name: "Physics", color: "lavender", emoji: "⚛️" },
  { id: "chemistry", name: "Chemistry", color: "mint", emoji: "🧪" },
  { id: "biology", name: "Biology", color: "peach", emoji: "🌿" },
  { id: "dsa", name: "Data Structures", color: "sky", emoji: "🧩" },
];

export const notes: Note[] = [
  {
    id: "thermodynamics",
    title: "Thermodynamics – Laws & Entropy",
    folderId: "physics",
    updated: "Just now",
    summary: "First and second laws, entropy, ideal gas relations.",
    sections: [
      {
        heading: "System & surroundings",
        bullets: [
          "Universe: the system plus its surroundings",
          "Energy transfer: happens as heat (Q) or work (W)",
        ],
      },
      {
        heading: "First law",
        bullets: [
          "First law: dU = δQ − δW (energy is conserved)",
          "Closed system: ΔU = Q − W",
          "Sign convention: Q > 0 into the system, W > 0 done by the system",
        ],
      },
      {
        heading: "Second law & entropy",
        bullets: [
          "Entropy (S): a measure of disorder, or the number of microstates",
          "Isolated system: ΔS ≥ 0 always",
          "Reversible process: ΔS = ∫ δQrev / T",
          "Irreversible process: ΔS is strictly greater than ∫ δQ / T",
        ],
      },
      {
        heading: "Ideal gas",
        bullets: [
          "Internal energy: U = nCvT, so U depends only on temperature",
          "Ideal gas law: PV = nRT relates pressure, volume and temperature",
          "Mayer's relation: Cp − Cv = R, so Cp > Cv",
          "Isothermal process: ΔU = 0, therefore Q = W",
        ],
      },
    ],
  },
  {
    id: "kinematics",
    title: "Kinematics – Motion in 1D",
    folderId: "physics",
    updated: "2 days ago",
    summary: "Displacement, velocity, acceleration and SUVAT equations.",
    sections: [
      {
        heading: "Core quantities",
        bullets: [
          "Displacement: change in position, a vector",
          "Velocity: rate of change of displacement",
          "Acceleration: rate of change of velocity",
        ],
      },
      {
        heading: "Equations of motion",
        bullets: [
          "v = u + at: final velocity after constant acceleration",
          "s = ut + ½at²: displacement after time t",
          "v² = u² + 2as: links velocity and displacement without time",
        ],
      },
    ],
  },
  {
    id: "organic-reactions",
    title: "Organic Reactions – SN1 vs SN2",
    folderId: "chemistry",
    updated: "Yesterday",
    summary: "Mechanisms, rate laws, and what favours each pathway.",
    sections: [
      {
        heading: "SN1",
        bullets: [
          "SN1 rate law: rate = k[substrate], first order",
          "Intermediate: a carbocation forms in the slow step",
          "Favoured by: tertiary substrates and polar protic solvents",
        ],
      },
      {
        heading: "SN2",
        bullets: [
          "SN2 rate law: rate = k[substrate][nucleophile]",
          "Stereochemistry: inversion of configuration (backside attack)",
          "Favoured by: primary substrates and polar aprotic solvents",
        ],
      },
    ],
  },
  {
    id: "chemical-bonding",
    title: "Chemical Bonding Basics",
    folderId: "chemistry",
    updated: "4 days ago",
    summary: "Ionic, covalent and metallic bonds with examples.",
    sections: [
      {
        heading: "Bond types",
        bullets: [
          "Ionic bond: electron transfer between metal and non-metal",
          "Covalent bond: shared electron pairs between non-metals",
          "Metallic bond: a sea of delocalised electrons",
        ],
      },
    ],
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis – Light & Calvin Cycle",
    folderId: "biology",
    updated: "3 days ago",
    summary: "Light reactions, Calvin cycle, and limiting factors.",
    sections: [
      {
        heading: "Overview",
        bullets: [
          "Photosynthesis: converts light energy into chemical energy",
          "Location: chloroplasts in plant cells",
          "Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
        ],
      },
      {
        heading: "Stages",
        bullets: [
          "Light reactions: happen in thylakoids and make ATP + NADPH",
          "Calvin cycle: happens in the stroma and fixes CO₂ into glucose",
        ],
      },
      {
        heading: "Limiting factors",
        bullets: [
          "Light intensity: more light is faster, up to a point",
          "Optimum temperature: roughly 25–35 °C",
        ],
      },
    ],
  },
  {
    id: "cell-division",
    title: "Cell Division – Mitosis & Meiosis",
    folderId: "biology",
    updated: "1 week ago",
    summary: "Phases, differences, and why meiosis matters.",
    sections: [
      {
        heading: "Mitosis",
        bullets: [
          "Mitosis outcome: two identical diploid cells",
          "Phases: prophase, metaphase, anaphase, telophase",
        ],
      },
      {
        heading: "Meiosis",
        bullets: [
          "Meiosis outcome: four genetically different haploid cells",
          "Crossing over: swaps genetic material in prophase I",
        ],
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists – Singly & Doubly",
    folderId: "dsa",
    updated: "5 days ago",
    summary: "Node structure, operations and complexity.",
    sections: [
      {
        heading: "Structure",
        bullets: [
          "Node: stores data and a pointer to the next node",
          "Doubly linked list: nodes also point to the previous node",
        ],
      },
      {
        heading: "Complexity",
        bullets: [
          "Insert at head: O(1)",
          "Search: O(n), since there is no random access",
        ],
      },
    ],
  },
  {
    id: "binary-trees",
    title: "Binary Trees & Traversals",
    folderId: "dsa",
    updated: "2 weeks ago",
    summary: "Inorder, preorder, postorder and BST properties.",
    sections: [
      {
        heading: "Traversals",
        bullets: [
          "Inorder: left, root, right — gives sorted order in a BST",
          "Preorder: root, left, right",
          "Postorder: left, right, root",
        ],
      },
      {
        heading: "BST",
        bullets: [
          "BST property: left subtree < node < right subtree",
          "Balanced BST search: O(log n)",
        ],
      },
    ],
  },
];

export const getFolder = (id: string) => folders.find((f) => f.id === id);
export const getNote = (id: string) => notes.find((n) => n.id === id);
export const notesInFolder = (id: string) => notes.filter((n) => n.folderId === id);

export interface QA {
  q: string;
  a: string;
}

const thermoQA: QA[] = [
  { q: "State the first law of thermodynamics.", a: "dU = δQ − δW — energy is conserved." },
  { q: "What is ΔU for a closed system?", a: "ΔU = Q − W." },
  { q: "When is Q positive?", a: "When heat flows into the system." },
  { q: "When is W positive?", a: "When work is done by the system." },
  { q: "What does entropy measure?", a: "Disorder, or the number of microstates." },
  { q: "What does the second law say about an isolated system?", a: "Its entropy never decreases: ΔS ≥ 0." },
  { q: "Give ΔS for a reversible process.", a: "ΔS = ∫ δQrev / T." },
  { q: "Internal energy of an ideal gas depends on…?", a: "Only temperature (U = nCvT)." },
  { q: "What is Mayer's relation?", a: "Cp − Cv = R." },
  { q: "In an isothermal ideal-gas process, how are Q and W related?", a: "ΔU = 0, so Q = W." },
];

export function revisionPack(note: Note): { pointers: string[]; qa: QA[] } {
  const all = note.sections.flatMap((s) => s.bullets);
  const pointers = all.map((b) => b.replace(/:\s*/, " — "));
  if (note.id === "thermodynamics") return { pointers, qa: thermoQA };
  const qa: QA[] = all.map((b) => {
    const [term, ...rest] = b.split(":");
    return rest.length
      ? { q: `What do you know about “${(term ?? "").trim()}”?`, a: rest.join(":").trim() }
      : { q: "Complete the idea:", a: b };
  });
  let i = 0;
  while (qa.length < 10) {
    const s = note.sections[i % note.sections.length]!;
    qa.push({ q: `Summarise “${s.heading}” in one line.`, a: s.bullets.join("; ") });
    i++;
  }
  return { pointers, qa: qa.slice(0, 10) };
}
