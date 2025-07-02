// src/pages/KuesionerPage.jsx

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import DialogBox from '../components/DialogBox';
import LoadingModal from '../components/LoadingModal';
import CustomDropdown from '../components/CustomDropdown';
import { useAuth } from '../hooks/useAuth';
import './KuesionerPage.css';

const KuesionerPage = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false });
  const [answers, setAnswers] = useState({
    pertanyaan_1: '',
    pertanyaan_2: '',
    pertanyaan_3: '',
    pertanyaan_4: '',
    pertanyaan_5: '',
    pertanyaan_6: '',
    pertanyaan_7: '',
    pertanyaan_8: '',
    pertanyaan_9: '',
  });

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    let allAnswered = true;
    for(let i = 1; i <= 9; i++){
        if(!formData.get(`pertanyaan_${i}`)){
            allAnswered = false;
            break;
        }
    }

    if (!allAnswered) {
        setDialog({ isOpen: true, message: 'Harap isi semua pertanyaan pilihan ganda (1-9).', type: 'warning' });
        return;
    }

    setIsLoading(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(() => {
          setDialog({ isOpen: true, message: 'Terima kasih! Kuesioner Anda telah berhasil dikirim.', type: 'success' });
          form.current.reset();
          setAnswers({ pertanyaan_1: '', pertanyaan_2: '', pertanyaan_3: '', pertanyaan_4: '', pertanyaan_5: '', pertanyaan_6: '', pertanyaan_7: '', pertanyaan_8: '', pertanyaan_9: '' });
      }, (error) => {
          console.log(error.text);
          setDialog({ isOpen: true, message: 'Gagal mengirim kuesioner. Coba lagi nanti.', type: 'error' });
      }).finally(() => {
          setIsLoading(false);
      });
  };

  const closeDialog = () => setDialog({ isOpen: false });

  const scaleOptions = [
    { value: 'Sangat Baik', label: 'Sangat Baik' },
    { value: 'Baik', label: 'Baik' },
    { value: 'Cukup', label: 'Cukup' },
    { value: 'Kurang', label: 'Kurang' }
  ];
  
  const easeOptions = [
    { value: 'Sangat Mudah', label: 'Sangat Mudah' },
    { value: 'Mudah', label: 'Mudah' },
    { value: 'Cukup', label: 'Cukup' },
    { value: 'Sulit', label: 'Sulit' }
  ];

  const relevanceOptions = [
    {value: 'Sangat Relevan', label: 'Sangat Relevan'}, {value: 'Relevan', label: 'Relevan'}, {value: 'Cukup', label: 'Cukup'}, {value: 'Kurang Relevan', label: 'Kurang Relevan'}
  ];

  const benefitOptions = [
    {value: 'Sangat Bermanfaat', label: 'Sangat Bermanfaat'}, {value: 'Bermanfaat', label: 'Bermanfaat'}, {value: 'Cukup', label: 'Cukup'}, {value: 'Tidak Bermanfaat', label: 'Tidak Bermanfaat'}
  ];

  const helpOptions = [
    {value: 'Sangat Membantu', label: 'Sangat Membantu'}, {value: 'Membantu', label: 'Membantu'}, {value: 'Cukup', label: 'Cukup'}, {value: 'Kurang Membantu', label: 'Kurang Membantu'}
  ];

  return (
    <>
      {isLoading && <LoadingModal />}
      {dialog.isOpen && <DialogBox message={dialog.message} type={dialog.type} onClose={closeDialog} />}
      
      <div className="kuesioner-wrapper">
        <h1>Kuesioner Kepuasan Pengguna</h1>
        <div className="kuesioner-card">
          <p className="kuesioner-intro">
            Masukan dari Anda (<strong>{user?.username}</strong>) sangat berharga untuk pengembangan sistem ini.
          </p>
          <hr className="kuesioner-divider" />
          <form ref={form} onSubmit={sendEmail} className="kuesioner-form">
            
            {Object.entries(answers).map(([key, value]) => (
                <input type="hidden" name={key} value={value} key={key} />
            ))}
            
            {/* Input tersembunyi untuk username/email pengguna */}
            <input type="hidden" name="nama_pengguna" value={user?.username} />


            <div className="kuesioner-group"><label>1. Bagaimana penilaian Anda terhadap desain visual dan tata letak aplikasi?</label><CustomDropdown name="pertanyaan_1" options={scaleOptions} value={answers.pertanyaan_1} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>2. Seberapa mudah Anda memahami alur navigasi antar halaman?</label><CustomDropdown name="pertanyaan_2" options={easeOptions} value={answers.pertanyaan_2} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>3. Bagaimana pendapat Anda tentang kecepatan dan responsivitas sistem?</label><CustomDropdown name="pertanyaan_3" options={scaleOptions} value={answers.pertanyaan_3} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>4. Seberapa relevan hasil pencarian yang diberikan sistem?</label><CustomDropdown name="pertanyaan_4" options={relevanceOptions} value={answers.pertanyaan_4} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>5. Apakah fitur "Pencarian Terakhir Anda" di halaman utama bermanfaat?</label><CustomDropdown name="pertanyaan_5" options={benefitOptions} value={answers.pertanyaan_5} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>6. Bagaimana kemudahan dalam memahami detail buku yang ditampilkan?</label><CustomDropdown name="pertanyaan_6" options={easeOptions} value={answers.pertanyaan_6} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>7. Apakah perbedaan fitur antara Admin dan User sudah jelas dan berfungsi baik?</label><CustomDropdown name="pertanyaan_7" options={scaleOptions} value={answers.pertanyaan_7} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>8. Apakah fitur "Download Laporan" untuk admin mudah digunakan?</label><CustomDropdown name="pertanyaan_8" options={easeOptions} value={answers.pertanyaan_8} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            <div className="kuesioner-group"><label>9. Secara keseluruhan, seberapa besar sistem ini membantu Anda menemukan buku?</label><CustomDropdown name="pertanyaan_9" options={helpOptions} value={answers.pertanyaan_9} onChange={handleChange} placeholder="Pilih penilaian..."/></div>
            
            <div className="kuesioner-group">
              <label>10. Adakah saran atau masukan lain untuk pengembangan sistem ini di masa depan? (Opsional)</label>
              <textarea name="saran_masukan" rows="5" placeholder="Tulis masukan Anda di sini..."></textarea>
            </div>
            
            <button type="submit" className="kuesioner-submit-btn">Kirim Jawaban</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default KuesionerPage;