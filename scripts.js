const api_url = 'https://api.disneyapi.dev/characters'
async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();

  document.getElementById('name').textContent = name;
  console.log(data);
}

getData();
