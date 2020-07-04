<template>
  <tr>
    <th :key="index" v-for="(item, index) in Object.values(object)">{{item}}</th>
    <ListActions :id="object.id" @emit_select="emit_select($event)" @emit_delete="emit_delete($event)"/>
  </tr>
</template>

<script>
import ListActions from "./ListActions";

export default {
  name: "listRow",

  components: {
    ListActions
  },

  props: {
    object: null
  },

  methods: {
    emit_select(id){
      this.$emit("emit_select", id);
    },

    emit_delete(id){
      this.$emit("emit_delete", id);
    }
  }
};
</script>

<style>
th {
  font-weight: normal;
  border-top: 0px solid #dee2e6 !important;
  border-bottom: 0px solid #dee2e6 !important;
}
</style>
