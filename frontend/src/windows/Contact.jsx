import { socials, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls
          target={WINDOW_KEYS.CONTACT}
          title="Contact"
        />
      </div>

      <div className="content px-8 pt-8 pb-6 space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="relative size-24 rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-40" />
            <div className="relative size-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5">
              <img
                className="size-full rounded-full object-cover"
                src="/images/me.jpeg"
                alt="Kiran Pokhrel"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold font-georama">
            Kiran Pokhrel
          </h3>
          <p className="text-sm leading-relaxed opacity-80 max-w-xs mx-auto">
            Software Developer — building things that matter.
          </p>
        </div>

        <ul className="space-y-2.5 max-w-sm mx-auto">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundColor: bg,
                  boxShadow: `0 4px 14px ${bg}55`,
                }}
              >
                {icon === "mail" ? (
                  <Mail
                    size={18}
                    className="text-white/90"
                  />
                ) : (
                  <img
                    src={icon}
                    alt={text}
                    className="size-[18px]"
                  />
                )}
                <span className="flex-1">{text}</span>
                <ExternalLink
                  size={14}
                  className="text-white/60"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(
  Contact,
  WINDOW_KEYS.CONTACT
);

export default ContactWindow;
