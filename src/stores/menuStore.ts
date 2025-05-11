// src/stores/menuStore.ts
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        tipo: 'internacional' as 'internacional' | 'nacional',
    }),
    actions: {
        setMenu(tipo: 'internacional' | 'nacional') {
            this.tipo = tipo
        },
    },
})
