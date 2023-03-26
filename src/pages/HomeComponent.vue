<script lang="ts">
    import IPInfo from '../components/IPInfo.vue';
    import leaflet from "leaflet"

    import  { onMounted } from 'vue'


    export default {
        components : {
           IPInfo 
        }, 

        setup() {


            let mymap ;
            onMounted(() => {
                mymap = leaflet.map('map').setView([51.505, -0.09], 13);
                leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(mymap);

            })     

        }

    }
</script>

<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search / Result  -->
    <div class="z-20 flex justify-center relative bg-cover bg-hero-pattern">
      <!-- Search Input --?-->
      <div class="w-full max-w-screen-sm pb-16">
        <h2 class="text-center pt-16 pb-4 text-4xl font-bold">IP Tracker</h2>
        <div class="flex">
          <input
            type="text"
            class="flex-1 border-gray-100 border-2 rounded-tl-md rounded-bl-md bg-gray-200 py-2 focus:outline-none text-lg px-3"
            placeholder="Search for IP address or leave empty to get your current IP info"
          />
          <button
            class="text-4xl font-extrabold px-3 rounded-tr-md rounded-br-md bg-black text-white cursor-pointer flex items-center"
          >
            &raquo;
          </button>
        </div>
      </div>

      <IPInfo />
    </div>
    
    <div id="map" class="h-full z-10"></div>
  </div>
</template>
