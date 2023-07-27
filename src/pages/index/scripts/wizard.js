import { saveToStorage } from './login';

const regBtn = document.getElementById('regBtn');
const toLoginSvg = document.getElementById('toLoginSvg');
const loginBlock = document.getElementById('loginBlock');
const step1Block = document.getElementById('step1Block');
const regBlock = document.getElementById('regBlock');
const toStep2Btn = document.getElementById('toStep2Btn');
const from3to2Svg = document.getElementById('from3to2Svg');
const from1to2 = document.getElementById('from1to2');
const from2to1 = document.getElementById('from2to1');
const createAccount = document.getElementById('createAccount');

const wizard = [loginBlock, step1Block, regBlock];
const user = {};

const resetWizard = () => {
  for (const element of wizard) {
    element.style.display = 'none';
  }
};

toLoginSvg.onclick = () => {
  resetWizard();

  loginBlock.style.display = 'flex';
};

[regBtn, from3to2Svg, from2to1].forEach((element) => {
  element.onclick = () => {
    resetWizard();

    step1Block.style.display = 'flex';
  };
});

[toStep2Btn, from1to2].forEach((element) => {
  element.onclick = () => {
    resetWizard();

    const input = step1Block.querySelector('form input:checked');
    const type = input.id === 'user_student' ? 'student' : 'teacher';
    user.type = type;

    regBlock.style.display = 'flex';
  };
});

document.querySelectorAll('#regBlock form input').forEach((element) => {
  element.onchange = () => {
    element.classList.remove('error');
  };
});

createAccount.onclick = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordNext = document.getElementById('password_next');

  if (password.value !== passwordNext.value) {
    console.error('пароли должны совпадать');
    password.classList.add('error');
    passwordNext.classList.add('error');
    return;
  }

  const [fName, lName] = name.value.split(' ');

  if (!fName || !lName || fName.length < 3 || lName.length < 3) {
    name.classList.add('error');
    console.error('введите валидное имя и фамилию');
    return;
  }

  user.name = name.value;
  user.email = email.value;
  user.password = password.value;

  if (user.type === 'teacher') {
    localStorage.setItem('teacher', JSON.stringify(user));
  } else {
    const students = JSON.parse(localStorage.getItem('students')) || [];

    localStorage.setItem('students', JSON.stringify([user, ...students]));
  }

  const type = user.type;

  saveToStorage(user);

  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      user[key] = null;
    }
  }

  regBlock.querySelector('form').reset();
  window.location.href = type === 'student' ? 'student.html' : 'teacher.html';
};