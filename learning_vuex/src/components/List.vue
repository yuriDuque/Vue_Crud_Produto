<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            class="font-weight-bold"
            scope="col"
            :key="index"
            v-for="(item, index) in fields"
            v-bind:class="{'d-flex justify-content-center': item === 'Ações'}"
          >{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <ListRow :key="index" v-for="(item, index) in dados" :produto="item" />
      </tbody>
    </table>
  </div>
</template>

<script>
import ListRow from "./ListRow";

export default {
  name: "list",

  components: {
    ListRow
  },

  props: {
    fields: null
  },

  data() {
    return {
      dados: this.$store.getters.getAll
    };
  },

  mounted() {
    this.$store.watch(
      () => this.$store.getters.getAll,
      n => {
        this.dados = n;
      }
    );
  }
};
</script>
