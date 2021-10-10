import faker from 'faker'

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
                    fake: () => {
                        return faker.name.findName()
                    }
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
                    fake: () => {
                        return faker.internet.email()
                    }
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
                    fake: () => {
                        return faker.address.streetAddress()
                    }
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