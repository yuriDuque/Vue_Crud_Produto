<template>
  <tr>
    <th>{{produto.id}}</th>
    <th>{{produto.nome}}</th>
    <th>{{produto.valor}}</th>
    <th class="d-flex justify-content-center">
      <button class="btn" @click="edit">
          <font-awesome-icon icon="edit" style="font-weight: bold"/></button>
        <button class="btn" @click="deletar">
          <font-awesome-icon icon="trash-alt" />
        </button>
    </th>
  </tr>
</template>

<script>

export default {
  name: "listRow",

  props: {
    produto: null
  },

  methods:{
    edit(){
      this.$store.commit('produtoSelected', this.produto.id);
    },

    deletar(){
      this.$store.commit('decrement', this.produto.id);
    }
  }
};
</script>

<style>
th{
    font-weight: normal;
}
</style>
