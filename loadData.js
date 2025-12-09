document.addEventListener("DOMContentLoaded", () => {
  const div = document.getElementById("hotel-list");

  fetch("data/hotels.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(hotel => {
        div.innerHTML += `
          <div class="card">
            <h2>${hotel.nom}</h2>
            <p><strong>Ville :</strong> ${hotel.ville}</p>
            <p><strong>Adresse :</strong> ${hotel.adresse}</p>
            <p><strong>Téléphone :</strong> ${hotel.telephone}</p>
          </div>
        `;
      });
    });
});
