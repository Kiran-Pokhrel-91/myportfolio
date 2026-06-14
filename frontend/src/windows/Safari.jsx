import { blogPosts, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronLeft, ChevronRight, Copy, ExternalLink, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";
import { useState } from "react";

const Safari = () => {
  const [url, setUrl] = useState("");

  const handleUrlSubmit = (e) => {
    if (e.key !== "Enter") return;
    let href = url.trim();
    if (!href) return;
    if (!/^https?:\/\//i.test(href)) href = "https://" + href;
    window.open(href, "_blank");
  };

  return (
    <>
        <div id="window-header">
            <WindowControls target={WINDOW_KEYS.SAFARI} />
            <PanelLeft className="ml-10 icon" />
            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon" />
                <ChevronRight className="icon" />
            </div>
            <div className="flex-1 flex-center gap-3">
                <ShieldHalf className="icon" />
                <div className="search">
                    <Search className="icon" />
                    <input
                      type="text"
                      placeholder="Search or enter website name"
                      className="flex-1"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={handleUrlSubmit}
                    />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <Share className="icon" />
                <Plus className="icon" />
                <Copy className="icon" />
            </div>
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
