import React from 'react'
import ReactDom from 'react-dom'
import { FaRegWindowClose } from "react-icons/fa";


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(30,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '95%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Modal({ children, onClose }) {
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <button className='bg-red-500 text-white p-2 rounded-md' style={{ marginLeft: "90%", marginTop: "-35%" }} onClick={onClose}>
                    <FaRegWindowClose className='w-5 h-5' />
                </button>
                {children}
            </div>
        </>,
        document.getElementById('cart-root')
    )
}
