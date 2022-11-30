export default {
    name: 'ThePopupComponent',

    emits: ['closepopup'],

    template: `
    <div class="popup">
        <img src="images/tick.png" alt="">
        <h2>Thank you!</h2>
        <p>Your message has been submitted successfully!</p>
        <button @click="closePopup" type="button">OK</button>
    </div>
    `,

    methods: {
        closePopup() {
            this.$emit('closepopup');
        }
    }
}