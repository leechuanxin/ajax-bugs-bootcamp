console.log('Script loaded');

const bugButton = document.querySelector('#bugButton');
const bugForm = document.querySelector('#bugForm');
const submitButton = document.querySelector('#submit');
const listOfBugs = document.querySelector('#listOfBugs');

if (listOfBugs) {
  listOfBugs.innerHTML = '';
  axios.get('/bugs')
    .then((response) => {
      const { bugs } = response.data;
      console.log('bugs:', bugs);
      if (bugs.length > 0) {
        const ol = document.createElement('ol');
        bugs.forEach((bug) => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>Problem</strong>: ${bug.problem}, <strong>Error Text</strong>: ${bug.errorText}, <strong>Commit ID</strong>: ${bug.commit}, <strong>Feature</strong>: ${bug.feature.name}`;
          ol.appendChild(li);
        });
        listOfBugs.appendChild(ol);
      }
    })
    .catch((err) => console.log('err :>> ', err));
}

bugButton.addEventListener('click', (e) => {
  bugForm.classList.toggle('hidden');
  const radioDiv = bugForm.querySelector('#radioDiv');
  radioDiv.innerHTML = '';
  axios.get('/features')
    .then((response) => {
      const { features } = response.data;
      features.forEach((feature) => {
        const id = `feature-${feature.name.toLowerCase().replace(' ', '-')}`;
        const input = document.createElement('input');
        const br = document.createElement('br');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', id);
        input.setAttribute('name', 'feature_id');
        input.setAttribute('value', feature.id);
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = feature.name;
        radioDiv.appendChild(input);
        radioDiv.appendChild(label);
        radioDiv.appendChild(br);
      });
    })
    .catch((err) => console.log('err :>> ', err));
});

submitButton.addEventListener('click', (e) => {
  let inputs = [...bugForm.querySelectorAll('input:not([type="radio"])')];
  const radio = bugForm.querySelector('input[name="feature_id"]:checked').value;
  inputs = inputs.map((input) => input.value);
  const dataToSend = {
    problem: inputs[0],
    errorText: inputs[1],
    commit: inputs[2],
    featureId: radio,
  };
  axios
    .post('/', dataToSend)
    .then((response) => {
      console.log('response.data :>> ', response.data);
    })
    .then(bugForm.classList.toggle('hidden'))
    .catch((err) => console.log('err :>> ', err));
});
