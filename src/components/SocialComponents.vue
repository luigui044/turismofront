<template>
    <div class="social-networks">
        <share-network v-for="network in networks" :key="network.network" v-slot="{ share }" :network="network.network"
            :title="sharingInfo.title" :url="sharingInfo.url" :description="sharingInfo.description"
            :quote="sharingInfo.quote" :hashtags="sharingInfo.hashtags" :twitterUser="sharingInfo.twitterUser"
            :media="sharingInfo.media">
            <br>
            <div class="social-network" @click="share" :style="{ backgroundColor: network.color }">
                <i :class="network.icon"></i>
                <span>{{ network.name }}</span>
            </div>
        </share-network>
    </div>
</template>

<script setup>
const currentUrl = `${window.location.origin}${window.location.pathname}`;

const networks = [
    {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
    },
    {
        network: 'x',
        name: 'X',
        icon: 'fab fah fa-lg fa-twitter',
        color: '#000000',
    },
    {
        network: 'instagram',
        name: 'Instagram',
        icon: 'fab fah fa-lg fa-instagram',
        color: '#ef4056',
    },
]
const sharingInfo = {
    title: 'Turismo más:',
    url: currentUrl,
    description: 'My perfect description',
    quote: 'My perfect quote',
    hashtags: '',
    twitterUser: '',
    media:
        'https://images.unsplash.com/photo-1708283508253-337621680a84?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
</script>
