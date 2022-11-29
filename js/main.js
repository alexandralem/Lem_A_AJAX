import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!',
                
            }
        },

        methods: {
            processMailFailure(result) {
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                //alert('failure! and if you keep using an alert, DOUBLE failure!');        
                // show some errors in the UI here to let the user know the mail attempt was successful
                
                debugger;
                let fields = JSON.parse(result.message).message;
                fields.forEach(field => {
                    this.$refs[field].classList.add('error');
                });
                debugger;
                let messageResult = document.querySelector('outcome');
                messageResult.textContent = "success";


            },

            processMailSuccess(result) {
                // show a success message in the UI
                
                this.$refs['outcome'].textContent = text[1];      
                // show some UI here to let the user know the mail attempt was successful
            },

            processMail(event) {    
                debugger;    
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();