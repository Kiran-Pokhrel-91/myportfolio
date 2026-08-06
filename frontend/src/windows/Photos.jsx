import { photosLinks, WINDOW_KEYS } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { MoveRight, ImageIcon } from "lucide-react";

const Photos = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls
          target={WINDOW_KEYS.PHOTOS}
          title="Gallery"
        />
      </div>

      <div className="blog">
        <h2>Gallery</h2>
        {photosLinks.length > 0 ? (
          <div className="space-y-8">
            {photosLinks.map(({ id, title, date, link }) => (
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
                    View album{" "}
                    <MoveRight className="icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20">
              <ImageIcon
                size={28}
                className="text-pink-400/60"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium opacity-60">
                Coming Soon
              </p>
              <p className="text-xs opacity-40 max-w-xs mx-auto">
                A curated collection of screenshots and
                project previews coming soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(
  Photos,
  WINDOW_KEYS.PHOTOS
);
PhotosWindow.displayName = "Photos";

export default PhotosWindow;
