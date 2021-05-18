
const respCorrectes = [2, 0, 1, 1, 2, 3];

for (let i = 1; i <= respCorrectes.length; i++) {
    const q = document.getElementById('q' + i);
    const resp = document.getElementsByName('q' + i);
    const button = document.getElementById('check-button-' + i);
    q.addEventListener('submit', (e) => {
        e.preventDefault();
        if (resp[respCorrectes[i - 1]].checked) {
            button.classList.add('check-correct');
            button.classList.remove('check-button');
            button.classList.remove('check-wrong');
        } else {
            button.classList.add('check-wrong');
            button.classList.remove('check-button');
            button.classList.remove('check-correct');
        }
    })
}