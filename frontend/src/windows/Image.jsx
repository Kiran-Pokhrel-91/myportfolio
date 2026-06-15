import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WINDOW_KEYS } from "#constants";

const ImageContent = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = windows[windowKey]?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target={windowKey} title={name} />
      </div>

      <div className="p-5">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageContent, WINDOW_KEYS.IMAGE);

export default ImageWindow;
export { ImageContent };
