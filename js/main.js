import { SendMail } from "./components/mailer.js";
import popup from "./components/popup.js";
//import popup from './components/popup.js';

(() => {
    const { createApp } = Vue
    let outcomes = [
                    'Thank you for contcting us! We will respond within 24 hours!',
                    'Sorry, your message could not be delivered. Please fill out the following fields: '
                ];

    let text = document.getElementById('result');
    let popup = document.getElementById('popup');
    
    createApp({
        data() {
            return {
                message: 'Hello Vue!',
                //showPopup: false
            }
        },

        //components: {
            //thepopup: popup
        //},

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
                
                
                text.textContent = outcomes[1] + fields;
                
                
                

            },

            closePopup() {
                popup.classList.remove('open-popup')
            },

            processMailSuccess(result) {
                // show a success message in the UI
                debugger;
                text.textContent = outcomes[0];
                popup.classList.add('open-popup');
                let closeBtn = document.getElementById('close');
                closeBtn.addEventListener("click", this.closePopup)
                //this.showPopup = true;
                      
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