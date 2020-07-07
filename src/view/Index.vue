<template>
  <div class="container">
    <Card>
      <Form :baseProduto="produto" @submit="submit($event)" :selected_id="selected_id" />
    </Card>
    <Card>
      <List>
        <template #header>
          <ListHeader :fields="fields" />
        </template>
        <template #body>
          <ListRow
            :key="index"
            v-for="(item, index) in dados"
            :object="item"
            @emit_select="emit_select($event)"
            @emit_delete="emit_delete($event)"
          />
        </template>
      </List>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card";
import List from "../components/List/Index";
import ListHeader from "../components/List/ListHeader";
import ListRow from "../components/List/ListRow";
import Form from "./Form";

import axios from "axios";
import config from "../../config.js";
const apiUrl = config.apiUrl + "/produto";

export default {
  name: "index",
  components: {
    Card,
    List,
    ListHeader,
    ListRow,
    Form
  },

  data() {
    return {
      fields: ["Id", "Nome", "Valor", "Ações"],

      dados: [],

      produto: null,

      selected_id: null,
      deleted_id: null
    };
  },

  mounted() {
    axios
      .get(`${apiUrl}`)
      .then(response => {
        this.dados = response.data;

        this.dados.forEach(element => {
          var valor = element.price + "";
          if (valor.indexOf(".") == valor.length - 2) {
            valor += "0";
          }

          element.price = this.number_format(valor);
        });
      })
      .catch(e => {
        console.log(e);
      });
  },

  methods: {
    emit_select(id) {
      this.selected_id = id;
    },

    emit_delete(id) {
      this.deleted_id = id;
    },

    number_format(value) {
      value = value + "";
      value = this.mascara_numero(value);

      if (value && value.includes("R$")) {
        value = value.replace("R$ ", "");
      }

      value = parseInt(value.replace(/[\D]+/g, ""));
      value = value + "";
      value = value.replace(/([0-9]{2})$/g, ",$1");

      if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }

      if (value == "NaN") {
        return "R$ 0,00";
      }

      return "R$ " + value;
    },

    mascara_numero(text) {
      if (text) {
        text = text.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      }

      return text;
    }
  }
};
</script>

<style>
</style>
