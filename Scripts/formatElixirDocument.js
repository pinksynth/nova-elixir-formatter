const { LANG_ELIXIR } = require("./constants");
const { runMixFormat } = require("./runMixFormat");
const { getUnformattedText } = require("./getUnformattedText");
const { notifyUserOfError } = require("./errors");

function formatElixirDocument(editor) {
	if (editor.document.syntax !== LANG_ELIXIR) return;

	const { unformattedText, range } = getUnformattedText(editor);
	
	runMixFormat(unformattedText)
		.then(formattedDoc => {
			editor.edit((editSession) => {
				editSession.replace(range, formattedDoc);
			});
		})
		.catch(error => {
			console.log('error', error)
			notifyUserOfError(error)
		});
}

exports.formatElixirDocument = formatElixirDocument;
