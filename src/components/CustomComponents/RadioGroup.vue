<template>
    <div class="radio-group">
        <label v-for="opt in _options" :for="`${name}-${opt.value}`" :key="opt.value">
            <input type="radio" :name="name" :id="`${name}-${opt.value}`" :value="opt.value" v-model="selected">
            <md-button @click="clicked">{{opt.label}}</md-button>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: [Number, String],
            default: 0,
        },
    },
    created() {
        this.$emit('update:value', this.selected);
    },
    data() {
        if (typeof this.default === 'string') {
            const i = this.options.findIndex(opt => (
                this.default === opt.value || this.default === opt.label
            ));
            return {
                selected: i < 0 ? this.options[0].value : this.options[i].value,
            };
        } else if (this.default instanceof Number) {
            const d = this.default < this.options.length ? this.default : this.options.length - 1;
            return {
                selected: this.options[d].value,
            };
        }
        return {
            selected: this.options[0].value,
        };
    },
    computed: {
        _options() {
            return this.options.map((opt, i) => ({
                value: i,
                label: i,
                ...opt,
            }));
        },
    },
    methods: {
        clicked(e) {
            this.selected = e.target.previousElementSibling.value;
            this.$emit('update:value', this.selected);
        },
    },
};
</script>

<style lang="scss" scoped>
.radio-group {
    display: flex;
    flex-wrap: wrap;

    input[type="radio"] {
        display: none;
        
        & ~ button {
            color: #60bc90;
            border: solid 1px #60bc90;
        }

        &:checked ~ button.md-button:not(:disabled):not(.md-raised) {
            color: white;
            background-color: #60bc90;
        }
    }
}
</style>
