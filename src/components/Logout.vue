<script>
export default {
  mounted() {
    localStorage.removeItem("token");
    // this.$router.push("/");
    window.location = "/";
  },
};
</script>
