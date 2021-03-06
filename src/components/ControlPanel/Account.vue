<template>
    <form id="form-wrapper">
        <form-field
            title="Contact Email"
            description="Your email address will not be displayed on the site or shared with other users.">
            <md-input-container>
                <md-input
                    placeholder="A valid e-mail address you check regularly"
                    v-model="info.contactEmail"></md-input>
            </md-input-container>
        </form-field>
        <form-field
            title="Phone Number"
            desciption="We won't share your phone number with other users.">
            <md-input-container>
                <md-input
                    placeholder="+886 912345678"
                    v-model="info.phone"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Gender">
            <radio-group
                :options="genderOpt"
                :value.sync="info.gender"
                name="gender"
                :default="info.gender">
            </radio-group>
        </form-field>
        <form-field
            title="Birthday"
            description="Only your age will be displayed on your profile.">
            <date-picker v-model="info.birthday" class="md-input-container"></date-picker>
        </form-field>
        <form-field title="Nationality">
            <md-input-container>
                <label for="nationality">Nationality</label>
                <md-select name="nationality" id="nationality" v-model="info.nationality">
                    <md-option v-for="nation in nationalities" :value="nation.value" :key="nation.value">
                        {{nation.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field title="Current Location">
            <md-input-container>
                <md-input
                    placeholder="The city you are living in"
                    v-model="info.localCity"
                    class="location"
                    ref="location"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Occupation">
            <md-input-container>
                <md-input v-model="info.occupation"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Major / Profession">
            <md-input-container>
                <md-input v-model="info.major"></md-input>
            </md-input-container>
        </form-field>
        <md-button class="md-raised md-primary" @click="save">Save</md-button>
    </form>
</template>

<script>
import jQuery from 'jquery';
import 'geocomplete';
import DatePicker from 'vuejs-datepicker';

import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import { nationalities } from '../../config';

export default {
    components: { FormField, RadioGroup, DatePicker },
    data() {
        const { user } = this.$route.meta.user;
        return {
            info: {
                contactEmail: user.contactEmail || user.email,
                phone: user.phone,
                gender: user.gender,
                birthday: user.birthday,
                nationality: user.nationality.toUpperCase(),
                localCity: user.localCity,
                occupation: user.occupation || '',
                major: user.major || '',
            },
            infoValidation: ['contactEmail', 'gender', 'birthday', 'nationality', 'localCity'],
            genderOpt: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }],
            nationalities,
        };
    },
    methods: {
        async save() {
            const valid = this.infoValidation.every(key => !!this.info[key]);
            if (valid) {
                const args = {
                    params: { userId: localStorage.getItem('_id') },
                    body: this.info,
                };
                const result = await this.api.users.update(args);
                if (result.ok) {
                    this.alertify.notify('Saved successfully');
                } else {
                    console.error(result);
                }
            } else {
                let error = '';
                this.infoValidation.filter(key => !this.info[key]).forEach((key) => {
                    error += `${key} can not be empty<br>`;
                });
                this.alertify.alert(error);
            }
        },
    },
    mounted() {
        /*  Set up geocomplete, since geocomplete won't trigger the v-model event,
         *  bind the geocode:result event to sync the data of this template.
         */
        jQuery('.location').geocomplete().bind('geocode:result', () => {
            this.info.localCity = this.$refs.location.$el.value;
        });
    },

};
</script>

<style lang="scss" scoped>
#form-wrapper /deep/ {
    width: 100%;
    text-align: left;

    section {
        margin: 1rem 0;

        .md-input-focused {
            &::after {
                background-color: #60bc90;
            }
        }

        .vdp-datepicker__calendar {
            .selected {
                background: #60bc90;
            }

            .cell:not(.blank):not(.disabled).day {
                &:hover {
                    border: 1px solid #60bc90;
                }
            }
        }
    }

    .md-button:not(:disabled).md-primary.md-raised {
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 0.1rem;
        background-color: #f8b62c;
        border-radius: 3.6px;
        padding: 8px 80px;

        &:hover {
            background-color: #f8b62c;
        }
    }
}
</style>
