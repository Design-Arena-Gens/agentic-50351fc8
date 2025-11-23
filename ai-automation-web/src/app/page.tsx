'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  courses,
  Course,
  SkillLevel,
  LearningFormat,
} from "@/data/courses";
import { roadmap } from "@/data/roadmap";
import { resources } from "@/data/resources";

const faqs = [
  {
    question: "How should I choose my first AI automation course?",
    answer:
      "Start with the role you play today. If you're an operator or marketer, the Zapier path gives quick wins. Builders who prefer hands-on projects tend to thrive in Buildspace or LangChain Academy. Pick one course that matches your learning style, then layer deeper tracks as you ship automations.",
  },
  {
    question: "Do I need to code to get value from these courses?",
    answer:
      "No. The guide mixes no-code, low-code, and engineering-heavy paths. Use the filters to focus on no-code and beginner-friendly options, then graduate into engineering tracks once you need custom automation logic.",
  },
  {
    question: "What makes a great AI automation learning plan?",
    answer:
      "The most successful learners keep a real use case in front of them. Use the roadmap to move from mapping opportunities to prototyping, hardening, and scaling. Share progress with stakeholders every week so the automation earns traction as you learn.",
  },
];

const levels: Array<SkillLevel | "All"> = ["All", "Beginner", "Intermediate", "Advanced"];
const formats: Array<LearningFormat | "All"> = [
  "All",
  "Self-paced",
  "Cohort",
  "Bootcamp",
  "Certification",
  "Mixed",
];

const focusAreas = [
  "All",
  ...Array.from(new Set(courses.flatMap((course) => course.focus))),
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<SkillLevel | "All">("All");
  const [format, setFormat] = useState<LearningFormat | "All">("All");
  const [focus, setFocus] = useState<string>("All");

  const featuredCourse = useMemo<Course>(() => {
    return [...courses].sort((a, b) => b.rating - a.rating)[0];
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        query.length === 0 ||
        [course.title, course.provider, course.summary, course.bestFor, ...course.focus, ...course.skills]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesLevel = level === "All" || course.level === level;
      const matchesFormat = format === "All" || course.format === format;
      const matchesFocus = focus === "All" || course.focus.includes(focus);

      return matchesSearch && matchesLevel && matchesFormat && matchesFocus;
    });
  }, [search, level, format, focus]);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_rgba(40,114,255,0.22),_rgba(10,12,25,1)_65%)] text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-16 md:px-10 lg:px-16">
        <Hero featuredCourse={featuredCourse} />

        <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
          <header className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <span>🔎</span>
              <span>Curated automation curriculum</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Find the course that matches your next automation milestone
            </h2>
            <p className="text-sm text-slate-300 md:text-base">
              Filter by skill level, learning format, and focus area. Every recommendation is vetted for depth, community support, and real project outcomes.
            </p>
          </header>
          <Filters
            search={search}
            onSearchChange={setSearch}
            level={level}
            onLevelChange={setLevel}
            format={format}
            onFormatChange={setFormat}
            focus={focus}
            onFocusChange={setFocus}
          />
          <div className="flex items-center justify-between text-sm text-slate-300">
            <p>
              Showing <span className="font-semibold text-white">{filteredCourses.length}</span>{" "}
              course{filteredCourses.length === 1 ? "" : "s"} from our automation shortlist.
            </p>
            <p className="hidden md:block">
              Tip: bookmark this hub — we refresh it as new agentic tooling graduates from beta.
            </p>
          </div>
          <CourseGrid courses={filteredCourses} />
        </section>

        <Roadmap />

        <ResourceDeck />

        <FAQ />

        <footer className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300 backdrop-blur-md md:flex md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">Keep your learning loop tight.</p>
            <p>
              Ship one automation per week, document the ROI, and refine your stack as new tools land.
            </p>
          </div>
          <Link
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-5 py-2 font-semibold text-slate-950 transition hover:bg-emerald-300 md:mt-0"
            href="#top"
          >
            ⬆ Back to top
          </Link>
        </footer>
      </div>
    </div>
  );
}

function Hero({ featuredCourse }: { featuredCourse: Course }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-slate-900/70 to-slate-950 p-10 text-slate-100 shadow-[0_0_120px_rgba(32,154,255,0.2)]"
    >
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -right-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium">
            <span>⚙️</span>
            <span>AI Automation Learning Compass</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Become the teammate who ships reliable AI automations — faster.
          </h1>
          <p className="text-base text-slate-200 md:text-lg">
            Skip the endless course scrolling. Compare the highest-signal programs for AI automation,
            map them to your goals, and follow a proven learning loop from idea to production rollout.
          </p>
          <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            <HeroBullet text="Curated syllabus for builders, operators, and leaders." />
            <HeroBullet text="Filters for skill level, format, and automation focus." />
            <HeroBullet text="Roadmap that keeps your learning tied to business impact." />
            <HeroBullet text="Tool stack and community picks that stay current." />
          </ul>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/15 bg-slate-900/70 p-6 backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Spotlight Program
          </p>
          <h3 className="text-2xl font-semibold text-white">{featuredCourse.title}</h3>
          <p className="text-sm text-slate-200">
            {featuredCourse.summary}
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              <strong className="text-white">Provider:</strong> {featuredCourse.provider}
            </li>
            <li>
              <strong className="text-white">Format:</strong> {featuredCourse.format} · {featuredCourse.duration}
            </li>
            <li>
              <strong className="text-white">Why it matters:</strong> {featuredCourse.bestFor}
            </li>
          </ul>
          <Link
            href={featuredCourse.url}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            target="_blank"
          >
            Explore the lab ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroBullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-emerald-300">▹</span>
      <span>{text}</span>
    </li>
  );
}

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  level: SkillLevel | "All";
  onLevelChange: (value: SkillLevel | "All") => void;
  format: LearningFormat | "All";
  onFormatChange: (value: LearningFormat | "All") => void;
  focus: string;
  onFocusChange: (value: string) => void;
}

