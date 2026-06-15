import { socials, WINDOW_KEYS } from '#constants'
import WindowControls from '#components/WindowControls'
import WindowWrapper from '#hoc/WindowWrapper'
import { Mail } from 'lucide-react'

const Contact = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target={WINDOW_KEYS.CONTACT} title="Contact" />
      </div>

      <div className="content px-8 pt-8 pb-6 space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="size-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/25">
            <img className="size-full rounded-full object-cover" src="/images/me.jpeg" />
          </div>
          <h3 className="text-xl font-bold">Kiran Pokhrel</h3>
          <p className="text-sm leading-relaxed opacity-80 max-w-xs mx-auto">
            Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
          </p>
        </div>

        <ul className="space-y-3 max-w-sm mx-auto">
          {socials.map(({id, bg, link, icon, text}) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer" title={text} className="flex items-center gap-3 px-5 py-4 rounded-xl text-base font-semibold text-white">
                {icon === 'mail' ? (
                  <Mail size={20} className="text-white" />
                ) : (
                  <img src={icon} alt={text} className="size-5" />
                )}
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, WINDOW_KEYS.CONTACT)

export default ContactWindow
