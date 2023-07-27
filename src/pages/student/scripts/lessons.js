import { timeSlots, lessons } from './constants';
import { user } from './profile';

const formLessons = document.getElementById('formLessons');

formLessons.onsubmit = (event) => {
  event.preventDefault();

  const savedLessons = JSON.parse(localStorage.getItem('lessons')) || [];
  const typeRadioBtn = formLessons.querySelector('input[name="type"]:checked');
  const timeRadioBtn = formLessons.querySelector('input[name="time"]:checked');

  const timeBtnId = timeRadioBtn.id;
  const time = timeSlots[timeBtnId];
  const type = lessons[typeRadioBtn.id];

  let tomorrow = false;

  if (timeBtnId === 'time_04' || timeBtnId === 'time_05' || timeBtnId === 'time_06') {
    tomorrow = true;
  }

  localStorage.setItem('lessons', JSON.stringify([{
    name: user.name, 
    time, 
    tomorrow,
    title: type.title,
    duration: type.duration,
  }, ...savedLessons]));
};