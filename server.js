import express from 'express' // 'express'-Modul importieren
const app = express(); // App-Instanz erzeugen; könnte auch frdlmpf sein aber app ist üblich
const port = 3000;

app.use(express.static('public'));

// Routenhandler für die Berechnung
app.get('/convert', async (req, res) => {

  // Hard-coded Wechselkurs
  const baseCurrency = req.query.base;
  const convertTo = req.query.convertTo;
  const amount = parseFloat(req.query.amount);
  console.log({ baseCurrency, convertTo, amount })
  let exchangeRate;

  // Währungsbetrag aus der Query-Parameter/String (Query = Abfrage/Anfrage)
  // Key:value Paare in URL nach dem ?: http://example.com/path?param1=value1&param2=value2

  if (baseCurrency === 'eur' && convertTo === 'usd') {
    exchangeRate = 1.2; // Euro to USD exchange rate
  } else if (baseCurrency === 'usd' && convertTo === 'eur') {
    exchangeRate = 0.83; // USD to Euro exchange rate
  } else {
    return res.status(400).json({ error: 'Invalid currency conversion' });
  }
  
 

  // Umrechnen
  const convertedAmount = amount * exchangeRate;

  // Zeitstempel
  const timestamp = new Date().toLocaleString();

  // JSON-Antwort mit dem umgerechneten Betrag + timestamp senden
  res.json({ convertedAmount, timestamp });
});



// Server starten; am Ende, damit alle Funkt. und Routenhandler schon bereit sind
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
