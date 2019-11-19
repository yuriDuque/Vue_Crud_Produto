<template>
  <div class="container">
    <Card><Form :baseProduto="produto" @submit="submit($event)" /></Card>
    <Card><List :fields="fields"/></Card>
  </div>
</template>

<script>
import Card from "./Card";
import List from "./List";
import Form from "./Form";

export default {
  name: "index",
  components: {
    Card,
    List,
    Form
  },

  data(){
    return {
      fields: ["Id", "Nome", "Valor", "Ações"],

      produto: null
    };
  },

  methods: {
    submit(p) {
      if (p.id == null) {
        var id = 1;
        this.data.forEach(element => {
          if(element.id >= id){
            id = element.id + 1
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

    edit(p){
      this.produto = p;
    },

    deletar(id){
      var deletado = this.data.filter(produto => produto.id != id);
      this.data = deletado;
      this.produto = null;
    }
  }
};
</script>

<style>
</style>
