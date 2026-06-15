import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WINDOW_KEYS } from "#constants";

const TextContent = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = windows[windowKey]?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  const hasContent = subtitle || (Array.isArray(description) && description.length > 0);

  return (
    <>
      <div id="window-header">
        <WindowControls target={windowKey} title={name} />
      </div>

      <div className="text-body">
        {image ? (
          <div className="hero-image">
            <img src={image} alt={name} />
          </div>
        ) : null}

        {hasContent ? (
          <div className="text-content">
            {subtitle ? (
              <h3 className="subtitle">{subtitle}</h3>
            ) : null}

            {Array.isArray(description) && description.length > 0 ? (
              <div className="description">
                {description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(TextContent, WINDOW_KEYS.TEXT);

export default TextWindow;
export { TextContent };
