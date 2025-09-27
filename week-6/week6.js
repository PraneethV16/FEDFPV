const cityInput = document.getElementById("city");
const btn = document.getElementById("btn");
const output = document.getElementById("output");

async function getWeather(city) {
  try {
    if (!city) {
      output.innerHTML = "<p>Please enter a City name</p>";
      return;
    }

    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

    if (!res.ok) {
      throw new Error("City error: Please enter a valid city name");
    }

    const data = await res.json();
    display(city, data);

    localStorage.setItem("lastCity", city); // keep consistent
  } catch (error) {
    output.innerHTML = `<p style="color:red">ERROR: ${error.message}</p>`;
  }
}

function display(city, data) {
  const current = data.current_condition[0];
  output.innerHTML = `
    <h2>${city}</h2>
    <p><strong>Temperature:</strong> ${current.temp_C} °C</p>
    <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
  `;
}

btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

window.onload = () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    getWeather(lastCity); // fixed name
  }
};
