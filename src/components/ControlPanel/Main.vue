<template>
    <md-layout md-align="center" md-column-small class="container">
        <md-layout md-flex="25">
            <aside>
                <router-link to="/controlpanel/account" class="nav-link">My Account</router-link>
                <router-link to="/controlpanel/profile" class="nav-link">My Profile</router-link>
                <router-link to="/controlpanel/orders" class="nav-link">My Orders</router-link>
            </aside>
        </md-layout>
        <md-layout md-flex="66" md-align="center">
            <router-view></router-view>
        </md-layout>
    </md-layout>
</template>

<script>

export default {
};
</script>

<style lang="scss" scoped>
.container {
    margin-top: 3rem;
    margin-bottom: 5rem;
}

section {
    margin: 0 1rem 1rem;
}

aside {
    text-align: left;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;

    a.nav-link {
        color: #413d3d;
        letter-spacing: 2px;
        padding: 1rem 1.2rem;
        border-bottom: 1px solid #ccc;

        &:hover {
            color: #413d3d;
            text-decoration: none;
        }
    }

    a.router-link-active {
        display: block;
        color: #fff;
        background-color: #60bc90;
        border-bottom: none;
        padding: 1rem 1.2rem;
        text-align: left;

        &:hover {
            color: #fff;
            text-decoration: none;
        }
    }
}

@media (max-width: 945px) {
    .container {
        margin: 3rem 1rem 5rem;
    }

    aside {
        width: 100%;
        margin: 0 0 1rem;
    }
}
</style>
