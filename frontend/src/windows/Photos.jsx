import WindowControls from '#components/WindowControls';
import { gallery, photosLinks } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import { ImageIcon, Mail, Search } from 'lucide-react';
import React from 'react'

const Photos = () => {
  const {openWindow} = useWindowStore();
  return (
    <>
      <div id='window-header'>
        <WindowControls target="photos" />
        <div className='w-full flex justify-end items-center gap-3'>
          <Mail className='icon' />
          <Search className='icon' />
        </div>
      </div>

      <div className='flex w-full h-full'>
        <div className='sidebar'>
          <h2>Photos</h2>
          <ul>
            {photosLinks.length > 0 ? (
              photosLinks.map(({id, icon, title}) => (
                <li key={id}>
                  <img src={icon} alt={title} />
                  <p>{title}</p>
                </li>
              ))
            ) : (
              <li className="opacity-40 text-xs px-3 py-6 text-center">
                Yet to be updated
              </li>
            )}
          </ul>
        </div>

        <div className='gallery'>
          {gallery.length > 0 ? (
            <ul>
              {gallery.map(({id, img}) => (
                <li key={id} onClick={() => openWindow("imgfile", {
                  id, name: "Gallery image", icon: "/images/image.png",
                  kind: "file", fileType: "img", imageUrl: img,
                })}>
                  <img src={img} alt={`Gallery ${id}`} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 space-y-3">
              <ImageIcon size={40} className="opacity-20" />
              <p className="text-sm opacity-50">Photos yet to be updated</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const PhotoWindow = WindowWrapper(Photos, "photos");
PhotoWindow.displayName = "Photos";

export default PhotoWindow;
