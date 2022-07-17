function getData() {
  const response = await fetch('https://api.disneyapi.dev/characters')
  const data = await response.json()
}
