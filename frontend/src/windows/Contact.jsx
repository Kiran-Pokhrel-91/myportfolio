import { socials, WINDOW_KEYS } from '#constants'
import WindowControls from '#components/WindowControls'
import { Mail } from 'lucide-react'
import WindowWrapper from '#hoc/WindowWrapper'

const Contact = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target={WINDOW_KEYS.CONTACT} />
        <h2>Contact</h2>
      </div>

      <div className='px-8 pt-8 pb-6 space-y-6'>
        <div className='flex flex-col items-center text-center gap-3'>
          <div className='size-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/25'>
            <div className='size-full rounded-full bg-[var(--panel-bg)] flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-pink-500'>
              KP
            </div>
          </div>
          <div className='space-y-1'>
            <h3 className='text-xl font-bold'>Kiran Pokhrel</h3>
            <p className='text-sm leading-relaxed opacity-80 max-w-xs mx-auto'>
              Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
            </p>
            <a
              href="mailto:kiranpokhrel912@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity mt-1.5"
            >
              <Mail size={14} />
              kiranpokhrel912@gmail.com
            </a>
          </div>
        </div>

        <div className='border-t border-[var(--panel-border)] pt-5'>
          <p className='text-xs font-medium tracking-widest uppercase text-center opacity-50 mb-4'>Find me on</p>
          <div className='grid grid-cols-3 gap-3 max-w-sm mx-auto'>
            {socials.map(({id, bg, link, icon, text}) => (
              <a
                key={id}
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                title={text}
                className='flex flex-col items-center gap-2 py-3.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg'
                style={{backgroundColor: bg, color: '#fff'}}
              >
                {icon === 'mail' ? (
                  <Mail size={20} className='text-white' />
                ) : (
                  <img src={icon} alt={text} className='size-5 brightness-0 invert' />
                )}
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, WINDOW_KEYS.CONTACT)

export default ContactWindow
