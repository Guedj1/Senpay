#!/bin/bash

# Aller dans le dossier projet
cd ~/Senpay/Senpay || { echo "Dossier introuvable"; exit 1; }

echo "==== Nettoyage des fichiers doublons par contenu ===="

declare -A filehashes

# Parcourir tous les fichiers HTML, CSS et JS
find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) | while read file; do
    hash=$(md5sum "$file" | awk '{print $1}')
    if [[ ${filehashes[$hash]} ]]; then
        echo "Doublon trouvé et supprimé : $file"
        rm -v "$file"
    else
        filehashes[$hash]="$file"
    fi
done

echo "==== Suppression des fichiers de sauvegarde ===="
rm -v *.save

echo "==== Vérification des pages principales ===="

declare -A pages_content=(
["index.html"]='<!DOCTYPE html>
<html>
<head>
  <title>Accueil - Senpay</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <span class="menu-toggle">&#9776;</span>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="about.html">À propos</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="paiement.html">Paiement</a></li>
  </ul>
</nav>
<div class="container">
  <h1>Bienvenue sur Senpay</h1>
  <p>Ceci est la page d’accueil de votre site fonctionnel.</p>
</div>
</body>
</html>'
["about.html"]='<!DOCTYPE html>
<html>
<head>
  <title>À propos - Senpay</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <span class="menu-toggle">&#9776;</span>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="about.html">À propos</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="paiement.html">Paiement</a></li>
  </ul>
</nav>
<div class="container">
  <h1>À propos de Senpay</h1>
  <p>Senpay est votre plateforme de paiement sécurisée et rapide.</p>
</div>
</body>
</html>'
["services.html"]='<!DOCTYPE html>
<html>
<head>
  <title>Services - Senpay</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <span class="menu-toggle">&#9776;</span>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="about.html">À propos</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="paiement.html">Paiement</a></li>
  </ul>
</nav>
<div class="container">
  <h1>Nos services</h1>
  <ul>
    <li>Paiement en ligne sécurisé avec PayDunya</li>
    <li>Facturation automatique pour entreprises</li>
    <li>Support client 24/7</li>
    <li>Rapports détaillés et suivi des transactions</li>
  </ul>
</div>
</body>
</html>'
["contact.html"]='<!DOCTYPE html>
<html>
<head>
  <title>Contact - Senpay</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <span class="menu-toggle">&#9776;</span>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="about.html">À propos</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="paiement.html">Paiement</a></li>
  </ul>
</nav>
<div class="container">
  <h1>Contactez-nous</h1>
  <form id="contactForm" action="mailto:votre-email@exemple.com" method="POST" enctype="text/plain">
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name" placeholder="Votre nom" required>
    <label for="email">Email :</label>
    <input type="email" id="email" name="email" placeholder="Votre email" required>
    <label for="message">Message :</label>
    <textarea id="message" name="message" rows="5" placeholder="Votre message" required></textarea>
    <button type="submit">Envoyer</button>
  </form>
</div>
<script src="script.js"></script>
</body>
</html>'
["paiement.html"]='<!DOCTYPE html>
<html>
<head>
  <title>Paiement - Senpay</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <span class="menu-toggle">&#9776;</span>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="about.html">À propos</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="paiement.html">Paiement</a></li>
  </ul>
</nav>
<div class="container">
  <h1>Paiement sécurisé</h1>
  <form id="payForm">
    <label for="payName">Nom complet :</label>
    <input type="text" id="payName" placeholder="Votre nom" required>
    <label for="payEmail">Email :</label>
    <input type="email" id="payEmail" placeholder="Votre email" required>
    <label for="payAmount">Montant (FCFA) :</label>
    <input type="number" id="payAmount" placeholder="Ex: 2000" required>
    <button type="submit">Payer avec PayDunya</button>
  </form>
</div>
<script src="script.js"></script>
</body>
</html>'
)

# Vérifier et recréer les pages si manquantes
for page in "${!pages_content[@]}"; do
    if [ ! -f "$page" ]; then
        echo "Page manquante détectée : $page - Création automatique"
        echo "${pages_content[$page]}" > "$page"
    fi
done

echo "==== Nettoyage et vérification terminé ===="
