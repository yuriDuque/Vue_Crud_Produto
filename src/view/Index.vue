<template>
  <div class="container">
    <Card>
      <Form :baseProduto="produto" @submit="submit($event)" />
    </Card>
    <Card>
      <List>
        <template #header>
          <ListHeader :fields="fields" />
        </template>
        <template #body>
          <ListRow :key="index" v-for="(item, index) in dados" :object="item" />
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

      dados: this.$store.getters.getAll,

      produto: null
    };
  },

  mounted() {
    this.$store.watch(
      () => this.$store.getters.getAll,
      n => {
        this.dados = n;
      }
    );
  },

  methods: {
    submit(p) {
      if (p.id == null) {
        var id = 1;
        this.data.forEach(element => {
          if (element.id >= id) {
            id = element.id + 1;
          }
        });

        p.id = id;
        this.data.push(p);
      } else {
        var index = this.data.findIndex(produto => produto.id == p.id);
        this.data[index] = p;
      }

      this.produto = null;
    },

    edit(p) {
      this.produto = p;
    },

    deletar(id) {
      var deletado = this.data.filter(produto => produto.id != id);
      this.data = deletado;
      this.produto = null;
    }
  }
};
</script>

<style>
</style>
