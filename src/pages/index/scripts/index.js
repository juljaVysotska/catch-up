import '../../../css/style.css';

import './wizard';
import './login';
import './slider';

const forgotBtn = document.getElementById('forgotPassword');

forgotBtn.onclick = () => {
  alert('Пароли лучше не забывать ;)\nalert использовать плохая практика.\nтак-как он блокирует страницу.');
};