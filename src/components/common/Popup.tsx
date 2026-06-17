import type React from "react";
import './Popup.css'

interface PopupProps {
    onClose?: ((e: React.MouseEvent<HTMLDivElement>) => void) | undefined,
    children: React.ReactNode
}

function Popup({ onClose, children }: PopupProps) {
    return (
        <div className="popup-bg" onClick={onClose} >
            <div 
                className="popup-modal" 
                onClick={(e) => e.stopPropagation()}  // Prevent clicking inside the modal to close popup.
            >
                { children }
            </div>
        </div>
    )
}

export default Popup;