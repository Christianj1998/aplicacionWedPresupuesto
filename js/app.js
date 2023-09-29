const ingresos = [
   new Ingreso("venta casa", 2000.00),
   new Ingreso("venta coche", 20)
];
const egresos = [
   new Egreso("lujos", 1000.00),
   new Egreso("putas", 2000.00)
];

let cargarApp = () => {
   cargarCabecero();
   cargarIngreso();
   cargarEgreso();

}
let totalIngresos = () => {
   let totalIngreso = 0;
   for (let ingreso of ingresos) {
      totalIngreso += ingreso.valor;
   }
   return totalIngreso;
}
let totalEgresos = () => {
   let totalEgreso = 0;
   for (let egreso of egresos) {
      totalEgreso += egreso.valor;
   }

   return totalEgreso;
}

let cargarCabecero = () => {
   let presupuesto = totalIngresos() - totalEgresos();
   let porcentajeEgreso = totalEgresos() / totalIngresos();
   document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
   document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
   document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
   document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
   return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

const formatoPorcentaje = (valor) => {
   return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })
}

const cargarIngreso = () => {
   let ingresoHTML = '';
   for (let ingreso of ingresos) {
      ingresoHTML += crearIngresoHTML(ingreso);
   }
   document.getElementById('lista-ingresos').innerHTML = ingresoHTML;
}

const crearIngresoHTML = (ingresos) => {
   let ingresoHTML = `
   <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingresos.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">+${formatoMoneda(ingresos.valor)}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick='eliminarIngreso(${ingresos.id})'
                  ></ion-icon>
                </button>
              </div>
            </div>
          </div>
   `
   return ingresoHTML
}
const eliminarIngreso = (id) => {
   let indiceEliminar = ingresos.findIndex(ingresos => ingresos.id === id)
   ingresos.splice(indiceEliminar, 1);
   cargarCabecero();
   cargarIngreso()
}
const cargarEgreso = () => {
   let egresoHTML = '';
   for (let egreso of egresos) {
      egresoHTML += crearEgresoHTML(egreso)
   }
   document.getElementById('lista-egresos').innerHTML = egresoHTML
}

const crearEgresoHTML = (egresos) => {
   let egresoHTML = `
   <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${egresos.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">-  ${formatoMoneda(egresos.valor)}</div>
                    <div class="elemento_porcentaje">${formatoPorcentaje(egresos.valor / totalEgresos())}</div>
                    <div class="elemento_eliminar">
                      <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                        onclick='eliminarEgreso(${egresos.id})'
                        ></ion-icon>
                      </button>
                    </div>
                </div>
            </div>
   `;
   return egresoHTML
}
const eliminarEgreso = (id) => {
   let indiceEliminar = egresos.findIndex(egresos => egresos.id === id);
   egresos.splice(indiceEliminar, 1)
   cargarCabecero()
   cargarEgreso()
}

let agregarDato = () => {
   let forma = document.forms['forma'];
   let tipo = forma['tipo']
   let descripcion = forma['descripcion'];
   let valor = forma['valor']
   if (descripcion.value !== '' && valor.value !== '') {
      if (tipo.value === 'ingreso') {
         ingresos.push(new Ingreso(descripcion.value, +valor.value))
         cargarCabecero()
         cargarIngreso()

      } else if (tipo.value === 'egreso') {
          egresos.push(new Egreso(descripcion.value, +valor.value))
          cargarCabecero()
          cargarEgreso()
      }

   }
}
