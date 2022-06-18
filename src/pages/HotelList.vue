<template>
  <div class="q-pa-md">
    <q-btn label="Yeni Otel Kayıt" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 900px; max-width: 90vw">
        <q-card-section class="row items-center q-pb-none">
          OTEL TANIMLAMA<q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <div class="q-gutter-md">
            <q-input v-model="text" autofocus label="Otel Adı" />
            <q-input v-model="text" label="Telefon" />
          </div> -->
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              autofocus
              v-model="name"
              label="Otel İsmi *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Lütfen Otel ismini giriniz.',
              ]"
            />
            <q-input v-model="address" label="Adres" />
            <q-input type="number" v-model="phone" label="Telefon" lazy-rules />
            <q-input v-model="email" label="Email" lazy-rules />
            <q-input v-model="website" label="Web Site Adresi" lazy-rules />
            <q-input
              type="textarea"
              v-model="description"
              label="Açıklama"
              lazy-rules
            />
            <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

            <div>
              <q-btn label="Kaydet" type="submit" color="primary" />
              <q-btn
                label="Sıfırla"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn flat label="Çıkış" color="red" v-close-popup />
          <q-btn class="bg-white text-teal" flat label="Kaydet" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      :rows="rows"
      row-key="name"
      :pagination="initialPagination"
    />
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';
const baseUrl = 'http://localhost:3006/hotels';
// const rows = [
//   {
//     Otel_Adı: "Larissa Hotel",
//     Adres: "Sarıyer Mahallesi, Sarıyer, Antalya",
//     Telefon: "053-212-1212",
//     Email: "info@larisaa",
//     WebSite: "larissa.com",
//     Açıklama: "Denize Sıfır",
//   },
// ];
export default {
  data() {
    const $q = useQuasar();
    const name = ref(null);
    const age = ref(null);
    const address = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const website = ref(null);
    const description = ref(null);
    const accept = ref(false);
    return {
      name,
      address,
      accept,
      phone,
      email,
      website,
      description,
      rows: [],
      medium: ref(false),
      initialPagination: {
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      async onSubmit() {
        if (accept.value !== true) {
          const response2 = [
            {
              name: name.value,
              address: address.value,
              phone: phone.value,
              email: email.value,
              website: website.value,
              description: description.value,
            },
          ];
          try {
            const response = await axios.post(baseUrl, {
              name: name.value,
              address: address.value,
              phone: phone.value,
              email: email.value,
              website: website.value,
              description: description.value,
            });
            this.rows.push(response2.data);
            //veya
            //this.rows = [...this.rows, response2.data];
          } catch (error) {
            console.log(error);
          }
        } else {
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        address.value = null;
        phone.value = null;
        email.value = null;
        website.value = null;
        description.value = null;
        accept.value = false;
      },
    };
  },
  async created() {
    try {
      const response = await axios.get(baseUrl);
      this.rows = response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  .my-sticky-header-table
  .q-table__top,
  .my-sticky-header-table
  .q-table__bottom,
  .my-sticky-header-table
  thead tr:first-child th
    background-color:#89bdd2 !important
</style>
