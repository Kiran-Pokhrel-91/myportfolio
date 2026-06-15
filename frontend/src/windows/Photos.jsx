import { photosLinks, WINDOW_KEYS } from '#constants';
import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import { ExternalLink, MoveRight } from 'lucide-react';

const Photos = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target={WINDOW_KEYS.PHOTOS} title="Gallery" />
      </div>

      <div className="blog">
        <h2>Gallery</h2>
        {photosLinks.length > 0 ? (
          <div className="space-y-8">
            {photosLinks.map(({id, title, date, link}) => (
              <div key={id} className="blog-post">
                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <a href={link} target="_blank" rel="noopener noreferrer">View album <MoveRight className="icon" /></a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <ExternalLink size={32} className="opacity-20 mx-auto" />
            <p className="text-sm opacity-50">Gallery yet to be updated</p>
          </div>
        )}
      </div>
    </>
  )
}

const PhotosWindow = WindowWrapper(Photos, WINDOW_KEYS.PHOTOS);
PhotosWindow.displayName = "Photos";

export default PhotosWindow;
