const btn = document.getElementById('verseBtn');
const verseText = document.getElementById('verseText');
const verseRef = document.getElementById('verseRef');

let quranData = [];

// Load JSON once on page load
fetch('quran.json')
    .then(res => res.json())
    .then(data => quranData = data)
    .catch(err => console.error('Error loading Quran JSON:', err));

btn.addEventListener('click', () => {
    if (!quranData.length) return;

    // Pick a random index
    const index = Math.floor(Math.random() * (quranData.length - 3));

    const verse1 = quranData[index];
    const verse2 = quranData[index + 1];
    const verse3 = quranData[index + 2];

    // SAFETY CHECK: consecutive verses must be in same surah
    const verses = [verse1];
    if (verse2 && verse2.surah === verse1.surah) verses.push(verse2);
    if (verse3 && verse3.surah === verse2.surah) verses.push(verse3);

    // Display text
    verseText.innerHTML = verses.map(v => v.text).join('<br><br>');

    // Display reference
    verseRef.textContent =
        verses.length === 1
        ? `Surah ${verses[0].surah}, Ayah ${verses[0].ayah}`
        : `Surah ${verses[0].surah}, Ayah ${verses[0].ayah}-${verses[verses.length - 1].ayah}`;
});
