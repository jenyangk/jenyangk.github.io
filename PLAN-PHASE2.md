# Phase 2: Interactive Visualization & Project Deep-Dives

## The Goal

Make the portfolio less like a résumé, more like a workshop tour. Visitors should _see_ how things connect—not just read a list.

---

## 1. Interactive Skills Graph

**What it is:**  
A visual diagram showing how different tools and systems connect in real projects. Not a static skill tree—an actual visualization of architecture patterns I've worked with.

**The idea:**  
Instead of "I know React, I know .NET, I know Azure"—show a system diagram:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │ ──── │   API       │ ──── │             │
│   Frontend  │      │   Backend   │      │   Services  │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
  TypeScript            C# / Go            SQL + Redis
  Tailwind              REST/gRPC          Blob Storage
```

**Interaction:**

- Hover on nodes to highlight connected pieces
- Click to see "Projects using this stack"
- Different views: Web Apps, Mobile Apps, IoT Systems

**Implementation:**

- Use **D3.js** or **React Flow** for the graph
- Keep the industrial aesthetic: sharp edges, blueprint colors
- Nodes styled like the BentoCards (1px borders, corner marks)

---

## 2. Dedicated Project Pages

**What it is:**  
Full case-study pages for each major project. Currently they're condensed into small cards—but the good stuff (problem, approach, lessons) needs room to breathe.

**Page Structure (for each project):**

```
┌────────────────────────────────────────────────────────────┐
│  PROJECT TITLE                                    [DEMO]   │
│  ═════════════════════════════════════════════════════════ │
│                                                            │
│  THE PROBLEM                                               │
│  What wasn't working? Why did this need to exist?          │
│                                                            │
│  ─────────────────────────────────────────────────────────│
│                                                            │
│  THE APPROACH                                              │
│  Architecture diagram + tech decisions + tradeoffs         │
│  [Interactive stack visualization here]                    │
│                                                            │
│  ─────────────────────────────────────────────────────────│
│                                                            │
│  THE TRICKY PARTS                                          │
│  Specific challenges I solved—with code snippets           │
│                                                            │
│  ─────────────────────────────────────────────────────────│
│                                                            │
│  WHAT I LEARNED                                            │
│  Takeaways, things I'd do differently                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Projects to expand:**

1. **DouDou** - Real-time voting, Supabase subscriptions
2. **SE-OER** - Full-stack Django + React + Postgres
3. **PCL IoT Platform** - Microservices, Azure, Mobile/Web
4. **Web3 Experiments** - Solidity, smart contract patterns

**Implementation:**

- React Router for `/projects/:slug`
- Shared layout component with project-specific content
- Include small interactive diagrams per project

---

## 3. More Visual, Less Text

**What it is:**  
Replace walls of text with scannable visuals. Show, don't tell.

**Specific replacements:**

| Current (Text)                  | Replace With (Visual)                 |
| ------------------------------- | ------------------------------------- |
| Skills list grouped by category | Interactive node graph (see §1)       |
| Experience bullet points        | Timeline with expandable cards        |
| "I built X with Y and Z"        | Mini architecture diagram per project |
| Book reading list               | Visual book covers in a row           |

**New Visual Components:**

### Timeline Component

For experience history—visual progression, not a list:

```
2017 ──●── Sunway (Research)
       │
2021 ──●── PCL (Analyst → Developer)
       │
Now  ──●── Still building
```

### Architecture Diagrams

Per-project mini visualizations (smaller version of the skills graph)

### Stats/Metrics Block

If applicable—numbers are more memorable than paragraphs:

- "3 production systems"
- "5+ years of TypeScript"
- "50K+ lines deployed"

---

## Implementation Phases

### Phase 2.1: Project Pages Foundation

- [ ] Set up React Router
- [ ] Create `/projects/:slug` route
- [ ] Build ProjectPage layout component
- [ ] Migrate DouDou to full page
- [ ] Migrate SE-OER to full page

### Phase 2.2: Interactive Skills Graph

- [ ] Install React Flow or D3
- [ ] Design node/edge data structure
- [ ] Build SkillsGraph component
- [ ] Add hover interactions
- [ ] Add click → project filtering

### Phase 2.3: Visual Replacements

- [ ] Build Timeline component for experience
- [ ] Create mini architecture diagrams
- [ ] Add book covers for reading list
- [ ] Replace remaining text-heavy sections

### Phase 2.4: Polish

- [ ] Page transitions (Framer Motion)
- [ ] Loading states
- [ ] Mobile responsiveness for graphs
- [ ] Accessibility (keyboard nav for graph)

---

## Technical Decisions

**Routing:** React Router v6 (already have React, keep it simple)

**Graph Library Options:**

- **React Flow** — Better for node-based diagrams, easier React integration
- **D3.js** — More flexible, but heavier
- **Recommendation:** Start with React Flow for the skills graph

**Animation:** Continue using Framer Motion for consistency

**Code Syntax Highlighting:** Prism or Shiki for project code snippets

---

## Open Questions

1. Should project pages be separate routes or modal overlays?
    - Leaning: Separate routes (better for sharing, SEO)

2. How detailed should the PCL work be? (NDA considerations)
    - Leaning: Architecture patterns and learnings, not specifics

3. Mobile experience for the skills graph?
    - Option A: Simplified list on mobile
    - Option B: Horizontal scroll graph
    - Leaning: Simplified view with expandable details

---

## Next Step

Fix current UI issues (text size, hero layout), then start with **Phase 2.1: Project Pages Foundation**.
