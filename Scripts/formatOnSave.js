const { ENABLED_KEY } = require('./constants');
const { formatElixirDocument } = require('formatElixirDocument');

const formatOnSave = (editor) => {
	const enabled = nova.config.get(ENABLED_KEY);
	if (!enabled) return;
	return formatElixirDocument(editor);
}

exports.formatOnSave = formatOnSave;