function Filters({
  search,
  onSearchChange,
  level,
  onLevelChange,
  format,
  onFormatChange,
  focus,
  onFocusChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2">
          <span className="text-lg">🔍</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none md:text-base"
            placeholder="Search course titles, skills, or automation topics"
            type="search"
          />
        </label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <FilterSelect
            label="Skill Level"
            options={levels}
            value={level}
            onChange={onLevelChange}
          />
          <FilterSelect
            label="Format"
            options={formats}
            value={format}
            onChange={onFormatChange}
          />
          <FilterSelect
            label="Focus"
            options={focusAreas}
            value={focus}
            onChange={onFocusChange}
          />
        </div>
      </div>
    </div>
  );
}

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function CourseGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-10 text-center text-slate-300">
        <p className="text-lg font-semibold text-white">
          No matches yet.
        </p>
        <p className="mt-2 text-sm">
          Adjust the filters or reset your search. We refresh the catalog monthly as new high-signal programs appear.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_30px_60px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
          {course.provider}
        </span>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-200">
          ⭐ {course.rating.toFixed(1)}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{course.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{course.summary}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-300">
        <Badge icon="🎯">{course.level}</Badge>
        <Badge icon="🧭">{course.format}</Badge>
        <Badge icon="⏱">{course.duration}</Badge>
        <Badge icon="💰">{course.price}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {course.focus.map((item) => (
          <span
            key={item}
            className="rounded-full border border-blue-400/20 bg-blue-400/15 px-3 py-1 text-xs text-blue-100"
          >
            #{item}
          </span>
        ))}
      </div>

      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 text-sm text-slate-200">
        <p className="font-semibold text-white">Why it works:</p>
        <p className="mt-1">{course.bestFor}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Skill gains
        </p>
        <ul className="mt-2 space-y-2 text-sm text-slate-200">
          {course.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-300">▹</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-4 text-sm text-slate-300">
        <p>{course.skills.join(" · ")}</p>
        <Link
          href={course.url}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          View course ↗
        </Link>
      </div>
    </article>
  );
}

function Badge({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1">
      <span>{icon}</span>
      <span>{children}</span>
    </span>
  );
}

function Roadmap() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
      <header className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/15 px-3 py-1 text-xs font-semibold text-blue-100">
          🛣️ Learning road map
        </div>
        <h2 className="text-2xl font-semibold text-white">Ship value while you learn</h2>
        <p className="text-sm text-slate-300 md:text-base">
          Reduce course overwhelm by tying everything to a four-phase loop. Each step links straight to the courses that help you clear it.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {roadmap.map((step, index) => (
          <div
            key={step.id}
            className="relative rounded-2xl border border-white/10 bg-slate-950/60 p-6"
          >
            <span className="absolute -top-3 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/40 text-base font-bold text-slate-950">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{step.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {step.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/5 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Courses to lean on
              </p>
              <ul className="mt-2 space-y-2 text-sm text-emerald-200">
                {step.recommendedCourses.map((courseId) => {
                  const course = courses.find((item) => item.id === courseId);
                  if (!course) return null;

                  return (
                    <li key={courseId} className="flex items-center gap-2">
                      <span>↳</span>
                      <Link
                        href={course.url}
                        target="_blank"
                        className="transition hover:text-emerald-100"
                      >
                        {course.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-4 text-sm text-slate-200">
              <span className="font-semibold text-white">Outcome:</span> {step.outcome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResourceDeck() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
      <header className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/15 px-3 py-1 text-xs font-semibold text-purple-100">
          🧰 Learning boosters
        </div>
        <h2 className="text-2xl font-semibold text-white">Tools & communities to keep momentum high</h2>
        <p className="text-sm text-slate-300 md:text-base">
          Pair your courses with templates, newsletters, and communities that surface new automation plays every week.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-5"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                {resource.category}
              </span>
              <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
              <p className="text-sm text-slate-300">{resource.description}</p>
            </div>
            <Link
              href={resource.url}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Open resource ↗
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
      <header className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/15 px-3 py-1 text-xs font-semibold text-orange-100">
          💡 Guidance
        </div>
        <h2 className="text-2xl font-semibold text-white">Frequently asked</h2>
        <p className="text-sm text-slate-300 md:text-base">
          Make choices with clarity and keep your learning loop grounded in business results.
        </p>
      </header>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-emerald-400/50"
          >
            <summary className="cursor-pointer list-none font-semibold text-white">
              <div className="flex items-center justify-between gap-2 text-left">
                <span>{faq.question}</span>
                <span className="text-lg transition group-open:rotate-45">+</span>
              </div>
            </summary>
            <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
