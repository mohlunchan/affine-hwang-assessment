export default {
    data() {
        return {
            formFields: [
                {
                    name: "name",
                    label: "Name",
                    rules: {
                        required: true,
                    },
                    type: 'input',
                    attrs: {
                        placeholder: "Insert name",
                    },
                },
                {
                    name: "email",
                    label: "Email",
                    rules: {
                        required: true,
                        email: true,
                    },
                    type: 'input',
                    attrs: {
                        placeholder: "Insert email",
                    },
                },
                {
                    name: "address",
                    label: "Address",
                    rules: {
                        required: true,
                    },
                    type: 'input',
                    attrs: {
                        placeholder: "Insert placeholder",
                    },
                },
            ],
        }
    },
    computed: {
        rules() {
            return this.formFields.reduce((obj, field) => {
                obj[field.name] = field.rules
                return obj
            }, {})
        }
    }
}