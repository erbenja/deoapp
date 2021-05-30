

export default {
    install: function(Vue,) {
        Object.defineProperty(Vue.prototype, '$typeToCzech', { value: typeToCzech });
    }
}


export const typeToCzech = {
    yesNo: 'Ano/Ne',
    multipleChoice: 'N z M',
    singleChoice: '1 z N',
    ordering: 'Řazení',
    description: 'Otevřená otázka',
}
