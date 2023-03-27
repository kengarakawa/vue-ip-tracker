<script lang="ts">
import IPInfo from "../components/IPInfo.vue"
import leaflet from "leaflet"

import { onMounted, ref, reactive, watch } from "vue"

export default {
  components: {
    IPInfo,
  },

  setup() {
    const ip = ref("")
    const isLoading = ref(false)
    const ipDetail = reactive({
      ip: "8.8.8.8",
      location: "Vanuatu",
      timezone: "-08:00",
      isp: "Feel Good Inc",
      lat: 7.8804,
      long: 98.3923,
    })

    let mymap
    onMounted(() => {
      //mymap = leaflet.map('map').setView([51.505, -0.09], 13);
      mymap = leaflet.map("map").setView([ipDetail.lat, ipDetail.long], 13)

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        .addTo(mymap)
    })

    watch(ipDetail, (newValue, oldValue) => {
      console.log(newValue)

      leaflet.marker([newValue.lat, newValue.long]).addTo(mymap)

      mymap.panTo([newValue.lat, newValue.long], 15)
    })

    const seekMyIp = async () => {
      // const endpoint = 'https://ipinfo.io'
      const endpoint = "https://api.ipify.org?format=json"

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const data = await response.json()
      } catch (err) {
        alert(err.message)
      }
      return data.ip
    }

    const seekHandler = async () => {
      isLoading.value = true

      // let checkingIP = ip.value === "" ? await seekMyIp() : ip.value
      const apiKey = "at_rSO1le5so5ENj9ZShu5EMHUZRj9Px"
      const endpoint = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip.value}`

      const response = await fetch(endpoint)
      const data = await response.json()

      ipDetail.ip = data.ip
      ipDetail.location = data.location.region
      ipDetail.timezone = data.location.timezone
      ipDetail.isp = data.isp
      ipDetail.lat = data.location.lat
      ipDetail.long = data.location.lng
      isLoading.value = false

      return {
        ip: data.ip,
        location: data.location.region,
        timezone: data.location.timezone,
        isp: data.isp,
      }
    }

    return {
      ip,
      seekHandler,
      ipDetail,
      isLoading,
    }
  },
}
</script>

<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div v-if="isLoading" class="z-50 absolute top-0 left-0 w-full bg-red-400">
      L O A D I N G . . .
    </div>
    <!-- Search / Result  -->
    <div class="z-20 flex justify-center relative bg-cover bg-hero-pattern">
      <!-- Search Input --?-->
      
        <div class="w-full max-w-screen-sm pb-16">
          <h2 class="text-center pt-16 pb-4 text-4xl font-bold">IP Tracker</h2>
          <form @submit.prevent="seekHandler">
          <div class="flex ">
            <input
              type="text"
              class="flex-1 border-gray-100 border-2 rounded-tl-md rounded-bl-md bg-gray-200 py-2 focus:outline-none text-lg px-3 w-full"
              placeholder="Search for IP address or leave empty to get your current IP info"
              v-model="ip"
            />
            <button
              class="text-4xl font-extrabold px-3 rounded-tr-md rounded-br-md bg-black text-white cursor-pointer flex items-center"
            >
              &raquo;
            </button>
          </div>
        </form>
        </div>
      

      <IPInfo :info="ipDetail" />
    </div>

    <div id="map" class="h-full z-10"></div>
  </div>
</template>
