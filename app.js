// Wedding Invitation JavaScript - Enhanced Version with New Features

// PENTING: Menggunakan import dari URL CDN Firebase karena ini adalah modul ES
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Global variables
let backgroundMusic;
let countdownInterval;
let isVideoPlaying = false;
let ytPlayer;
let photoSlideInterval; // NEW: For auto-sliding photos

// Data lirik lagu "Barakallahu Lakuma" by Maher Zain
const lyricsData = [
    { time: 10, text: "Di kening kebahagiaanku dan pikiranku" },
    { time: 15, text: "Huruf-huruf mengalir dengan rindu dan bunga-bunga" },
    { time: 19, text: "Hal inilah yang mengantarkan pada kebahagiaan dalam pengharapan" },
    { time: 24, text: "Menceritakan keindahan dengan melodi dan lagu" },
    { time: 28, text: "Ah, pengantin cahaya; mahkota bulan purnama menampakkannya" },
    { time: 34, text: "Sebagai bintang yang memancar cahaya demi cahaya" },
    { time: 38, text: "Berbahagialah suaminya; ia datang berhiaskan mutiara" },
    { time: 43, text: "Padukan Kemurnian dengan puncak dan keindahan yang mempesona" },
    { time: 49, text: "Semua hati dipenuhi dengan sukacita" },
    { time: 53, text: "Dengan kebaikan, dia bersinar dalam kebaikan dan keteguhan hati" },
    { time: 57, text: "Semua hati dipenuhi dengan sukacita" },
    { time: 62, text: "Dengan kebaikan, dia bersinar dalam kebaikan dan keteguhan hati" },
    { time: 68, text: "Di kening kebahagiaanku dan pikiranku" },
    { time: 71, text: "Huruf-huruf mengalir dengan rindu dan bunga-bunga" },
    { time: 76, text: "Hal inilah yang mengantarkan pada kebahagiaan dalam pengharapan" },
    { time: 81, text: "Menceritakan keindahan dengan melodi dan lagu" },
    { time: 87, text: "Nama yang tergambar oleh melodi kesetiaan setiap saat" },
    { time: 91, text: "Tampak menawan dalam kebaikan dan keikhlasan" },
    { time: 96, text: "Dan Maryam, yang dipadamkan oleh cinta, telah diutus" },
    { time: 101, text: "Ucapannya riang, disirami oleh hujan" },
    { time: 106, text: "Demikian pula Syaimaa menyirami jiwa dengan kegembiraannya" },
    { time: 111, text: "Dia memilih cintanya tanpa ragu-ragu" },
    { time: 115, text: "Demikian pula Syaimaa menyirami jiwa dengan kegembiraannya" },
    { time: 120, text: "Dia memilih cintanya tanpa ragu-ragu" },
    { time: 124, text: "Segala ucapan selamat mengalir, wahai Haya, bersamanya" },
    { time: 129, text: "Segala doa tertuju kepada Rabb kita Yang Maha Pengasih, Sang Pencipta" },
    { time: 134, text: "Semoga Allah Mencurahkan Rahmat-Nya Kepadamu" },
    { time: 139, text: "Keturunan yang berkembang indah di semesta yang terus bergerak" },
    { time: 145, text: "Segala ucapan selamat mengalir, wahai Haya, bersamanya" },
    { time: 149, text: "Segala doa tertuju kepada Rabb kita Yang Maha Pengasih, Sang Pencipta" },
    { time: 154, text: "Semoga Allah Mencurahkan Rahmat-Nya Kepadamu" },
    { time: 158, text: "Keturunan yang berkembang indah di semesta yang terus bergerak" },
];

let currentLyricIndex = -1;

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyAbT55NRUO49GQnhN-Uf_yONSpTQBJUgqU",
    authDomain: "weddinginvitationss.firebaseapp.com",
    projectId: "weddinginvitationss",
    storageBucket: "weddinginvitationss.appspot.com",
    messagingSenderId: "348557007083",
    appId: "1:348557007083:web:c966107d29e0dcfcbe86ae"
};

