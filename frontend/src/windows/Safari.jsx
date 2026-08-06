import { blogPosts, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { MoveRight, BookOpen } from "lucide-react";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls
          target={WINDOW_KEYS.SAFARI}
          title="Articles"
        />
      </div>

      <div className="blog">
        <h2>Articles</h2>
        {blogPosts.length > 0 ? (
          <div className="space-y-8">
            {blogPosts.map(({ id, title, date, link }) => (
              <div key={id} className="blog-post">
                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100"
                  >
                    Read article{" "}
                    <MoveRight className="icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <BookOpen
                size={28}
                className="text-blue-400/60"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium opacity-60">
                Coming Soon
              </p>
              <p className="text-xs opacity-40 max-w-xs mx-auto">
                Articles and technical deep-dives will be
                published here soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(
  Safari,
  WINDOW_KEYS.SAFARI
);

export default SafariWindow;
