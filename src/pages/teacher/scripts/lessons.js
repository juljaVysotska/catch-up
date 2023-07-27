const planedLessons = document.getElementById('planedLessons');

const savedLessons = JSON.parse(localStorage.getItem('lessons')) || [
  {
    name: 'Анна Перминова (default)',
    time: 14,
    tomorrow: true,
    title: 'Новый урок',
    duration: 120,
  },
];

const getLesson = (lesson) => {
  const { name, time, tomorrow, title, duration } = lesson;
  const tomorrowStr = tomorrow ? 'Завтра' : 'Сегодня';

  const hours = duration / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60 || '00';
  const nexHours = time + rhours;

  return `
        <div class="card-box">
            <div class="card-illustration">
                <img src="./images/user_01.png" alt="profile image">
            </div>
            <div class="info">
                <p class="sub-title">${tomorrowStr}, ${time}:00 — ${nexHours}:${minutes}</p>
                <p class="info-title">${ name }</p>
                <p class="info-desc">${ title }</p>
            </div>
        </div>`;
};

const generateHTML = () => {
  document.querySelectorAll('.block__scheduled-lessons div.card-box').forEach((el) => el.remove());
  const lessonsHTML = savedLessons.map((lesson) => {
    return getLesson(lesson);
  }).join('');
    
  planedLessons.insertAdjacentHTML('afterend', lessonsHTML);
};

// генерируем разметку при первом заходе на страничку teacher.html
generateHTML();