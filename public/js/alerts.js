/*
Json for Alerts
{
    message: <string>,
    type: danger/scccess/undefinied
    timed: time in ms
}

*/ 

//Create a dismissable alert, inputs are message and type
function alertbox(data) {
	let alerts = document.getElementById("alerts");

	//This section builds the message
	let coldiv = document.createElement("div");
    coldiv.setAttribute('role','alert')
    coldiv.setAttribute('class', 'alert alert-dismissible fade show')

    switch(data.type.toLowerCase()){
        case "Danger":
            coldiv.classList.add('alert-danger')
            break;
        case "success":
            coldiv.classList.add('alert-success')
            break;
        default:
            coldiv.classList.add('alert-primary')
            break;
    }

	let messagetext = document.createTextNode(data.message)
	

	let button = document.createElement("button")
	    button.setAttribute('class', 'close btn-close')
	    button.setAttribute('data-mdb-dismiss', 'alert')
	    button.setAttribute('aria-label', 'Close')
    let spanbutton = document.createElement("span")
	    spanbutton.setAttribute('aria-hidden', 'true')

	coldiv.appendChild(messagetext)
	coldiv.appendChild(button)

	//console.log(coldiv)
	alerts.appendChild(coldiv)
}
