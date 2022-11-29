// could wrap all of this in a class or an object and expand on the API to include all of the front-end API interactions (GET, PUT, POST for CMS etc)

// SendMail would be just one member / property in that object

async function SendMail(targetForm) {
    // mail stuff goes here
    let formData = new FormData(targetForm),
        formFieldErrors = false;

    let result = await fetch(`./${targetForm.getAttribute("action")}`, {
        method: targetForm.method,
        body: formData,
    }).then(response => {
        if (response.status !== 200) {
            formFieldErrors = true;
        }

        return response;
    })

    let mailStatus = await result.json();

    if (formFieldErrors) {
        throw new Error(JSON.stringify(mailStatus));
    }    
    
    return mailStatus;
}

export { SendMail };