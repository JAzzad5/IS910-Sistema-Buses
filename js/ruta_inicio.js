// Inicializando en localStorage las rutas (solo sino existen)
if (!localStorage.getItem("Rutas")) {
  let rutas = [

    {
      nombreRuta: "Tegucigalpa - Copán",
      distancia: 320.8,
      combustible: 9000,
      pasaje: { normal: 700, primeraClase: 1000, ninos3eraEdad: 500 },
      peaje: 174,
      alimentacion: 50,
    },
    {
      nombreRuta: "Tegucigalpa - San Pedro Sula",
      distancia: 251,
      combustible: 6748.47,
      pasaje: { normal: 550, primeraClase: 785, ninos3eraEdad: 395 },
      peaje: 261,
      alimentacion: 50,
    },
    {
      nombreRuta: "Tegucigalpa - La Ceiba",
      distancia: 401.7,
      combustible: 10795.94,
      pasaje: { normal: 880, primeraClase: 1255, ninos3eraEdad: 630 },
      peaje: 261,
      alimentacion: 120,
    },
    {
      nombreRuta: "Tegucigalpa - Comayagua",
      distancia: 411.1,
      combustible: 11048.58,
      pasaje: { normal: 900, primeraClase: 1285, ninos3eraEdad: 645 },
      peaje: 261,
      alimentacion: 120,
    }
  ];
  localStorage.setItem("Rutas", JSON.stringify(rutas));
}

if (!localStorage.getItem("calculos")) {
  let calculos = [];
  localStorage.setItem("calculos", JSON.stringify(calculos));
}

if (!localStorage.getItem("ultimoCalculo")) {
  localStorage.setItem("ultimoCalculo", JSON.stringify({}));
}

// Procedimiento para llenar el select de seleccion de rutas automaticamente
const rutas = JSON.parse(localStorage.getItem("Rutas"));
const selectRuta = document.getElementById("ruta");
const selectBus = document.getElementById("bus");
let optionRutas;

for (let i = 0; i < rutas.length; i++) {
  optionRutas
    ? (optionRutas =
        optionRutas + `<option value="${i}">${rutas[i].nombreRuta}</option>`)
    : (optionRutas = `<option value="${i}">${rutas[i].nombreRuta}</option>`);
}

selectRuta.innerHTML = optionRutas;

// Sacar el valor del bus seleccionado
let noAsientos = selectBus.value;
selectBus.addEventListener("change", (event) => {
  noAsientos = document.getElementById("bus").value;
});

const calcular = () => {
  const primeraClase = Number(document.getElementById("primeraclase").value);
  const normal = Number(document.getElementById("normal").value);
  const ninos = Number(document.getElementById("niños").value);
  const terceraEdad = Number(document.getElementById("terceraedad").value);

  const max = verificarMax(primeraClase, normal, ninos, terceraEdad);

  if (!max) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "La Cantidad de Pesajeros es Incorrecta",
    });
    return;
  }

  const iRuta = Number(selectRuta.value);

  const ingresos =
    primeraClase * rutas[iRuta].pasaje.primeraClase +
    normal * rutas[iRuta].pasaje.normal +
    ninos * rutas[iRuta].pasaje.ninos3eraEdad +
    terceraEdad * rutas[iRuta].pasaje.ninos3eraEdad;
  const gastoVariable = rutas[iRuta].combustible + rutas[iRuta].peaje;
  const gastoFijo =
    rutas[iRuta].alimentacion *
    (primeraClase + normal + ninos + terceraEdad + 2);

  const beneficioEsperado = ingresos - gastoVariable - gastoFijo;

  let calculos = JSON.parse(localStorage.getItem("calculos"));
  // let ultimoCalculo = JSON.parse(localStorage.getItem('ultimoCalculo'));

  if (calculos.length == 0) {
    calculos.push({
      nombreRuta: rutas[iRuta].nombreRuta,
      ingresos,
      gastoVariable,
      gastoFijo,
      beneficioEsperado,
    });
    localStorage.setItem("calculos", JSON.stringify(calculos));
    localStorage.setItem(
      "ultimoCalculo",
      JSON.stringify({
        nombreRuta: rutas[iRuta].nombreRuta,
        ingresos,
        gastoVariable,
        gastoFijo,
        beneficioEsperado,
      })
    );
    window.location.href = "../public/calculo.html";
  } else {
    // let verificaExistente = calculos[i].nombreRuta.includes(rutas[iRuta].nombreRuta);
    let verificaExistente = calculos.some(
      (calculo) => calculo.nombreRuta == rutas[iRuta].nombreRuta
    );
    console.log(verificaExistente);

    if (verificaExistente) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Ya has hecho un calculo para esta ruta",
      });
      return;
    }

    calculos.push({
      nombreRuta: rutas[iRuta].nombreRuta,
      ingresos,
      gastoVariable,
      gastoFijo,
      beneficioEsperado,
    });
    localStorage.setItem("calculos", JSON.stringify(calculos));
    localStorage.setItem(
      "ultimoCalculo",
      JSON.stringify({
        nombreRuta: rutas[iRuta].nombreRuta,
        ingresos,
        gastoVariable,
        gastoFijo,
        beneficioEsperado,
      })
    );
    window.location.href = "../public/inicio.html";
  }
};

const verificarMax = (pc, n, ni, t) => {
  if (pc + n + ni + t > noAsientos) {
    return false;
  }
  return true;
};

const limpiar = () => {
  const primeraClase = document.getElementById("primeraclase");
  const normal = document.getElementById("normal");
  const ninos = document.getElementById("niños");
  const terceraEdad = document.getElementById("terceraedad");

  primeraClase.value = 0;
  normal.value = 0;
  ninos.value = 0;
  terceraEdad.value = 0;
};
