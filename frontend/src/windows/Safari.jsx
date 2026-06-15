import { blogPosts, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { ExternalLink, MoveRight } from "lucide-react";

const Safari = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target={WINDOW_KEYS.SAFARI} title="Articles" />
        </div>

        <div className="blog">
          <h2>Articles</h2>
          {blogPosts.length > 0 ? (
            <div className="space-y-8">
              {blogPosts.map(({id, title, date, link}) => (
                <div key={id} className="blog-post">
                  <div className="content">
                    <p>{date}</p>
                    <h3>{title}</h3>
                    <a href={link} target="_blank" rel="noopener noreferrer">Read article <MoveRight className="icon" /></a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <ExternalLink size={32} className="opacity-20 mx-auto" />
              <p className="text-sm opacity-50">Articles yet to be updated</p>
            </div>
          )}
        </div>
    </>
  )
};

const SafariWindow = WindowWrapper(Safari, WINDOW_KEYS.SAFARI)

export default SafariWindow;
