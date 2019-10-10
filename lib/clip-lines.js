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
    },
    includeFilepathInMarkDownSyntaxHighlight: {
      type: 'boolean',
      default: false
    },
    onlyIncludeProjectPath: {
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
    project = atom.project;
    text = "";
    lines = [];
    lineEnding = atom.config.get('clip-lines.lineEndingCode');
    lineNumberSepalater = atom.config.get('clip-lines.lineNumberSepalater');
    enableMarkDownFormat = atom.config.get('clip-lines.enableMarkDownFormat');
    onlyIncludeProjectPath = atom.config.get('clip-lines.onlyIncludeProjectPath');
    includeFilepathInMarkDownSyntaxHighlight = atom.config.get('clip-lines.includeFilepathInMarkDownSyntaxHighlight');

    filePath = editor.getPath();
    if (onlyIncludeProjectPath) {
      relativizePath = atom.project.relativizePath(filePath);
      filePath = relativizePath[1];
    }

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

    if (enableMarkDownFormat) {
      if (includeFilepathInMarkDownSyntaxHighlight) {
        fileExtention = filePath.split('.').pop();
        text += "```" + fileExtention + ":" + filePath + "(" + rowNumberRange + ")" + lineEnding;
        text += lines.join(lineEnding);
        text += lineEnding + "```";
      } else {
        text += filePath + ": " + rowNumberRange + lineEnding + lineEnding;
        text += "```" + lineEnding;
        text += lines.join(lineEnding);
        text += lineEnding + "```";
      }
    } else {
      text += filePath + ": " + rowNumberRange + lineEnding + lineEnding;
      text += lineEnding;
      text += lines.join(lineEnding);
    }

    atom.clipboard.write(text);
    atom.notifications.addInfo("Copy completed.");
  }
};
