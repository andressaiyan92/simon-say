let info = document.getElementById("copyData");
let programmer = "Andrés Sevillano Molina";
// Obtener año actual
let year = new Date().getFullYear();
let copyright = `${year} - ${programmer}`;
info.textContent = copyright;