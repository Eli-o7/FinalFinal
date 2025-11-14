// Cargar el archivo JSON
fetch('data/reserva.json')
  .then(response => response.json()) // Convierte la respuesta en un objeto JSON
  .then(data => {
    // Obtener el array de locales
    const locales = data.locales;

    // Obtener el campo de selección del local
    const localInput = document.getElementById("local");

    // Iterar sobre los locales y crear las opciones en el campo select
    locales.forEach(local => {
      const option = document.createElement("option");
      option.value = local.id; // Usamos el 'id' como valor para cada opción
      option.textContent = `${local.nombre} - ${local.direccion}`;
      localInput.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });

// Manejo de envío del formulario
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de página)

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries()); // Convertir los datos del formulario a un objeto

  console.log("Datos de la reserva:", data);
});
