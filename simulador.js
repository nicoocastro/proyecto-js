// Este mini proyecto simula inversiones a plazo fijo, permite al usuario ingresr un monto, calcular interés generado en 90 días y ver un resumen de inversiones
// y ver un resumen de inversiones realizadas. La interacción se realiza a través de prompts y alerts en el navegador predeterminado. 
// TNA 64%
const tasaInteresAnual = 0.64;
let inversiones = JSON.parse(localStorage.getItem('inversiones')) || [];

function calcularInteres(capital) {
    const interesSimple = capital * tasaInteresAnual * (90 / 365);
    return interesSimple;
}

function simularPlazoFijo() {
    const capital = parseFloat(prompt("Ingrese el monto a invertir:"));

    if (isNaN(capital) || capital <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    const confirmacion = confirm(`Usted va a invertir $${capital} a una tasa de interés anual del ${tasaInteresAnual * 100}%. ¿Está seguro?`);

    if (confirmacion) {
        const interesGenerado = calcularInteres(capital);
        const totalFinal = capital + interesGenerado;

        inversiones.push({ capital: capital, interesGenerado: interesGenerado, totalFinal: totalFinal });
        localStorage.setItem('inversiones', JSON.stringify(inversiones));

        alert(`Después de 90 días, su inversión habrá generado un interés de $${interesGenerado.toFixed(2)}. El total final será de $${totalFinal.toFixed(2)}.`);
    } else {
        alert("Operación cancelada.");
    }
}

function mostrarInversiones() {
    if (inversiones.length > 0) {
        let resumen = "Resumen de inversiones:\n";
        inversiones.forEach((inversion, index) => {
            resumen += `Inversión ${index + 1}: Capital invertido: $${inversion.capital}, Interés generado: $${inversion.interesGenerado.toFixed(2)}, Total final: $${inversion.totalFinal.toFixed(2)}\n`;
        });
        alert(resumen);
    } else {
        alert("No se realizaron inversiones.");
    }
}

document.getElementById('invertirBtn').addEventListener('click', simularPlazoFijo);
document.getElementById('verInversionesBtn').addEventListener('click', mostrarInversiones);

window.addEventListener('load', function() {
    if (inversiones.length > 0) {
        let resumen = "Resumen de inversiones:\n";
        inversiones.forEach((inversion, index) => {
            resumen += `Inversión ${index + 1}: Capital invertido: $${inversion.capital}, Interés generado: $${inversion.interesGenerado.toFixed(2)}, Total final: $${inversion.totalFinal.toFixed(2)}\n`;
        });
        alert(resumen);
    } else {
        alert("No se realizaron inversiones.");
    }
});
