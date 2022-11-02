<template>
  <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: ['totalPages'],
  data() {
    return {
      currentPage: 1,
      size: 8,
    };
  },
  watch: {
    currentPage: {
      handler() {
        this.onPageChange();
      },
    },
    size: {
      handler() {
        this.currentPage = 1;
        this.onPageChange();
      },
    },
  },
  methods: {
    onPageChange() {
      this.$emit("page-change", this.currentPage - 1, this.size);
    },
  },
}
</script>

<style scoped>

</style>