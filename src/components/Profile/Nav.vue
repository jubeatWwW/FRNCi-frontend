<template>
        <nav>
            <div class="mask">
                <figure><img :src="photo"/></figure>
                <section>
                    <p class="profile-name">{{firstName}}</p>
                    <p><span class="fa fa-leaf"></span>{{age}}, {{genderStr[gender]}}</p>
                    <p><span class="fa fa fa-map-marker"></span>{{localCity}}</p>
                    <p><span class="fa fa-globe"></span>from {{nationDisplayName}}</p>
                    <p><span class="fa fa-bullhorn"></span>{{meetPreference}}</p>
                </section>
                <div class="links">
                    <router-link to="/controlpanel/profile" v-if="!isOtherUser">
                        <i class="fa fa-pencil"></i>Edit Profile
                    </router-link>
                    <a v-if="showSendRequestBtn" @click="invite">
                        <i class="fa fa-paper-plane"></i>Send Request
                    </a>
                    <router-link  v-if="showSendMessageBtn" :to="`/chat/a/${$route.meta.otherUser.user._id}`">
                        <i class="fa fa-comment"></i>Message
                    </router-link>
                </div>
            </div>
        </nav>
</template>

<script>
import { nationalities } from '../../config';

export default {
    props: {
        bg: {
            type: String,
            default: '',
        },
        photo: {
            type: String,
            default: 'static/img/logo_frnci.png',
        },
        firstName: {
            type: String,
            default: 'FRNCi',
        },
        lastName: {
            type: String,
            default: 'FRNCi',
        },
        gender: {
            type: String,
            default: '',
        },
        nationality: {
            type: String,
            default: '',
        },
        localCity: {
            type: String,
            default: '',
        },
        meet: {
            type: String,
            default: 'language',
        },
        interact: {
            type: String,
            default: 'f2f',
        },
        birthday: {
            type: String,
            default: new Date(Date.now()).toString(),
        },
    },
    data() {
        return {
            interactStr: {
                f2f: 'Face to face',
                online: 'Only online chat',
            },
            meetStr: {
                language: 'Looking for Language Patrners',
                cultural: 'Looking for Cultural Friends',
                both: 'Looking for language partners and cross-cultural friends',
            },
            genderStr: {
                m: 'Male',
                f: 'Female',
            },
        };
    },
    computed: {
        meetPreference() {
            return `${this.meetStr[this.meet]} / ${this.interactStr[this.interact]}`;
        },
        nationDisplayName() {
            return nationalities.find(nation => (
                nation.value === this.nationality.toUpperCase()
            )).label;
        },
        age() {
            const diff = Date.now() - new Date(this.birthday).getTime();
            return Math.abs(new Date(diff).getUTCFullYear() - 1970);
        },
        isOtherUser() {
            return !!this.$route.meta.otherUser;
        },
        showSendRequestBtn() {
            return this.isOtherUser && !this.$route.meta.otherUser.isFriend.isFriend;
        },
        showSendMessageBtn() {
            return this.isOtherUser && this.$route.meta.otherUser.isFriend.isFriend;
        },
    },
    methods: {
        invite() {
            if (!this.$route.meta.isLogin) {
                this.$router.push('/login');
            } else {
                const { id } = this.$route.params;
                console.log('send request');
                this.alertify.AlertInvite(
                    `A greats start! <br>Take a quick moment to reach out to ${this.firstName}.`,
                    '',
                    async (evt, val) => {
                        const res = await this.api.invitations.send({
                            params: { userId: id },
                            body: { content: val },
                        });
                        if (res.ok) {
                            this.$router.push({ path: `/chat/s/${id}` });
                        }
                    },
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>

nav {
    background-image: url(../../assets/bg-default.jpg);
    background-size: cover;
    background-attachment: fixed;
    .mask {
        display: flex;
        justify-content: center;
        background: rgba(0,0,0,0.4);
        padding: 5% 0 2%;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }
    }

    figure {
        position: relative;
        float: left;
        border: 3px solid gray;
        border-radius: 150%;
        overflow: hidden;
        margin: 0 5% 0 0;
        height: 240px;
        width: 240px;
        background-color: white;
        padding: 0 15px;
        border: 3px solid white;
        border-radius: 150%;
        overflow: hidden;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            margin: 0;
        }

        img {
            position: absolute;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
        }
    }

    section {
        display: flex;
        width: 40%;
        flex-direction: column;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.5;
        color: white;
        text-align: left;
        padding: 0 15px;
        letter-spacing: 2px;
        p {
            margin: 0 0 1rem;
            letter-spacing: 2px;

            span {
                margin-right: 4px;
            }
        }

        .profile-name {
            font-size: 45px;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: bold;
        }
    }

    .links {
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 768px) {
            flex-direction: row;
        }
        a {
            cursor: pointer;
            border: 2px solid white;
            background-color: #ffffff3d;
            padding: 4px 16px;
            color: white;
            letter-spacing: 1px;
            margin-bottom: 1rem;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            line-height: 1.5;
            border-radius: 0.25rem;
            font-size: 1rem;
            font-weight: bold;
            @media screen and (max-width: 768px) {
                margin: 0 4px;
            }

            i {
                margin-right: 4px;
            }
        }

        a:hover {
            color: white;
            text-decoration: none;
        }
    }
}
</style>

<style lang="scss">
.invitation {
    &.invitation-dialog {
        padding: 40px;
        border: 1px solid #b5b2b2;
        border-radius: 40px;
        padding: 40px;
    }

    &.invitation-header {
        margin: 0 0 1rem 0;
        font-weight: bold;
        line-height: 1.2;
        text-align: center;
        background-color: white;
        padding: 0;
    }
}
</style>

