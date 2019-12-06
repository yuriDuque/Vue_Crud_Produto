<template>
  <form @submit.prevent="submit" @reset="reset">
    <div class="form-row">

      <!-- Nome -->
      <div class="form-group col-6" id="nome">
        <label
          class="font-weight-bold"
          :class="{'label-error':formStatus && !$v.nome.required}"
        >Nome</label>
        <input
          type="text"
          class="form-control"
          :class="{'border-error':formStatus && !$v.nome.required}"
          v-model="$v.nome.$model"
        />
        <div
          class="label-error message font-weight-bold"
          v-if="formStatus && !$v.nome.required"
        >O nome é obrigatório.</div>
      </div>

      <!-- Valor -->
      <div class="form-group col-6" id="valor">
        <label
          class="font-weight-bold"
          :class="{'label-error':formStatus && !$v.valor.required}"
        >Valor</label>
        <input
          type="text"
          class="form-control"
          :class="{'border-error':formStatus && !$v.valor.required}"
          v-model.trim="$v.valor.$model"
        />
        <div
          class="label-error message font-weight-bold"
          v-if="formStatus && !$v.valor.required"
        >O valor é obrigatório.</div>
      </div>

      <div class="align-self-end col-12">
        <button
          type="reset"
          @click="formStatus=false"
          class="btn btn-danger float-left font-weight-bold"
        >
          <font-awesome-icon icon="window-close" class="mr-1" />CANCELAR
        </button>

        <button
          type="submit"
          @click="formStatus=true"
          class="btn btn-success float-right font-weight-bold"
        >
          <font-awesome-icon icon="save" class="mr-1" />
          {{TextSave}}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Form",

  validations() {
    return {
      valor: {
        required
      },

      nome: {
        required
      }
    };
  },

  data() {
    return {
      id: null,
      valor: null,
      nome: null,
      TextSave: "SALVAR",
      produto: this.$store.getters.getProdutoSelected,

      formStatus: false
    };
  },

  mounted() {
    this.$store.watch(
      () => this.$store.getters.getProdutoSelected,
      produto => {
        this.id = produto.id;
        this.nome = produto.nome;
        this.valor = produto.valor;

        this.formStatus = false;
      }
    );
  },

  watch: {
    valor() {
      debugger;
      if (this.valor) {
        this.valor = this.number_format(this.valor);
      }
    }
  },

  methods: {
    submit() {
      this.formStatus = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {

        this.produto = {
          id: this.id,
          nome: this.nome,
          valor: this.valor
        } 

        if (!this.id) {
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
      this.formStatus = false;
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
  }
};
</script>

<style>
label {
  margin-bottom: 0px !important;
}

.message {
  font-size: 13px !important;
}

.label-error {
  color: rgb(234, 84, 85);
}

.border-error {
  border-color: rgb(234, 84, 85, 0.55) !important;
}

.border-error:focus {
  box-shadow: 0 0 0 0.1rem rgba(234, 84, 85, 0.25) !important;
}

@media screen and (max-width: 750px) {
  #nome {
    max-width: 100% !important;
    flex: 0 0 100%;
  }

  #valor {
    max-width: 100% !important;
    flex: 0 0 100%;
  }
}
</style>
