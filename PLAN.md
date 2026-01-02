# Portfolio Redesign Plan: "The Craftsman's Workshop"

## 1. Design Direction

**Visual Style: "Industrial Precision"**

-   **Vibe:** Technical, robust, and organized. Think of a well-kept engineer's workbench or a high-quality blueprint.
-   **Elements:**
    -   **Grid-Based Layout:** Everything aligns perfectly.
    -   **Sharp Borders:** Distinct `1px` borders (`border-border`) defining content areas.
    -   **Typography:**
        -   _Headers:_ Monospace / Technical (e.g., `Libre Barcode`, `JetBrains Mono`) to feel like labels or code.
        -   _Body:_ Clean Sans-Serif (e.g., `Neue Haas Grotesk`) for maximum readability.
    -   **Motion:** Snappy, mechanical transitions. No soft, dreamy fades.

**Tone of Voice: "The Craftsman"**

-   **Vibe:** Down-to-earth, honest, and capable.
-   **Philosophy:** "I don't just write code; I build systems that work."
-   **Avoid:** Corporate buzzwords ("synergy", "leveraging", "paradigm shift").
-   **Embrace:** Plain English ("fixed", "built", "designed", "solved").

---

## 2. Implementation Phases

### Phase 1: The Workbench (Layout & Structure)

Move from a linear list to a modular **Bento Grid**. This allows for non-linear storytelling, placing a philosophy statement next to a technical project.

-   **Component:** `BentoGrid` & `BentoCard`.
-   **Features:** Responsive grid (1 col mobile, 3 col desktop).
-   **Styling:** High contrast, distinct borders, "card" aesthetic without the shadow-heavy "material" look.

### Phase 2: The Toolkit (Skills Reimagined)

Replace the "Wall of Icons" with purposeful groupings that explain _why_ you use these tools.

-   **Group 1: "Heavy Lifting" (Reliable & Robust)**
    -   _Tools:_ C#, .NET, Go, SQL, Azure.
    -   _Context:_ "For building systems that don't break."
-   **Group 2: "Look & Feel" (Fast & Interactive)**
    -   _Tools:_ React, Tailwind, TypeScript, Three.js.
    -   _Context:_ "For interfaces that feel good to use."
-   **Group 3: "Everywhere Else" (Versatility)**
    -   _Tools:_ Xamarin, Mobile, Scripts.
    -   _Context:_ "For reaching users on any device."

### Phase 3: The Stories (Projects & Experience)

Transform project descriptions into "Case Studies" that highlight the generalist approach.

-   **DouDou:** Highlight the _real-time_ challenge (Supabase) + _social_ aspect.
-   **SE-OER:** Highlight the _educational_ impact + _full-stack_ nature (Django + React).
-   **Web3/Experiments:** Group smaller projects into a single "Experiments" block to show range without clutter.
-   **Experience:** Integrate PCL and Sunway roles as "Career" blocks within the grid.

### Phase 4: The Voice (Copy & Manifesto)

Rewrite the copy to be direct and human.

-   **Hero Section:**
    -   _Headline:_ "Hi, I'm Andy. I build software that works."
    -   _Sub:_ "No buzzwords. Just solid code, from the database to the pixel."
-   **The "Generalist" Block:**
    -   A specific grid block dedicated to the value of being a generalist.
    -   _Concept:_ "I speak both languages: Design and Engineering."

---

## 3. Execution Order

1.  **Scaffold**: Create `src/components/ui/bento-grid.tsx` (Grid container and items).
2.  **Refine**: Create `src/components/toolkit.tsx` (The new skills section).
3.  **Assemble**: Update `App.tsx` to implement the new layout and copy.
4.  **Polish**: Adjust Tailwind classes for the "Industrial" look (borders, spacing, typography).