// Inisialisasi Firebase
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    document.body.classList.add('no-scroll');
    backgroundMusic = document.getElementById('backgroundMusic');
    setupActionButtons();
    startCountdown();
    loadGuestMessages();
    showMusicEnableButton();
    createBackgroundParticles();
    setupScrollAnimations();
    setupLyrics();
    initPhotoSliders(); // NEW: Initialize photo sliders
    setupTextAnimations(); // NEW: Setup text animations
}

// --- NEW: FUNGSI AUTO-SLIDING FOTO ---
/**
 * Inisialisasi auto-sliding photo untuk beberapa sesi
 */
function initPhotoSliders() {
    // Contoh untuk sesi dengan foto sliding (bisa disesuaikan)
    const slidingSessions = ['session6', 'session7']; // Sesi yang akan memiliki foto sliding

    slidingSessions.forEach(sessionId => {
        const session = document.getElementById(sessionId);
        if (session) {
            createPhotoSlider(session);
        }
    });
}

/**
 * Membuat photo slider untuk sesi tertentu
 */
function createPhotoSlider(sessionElement) {
    const photos = [
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba76d4d?q=80&w=1964&auto=format&fit=crop'
    ];

    let currentPhotoIndex = 0;

    // Update background foto secara berkala
    const slideInterval = setInterval(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        sessionElement.style.backgroundImage = `url('${photos[currentPhotoIndex]}')`;

        // Animasi transisi halus
        sessionElement.style.transition = 'background-image 0.8s ease-in-out';
    }, 4000); // Ganti foto setiap 4 detik

    // Simpan interval untuk pembersihan jika diperlukan
    if (!window.photoSlideIntervals) {
        window.photoSlideIntervals = [];
    }
    window.photoSlideIntervals.push(slideInterval);
}

// --- NEW: FUNGSI ANIMASI TEKS DAN GAMBAR ---
/**
 * Setup animasi untuk semua teks dan gambar
 */
function setupTextAnimations() {
    // Gunakan Intersection Observer untuk memicu animasi saat elemen terlihat
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Trigger animasi berdasarkan jenis elemen
                if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
                    element.style.animationDelay = '0.2s';
                    element.style.opacity = '1';
                    element.classList.add('animate-fade-in-up');
                } else if (element.tagName === 'P' || element.classList.contains('greeting')) {
                    element.style.animationDelay = '0.4s';
                    element.style.opacity = '1';
                    element.classList.add('animate-fade-in-up');
                } else if (element.classList.contains('couple-photos')) {
                    element.style.animationDelay = '0.6s';
                    element.style.opacity = '1';
                    element.classList.add('animate-zoom-in');
                } else if (element.classList.contains('countdown-container')) {
                    element.style.animationDelay = '0.8s';
                    element.style.opacity = '1';
                    element.classList.add('animate-fade-in-up');
                } else if (element.classList.contains('action-buttons')) {
                    element.style.animationDelay = '1s';
                    element.style.opacity = '1';
                    element.classList.add('animate-fade-in-up');
                }

                // Hentikan observasi setelah animasi dimulai
                animationObserver.unobserve(element);
            }
        });
    }, { threshold: 0.3 });

    // Observasi semua elemen yang perlu dianimasi
    const elementsToAnimate = document.querySelectorAll('h1, h2, h3, p, .greeting, .couple-photos, .countdown-container, .action-buttons, .photo-frame, .event-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0'; // Mulai dengan transparan
        animationObserver.observe(element);
    });
}

// --- FUNGSI ANIMASI PARTIKEL BUNGA (DIPERBARUI) ---
function createBackgroundParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const daisyImgUrl = 'https://raw.githubusercontent.com/ss2811/weddinginvitation/main/daisy.png';
    const sakuraImgUrl = 'https://raw.githubusercontent.com/ss2811/weddinginvitation/main/sakura.png';

    const particleTypes = [
        { url: daisyImgUrl, count: 12 }, // Kurangi jumlah untuk performa
        { url: sakuraImgUrl, count: 15 }
    ];

    particleTypes.forEach(type => {
        for (let i = 0; i < type.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundImage = `url(${type.url})`;

            const size = Math.random() * 25 + 15;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            container.appendChild(particle);
            animateParticle(particle);
        }
    });
}

