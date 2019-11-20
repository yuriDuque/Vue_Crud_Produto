<template>
  <tr>
    <th :key="index" v-for="(item, index) in Object.values(object)">{{item}}</th>
    <ListActions :id="object.id" />
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
