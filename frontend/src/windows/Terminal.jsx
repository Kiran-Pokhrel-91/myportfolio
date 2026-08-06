import { techStack, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  Check,
  Cpu,
  Globe,
  Database,
  Code,
  Wrench,
  Brain,
  Terminal as TerminalIcon,
} from "lucide-react";

const CATEGORY_ICONS = {
  Languages: Globe,
  Frontend: Code,
  Backend: TerminalIcon,
  Database: Database,
  "Data & ML": Brain,
  "Dev Tools": Wrench,
};

const CATEGORY_COLORS = {
  Languages: "text-emerald-400",
  Frontend: "text-sky-400",
  Backend: "text-violet-400",
  Database: "text-amber-400",
  "Data & ML": "text-rose-400",
  "Dev Tools": "text-cyan-400",
};

const Terminal = () => {
  const totalTechs = techStack.reduce(
    (sum, c) => sum + c.items.length,
    0
  );

  return (
    <>
      <div id="window-header">
        <WindowControls
          target={WINDOW_KEYS.TERMINAL}
          title="Skills"
        />
      </div>

      <div className="techstack">
        <div className="term-banner">
          <span className="prompt-user">kiran</span>
          <span className="prompt-at">@</span>
          <span className="prompt-host">portfolio</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-dollar">$</span>
          <span className="prompt-cmd">
            {" "}
            show tech-stack --all --verbose
          </span>
          <span className="cursor" />
        </div>

        <div className="stack-grid">
          {techStack.map(({ category, items }) => {
            const Icon =
              CATEGORY_ICONS[category] || Check;
            const colorClass =
              CATEGORY_COLORS[category] ||
              "text-slate-400";
            return (
              <div
                key={category}
                className="category-card"
              >
                <div className="category-header">
                  <Icon size={14} className={colorClass} />
                  <h3>{category}</h3>
                </div>
                <div className="tech-items">
                  {items.map((item, i) => (
                    <span key={i} className="tech-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="term-footer">
          <span className="flex items-center gap-1.5">
            <Check
              size={13}
              className="text-emerald-400"
            />
            {techStack.length} categories ·{" "}
            {totalTechs} technologies
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu size={12} className="text-sky-400" />
            ready
          </span>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(
  Terminal,
  WINDOW_KEYS.TERMINAL
);

export default TerminalWindow;
