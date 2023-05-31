const now = new Date();
const date = now.getDate().toString().padStart(2, '0') + '.' + (now.getMonth() + 1).toString().padStart(2, '0') + '.' + now.getFullYear();
const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

var tan;
var betrag = 0;
const kontostandalt = 1350000;
document.getElementById("kontostand").innerHTML = kontostandalt;

function generateTan() {
    var min = 10000;
    var max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ueberweisen() {
    const ibanInput = document.getElementById('iban');
    const ibanValue = ibanInput.value.replace(/\s+/g, ''); // Leerzeichen entfernen
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/; // IBAN-Format
    if (ibanRegex.test(ibanValue)) {
        var empfaenger = document.getElementById("empfaenger").value;
        var betrag = document.getElementById("betrag").value;
        if (betrag > 0 && betrag <= 500000) {
            tan = generateTan();
            document.getElementById("tan").innerHTML = "<h3>DemoApp Sparbank</h3><p>Neue Überweisung " + betrag + " €<br>am " + date + " um " + time + "</p> Ihre TAN lautet: " + tan + "<br><br>";
            document.getElementById("tanInputdiv").style.display = "inline";
            document.getElementById("ueberweisung").style.display = "block";
            document.getElementById("buttonbank").style.display = "none";
        } else {
            alert("Der Betrag muss zwischen 1 und 500000 Euro liegen.");
        }
    } else {
        alert('Die IBAN ist ungültig!');
    }
}

function ueberweisungDurchfuehren() {
    console.log(tan);
    var tanInput = document.getElementById("tanInput").value;
    console.log(tanInput);
    if (tanInput == tan) {
        document.getElementById("screen").style.display = "none";
        document.getElementById("onlinebank").style.display = "none";
        document.getElementById("neueueberweisung").style.display = "block";
        var empfaenger = document.getElementById("empfaenger").value;
        var iban = document.getElementById("iban").value;
        var betrag = document.getElementById("betrag").value;
        var verwendungszweck = document.getElementById("verwendungszweck").value;

        var zusammenfassungText = "Die Überweisung an " + empfaenger + " " + iban + " über " + betrag + " Euro mit dem Verwendungszweck: " + "\"" + verwendungszweck + "\"" + " wurde erfolgreich ausgeführt.<br>Transaktionsnummer: 27254";

        document.getElementById("zusammenfassung").innerHTML = zusammenfassungText;
        var kontostand = kontostandalt - betrag;
        document.getElementById("kontostand").innerHTML = kontostand;
    } else {
        alert("Falsche TAN. Bitte versuchen Sie es erneut.");
    }

}



function reloadAndClear() {
    // Seite neu laden
    location.reload();

    // Alle Input-Felder leeren
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach(field => {
        field.value = "";
    });
}

