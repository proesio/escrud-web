/**
 * Este archivo es parte de la web Escrud.
 * 
 * @author    Juan Felipe Valencia Murillo  <juanfe0245@gmail.com>
 * @copyright 2018 - presente  Juan Felipe Valencia Murillo
 */

Vue.component('pie-pagina', {
  mounted() {
    this.posicionarFooter();
  },
  methods: {
    posicionarFooter() {
      setTimeout(function () {
        if (document.body.clientHeight < window.innerHeight) {
          let footer = document.getElementsByTagName('footer')[0];
          let header = document.getElementsByTagName('header')[0];
          let contenido = document.getElementsByClassName('contenido')[0];
          footer.style.marginTop = (window.innerHeight - header.clientHeight - contenido.clientHeight - footer.clientHeight) + 'px';
        }
        else {
          window.onscroll = (event) => {
            let subir = document.getElementsByClassName('accion-subir')[0];
            let estado = window.scrollY > 100 ? 'visible' : 'hidden';
            subir.style.visibility = estado;
          }
        }
      }, 100);
    },
    posicionarScrollY(x = 0, y = 0) {
      if (window.scrollY) window.scroll(x, y);
    }
  },
  template: `
    <footer>
        <div class="accion-subir" @click="posicionarScrollY()"><i class="fas fa-chevron-up"></i></div>
        <div>
            <a href="https://www.facebook.com/proesio/" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.youtube.com/channel/UCk5pHq8tVsn0RdGoGB56QQg" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
        <span>© Derechos de Autor {{new Date().getFullYear()}} Juan Felipe Valencia Murillo</span>
    </footer>
    `
});