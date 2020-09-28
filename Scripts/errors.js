const notifyUserOfError = (error) => {
	let request = new NotificationRequest("mix format failed");
	
	request.title = nova.localize("mix format was unsuccessful");
	request.body = nova.localize(`It failed with the following error (see Extension Console for more details):\n\n${error}`);
	
	console.log('request', request)
	
	let promise = nova.notifications.add(request);
	promise.then(reply => {}, error => {
		console.error(error);
	});
}

exports.notifyUserOfError = notifyUserOfError;
