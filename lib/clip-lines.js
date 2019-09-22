'use babel';

import { CompositeDisposable } from 'atom';

export default {
  config: {
    lineEndingCode: {
      type: 'string',
      default: "\n"
    },
    lineNumberSepalater: {
      type: 'string',
      default: "|"
    },
    enableMarkDownFormat: {
      type: 'boolean',
      default: true
    }
  },

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'clip-lines:copy': () => this.copy()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  copy() {
    editor = atom.workspace.getActiveTextEditor();
    filePath = editor.getPath();
    text = "";
    lines = [];
    lineEnding = atom.config.get('clip-lines.lineEndingCode');
    lineNumberSepalater = atom.config.get('clip-lines.lineNumberSepalater');
    enableMarkDownFormat = atom.config.get('clip-lines.enableMarkDownFormat');

    ranges = editor.getSelectedBufferRanges();
    rowStart = ranges[0].start.row + 1
    rowEnd = ranges[0].end.row + 1
    rowNumberRange = rowStart;
    rowNumberRange += rowStart < rowEnd ? "-" +  rowEnd : "";
    selectedText = editor.getSelectedText().replace(/\r\n?/g, lineEnding);
    selectedLines = selectedText.split(/\n/);

    for (var i in selectedLines) {
      line_number = rowStart + parseInt(i);
      lines.push(line_number + lineNumberSepalater + " " + selectedLines[i]);
    }

    text += filePath + ": " + rowNumberRange + lineEnding + lineEnding;
    text += enableMarkDownFormat ? "```" + lineEnding : "";
    text += lines.join(lineEnding);
    text = enableMarkDownFormat ? text + lineEnding + "```" : text;

    atom.clipboard.write(text);
    atom.notifications.addInfo("Copy completed.");
  }
};
