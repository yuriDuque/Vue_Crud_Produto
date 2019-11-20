<template>
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
</template>

<script>
export default {
  name: "listHeader",

  props: {
    fields: null
  }
};
</script>
