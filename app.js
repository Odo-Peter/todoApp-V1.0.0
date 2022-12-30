const welcomePage = document.querySelector('#welcome-section');
const todoPage = document.querySelector('.proper-page');
const startBtn = document.querySelector('#enter-btn');
const nameInput = document.querySelector('#name-input');
const nameId = document.querySelector('#name');

const todoInput = document.querySelector('#todo-input');

const colorArray = ['purple', 'red', 'green', 'orange', 'pale-blue', 'blue'];

//start the to do app
function startApp() {
  if (nameInput.value !== '') {
    welcomePage.style.display = 'none';
    todoPage.style.display = 'flex';
    nameId.textContent = nameInput.value.toUpperCase();

    //Add the day and time
    const today = new Date();
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    const day = today.toLocaleDateString('en-US', options);

    const hrs = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    //Appending the day to the DOM
    document.querySelector('#today-date').textContent = day;
    if (hrs < 10) {
      document.querySelector('#hour').textContent = `0${hrs}`;
    } else {
      document.querySelector('#hour').textContent = hrs;
    }

    if (min < 10) {
      document.querySelector('#minutes').textContent = `0${min}`;
    } else {
      document.querySelector('#minutes').textContent = min;
    }

    if (sec < 10) {
      document.querySelector('#seconds').textContent = `0${sec}`;
    } else {
      document.querySelector('#seconds').textContent = sec;
    }

    //check if its night time and swap images
    if (hrs > 17) {
      document.querySelector('#night').style.display = 'block';
      document.querySelector('#day').style.display = 'none';
    } else if (hrs < 17 && hrs >= 10) {
      document.querySelector('#night').style.display = 'none';
      document.querySelector('#day').style.display = 'block';
    }

    //Add todo EventListener
    document.querySelector('#btn').addEventListener('click', (e) => {
      const randIndex = Math.floor(Math.random() * colorArray.length);

      if (todoInput.value !== '') {
        const text = `<li class="item ${colorArray[randIndex]}">
        <input type="checkbox" name="checkbox" />
        <p>${todoInput.value.toUpperCase()}</p>
      </li>`;

        const position = 'beforeend';

        document.querySelector('.items').insertAdjacentHTML(position, text);
        todoInput.value = '';

        //adding event listeners on the checkboxes
        const checkbox = document.querySelectorAll('input[name=checkbox');

        checkbox.forEach((box) =>
          box.addEventListener('change', (e) => {
            // console.log(e);
            if (e.path[0].checked) {
              e.path[0].nextElementSibling.style.textDecoration =
                'line-through';
              e.path[0].nextElementSibling.style.opacity = '0.4';
              e.path[0].parentElement.style.border = 'none';
            } else {
              e.path[0].nextElementSibling.style.textDecoration = 'none';
              e.path[0].nextElementSibling.style.opacity = '1';
            }
          })
        );
      }
    });
    setInterval(startApp, 1000);
  } else {
    alert('Please, enter your name to begin');
  }
}

startBtn.addEventListener('click', startApp);
