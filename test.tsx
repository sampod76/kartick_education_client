'use client'
import parse from 'html-react-parser';
import { useState } from 'react';

export default function Test() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (url: string) => {
    setModalContent(`<object type="text/html" data="${url}" style="width:100%;height:100%"></object>`);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent('');
    setModalVisible(false);
  };

  const handleModalClick = (event:any) => {
    if (event.target.id === 'modal') {
      closeModal();
    }
  };

  return (
    <div>
     
      <button onClick={() => openModal('http://localhost:5000/audios/audio-1707418185107.mp3')}>Try it</button>
      <a href="http://localhost:5000/audios/audio-1707418185107.mp3" target="_blank" rel="noopener noreferrer">helloo</a>

      {/* Modal */}
      {modalVisible && (
        <div
          id="modal"
          className="modal"
          onClick={handleModalClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: '1',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#fefefe',
              margin: '15% auto',
              padding: '20px',
              border: '1px solid #888',
              width: '80%',
            }}
          >
            <span className="close" onClick={closeModal} style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }}>&times;</span>
      {
     parse(modalContent)
      }
          </div>
        </div>
      )}
    </div>
  );
}
