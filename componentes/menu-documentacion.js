//Desarrollado Por Juan Felipe Valencia Murillo.
Vue.component('menu-documentacion',{
	data(){
		return {
			href:location.href,
			host:DOMINIO,
			menu:[],
			menuVersion:{},
			versiones:[
				'v1.x'
			]
		}
	},
	mounted(){
		this.asignarMenu('v1.x');
		this.asignarMenuVersion('v1.x');
	},
	methods:{
		asignarMenu(version){
			this.menu=[
				{href:this.host+'documentacion/_version_/instalacion/',texto:'Instalación'},
				{href:this.host+'documentacion/_version_/configuracion/',texto:'Configuración'},
				{href:this.host+'documentacion/_version_/convenciones/',texto:'Convenciones'},
				{href:this.host+'documentacion/_version_/implementacion/',texto:'Implementación'}
			];
			version=this.obtenerVersionURL(version).substr(1,3);
			this.menu.forEach(function(item){
				item.href=item.href.replace('_version_',version);
			});
			if(version.substr(0,1)>=4) this.eliminarItemMenu(version,'autenticar-usuarios');
		},
		asignarMenuVersion(version){
			version=this.obtenerVersionURL(version);
			this.eliminarVersion(version);
			this.menuVersion={
				actual:version,
				versiones:this.versiones
			}
		},
		eliminarVersion(version){
			let index=this.versiones.indexOf(version);
			if(index>-1) this.versiones.splice(index,1);
		},
		obtenerVersionURL(defecto=null){
			let version=defecto;
			let index=location.href.indexOf('.x');
			if(index>-1) version='v'+location.href.substr(index-1,3);
			return version;
		},
		eliminarItemMenu(version,itemMenu){
			index=-1;
			this.menu.forEach(function(item,i){
				if(item.href.indexOf(itemMenu)>-1) index=i;
			});
			if(index>-1) this.menu.splice(index,1);
		}
	},
	template:`
	<div class="menu-doc">
	<ul>
		<li><a style="cursor:pointer;">{{menuVersion.actual}} <i class="fa fa-angle-down"></i></a>
			<ul>
				<li v-for="(item, index) in menuVersion.versiones">
					<a :href="host+'documentacion/'+item.substr(1,3)">{{item}}</a>
				</li>
			</ul>
		</li>
	</ul>
	<div class="hr"></div>
	<template v-for="(item, index) in menu">
		<a :href="item.href" class="menu_link" :style="href==item.href ? 'color:#5BC800; font-weight:bold;' : ''">{{item.texto}}</a>
		<div class="hr"></div>
	</template>
	</div>
	`
});