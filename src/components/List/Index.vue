<template>
  <div>
    <table class="table">
      <slot name="header" />
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "list"
};
</script>
