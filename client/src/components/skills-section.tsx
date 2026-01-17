import { motion } from "framer-motion";
import { RevealSection } from "./reveal-section";

const skillCategories = [
    {
        title: "Programming Languages",
        skills: ["Python", "SQL", "C++", "C", "Bash", "JavaScript", "TypeScript"],
    },
    {
        title: "Frameworks & Libraries",
        skills: [
            "TensorFlow",
            "Pandas",
            "Matplotlib",
            "Scikit-learn",
            "PyTorch",
            "NLTK",
            "Telethon",
            "NumPy",
            "React",
            "Node.js",
        ],
    },
    {
        title: "Tools & Cloud",
        skills: [
            "AWS",
            "Firebase",
            "Git",
            "Terminal",
            "Tableau",
            "Excel",
            "VSCode",
            "Android Studio",
            "Postman",
        ],
    },
    {
        title: "Domains",
        skills: [
            "Data Analysis",
            "Data Visualization",
            "Cloud Computing",
            "AI/ML",
            "Web Development",
        ],
    },
    {
        title: "Languages",
        skills: ["English", "Hindi (Native)", "Marathi"],
    },
];

export function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative py-dramatic bg-card/20"
            data-testid="section-skills"
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <RevealSection>
                        <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground block mb-8">
                            Technical Stack
                        </span>
                    </RevealSection>

                    <RevealSection delay={0.1}>
                        <h2 className="text-section md:text-7xl font-display font-medium tracking-tight text-foreground mb-16 leading-[0.9]">
                            Tools &{" "}
                            <span className="font-editorial italic font-light">
                                Technologies
                            </span>
                        </h2>
                    </RevealSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {skillCategories.map((category, categoryIndex) => (
                            <RevealSection
                                key={category.title}
                                delay={0.2 + categoryIndex * 0.1}
                            >
                                <div className="group">
                                    <h3 className="text-lg font-display text-foreground mb-6 pb-3 border-b border-border/50">
                                        {category.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.span
                                                key={skill}
                                                className="px-3 py-1.5 text-sm bg-background/50 border border-border/30 rounded-full text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-colors"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>

                    <RevealSection delay={0.8} className="mt-16">
                        <div className="p-8 bg-card/30 rounded-md border border-border/30">
                            <p className="text-meta uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                Operating Systems
                            </p>
                            <p className="text-lg text-foreground/80">
                                Linux (Ubuntu) • iOS • Windows
                            </p>
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
