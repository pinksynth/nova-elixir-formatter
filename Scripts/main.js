const { notifyUserOfError } = require('./errors');
const { formatElixirDocument } = require('./formatElixirDocument');
const { formatOnSave } = require('./formatOnSave');
const { PACKAGE_NAME, FORMAT_COMMAND_NAME } = require("./constants");


nova.workspace.onDidAddTextEditor((newEditor) => {
    return newEditor.onWillSave((editor) => {
        try {
            formatOnSave(editor);
        } catch (error) {
            notifyUserOfError(error);
        }
    });
});

exports.activate = function() {
    nova.commands.register(FORMAT_COMMAND_NAME, formatElixirDocument);
}
