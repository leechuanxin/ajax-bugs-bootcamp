console.log('Script loaded');

const bugButton = document.querySelector('#bugButton');
const bugForm = document.querySelector('#bugForm');
const submitButton = document.querySelector('#submit');

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
    });
});

submitButton.addEventListener('click', (e) => {
  let inputs = [...bugForm.querySelectorAll('input:not([type="radio"])')];
  const radio = bugForm.querySelector('input[name="feature_id"]:checked').value;
  console.log('inputs :>> ', inputs);
  inputs = inputs.map((input) => input.value);
  console.log('inputs :>> ', inputs);
  console.log('radio id:', radio);
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
