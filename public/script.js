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
      console.log('features:', features);
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
      console.log('features response data:', response.data);
    });
  // <div class="text-right">
  //   <input type="radio" id="feature1" name="featureId" value="FEATURE 1" />
  //   <label for="feature1">FEATURE 1</label><br />
  //   <input type="radio" id="feature2" name="featureId" value="FEATURE 2" />
  //   <label for="feature2">FEATURE 2</label><br />
  //   <input type="radio" id="feature3" name="featureId" value="FEATURE 3" />
  //   <label for="feature3">FEATURE 3</label>
  // </div>
});

submitButton.addEventListener('click', (e) => {
  let inputs = [...document.querySelectorAll('input')];
  console.log('inputs :>> ', inputs);
  inputs = inputs.map((input) => input.value);
  console.log('inputs :>> ', inputs);
  const dataToSend = {
    problem: inputs[0],
    errorText: inputs[1],
    commit: inputs[2],
  };
  axios
    .post('/', dataToSend)
    .then((response) => {
      console.log('response.data :>> ', response.data);
    })
    .then(bugForm.classList.toggle('hidden'))
    .catch((err) => console.log('err :>> ', err));
});