function animateParticle(particle) {
    gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: -100,
        rotation: Math.random() * 360,
        opacity: 0
    });

    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    const tl = gsap.timeline({
        delay: delay,
        repeat: -1,
        onRepeat: () => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: -100,
                opacity: 0
            });
        }
    });

    tl.to(particle, { opacity: Math.random() * 0.4 + 0.2, duration: 2 }, 0)
      .to(particle, { y: window.innerHeight + 100, ease: "none", duration: duration }, 0)
      .to(particle, { x: "+=" + (Math.random() * 200 - 100), rotation: "+=" + (Math.random() * 720 - 360), ease: "sine.inOut", duration: duration }, 0);
}

function typeWriter(selector, text, onComplete) {
    const element = document.querySelector(selector);
    if (!element) return;

    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 30); // Lebih cepat untuk pengalaman yang lebih baik
        } else {
            const cursor = element.querySelector('.typing-cursor');
            if (cursor) cursor.remove();
            if (onComplete) onComplete();
        }
    }

    element.innerHTML = '';
    type();
}

function setupActionButtons() {
    document.getElementById('openInvitationBtn')?.addEventListener('click', openInvitation);
    document.getElementById('saveDateBtn')?.addEventListener('click', saveTheDate);
    document.getElementById('shareBtn')?.addEventListener('click', shareInvitation);
    document.getElementById('openMapsBtn')?.addEventListener('click', openMaps);
    document.getElementById('submitRsvpBtn')?.addEventListener('click', handleRsvpSubmission);

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => copyAccount(e.target.dataset.account));
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'session2') {
                    const targetElement = document.getElementById('quran-verse-typewriter');
                    if (targetElement && !targetElement.classList.contains('typed')) {
                        const quranText = `"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."`;
                        const citation = `QS. Ar-Rum: 21`;

                        targetElement.innerHTML = '';
                        typeWriter('#quran-verse-typewriter', quranText, () => {
                            targetElement.innerHTML += '<br><cite>' + citation + '</cite>';
                        });
                        targetElement.classList.add('typed');
                        observer.unobserve(entry.target);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    const session2 = document.getElementById('session2');
    if (session2) {
        observer.observe(session2);
    }
}

// --- FUNGSI LIRIK BERJALAN (DIPERBARUI) ---
function setupLyrics() {
    if (backgroundMusic) {
        backgroundMusic.addEventListener('timeupdate', updateScrollingLyrics);
    }
}

function updateScrollingLyrics() {
    const currentTime = backgroundMusic.currentTime;
    const lyricsContainer = document.getElementById('lyrics-container');
    if (!lyricsContainer) return;

    let nextLyricIndex = -1;
    for (let i = 0; i < lyricsData.length; i++) {
        if (currentTime >= lyricsData[i].time) {
            nextLyricIndex = i;
        } else {
            break;
        }
    }

    if (nextLyricIndex > currentLyricIndex) {
        currentLyricIndex = nextLyricIndex;

        const lyricElement = document.createElement('div');
        lyricElement.className = 'lyric-line';
        lyricElement.textContent = lyricsData[currentLyricIndex].text;

        lyricsContainer.appendChild(lyricElement);

        gsap.fromTo(lyricElement, {
            top: '-10vh',
            opacity: 1,
            x: '-50%'
        }, {
            top: '110vh',
            duration: 12, // Lebih lambat agar lebih mudah dibaca
            ease: 'none',
            onComplete: () => {
                lyricElement.remove();
            }
        });
    }
}

// Audio Functions
function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.play().catch(error => {
            console.log('Auto-play dicegah:', error);
        });
    }
}

function pauseBackgroundMusic() {
    backgroundMusic?.pause();
}

function resumeBackgroundMusic() {
    if (backgroundMusic?.paused && !isVideoPlaying) {
        backgroundMusic.play().catch(error => console.log('Gagal melanjutkan musik:', error));
    }
}

function showMusicEnableButton() {
    if (document.querySelector('.music-toggle-btn')) return;

    const musicButton = document.createElement('button');
    musicButton.innerHTML = '🔇';
    musicButton.className = 'btn music-toggle-btn';
    musicButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1001;
        background: var(--wedding-brown);
        color: var(--wedding-white);
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    musicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.innerHTML = '🎵';
        } else {
            backgroundMusic.pause();
            musicButton.innerHTML = '🔇';
        }
    });

    document.body.appendChild(musicButton);
}

