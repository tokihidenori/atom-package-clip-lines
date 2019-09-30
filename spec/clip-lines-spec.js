'use babel';

import CopyFileLines from '../lib/clip-lines';
import * as path from 'path'

describe('CopyFileLines', () => {
  let textEditor, textEditorElement, workspaceElement;
  let myPackageName = 'clip-lines';

  afterEach(() => {
    // パッケージの終了処理
    atom.packages.deactivatePackage(myPackageName);
  })

  describe(`when the ${myPackageName}:copy event is triggered`, () => {
    beforeEach(() => {
      // テスト用のファイルを開く
      waitsForPromise(() => { return atom.workspace.open(path.join(__dirname, 'fixtures', 'sample.txt')) });
      // パッケージをアクティベーション
      waitsForPromise(() => { return atom.packages.activatePackage(myPackageName) });

      // waitsForPromise()のpromiseが全て完了したらruns()が実行される
      runs(() => {
        textEditor = atom.workspace.getActiveTextEditor();
        textEditorElement = atom.views.getView(textEditor);
        textEditor.selectAll();
        filePath = atom.project.relativizePath(textEditor.getPath())[1];
      });
    });

    let txtTrim = function(txt) {
      lineEnding = atom.config.get('clip-lines.lineEndingCode');
      reg = new RegExp(`${lineEnding}`, 'g');
      return txt.replace(reg, '');
    }

    it("Package activated.", () => {
      expect(atom.packages.isPackageActive(myPackageName)).toBe(true);
    });

    describe("default setting", function() {
      it("copy selected lines", () => {
        CopyFileLines.copy();
        expect(txtTrim(atom.clipboard.read())).toEqual(`${filePath}: 1-4\`\`\`1| 'use babel';2| 3| import { CompositeDisposable } from 'atom';4| \`\`\``);
      });
    });

    describe("config setting check", function() {
      describe("lineNumberSepalater: colon", function() {
        beforeEach(() => {
          atom.config.set('clip-lines.lineNumberSepalater', ':');
        });

        it("copy selected lines", () => {
          CopyFileLines.copy();
          expect(txtTrim(atom.clipboard.read())).toEqual(`${filePath}: 1-4\`\`\`1: 'use babel';2: 3: import { CompositeDisposable } from 'atom';4: \`\`\``);
        });
      });

      describe("enableMarkDownFormat: false", function() {
        beforeEach(() => {
          atom.config.set('clip-lines.enableMarkDownFormat', false);
        });

        it("copy selected lines", () => {
          CopyFileLines.copy();
          expect(txtTrim(atom.clipboard.read())).toEqual(`${filePath}: 1-41| 'use babel';2| 3| import { CompositeDisposable } from 'atom';4| `);
        });
      });

      describe("includeFilepathInSyntaxMarkDownHighlight: true", function() {
        beforeEach(() => {
          atom.config.set('clip-lines.includeFilepathInSyntaxMarkDownHighlight', true);
        });

        it("copy selected lines", () => {
          CopyFileLines.copy();
          fileExtention = filePath.split('.').pop();
          expect(txtTrim(atom.clipboard.read())).toEqual(`\`\`\`${fileExtention}:${filePath}(1-4)1| 'use babel';2| 3| import { CompositeDisposable } from 'atom';4| \`\`\``);
        });
      });

      describe("notIncludeRootInPath: false", function() {
        beforeEach(() => {
          atom.config.set('clip-lines.notIncludeRootInPath', false);
        });

        it("copy selected lines", () => {
          CopyFileLines.copy();
          expect(txtTrim(atom.clipboard.read())).toEqual(`${textEditor.getPath()}: 1-4\`\`\`1| 'use babel';2| 3| import { CompositeDisposable } from 'atom';4| \`\`\``);
        });
      });
    });
  });
});
