<template>
  <th class="d-flex justify-content-center">
    <button class="btn" @click="edit">
      <font-awesome-icon icon="edit" style="font-weight: bold" />
    </button>
    <button class="btn" @click="deletar">
      <font-awesome-icon icon="trash-alt" />
    </button>
  </th>
</template>

<script>
export default {
  name: "listRow",

  props: {
    id: null
  },

  methods: {
    edit() {
      this.$store.commit("produtoSelected", this.id);
    },

    deletar() {
      this.$store.commit("decrement", this.id);
    }
  }
};
</script>
