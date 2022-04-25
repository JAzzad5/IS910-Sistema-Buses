const {nombreRuta, ingresos, gastoVariable, gastoFijo, beneficioEsperado} = JSON.parse(localStorage.getItem('ultimoCalculo'));

document.getElementById('ruta').value = nombreRuta;
document.getElementById('ingresos').value = ingresos;
document.getElementById('gasto_variable').value = gastoVariable;
document.getElementById('gasto_fijo').value = gastoFijo;
document.getElementById('beneficio').value = beneficioEsperado;
