<template>
  <form @submit="submit" @reset="reset">
    <div class="form-row">
      <div class="form-group col-6">
        <label class="font-weight-bold">Nome</label>
        <input type="text" class="form-control" v-model="produto.nome" @change="validarCampos" />
      </div>
      <div class="form-group col-6">
        <label class="font-weight-bold">Valor</label>
        <input type="text" class="form-control" v-model="valor" @change="validarCampos" />
      </div>
      <div class="align-self-end col-12">
        <button type="reset" class="btn btn-danger float-left font-weight-bold">
          <font-awesome-icon icon="window-close" class="mr-1" />CANCELAR
        </button>

        <button type="submit" class="btn btn-success float-right font-weight-bold">
          <font-awesome-icon icon="save" class="mr-1" />
          {{TextSave}}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Form",

  data() {
    return {
      valor: "",
      TextSave: "SALVAR",
      produto: this.$store.getters.getProdutoSelected,

      saveActive: false
    };
  },

  mounted() {
    this.$store.watch(
      () => this.$store.getters.getProdutoSelected,
      n => {
        this.produto = n;
        this.valor = this.produto.valor;
      }
    );
  },

  watch: {
    valor() {
      if (this.valor) {
        this.valor = this.number_format(this.valor);
      }
    }
  },

  methods: {
    submit(e) {
      e.preventDefault();
      if (this.saveActive) {
        this.produto.valor = this.valor;

        if (!this.produto.id) {
          this.$store.commit("increment", this.produto);
        } else {
          this.$store.commit("edit", this.produto);
        }

        this.reset();
      }
    },

    reset() {
      this.$store.commit("resetProduto");
      this.TextSave = "SALVAR";
      this.saveActive = false;
    },

    number_format(value) {
      value = value + "";
      value = this.mascara_numero(value);

      if (value && value.includes("R$")) {
        value = value.replace("R$ ", "");
      }

      value = parseInt(value.replace(/[\D]+/g, ""));
      value = value + "";
      value = value.replace(/([0-9]{2})$/g, ",$1");

      if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }

      if (value == "NaN") {
        return "R$ 0,00";
      }

      return "R$ " + value;
    },

    mascara_numero(text) {
      if (text) {
        text = text.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      }

      return text;
    },

    validarCampos() {
      var invalido = 0;

      if (!this.produto.nome) {
        invalido++;
      }

      if (!this.valor) {
        invalido++;
      }

      if (invalido) {
        this.saveActive = false;
      } else {
        this.saveActive = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
