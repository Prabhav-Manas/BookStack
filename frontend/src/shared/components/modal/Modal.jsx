import { useState } from "react"

const Modal = ({title, children, isOpen, onClose, onSubmit}) =>{
    return (
        <>
        {isOpen && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;