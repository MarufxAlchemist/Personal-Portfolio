# Design Guidelines: Experimental Portfolio Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from avant-garde digital art portfolios and luxury fashion editorial sites, creating a handcrafted statement piece that breaks conventional patterns.

## Overall Aesthetic
- **Bold, avant-garde, confident, slightly rebellious**
- Editorial fashion meets creative-developer aesthetic
- Feels handcrafted and bespoke, not templated
- Designed to impress designers and creative technologists within 5 seconds

## Color Palette
- **Primary Background**: Pure black (#000000)
- **Text/Accents**: Off-white and muted tones (cream, light gray)
- **Purpose**: Maximum contrast for dramatic impact, luxury feel

## Typography System

### Hierarchy (Extreme Scale Differences)
- **Hero Headlines**: Massive scale (120-200px desktop, 60-80px mobile)
- **Section Titles**: Large editorial scale (48-72px)
- **Body Text**: Standard readable size (16-18px)
- **Meta Text**: Intentionally small (10-12px for dates, categories)

### Font Selection
- Modern editorial grotesk or serif-inspired typefaces
- Typography treated as visual element, not just content
- Strong, confident character with high x-height

## Layout System

### Spacing Strategy
- **Dramatic Vertical Rhythm**: Use py-32, py-40, py-48 for section spacing
- **Asymmetrical Layouts**: Intentional imbalance, avoid centered grids
- **Breathing Room**: Generous whitespace between major elements

### Grid Approach
- Break traditional grid systems deliberately
- Offset elements from standard alignment
- Create visual tension through imbalance

## Component Library

### Hero Section (Fullscreen)
- 100vh fullscreen treatment
- Oversized animated typography (split-letter animations, staggered motion)
- Subtle 3D depth illusion in background
- Mouse parallax effects that shift elements based on cursor position
- Abstract floating shapes with subtle movement

### Projects/Work Section
- Large immersive project cards with generous spacing
- Hover states: scale transforms, depth blur effects, motion responses
- Project titles animate independently from images
- Click interactions trigger smooth transitions (no hard navigation)
- Asymmetrical card layouts, varied sizes

### 3D/Abstract Elements
- Floating geometric shapes with depth
- Shapes react to scroll position and cursor movement
- Layered perspective effects for atmospheric depth
- Prioritize mood over realism

## Animation Specifications

### Page Load
- Hero text: Split-letter entrance with staggered easing
- Elements fade/slide in with intentional choreography
- Total entrance sequence: 2-3 seconds

### Scroll Behavior
- Smooth, cinematic scrolling (not native snap)
- Scroll-triggered reveals: text fades, slides, scales on viewport entry
- Sections enter/exit with motion, not static jumps
- Parallax layering at different scroll speeds

### Idle State
- Subtle micro-animations keep page feeling alive
- Floating shapes gentle drift
- Text occasionally subtle shifts or glows

### Hover Interactions
- Physical-feeling responses (scale, blur, depth shifts)
- Independent animation timing for different elements
- Magnetic effects where appropriate

## Images
**Hero Section**: Use abstract dark gradient or textured background rather than photography—maintains the minimalist luxury aesthetic while providing depth. Alternatively, a very subtle particle field or geometric pattern.

**Project Cards**: Each card features a large showcase image (16:9 or custom ratios). Images should be high-quality placeholders representing creative work (abstract compositions, UI mockups, 3D renders).

## Technical Constraints
- React-based modular component structure
- CSS/JavaScript for animations (Framer Motion, GSAP)
- Architecture prepared for future WebGL/Three.js integration
- Smooth 60fps performance target
- All content uses placeholders for easy replacement

## Content Strategy
- Placeholder project names, descriptions, and imagery
- NOT focused on real branding or copy
- Structure designed for future content injection
- Focus on form and interaction over actual content messaging

## Key Principles
1. **Immediate Impact**: First 5 seconds must impress
2. **Cinematic Feel**: Every scroll, hover, transition feels intentional
3. **Digital Craftsmanship**: Hand-tuned details throughout
4. **Experimental Spirit**: Push boundaries while maintaining usability
5. **Statement Piece**: This is creative identity, not corporate presence