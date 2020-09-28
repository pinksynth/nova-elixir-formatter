const { MIX_BINARY_KEY } = require("./constants");

function runMixFormat(unformattedText) {
	let error = '';
	let formattedDoc = '';
	const mix_binary = nova.config.get(MIX_BINARY_KEY);

	const process = new Process(mix_binary, {
		args: ['format', '-'],
		stdio: ['pipe', 'pipe', 'pipe'],
	});

	return new Promise((resolve, reject) => {
		const [stdin, stdout, stderr] = process.stdio;
		const writer = stdin.getWriter();

		writer.ready.then(() => {
			return writer.write(unformattedText);
		}).then(writer.close());

		process.onStdout(function(line) {
			formattedDoc += line;
		});

		process.onStderr(function(line) {
			error += line;
			console.log("Error with mix format: " + line);
		});

		process.onDidExit(function(code) {
			if (code !== 0) {
				reject(error);
				return;
			} else {
				resolve(formattedDoc);
			}
		});
		process.start();
	});
}

exports.runMixFormat = runMixFormat;
