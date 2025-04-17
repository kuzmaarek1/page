fetch("https://brandstestowy.smallhost.pl/api/random")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const outputDiv = document.getElementById("output");
    data.data.forEach((item) => {
      const element = document.createElement("div");
      element.innerHTML = `
        <p><strong>${item.text}</strong></p>
        <img src="${item.image}" alt="${item.text}" width="200">
        <hr>
      `;
      outputDiv.appendChild(element);
    });
  })
  .catch((error) => {
    console.error("Error while fetching data:", error);
  });