// --- FUNGSI openInvitation YANG DIPERBARUI ---
function openInvitation() {
    const session0 = document.getElementById('session0');
    const videoSection = document.getElementById('session-video');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const mainContent = document.querySelector('.main-content-wrapper');

    if (session0) {
        session0.classList.add('fade-out');
        setTimeout(() => {
            session0.classList.add('hidden');
        }, 600);
    }

    if (videoSection && backgroundVideo) {
        videoSection.classList.remove('hidden');

        // Memastikan video diputar dari awal
        backgroundVideo.currentTime = 0;
        backgroundVideo.play();

        // PERUBAHAN: Video TIDAK disembunyikan setelah selesai
        backgroundVideo.addEventListener('ended', () => {
            if (mainContent) {
                mainContent.classList.remove('hidden');
            }
            // VIDEO TETAP TERLIHAT - tidak ada perubahan z-index atau opacity
            console.log('Video selesai, konten utama ditampilkan, video tetap terlihat');
        }, { once: true });

    } else {
        // Fallback jika video gagal dimuat
        if (mainContent) mainContent.classList.remove('hidden');
    }

    document.body.classList.remove('no-scroll');
    playBackgroundMusic();
}

// Session 1: Countdown
function startCountdown() {
    try {
        if (typeof countdownInterval !== 'undefined' && countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        const weddingDate = new Date('2025-09-24T07:00:00+08:00');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            return;
        }

        function update() {
            const now = Date.now();
            const distance = weddingDate.getTime() - now;

            if (distance <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        update();
        countdownInterval = setInterval(update, 1000);

    } catch (err) {
        console.error('[countdown] error saat memulai:', err);
    }
}

async function saveTheDate() {
    const event = {
        title: 'Pernikahan Suriansyah & Sonia Agustina Oemar',
        start: '2025-09-24T07:00:00+08:00',
        end: '2025-09-24T17:00:00+08:00',
        description: 'Acara Pernikahan Suriansyah & Sonia Agustina Oemar.\n\nJangan lupa hadir dan memberikan doa restu.',
        location: 'Masjid Jabal Rahmah Mandin & Rumah Mempelai Wanita'
    };

    const toUTC = (dateString) => {
        const date = new Date(dateString);
        const pad = (num) => num.toString().padStart(2, '0');
        return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding.com
DTSTAMP:${toUTC(new Date().toISOString())}
DTSTART;TZID=Asia/Makassar:${toUTC(event.start)}
DTEND;TZID=Asia/Makassar:${toUTC(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const file = new File([blob], 'wedding_invitation.ics', { type: 'text/calendar' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: event.title,
                text: 'Simpan tanggal pernikahan kami di kalender Anda.'
            });
            showNotification('Pilih aplikasi Kalender untuk menyimpan acara.');
            return;
        } catch (error) {
            console.warn('Web Share API dibatalkan atau gagal:', error);
        }
    }

    try {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        showNotification('File kalender (.ics) telah diunduh. Silakan buka file tersebut.');
    } catch (error) {
        console.error('Gagal membuat link unduhan:', error);
        showNotification('Gagal membuat file kalender. Silakan coba lagi.');
    }
}

async function shareInvitation() {
    const shareText = 'Assalamualaikum Wr. Wb.\nDengan penuh syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara(i) menghadiri pernikahan Suriansyah & Sonia. Barakallahu lakuma wa baraka \'alaikuma.';
    const shareTitle = 'Undangan Pernikahan | Suriansyah & Sonia';
    const shareUrl = window.location.href;

    copyToClipboard(`${shareText}\n\n${shareUrl}`, 'Teks undangan disalin ke clipboard.');
}

async function handleRsvpSubmission() {
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');
    const attendanceInput = document.getElementById('attendance');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const attendance = attendanceInput.value;

    if (!name || !message || !attendance) {
        showNotification('Mohon lengkapi nama, ucapan, dan konfirmasi kehadiran! ⚠️');
        return;
    }

    const isPublic = await showPrivacyPopup();
    if (isPublic === null) return;

    const success = await submitMessageToFirebase(name, message, attendance, isPublic);
    if (success) {
        showNotification('Ucapan Anda berhasil terkirim. Terima kasih!');
        nameInput.value = '';
        messageInput.value = '';
        attendanceInput.selectedIndex = 0;
        loadGuestMessages();
    }
}

async function submitMessageToFirebase(name, message, attendance, isPublic) {
    if (!db) {
        showNotification("Gagal menyimpan ucapan: Database error.");
        return false;
    }

    try {
        await addDoc(collection(db, "messages"), {
            name: name,
            message: message,
            attendance: attendance,
            isPublic: isPublic,
            timestamp: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error menyimpan ke Firebase: ", error);
        showNotification("Terjadi kesalahan saat mengirim ucapan.");
        return false;
    }
}

function showPrivacyPopup() {
    return new Promise(resolve => {
        document.getElementById('privacy-popup-container')?.remove();

        const popupContainer = document.createElement('div');
        popupContainer.id = 'privacy-popup-container';
        popupContainer.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-box">
                <h3>Pengaturan Privasi</h3>
                <p>Apakah Anda ingin ucapan ini ditampilkan secara publik di halaman undangan?</p>
                <div class="popup-buttons">
                    <button class="btn btn-yes" data-choice="true">Ya, Tampilkan</button>
                    <button class="btn btn-no" data-choice="false">Tidak, Privat</button>
                    <button class="btn btn-cancel" data-choice="cancel">Batal</button>
                </div>
            </div>
        `;

        document.body.appendChild(popupContainer);

        popupContainer.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = e.target.dataset.choice;
                popupContainer.remove();

                if (choice === 'cancel') {
                    resolve(null);
                } else {
                    resolve(choice === 'true');
                }
            });
        });

        popupContainer.querySelector('.popup-overlay').addEventListener('click', () => {
            popupContainer.remove();
            resolve(null);
        });
    });
}

async function loadGuestMessages() {
    if (!db) return;

    try {
        const messagesContainer = document.getElementById('guestMessagesContainer');
        if (!messagesContainer) return;

        const q = query(
            collection(db, "messages"),
            where("isPublic", "==", true),
            orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            messagesContainer.innerHTML = '<div class="no-messages">Belum ada ucapan yang ditampilkan.</div>';
            return;
        }

        let messagesHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const attendanceText = data.attendance === 'yes' ? '✅ Hadir' : 
                                 data.attendance === 'no' ? '❌ Tidak Hadir' : 
                                 '❔ Belum Pasti';

            messagesHTML += `
                <div class="message-item">
                    <div class="message-name">${data.name} ${attendanceText}</div>
                    <div class="message-text">${data.message}</div>
                </div>
            `;
        });

        messagesContainer.innerHTML = messagesHTML;

    } catch (error) {
        console.error("Error loading messages:", error);
        const messagesContainer = document.getElementById('guestMessagesContainer');
        if (messagesContainer) {
            messagesContainer.innerHTML = '<div class="no-messages">Gagal memuat ucapan.</div>';
        }
    }
}

function openMaps() {
    const location = "Masjid Jabal Rahmah Mandin";
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

    window.open(googleMapsUrl, '_blank');
}

function copyAccount(accountNumber) {
    copyToClipboard(accountNumber, `Nomor rekening ${accountNumber} berhasil disalin!`);
}

function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(message);
        }).catch(() => {
            fallbackCopyToClipboard(text, message);
        });
    } else {
        fallbackCopyToClipboard(text, message);
    }
}

function fallbackCopyToClipboard(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification(message);
    } catch (err) {
        showNotification('Gagal menyalin teks. Silakan salin secara manual.');
    }

    document.body.removeChild(textArea);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--wedding-brown);
        color: var(--wedding-white);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards !important;
    }

    .animate-zoom-in {
        animation: zoomIn 1s ease-out forwards !important;
    }

    .animate-fade-in-left {
        animation: fadeInLeft 0.8s ease-out forwards !important;
    }

    .animate-fade-in-right {
        animation: fadeInRight 0.8s ease-out forwards !important;
    }
`;
document.head.appendChild(style);

// Cleanup function untuk interval foto jika halaman ditutup
window.addEventListener('beforeunload', () => {
    if (window.photoSlideIntervals) {
        window.photoSlideIntervals.forEach(interval => clearInterval(interval));
    }
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});
