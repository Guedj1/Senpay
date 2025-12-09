const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/paiement", async (req, res) => {
  try {
    const response = await axios.post(
      "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create",
      {
        invoice: {
          items: [
            {
              name: "Paiement réservation tourisme",
              quantity: 1,
              unit_price: 5000
            }
          ]
        }
      },
      {
        headers: {
          "PAYDUNYA-MASTER-KEY": "TA_MASTER_KEY",
          "PAYDUNYA-PRIVATE-KEY": "TA_PRIVATE_KEY",
          "PAYDUNYA-TOKEN": "TON_TOKEN",
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Serveur PayDunya actif sur 3000"));
