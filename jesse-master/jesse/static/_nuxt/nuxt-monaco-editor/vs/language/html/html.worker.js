/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 *-----------------------------------------------------------------------------*/


// src/language/html/html.worker.ts
import * as worker from "../../editor/editor.worker.js";

// node_modules/@vscode/l10n/dist/browser.js
var bundle;
function t(...args) {
  const firstArg = args[0];
  let key;
  let message;
  let formatArgs;
  if (typeof firstArg === "string") {
    key = firstArg;
    message = firstArg;
    args.splice(0, 1);
    formatArgs = !args || typeof args[0] !== "object" ? args : args[0];
  } else if (firstArg instanceof Array) {
    const replacements = args.slice(1);
    if (firstArg.length !== replacements.length + 1) {
      throw new Error("expected a string as the first argument to l10n.t");
    }
    let str = firstArg[0];
    for (let i = 1; i < firstArg.length; i++) {
      str += `{${i - 1}}` + firstArg[i];
    }
    return t(str, ...replacements);
  } else {
    message = firstArg.message;
    key = message;
    if (firstArg.comment && firstArg.comment.length > 0) {
      key += `/${Array.isArray(firstArg.comment) ? firstArg.comment.join("") : firstArg.comment}`;
    }
    formatArgs = firstArg.args ?? {};
  }
  const messageFromBundle = bundle?.[key];
  if (!messageFromBundle) {
    return format(message, formatArgs);
  }
  if (typeof messageFromBundle === "string") {
    return format(messageFromBundle, formatArgs);
  }
  if (messageFromBundle.comment) {
    return format(messageFromBundle.message, formatArgs);
  }
  return format(message, formatArgs);
}
var _format2Regexp = /{([^}]+)}/g;
function format(template, values) {
  if (Object.keys(values).length === 0) {
    return template;
  }
  return template.replace(_format2Regexp, (match, group) => values[group] ?? match);
}

// node_modules/vscode-languageserver-types/lib/esm/main.js
var DocumentUri;
(function(DocumentUri2) {
  function is(value) {
    return typeof value === "string";
  }
  DocumentUri2.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI;
(function(URI3) {
  function is(value) {
    return typeof value === "string";
  }
  URI3.is = is;
})(URI || (URI = {}));
var integer;
(function(integer2) {
  integer2.MIN_VALUE = -2147483648;
  integer2.MAX_VALUE = 2147483647;
  function is(value) {
    return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
  }
  integer2.is = is;
})(integer || (integer = {}));
var uinteger;
(function(uinteger2) {
  uinteger2.MIN_VALUE = 0;
  uinteger2.MAX_VALUE = 2147483647;
  function is(value) {
    return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
  }
  uinteger2.is = is;
})(uinteger || (uinteger = {}));
var Position;
(function(Position2) {
  function create(line, character) {
    if (line === Number.MAX_VALUE) {
      line = uinteger.MAX_VALUE;
    }
    if (character === Number.MAX_VALUE) {
      character = uinteger.MAX_VALUE;
    }
    return { line, character };
  }
  Position2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
  }
  Position2.is = is;
})(Position || (Position = {}));
var Range;
(function(Range2) {
  function create(one, two, three, four) {
    if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
      return { start: Position.create(one, two), end: Position.create(three, four) };
    } else if (Position.is(one) && Position.is(two)) {
      return { start: one, end: two };
    } else {
      throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
    }
  }
  Range2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
  }
  Range2.is = is;
})(Range || (Range = {}));
var Location;
(function(Location2) {
  function create(uri, range) {
    return { uri, range };
  }
  Location2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
  }
  Location2.is = is;
})(Location || (Location = {}));
var LocationLink;
(function(LocationLink2) {
  function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
    return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
  }
  LocationLink2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
  }
  LocationLink2.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function(Color2) {
  function create(red, green, blue, alpha) {
    return {
      red,
      green,
      blue,
      alpha
    };
  }
  Color2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
  }
  Color2.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function(ColorInformation2) {
  function create(range, color) {
    return {
      range,
      color
    };
  }
  ColorInformation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
  }
  ColorInformation2.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function(ColorPresentation2) {
  function create(label, textEdit, additionalTextEdits) {
    return {
      label,
      textEdit,
      additionalTextEdits
    };
  }
  ColorPresentation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
  }
  ColorPresentation2.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function(FoldingRangeKind2) {
  FoldingRangeKind2.Comment = "comment";
  FoldingRangeKind2.Imports = "imports";
  FoldingRangeKind2.Region = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function(FoldingRange2) {
  function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
    const result = {
      startLine,
      endLine
    };
    if (Is.defined(startCharacter)) {
      result.startCharacter = startCharacter;
    }
    if (Is.defined(endCharacter)) {
      result.endCharacter = endCharacter;
    }
    if (Is.defined(kind)) {
      result.kind = kind;
    }
    if (Is.defined(collapsedText)) {
      result.collapsedText = collapsedText;
    }
    return result;
  }
  FoldingRange2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
  }
  FoldingRange2.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function(DiagnosticRelatedInformation2) {
  function create(location, message) {
    return {
      location,
      message
    };
  }
  DiagnosticRelatedInformation2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
  }
  DiagnosticRelatedInformation2.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity;
(function(DiagnosticSeverity2) {
  DiagnosticSeverity2.Error = 1;
  DiagnosticSeverity2.Warning = 2;
  DiagnosticSeverity2.Information = 3;
  DiagnosticSeverity2.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function(DiagnosticTag2) {
  DiagnosticTag2.Unnecessary = 1;
  DiagnosticTag2.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function(CodeDescription2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.href);
  }
  CodeDescription2.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function(Diagnostic2) {
  function create(range, message, severity, code, source, relatedInformation) {
    let result = { range, message };
    if (Is.defined(severity)) {
      result.severity = severity;
    }
    if (Is.defined(code)) {
      result.code = code;
    }
    if (Is.defined(source)) {
      result.source = source;
    }
    if (Is.defined(relatedInformation)) {
      result.relatedInformation = relatedInformation;
    }
    return result;
  }
  Diagnostic2.create = create;
  function is(value) {
    var _a2;
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a2 = candidate.codeDescription) === null || _a2 === void 0 ? void 0 : _a2.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
  }
  Diagnostic2.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function(Command2) {
  function create(title, command, ...args) {
    let result = { title, command };
    if (Is.defined(args) && args.length > 0) {
      result.arguments = args;
    }
    return result;
  }
  Command2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
  }
  Command2.is = is;
})(Command || (Command = {}));
var TextEdit;
(function(TextEdit2) {
  function replace(range, newText) {
    return { range, newText };
  }
  TextEdit2.replace = replace;
  function insert(position, newText) {
    return { range: { start: position, end: position }, newText };
  }
  TextEdit2.insert = insert;
  function del(range) {
    return { range, newText: "" };
  }
  TextEdit2.del = del;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
  }
  TextEdit2.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function(ChangeAnnotation2) {
  function create(label, needsConfirmation, description) {
    const result = { label };
    if (needsConfirmation !== void 0) {
      result.needsConfirmation = needsConfirmation;
    }
    if (description !== void 0) {
      result.description = description;
    }
    return result;
  }
  ChangeAnnotation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
  }
  ChangeAnnotation2.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function(ChangeAnnotationIdentifier2) {
  function is(value) {
    const candidate = value;
    return Is.string(candidate);
  }
  ChangeAnnotationIdentifier2.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function(AnnotatedTextEdit2) {
  function replace(range, newText, annotation) {
    return { range, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.replace = replace;
  function insert(position, newText, annotation) {
    return { range: { start: position, end: position }, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.insert = insert;
  function del(range, annotation) {
    return { range, newText: "", annotationId: annotation };
  }
  AnnotatedTextEdit2.del = del;
  function is(value) {
    const candidate = value;
    return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  AnnotatedTextEdit2.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function(TextDocumentEdit2) {
  function create(textDocument, edits) {
    return { textDocument, edits };
  }
  TextDocumentEdit2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
  }
  TextDocumentEdit2.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function(CreateFile2) {
  function create(uri, options, annotation) {
    let result = {
      kind: "create",
      uri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  CreateFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  CreateFile2.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function(RenameFile2) {
  function create(oldUri, newUri, options, annotation) {
    let result = {
      kind: "rename",
      oldUri,
      newUri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  RenameFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  RenameFile2.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function(DeleteFile2) {
  function create(uri, options, annotation) {
    let result = {
      kind: "delete",
      uri
    };
    if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  DeleteFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  DeleteFile2.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function(WorkspaceEdit2) {
  function is(value) {
    let candidate = value;
    return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
      if (Is.string(change.kind)) {
        return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
      } else {
        return TextDocumentEdit.is(change);
      }
    }));
  }
  WorkspaceEdit2.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextDocumentIdentifier;
(function(TextDocumentIdentifier2) {
  function create(uri) {
    return { uri };
  }
  TextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri);
  }
  TextDocumentIdentifier2.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function(VersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  VersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
  }
  VersionedTextDocumentIdentifier2.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function(OptionalVersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  OptionalVersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
  }
  OptionalVersionedTextDocumentIdentifier2.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function(TextDocumentItem2) {
  function create(uri, languageId, version, text) {
    return { uri, languageId, version, text };
  }
  TextDocumentItem2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
  }
  TextDocumentItem2.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function(MarkupKind2) {
  MarkupKind2.PlainText = "plaintext";
  MarkupKind2.Markdown = "markdown";
  function is(value) {
    const candidate = value;
    return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
  }
  MarkupKind2.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function(MarkupContent2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
  }
  MarkupContent2.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function(CompletionItemKind2) {
  CompletionItemKind2.Text = 1;
  CompletionItemKind2.Method = 2;
  CompletionItemKind2.Function = 3;
  CompletionItemKind2.Constructor = 4;
  CompletionItemKind2.Field = 5;
  CompletionItemKind2.Variable = 6;
  CompletionItemKind2.Class = 7;
  CompletionItemKind2.Interface = 8;
  CompletionItemKind2.Module = 9;
  CompletionItemKind2.Property = 10;
  CompletionItemKind2.Unit = 11;
  CompletionItemKind2.Value = 12;
  CompletionItemKind2.Enum = 13;
  CompletionItemKind2.Keyword = 14;
  CompletionItemKind2.Snippet = 15;
  CompletionItemKind2.Color = 16;
  CompletionItemKind2.File = 17;
  CompletionItemKind2.Reference = 18;
  CompletionItemKind2.Folder = 19;
  CompletionItemKind2.EnumMember = 20;
  CompletionItemKind2.Constant = 21;
  CompletionItemKind2.Struct = 22;
  CompletionItemKind2.Event = 23;
  CompletionItemKind2.Operator = 24;
  CompletionItemKind2.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function(InsertTextFormat2) {
  InsertTextFormat2.PlainText = 1;
  InsertTextFormat2.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function(CompletionItemTag2) {
  CompletionItemTag2.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function(InsertReplaceEdit2) {
  function create(newText, insert, replace) {
    return { newText, insert, replace };
  }
  InsertReplaceEdit2.create = create;
  function is(value) {
    const candidate = value;
    return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
  }
  InsertReplaceEdit2.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function(InsertTextMode2) {
  InsertTextMode2.asIs = 1;
  InsertTextMode2.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function(CompletionItemLabelDetails2) {
  function is(value) {
    const candidate = value;
    return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
  }
  CompletionItemLabelDetails2.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
var CompletionItem;
(function(CompletionItem2) {
  function create(label) {
    return { label };
  }
  CompletionItem2.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function(CompletionList2) {
  function create(items, isIncomplete) {
    return { items: items ? items : [], isIncomplete: !!isIncomplete };
  }
  CompletionList2.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function(MarkedString2) {
  function fromPlainText(plainText) {
    return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  MarkedString2.fromPlainText = fromPlainText;
  function is(value) {
    const candidate = value;
    return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
  }
  MarkedString2.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function(Hover2) {
  function is(value) {
    let candidate = value;
    return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
  }
  Hover2.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function(ParameterInformation2) {
  function create(label, documentation) {
    return documentation ? { label, documentation } : { label };
  }
  ParameterInformation2.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function(SignatureInformation2) {
  function create(label, documentation, ...parameters) {
    let result = { label };
    if (Is.defined(documentation)) {
      result.documentation = documentation;
    }
    if (Is.defined(parameters)) {
      result.parameters = parameters;
    } else {
      result.parameters = [];
    }
    return result;
  }
  SignatureInformation2.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function(DocumentHighlightKind2) {
  DocumentHighlightKind2.Text = 1;
  DocumentHighlightKind2.Read = 2;
  DocumentHighlightKind2.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function(DocumentHighlight2) {
  function create(range, kind) {
    let result = { range };
    if (Is.number(kind)) {
      result.kind = kind;
    }
    return result;
  }
  DocumentHighlight2.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function(SymbolKind2) {
  SymbolKind2.File = 1;
  SymbolKind2.Module = 2;
  SymbolKind2.Namespace = 3;
  SymbolKind2.Package = 4;
  SymbolKind2.Class = 5;
  SymbolKind2.Method = 6;
  SymbolKind2.Property = 7;
  SymbolKind2.Field = 8;
  SymbolKind2.Constructor = 9;
  SymbolKind2.Enum = 10;
  SymbolKind2.Interface = 11;
  SymbolKind2.Function = 12;
  SymbolKind2.Variable = 13;
  SymbolKind2.Constant = 14;
  SymbolKind2.String = 15;
  SymbolKind2.Number = 16;
  SymbolKind2.Boolean = 17;
  SymbolKind2.Array = 18;
  SymbolKind2.Object = 19;
  SymbolKind2.Key = 20;
  SymbolKind2.Null = 21;
  SymbolKind2.EnumMember = 22;
  SymbolKind2.Struct = 23;
  SymbolKind2.Event = 24;
  SymbolKind2.Operator = 25;
  SymbolKind2.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function(SymbolTag2) {
  SymbolTag2.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function(SymbolInformation2) {
  function create(name, kind, range, uri, containerName) {
    let result = {
      name,
      kind,
      location: { uri, range }
    };
    if (containerName) {
      result.containerName = containerName;
    }
    return result;
  }
  SymbolInformation2.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function(WorkspaceSymbol2) {
  function create(name, kind, uri, range) {
    return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
  }
  WorkspaceSymbol2.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function(DocumentSymbol2) {
  function create(name, detail, kind, range, selectionRange, children) {
    let result = {
      name,
      detail,
      kind,
      range,
      selectionRange
    };
    if (children !== void 0) {
      result.children = children;
    }
    return result;
  }
  DocumentSymbol2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
  }
  DocumentSymbol2.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function(CodeActionKind2) {
  CodeActionKind2.Empty = "";
  CodeActionKind2.QuickFix = "quickfix";
  CodeActionKind2.Refactor = "refactor";
  CodeActionKind2.RefactorExtract = "refactor.extract";
  CodeActionKind2.RefactorInline = "refactor.inline";
  CodeActionKind2.RefactorRewrite = "refactor.rewrite";
  CodeActionKind2.Source = "source";
  CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
  CodeActionKind2.SourceFixAll = "source.fixAll";
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionTriggerKind;
(function(CodeActionTriggerKind2) {
  CodeActionTriggerKind2.Invoked = 1;
  CodeActionTriggerKind2.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
var CodeActionContext;
(function(CodeActionContext2) {
  function create(diagnostics, only, triggerKind) {
    let result = { diagnostics };
    if (only !== void 0 && only !== null) {
      result.only = only;
    }
    if (triggerKind !== void 0 && triggerKind !== null) {
      result.triggerKind = triggerKind;
    }
    return result;
  }
  CodeActionContext2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
  }
  CodeActionContext2.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function(CodeAction2) {
  function create(title, kindOrCommandOrEdit, kind) {
    let result = { title };
    let checkKind = true;
    if (typeof kindOrCommandOrEdit === "string") {
      checkKind = false;
      result.kind = kindOrCommandOrEdit;
    } else if (Command.is(kindOrCommandOrEdit)) {
      result.command = kindOrCommandOrEdit;
    } else {
      result.edit = kindOrCommandOrEdit;
    }
    if (checkKind && kind !== void 0) {
      result.kind = kind;
    }
    return result;
  }
  CodeAction2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
  }
  CodeAction2.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function(CodeLens2) {
  function create(range, data) {
    let result = { range };
    if (Is.defined(data)) {
      result.data = data;
    }
    return result;
  }
  CodeLens2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
  }
  CodeLens2.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function(FormattingOptions2) {
  function create(tabSize, insertSpaces) {
    return { tabSize, insertSpaces };
  }
  FormattingOptions2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
  }
  FormattingOptions2.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function(DocumentLink2) {
  function create(range, target, data) {
    return { range, target, data };
  }
  DocumentLink2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
  }
  DocumentLink2.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function(SelectionRange2) {
  function create(range, parent) {
    return { range, parent };
  }
  SelectionRange2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
  }
  SelectionRange2.is = is;
})(SelectionRange || (SelectionRange = {}));
var SemanticTokenTypes;
(function(SemanticTokenTypes2) {
  SemanticTokenTypes2["namespace"] = "namespace";
  SemanticTokenTypes2["type"] = "type";
  SemanticTokenTypes2["class"] = "class";
  SemanticTokenTypes2["enum"] = "enum";
  SemanticTokenTypes2["interface"] = "interface";
  SemanticTokenTypes2["struct"] = "struct";
  SemanticTokenTypes2["typeParameter"] = "typeParameter";
  SemanticTokenTypes2["parameter"] = "parameter";
  SemanticTokenTypes2["variable"] = "variable";
  SemanticTokenTypes2["property"] = "property";
  SemanticTokenTypes2["enumMember"] = "enumMember";
  SemanticTokenTypes2["event"] = "event";
  SemanticTokenTypes2["function"] = "function";
  SemanticTokenTypes2["method"] = "method";
  SemanticTokenTypes2["macro"] = "macro";
  SemanticTokenTypes2["keyword"] = "keyword";
  SemanticTokenTypes2["modifier"] = "modifier";
  SemanticTokenTypes2["comment"] = "comment";
  SemanticTokenTypes2["string"] = "string";
  SemanticTokenTypes2["number"] = "number";
  SemanticTokenTypes2["regexp"] = "regexp";
  SemanticTokenTypes2["operator"] = "operator";
  SemanticTokenTypes2["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
var SemanticTokenModifiers;
(function(SemanticTokenModifiers2) {
  SemanticTokenModifiers2["declaration"] = "declaration";
  SemanticTokenModifiers2["definition"] = "definition";
  SemanticTokenModifiers2["readonly"] = "readonly";
  SemanticTokenModifiers2["static"] = "static";
  SemanticTokenModifiers2["deprecated"] = "deprecated";
  SemanticTokenModifiers2["abstract"] = "abstract";
  SemanticTokenModifiers2["async"] = "async";
  SemanticTokenModifiers2["modification"] = "modification";
  SemanticTokenModifiers2["documentation"] = "documentation";
  SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
var SemanticTokens;
(function(SemanticTokens2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
  }
  SemanticTokens2.is = is;
})(SemanticTokens || (SemanticTokens = {}));
var InlineValueText;
(function(InlineValueText2) {
  function create(range, text) {
    return { range, text };
  }
  InlineValueText2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
  }
  InlineValueText2.is = is;
})(InlineValueText || (InlineValueText = {}));
var InlineValueVariableLookup;
(function(InlineValueVariableLookup2) {
  function create(range, variableName, caseSensitiveLookup) {
    return { range, variableName, caseSensitiveLookup };
  }
  InlineValueVariableLookup2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
  }
  InlineValueVariableLookup2.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
var InlineValueEvaluatableExpression;
(function(InlineValueEvaluatableExpression2) {
  function create(range, expression) {
    return { range, expression };
  }
  InlineValueEvaluatableExpression2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
  }
  InlineValueEvaluatableExpression2.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
var InlineValueContext;
(function(InlineValueContext2) {
  function create(frameId, stoppedLocation) {
    return { frameId, stoppedLocation };
  }
  InlineValueContext2.create = create;
  function is(value) {
    const candidate = value;
    return Is.defined(candidate) && Range.is(value.stoppedLocation);
  }
  InlineValueContext2.is = is;
})(InlineValueContext || (InlineValueContext = {}));
var InlayHintKind;
(function(InlayHintKind2) {
  InlayHintKind2.Type = 1;
  InlayHintKind2.Parameter = 2;
  function is(value) {
    return value === 1 || value === 2;
  }
  InlayHintKind2.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function(InlayHintLabelPart2) {
  function create(value) {
    return { value };
  }
  InlayHintLabelPart2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
  }
  InlayHintLabelPart2.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function(InlayHint2) {
  function create(position, label, kind) {
    const result = { position, label };
    if (kind !== void 0) {
      result.kind = kind;
    }
    return result;
  }
  InlayHint2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
  }
  InlayHint2.is = is;
})(InlayHint || (InlayHint = {}));
var StringValue;
(function(StringValue2) {
  function createSnippet(value) {
    return { kind: "snippet", value };
  }
  StringValue2.createSnippet = createSnippet;
})(StringValue || (StringValue = {}));
var InlineCompletionItem;
(function(InlineCompletionItem2) {
  function create(insertText, filterText, range, command) {
    return { insertText, filterText, range, command };
  }
  InlineCompletionItem2.create = create;
})(InlineCompletionItem || (InlineCompletionItem = {}));
var InlineCompletionList;
(function(InlineCompletionList2) {
  function create(items) {
    return { items };
  }
  InlineCompletionList2.create = create;
})(InlineCompletionList || (InlineCompletionList = {}));
var InlineCompletionTriggerKind;
(function(InlineCompletionTriggerKind2) {
  InlineCompletionTriggerKind2.Invoked = 0;
  InlineCompletionTriggerKind2.Automatic = 1;
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
var SelectedCompletionInfo;
(function(SelectedCompletionInfo2) {
  function create(range, text) {
    return { range, text };
  }
  SelectedCompletionInfo2.create = create;
})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
var InlineCompletionContext;
(function(InlineCompletionContext2) {
  function create(triggerKind, selectedCompletionInfo) {
    return { triggerKind, selectedCompletionInfo };
  }
  InlineCompletionContext2.create = create;
})(InlineCompletionContext || (InlineCompletionContext = {}));
var WorkspaceFolder;
(function(WorkspaceFolder2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
  }
  WorkspaceFolder2.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var TextDocument;
(function(TextDocument3) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument3.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
  }
  TextDocument3.is = is;
  function applyEdits(document, edits) {
    let text = document.getText();
    let sortedEdits = mergeSort2(edits, (a, b) => {
      let diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = text.length;
    for (let i = sortedEdits.length - 1; i >= 0; i--) {
      let e = sortedEdits[i];
      let startOffset = document.offsetAt(e.range.start);
      let endOffset = document.offsetAt(e.range.end);
      if (endOffset <= lastModifiedOffset) {
        text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
      } else {
        throw new Error("Overlapping edit");
      }
      lastModifiedOffset = startOffset;
    }
    return text;
  }
  TextDocument3.applyEdits = applyEdits;
  function mergeSort2(data, compare) {
    if (data.length <= 1) {
      return data;
    }
    const p = data.length / 2 | 0;
    const left = data.slice(0, p);
    const right = data.slice(p);
    mergeSort2(left, compare);
    mergeSort2(right, compare);
    let leftIdx = 0;
    let rightIdx = 0;
    let i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      let ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        data[i++] = left[leftIdx++];
      } else {
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
})(TextDocument || (TextDocument = {}));
var FullTextDocument = class {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      let start = this.offsetAt(range.start);
      let end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(event, version) {
    this._content = event.text;
    this._version = version;
    this._lineOffsets = void 0;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      let lineOffsets = [];
      let text = this._content;
      let isLineStart = true;
      for (let i = 0; i < text.length; i++) {
        if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
        }
        let ch = text.charAt(i);
        isLineStart = ch === "\r" || ch === "\n";
        if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
          i++;
        }
      }
      if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
      }
      this._lineOffsets = lineOffsets;
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    let lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return Position.create(0, offset);
    }
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    let line = low - 1;
    return Position.create(line, offset - lineOffsets[line]);
  }
  offsetAt(position) {
    let lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    let lineOffset = lineOffsets[position.line];
    let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
};
var Is;
(function(Is2) {
  const toString = Object.prototype.toString;
  function defined(value) {
    return typeof value !== "undefined";
  }
  Is2.defined = defined;
  function undefined2(value) {
    return typeof value === "undefined";
  }
  Is2.undefined = undefined2;
  function boolean(value) {
    return value === true || value === false;
  }
  Is2.boolean = boolean;
  function string(value) {
    return toString.call(value) === "[object String]";
  }
  Is2.string = string;
  function number(value) {
    return toString.call(value) === "[object Number]";
  }
  Is2.number = number;
  function numberRange(value, min, max) {
    return toString.call(value) === "[object Number]" && min <= value && value <= max;
  }
  Is2.numberRange = numberRange;
  function integer2(value) {
    return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
  }
  Is2.integer = integer2;
  function uinteger2(value) {
    return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
  }
  Is2.uinteger = uinteger2;
  function func(value) {
    return toString.call(value) === "[object Function]";
  }
  Is2.func = func;
  function objectLiteral(value) {
    return value !== null && typeof value === "object";
  }
  Is2.objectLiteral = objectLiteral;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  Is2.typedArray = typedArray;
})(Is || (Is = {}));

// node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var FullTextDocument2 = class _FullTextDocument {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(changes, version) {
    for (let change of changes) {
      if (_FullTextDocument.isIncremental(change)) {
        const range = getWellformedRange(change.range);
        const startOffset = this.offsetAt(range.start);
        const endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        const startLine = Math.max(range.start.line, 0);
        const endLine = Math.max(range.end.line, 0);
        let lineOffsets = this._lineOffsets;
        const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 1e4) {
            lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
          } else {
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        const diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (_FullTextDocument.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = void 0;
      } else {
        throw new Error("Unknown change event received");
      }
    }
    this._version = version;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    let lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return { line: 0, character: offset };
    }
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    let line = low - 1;
    return { line, character: offset - lineOffsets[line] };
  }
  offsetAt(position) {
    let lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    let lineOffset = lineOffsets[position.line];
    let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(event) {
    let candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
  }
  static isFull(event) {
    let candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
  }
};
var TextDocument2;
(function(TextDocument3) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument2(uri, languageId, version, content);
  }
  TextDocument3.create = create;
  function update(document, changes, version) {
    if (document instanceof FullTextDocument2) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error("TextDocument.update: document must be created by TextDocument.create");
    }
  }
  TextDocument3.update = update;
  function applyEdits(document, edits) {
    let text = document.getText();
    let sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
      let diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = 0;
    const spans = [];
    for (const e of sortedEdits) {
      let startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error("Overlapping edit");
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join("");
  }
  TextDocument3.applyEdits = applyEdits;
})(TextDocument2 || (TextDocument2 = {}));
function mergeSort(data, compare) {
  if (data.length <= 1) {
    return data;
  }
  const p = data.length / 2 | 0;
  const left = data.slice(0, p);
  const right = data.slice(p);
  mergeSort(left, compare);
  mergeSort(right, compare);
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    let ret = compare(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      data[i++] = left[leftIdx++];
    } else {
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
  const result = isAtLineStart ? [textOffset] : [];
  for (let i = 0; i < text.length; i++) {
    let ch = text.charCodeAt(i);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function getWellformedRange(range) {
  const start = range.start;
  const end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return { start: end, end: start };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  const range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return { newText: textEdit.newText, range };
  }
  return textEdit;
}

// node_modules/vscode-html-languageservice/lib/esm/htmlLanguageTypes.js
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["StartCommentTag"] = 0] = "StartCommentTag";
  TokenType2[TokenType2["Comment"] = 1] = "Comment";
  TokenType2[TokenType2["EndCommentTag"] = 2] = "EndCommentTag";
  TokenType2[TokenType2["StartTagOpen"] = 3] = "StartTagOpen";
  TokenType2[TokenType2["StartTagClose"] = 4] = "StartTagClose";
  TokenType2[TokenType2["StartTagSelfClose"] = 5] = "StartTagSelfClose";
  TokenType2[TokenType2["StartTag"] = 6] = "StartTag";
  TokenType2[TokenType2["EndTagOpen"] = 7] = "EndTagOpen";
  TokenType2[TokenType2["EndTagClose"] = 8] = "EndTagClose";
  TokenType2[TokenType2["EndTag"] = 9] = "EndTag";
  TokenType2[TokenType2["DelimiterAssign"] = 10] = "DelimiterAssign";
  TokenType2[TokenType2["AttributeName"] = 11] = "AttributeName";
  TokenType2[TokenType2["AttributeValue"] = 12] = "AttributeValue";
  TokenType2[TokenType2["StartDoctypeTag"] = 13] = "StartDoctypeTag";
  TokenType2[TokenType2["Doctype"] = 14] = "Doctype";
  TokenType2[TokenType2["EndDoctypeTag"] = 15] = "EndDoctypeTag";
  TokenType2[TokenType2["Content"] = 16] = "Content";
  TokenType2[TokenType2["Whitespace"] = 17] = "Whitespace";
  TokenType2[TokenType2["Unknown"] = 18] = "Unknown";
  TokenType2[TokenType2["Script"] = 19] = "Script";
  TokenType2[TokenType2["Styles"] = 20] = "Styles";
  TokenType2[TokenType2["EOS"] = 21] = "EOS";
})(TokenType || (TokenType = {}));
var ScannerState;
(function(ScannerState2) {
  ScannerState2[ScannerState2["WithinContent"] = 0] = "WithinContent";
  ScannerState2[ScannerState2["AfterOpeningStartTag"] = 1] = "AfterOpeningStartTag";
  ScannerState2[ScannerState2["AfterOpeningEndTag"] = 2] = "AfterOpeningEndTag";
  ScannerState2[ScannerState2["WithinDoctype"] = 3] = "WithinDoctype";
  ScannerState2[ScannerState2["WithinTag"] = 4] = "WithinTag";
  ScannerState2[ScannerState2["WithinEndTag"] = 5] = "WithinEndTag";
  ScannerState2[ScannerState2["WithinComment"] = 6] = "WithinComment";
  ScannerState2[ScannerState2["WithinScriptContent"] = 7] = "WithinScriptContent";
  ScannerState2[ScannerState2["WithinStyleContent"] = 8] = "WithinStyleContent";
  ScannerState2[ScannerState2["AfterAttributeName"] = 9] = "AfterAttributeName";
  ScannerState2[ScannerState2["BeforeAttributeValue"] = 10] = "BeforeAttributeValue";
})(ScannerState || (ScannerState = {}));
var ClientCapabilities;
(function(ClientCapabilities2) {
  ClientCapabilities2.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
        }
      },
      hover: {
        contentFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
      }
    }
  };
})(ClientCapabilities || (ClientCapabilities = {}));
var FileType;
(function(FileType2) {
  FileType2[FileType2["Unknown"] = 0] = "Unknown";
  FileType2[FileType2["File"] = 1] = "File";
  FileType2[FileType2["Directory"] = 2] = "Directory";
  FileType2[FileType2["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType || (FileType = {}));

// node_modules/vscode-html-languageservice/lib/esm/parser/htmlScanner.js
var MultiLineStream = class {
  constructor(source, position) {
    this.source = source;
    this.len = source.length;
    this.position = position;
  }
  eos() {
    return this.len <= this.position;
  }
  getSource() {
    return this.source;
  }
  pos() {
    return this.position;
  }
  goBackTo(pos) {
    this.position = pos;
  }
  goBack(n) {
    this.position -= n;
  }
  advance(n) {
    this.position += n;
  }
  goToEnd() {
    this.position = this.source.length;
  }
  nextChar() {
    return this.source.charCodeAt(this.position++) || 0;
  }
  peekChar(n = 0) {
    return this.source.charCodeAt(this.position + n) || 0;
  }
  advanceIfChar(ch) {
    if (ch === this.source.charCodeAt(this.position)) {
      this.position++;
      return true;
    }
    return false;
  }
  advanceIfChars(ch) {
    let i;
    if (this.position + ch.length > this.source.length) {
      return false;
    }
    for (i = 0; i < ch.length; i++) {
      if (this.source.charCodeAt(this.position + i) !== ch[i]) {
        return false;
      }
    }
    this.advance(i);
    return true;
  }
  advanceIfRegExp(regex) {
    const str = this.source.substr(this.position);
    const match = str.match(regex);
    if (match) {
      this.position = this.position + match.index + match[0].length;
      return match[0];
    }
    return "";
  }
  advanceUntilRegExp(regex) {
    const str = this.source.substr(this.position);
    const match = str.match(regex);
    if (match) {
      this.position = this.position + match.index;
      return match[0];
    } else {
      this.goToEnd();
    }
    return "";
  }
  advanceUntilChar(ch) {
    while (this.position < this.source.length) {
      if (this.source.charCodeAt(this.position) === ch) {
        return true;
      }
      this.advance(1);
    }
    return false;
  }
  advanceUntilChars(ch) {
    while (this.position + ch.length <= this.source.length) {
      let i = 0;
      for (; i < ch.length && this.source.charCodeAt(this.position + i) === ch[i]; i++) {
      }
      if (i === ch.length) {
        return true;
      }
      this.advance(1);
    }
    this.goToEnd();
    return false;
  }
  skipWhitespace() {
    const n = this.advanceWhileChar((ch) => {
      return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
    });
    return n > 0;
  }
  advanceWhileChar(condition) {
    const posNow = this.position;
    while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
      this.position++;
    }
    return this.position - posNow;
  }
};
var _BNG = "!".charCodeAt(0);
var _MIN = "-".charCodeAt(0);
var _LAN = "<".charCodeAt(0);
var _RAN = ">".charCodeAt(0);
var _FSL = "/".charCodeAt(0);
var _EQS = "=".charCodeAt(0);
var _DQO = '"'.charCodeAt(0);
var _SQO = "'".charCodeAt(0);
var _NWL = "\n".charCodeAt(0);
var _CAR = "\r".charCodeAt(0);
var _LFD = "\f".charCodeAt(0);
var _WSP = " ".charCodeAt(0);
var _TAB = "	".charCodeAt(0);
var htmlScriptContents = {
  "text/x-handlebars-template": true,
  "text/html": true
};
function createScanner(input, initialOffset = 0, initialState = ScannerState.WithinContent, emitPseudoCloseTags = false) {
  const stream = new MultiLineStream(input, initialOffset);
  let state = initialState;
  let tokenOffset = 0;
  let tokenType = TokenType.Unknown;
  let tokenError;
  let hasSpaceAfterTag;
  let lastTag;
  let lastAttributeName;
  let lastTypeValue;
  function nextElementName() {
    return stream.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
  }
  function nextAttributeName() {
    return stream.advanceIfRegExp(/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase();
  }
  function finishToken(offset, type, errorMessage) {
    tokenType = type;
    tokenOffset = offset;
    tokenError = errorMessage;
    return type;
  }
  function scan() {
    const offset = stream.pos();
    const oldState = state;
    const token = internalScan();
    if (token !== TokenType.EOS && offset === stream.pos() && !(emitPseudoCloseTags && (token === TokenType.StartTagClose || token === TokenType.EndTagClose))) {
      console.warn("Scanner.scan has not advanced at offset " + offset + ", state before: " + oldState + " after: " + state);
      stream.advance(1);
      return finishToken(offset, TokenType.Unknown);
    }
    return token;
  }
  function internalScan() {
    const offset = stream.pos();
    if (stream.eos()) {
      return finishToken(offset, TokenType.EOS);
    }
    let errorMessage;
    switch (state) {
      case ScannerState.WithinComment:
        if (stream.advanceIfChars([_MIN, _MIN, _RAN])) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.EndCommentTag);
        }
        stream.advanceUntilChars([_MIN, _MIN, _RAN]);
        return finishToken(offset, TokenType.Comment);
      case ScannerState.WithinDoctype:
        if (stream.advanceIfChar(_RAN)) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.EndDoctypeTag);
        }
        stream.advanceUntilChar(_RAN);
        return finishToken(offset, TokenType.Doctype);
      case ScannerState.WithinContent:
        if (stream.advanceIfChar(_LAN)) {
          if (!stream.eos() && stream.peekChar() === _BNG) {
            if (stream.advanceIfChars([_BNG, _MIN, _MIN])) {
              state = ScannerState.WithinComment;
              return finishToken(offset, TokenType.StartCommentTag);
            }
            if (stream.advanceIfRegExp(/^!doctype/i)) {
              state = ScannerState.WithinDoctype;
              return finishToken(offset, TokenType.StartDoctypeTag);
            }
          }
          if (stream.advanceIfChar(_FSL)) {
            state = ScannerState.AfterOpeningEndTag;
            return finishToken(offset, TokenType.EndTagOpen);
          }
          state = ScannerState.AfterOpeningStartTag;
          return finishToken(offset, TokenType.StartTagOpen);
        }
        stream.advanceUntilChar(_LAN);
        return finishToken(offset, TokenType.Content);
      case ScannerState.AfterOpeningEndTag:
        const tagName = nextElementName();
        if (tagName.length > 0) {
          state = ScannerState.WithinEndTag;
          return finishToken(offset, TokenType.EndTag);
        }
        if (stream.skipWhitespace()) {
          return finishToken(offset, TokenType.Whitespace, t("Tag name must directly follow the open bracket."));
        }
        state = ScannerState.WithinEndTag;
        stream.advanceUntilChar(_RAN);
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Unknown, t("End tag name expected."));
        }
        return internalScan();
      case ScannerState.WithinEndTag:
        if (stream.skipWhitespace()) {
          return finishToken(offset, TokenType.Whitespace);
        }
        if (stream.advanceIfChar(_RAN)) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.EndTagClose);
        }
        if (emitPseudoCloseTags && stream.peekChar() === _LAN) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.EndTagClose, t("Closing bracket missing."));
        }
        errorMessage = t("Closing bracket expected.");
        break;
      case ScannerState.AfterOpeningStartTag:
        lastTag = nextElementName();
        lastTypeValue = void 0;
        lastAttributeName = void 0;
        if (lastTag.length > 0) {
          hasSpaceAfterTag = false;
          state = ScannerState.WithinTag;
          return finishToken(offset, TokenType.StartTag);
        }
        if (stream.skipWhitespace()) {
          return finishToken(offset, TokenType.Whitespace, t("Tag name must directly follow the open bracket."));
        }
        state = ScannerState.WithinTag;
        stream.advanceUntilChar(_RAN);
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Unknown, t("Start tag name expected."));
        }
        return internalScan();
      case ScannerState.WithinTag:
        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true;
          return finishToken(offset, TokenType.Whitespace);
        }
        if (hasSpaceAfterTag) {
          lastAttributeName = nextAttributeName();
          if (lastAttributeName.length > 0) {
            state = ScannerState.AfterAttributeName;
            hasSpaceAfterTag = false;
            return finishToken(offset, TokenType.AttributeName);
          }
        }
        if (stream.advanceIfChars([_FSL, _RAN])) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.StartTagSelfClose);
        }
        if (stream.advanceIfChar(_RAN)) {
          if (lastTag === "script") {
            if (lastTypeValue && htmlScriptContents[lastTypeValue]) {
              state = ScannerState.WithinContent;
            } else {
              state = ScannerState.WithinScriptContent;
            }
          } else if (lastTag === "style") {
            state = ScannerState.WithinStyleContent;
          } else {
            state = ScannerState.WithinContent;
          }
          return finishToken(offset, TokenType.StartTagClose);
        }
        if (emitPseudoCloseTags && stream.peekChar() === _LAN) {
          state = ScannerState.WithinContent;
          return finishToken(offset, TokenType.StartTagClose, t("Closing bracket missing."));
        }
        stream.advance(1);
        return finishToken(offset, TokenType.Unknown, t("Unexpected character in tag."));
      case ScannerState.AfterAttributeName:
        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true;
          return finishToken(offset, TokenType.Whitespace);
        }
        if (stream.advanceIfChar(_EQS)) {
          state = ScannerState.BeforeAttributeValue;
          return finishToken(offset, TokenType.DelimiterAssign);
        }
        state = ScannerState.WithinTag;
        return internalScan();
      case ScannerState.BeforeAttributeValue:
        if (stream.skipWhitespace()) {
          return finishToken(offset, TokenType.Whitespace);
        }
        let attributeValue = stream.advanceIfRegExp(/^[^\s"'`=<>]+/);
        if (attributeValue.length > 0) {
          if (stream.peekChar() === _RAN && stream.peekChar(-1) === _FSL) {
            stream.goBack(1);
            attributeValue = attributeValue.substring(0, attributeValue.length - 1);
          }
          if (lastAttributeName === "type") {
            lastTypeValue = attributeValue;
          }
          if (attributeValue.length > 0) {
            state = ScannerState.WithinTag;
            hasSpaceAfterTag = false;
            return finishToken(offset, TokenType.AttributeValue);
          }
        }
        const ch = stream.peekChar();
        if (ch === _SQO || ch === _DQO) {
          stream.advance(1);
          if (stream.advanceUntilChar(ch)) {
            stream.advance(1);
          }
          if (lastAttributeName === "type") {
            lastTypeValue = stream.getSource().substring(offset + 1, stream.pos() - 1);
          }
          state = ScannerState.WithinTag;
          hasSpaceAfterTag = false;
          return finishToken(offset, TokenType.AttributeValue);
        }
        state = ScannerState.WithinTag;
        hasSpaceAfterTag = false;
        return internalScan();
      case ScannerState.WithinScriptContent:
        let sciptState = 1;
        while (!stream.eos()) {
          const match = stream.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
          if (match.length === 0) {
            stream.goToEnd();
            return finishToken(offset, TokenType.Script);
          } else if (match === "<!--") {
            if (sciptState === 1) {
              sciptState = 2;
            }
          } else if (match === "-->") {
            sciptState = 1;
          } else if (match[1] !== "/") {
            if (sciptState === 2) {
              sciptState = 3;
            }
          } else {
            if (sciptState === 3) {
              sciptState = 2;
            } else {
              stream.goBack(match.length);
              break;
            }
          }
        }
        state = ScannerState.WithinContent;
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Script);
        }
        return internalScan();
      case ScannerState.WithinStyleContent:
        stream.advanceUntilRegExp(/<\/style/i);
        state = ScannerState.WithinContent;
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Styles);
        }
        return internalScan();
    }
    stream.advance(1);
    state = ScannerState.WithinContent;
    return finishToken(offset, TokenType.Unknown, errorMessage);
  }
  return {
    scan,
    getTokenType: () => tokenType,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => stream.pos() - tokenOffset,
    getTokenEnd: () => stream.pos(),
    getTokenText: () => stream.getSource().substring(tokenOffset, stream.pos()),
    getScannerState: () => state,
    getTokenError: () => tokenError
  };
}

// node_modules/vscode-html-languageservice/lib/esm/utils/arrays.js
function findFirst(array, p) {
  let low = 0, high = array.length;
  if (high === 0) {
    return 0;
  }
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (p(array[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}
function binarySearch(array, key, comparator) {
  let low = 0, high = array.length - 1;
  while (low <= high) {
    const mid = (low + high) / 2 | 0;
    const comp = comparator(array[mid], key);
    if (comp < 0) {
      low = mid + 1;
    } else if (comp > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -(low + 1);
}

// node_modules/vscode-html-languageservice/lib/esm/parser/htmlParser.js
var Node = class {
  get attributeNames() {
    return this.attributes ? Object.keys(this.attributes) : [];
  }
  constructor(start, end, children, parent) {
    this.start = start;
    this.end = end;
    this.children = children;
    this.parent = parent;
    this.closed = false;
  }
  isSameTag(tagInLowerCase) {
    if (this.tag === void 0) {
      return tagInLowerCase === void 0;
    } else {
      return tagInLowerCase !== void 0 && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
    }
  }
  get firstChild() {
    return this.children[0];
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : void 0;
  }
  findNodeBefore(offset) {
    const idx = findFirst(this.children, (c) => offset <= c.start) - 1;
    if (idx >= 0) {
      const child = this.children[idx];
      if (offset > child.start) {
        if (offset < child.end) {
          return child.findNodeBefore(offset);
        }
        const lastChild = child.lastChild;
        if (lastChild && lastChild.end === child.end) {
          return child.findNodeBefore(offset);
        }
        return child;
      }
    }
    return this;
  }
  findNodeAt(offset) {
    const idx = findFirst(this.children, (c) => offset <= c.start) - 1;
    if (idx >= 0) {
      const child = this.children[idx];
      if (offset > child.start && offset <= child.end) {
        return child.findNodeAt(offset);
      }
    }
    return this;
  }
};
var HTMLParser = class {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }
  parseDocument(document) {
    return this.parse(document.getText(), this.dataManager.getVoidElements(document.languageId));
  }
  parse(text, voidElements) {
    const scanner = createScanner(text, void 0, void 0, true);
    const htmlDocument = new Node(0, text.length, [], void 0);
    let curr = htmlDocument;
    let endTagStart = -1;
    let endTagName = void 0;
    let pendingAttribute = null;
    let token = scanner.scan();
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTagOpen:
          const child = new Node(scanner.getTokenOffset(), text.length, [], curr);
          curr.children.push(child);
          curr = child;
          break;
        case TokenType.StartTag:
          curr.tag = scanner.getTokenText();
          break;
        case TokenType.StartTagClose:
          if (curr.parent) {
            curr.end = scanner.getTokenEnd();
            if (scanner.getTokenLength()) {
              curr.startTagEnd = scanner.getTokenEnd();
              if (curr.tag && this.dataManager.isVoidElement(curr.tag, voidElements)) {
                curr.closed = true;
                curr = curr.parent;
              }
            } else {
              curr = curr.parent;
            }
          }
          break;
        case TokenType.StartTagSelfClose:
          if (curr.parent) {
            curr.closed = true;
            curr.end = scanner.getTokenEnd();
            curr.startTagEnd = scanner.getTokenEnd();
            curr = curr.parent;
          }
          break;
        case TokenType.EndTagOpen:
          endTagStart = scanner.getTokenOffset();
          endTagName = void 0;
          break;
        case TokenType.EndTag:
          endTagName = scanner.getTokenText().toLowerCase();
          break;
        case TokenType.EndTagClose:
          let node = curr;
          while (!node.isSameTag(endTagName) && node.parent) {
            node = node.parent;
          }
          if (node.parent) {
            while (curr !== node) {
              curr.end = endTagStart;
              curr.closed = false;
              curr = curr.parent;
            }
            curr.closed = true;
            curr.endTagStart = endTagStart;
            curr.end = scanner.getTokenEnd();
            curr = curr.parent;
          }
          break;
        case TokenType.AttributeName: {
          pendingAttribute = scanner.getTokenText();
          let attributes = curr.attributes;
          if (!attributes) {
            curr.attributes = attributes = {};
          }
          attributes[pendingAttribute] = null;
          break;
        }
        case TokenType.AttributeValue: {
          const value = scanner.getTokenText();
          const attributes = curr.attributes;
          if (attributes && pendingAttribute) {
            attributes[pendingAttribute] = value;
            pendingAttribute = null;
          }
          break;
        }
      }
      token = scanner.scan();
    }
    while (curr.parent) {
      curr.end = text.length;
      curr.closed = false;
      curr = curr.parent;
    }
    return {
      roots: htmlDocument.children,
      findNodeBefore: htmlDocument.findNodeBefore.bind(htmlDocument),
      findNodeAt: htmlDocument.findNodeAt.bind(htmlDocument)
    };
  }
};

// node_modules/vscode-html-languageservice/lib/esm/parser/htmlEntities.js
var entities = {
  "Aacute;": "\xC1",
  "Aacute": "\xC1",
  "aacute;": "\xE1",
  "aacute": "\xE1",
  "Abreve;": "\u0102",
  "abreve;": "\u0103",
  "ac;": "\u223E",
  "acd;": "\u223F",
  "acE;": "\u223E\u0333",
  "Acirc;": "\xC2",
  "Acirc": "\xC2",
  "acirc;": "\xE2",
  "acirc": "\xE2",
  "acute;": "\xB4",
  "acute": "\xB4",
  "Acy;": "\u0410",
  "acy;": "\u0430",
  "AElig;": "\xC6",
  "AElig": "\xC6",
  "aelig;": "\xE6",
  "aelig": "\xE6",
  "af;": "\u2061",
  "Afr;": "\u{1D504}",
  "afr;": "\u{1D51E}",
  "Agrave;": "\xC0",
  "Agrave": "\xC0",
  "agrave;": "\xE0",
  "agrave": "\xE0",
  "alefsym;": "\u2135",
  "aleph;": "\u2135",
  "Alpha;": "\u0391",
  "alpha;": "\u03B1",
  "Amacr;": "\u0100",
  "amacr;": "\u0101",
  "amalg;": "\u2A3F",
  "AMP;": "&",
  "AMP": "&",
  "amp;": "&",
  "amp": "&",
  "And;": "\u2A53",
  "and;": "\u2227",
  "andand;": "\u2A55",
  "andd;": "\u2A5C",
  "andslope;": "\u2A58",
  "andv;": "\u2A5A",
  "ang;": "\u2220",
  "ange;": "\u29A4",
  "angle;": "\u2220",
  "angmsd;": "\u2221",
  "angmsdaa;": "\u29A8",
  "angmsdab;": "\u29A9",
  "angmsdac;": "\u29AA",
  "angmsdad;": "\u29AB",
  "angmsdae;": "\u29AC",
  "angmsdaf;": "\u29AD",
  "angmsdag;": "\u29AE",
  "angmsdah;": "\u29AF",
  "angrt;": "\u221F",
  "angrtvb;": "\u22BE",
  "angrtvbd;": "\u299D",
  "angsph;": "\u2222",
  "angst;": "\xC5",
  "angzarr;": "\u237C",
  "Aogon;": "\u0104",
  "aogon;": "\u0105",
  "Aopf;": "\u{1D538}",
  "aopf;": "\u{1D552}",
  "ap;": "\u2248",
  "apacir;": "\u2A6F",
  "apE;": "\u2A70",
  "ape;": "\u224A",
  "apid;": "\u224B",
  "apos;": "'",
  "ApplyFunction;": "\u2061",
  "approx;": "\u2248",
  "approxeq;": "\u224A",
  "Aring;": "\xC5",
  "Aring": "\xC5",
  "aring;": "\xE5",
  "aring": "\xE5",
  "Ascr;": "\u{1D49C}",
  "ascr;": "\u{1D4B6}",
  "Assign;": "\u2254",
  "ast;": "*",
  "asymp;": "\u2248",
  "asympeq;": "\u224D",
  "Atilde;": "\xC3",
  "Atilde": "\xC3",
  "atilde;": "\xE3",
  "atilde": "\xE3",
  "Auml;": "\xC4",
  "Auml": "\xC4",
  "auml;": "\xE4",
  "auml": "\xE4",
  "awconint;": "\u2233",
  "awint;": "\u2A11",
  "backcong;": "\u224C",
  "backepsilon;": "\u03F6",
  "backprime;": "\u2035",
  "backsim;": "\u223D",
  "backsimeq;": "\u22CD",
  "Backslash;": "\u2216",
  "Barv;": "\u2AE7",
  "barvee;": "\u22BD",
  "Barwed;": "\u2306",
  "barwed;": "\u2305",
  "barwedge;": "\u2305",
  "bbrk;": "\u23B5",
  "bbrktbrk;": "\u23B6",
  "bcong;": "\u224C",
  "Bcy;": "\u0411",
  "bcy;": "\u0431",
  "bdquo;": "\u201E",
  "becaus;": "\u2235",
  "Because;": "\u2235",
  "because;": "\u2235",
  "bemptyv;": "\u29B0",
  "bepsi;": "\u03F6",
  "bernou;": "\u212C",
  "Bernoullis;": "\u212C",
  "Beta;": "\u0392",
  "beta;": "\u03B2",
  "beth;": "\u2136",
  "between;": "\u226C",
  "Bfr;": "\u{1D505}",
  "bfr;": "\u{1D51F}",
  "bigcap;": "\u22C2",
  "bigcirc;": "\u25EF",
  "bigcup;": "\u22C3",
  "bigodot;": "\u2A00",
  "bigoplus;": "\u2A01",
  "bigotimes;": "\u2A02",
  "bigsqcup;": "\u2A06",
  "bigstar;": "\u2605",
  "bigtriangledown;": "\u25BD",
  "bigtriangleup;": "\u25B3",
  "biguplus;": "\u2A04",
  "bigvee;": "\u22C1",
  "bigwedge;": "\u22C0",
  "bkarow;": "\u290D",
  "blacklozenge;": "\u29EB",
  "blacksquare;": "\u25AA",
  "blacktriangle;": "\u25B4",
  "blacktriangledown;": "\u25BE",
  "blacktriangleleft;": "\u25C2",
  "blacktriangleright;": "\u25B8",
  "blank;": "\u2423",
  "blk12;": "\u2592",
  "blk14;": "\u2591",
  "blk34;": "\u2593",
  "block;": "\u2588",
  "bne;": "=\u20E5",
  "bnequiv;": "\u2261\u20E5",
  "bNot;": "\u2AED",
  "bnot;": "\u2310",
  "Bopf;": "\u{1D539}",
  "bopf;": "\u{1D553}",
  "bot;": "\u22A5",
  "bottom;": "\u22A5",
  "bowtie;": "\u22C8",
  "boxbox;": "\u29C9",
  "boxDL;": "\u2557",
  "boxDl;": "\u2556",
  "boxdL;": "\u2555",
  "boxdl;": "\u2510",
  "boxDR;": "\u2554",
  "boxDr;": "\u2553",
  "boxdR;": "\u2552",
  "boxdr;": "\u250C",
  "boxH;": "\u2550",
  "boxh;": "\u2500",
  "boxHD;": "\u2566",
  "boxHd;": "\u2564",
  "boxhD;": "\u2565",
  "boxhd;": "\u252C",
  "boxHU;": "\u2569",
  "boxHu;": "\u2567",
  "boxhU;": "\u2568",
  "boxhu;": "\u2534",
  "boxminus;": "\u229F",
  "boxplus;": "\u229E",
  "boxtimes;": "\u22A0",
  "boxUL;": "\u255D",
  "boxUl;": "\u255C",
  "boxuL;": "\u255B",
  "boxul;": "\u2518",
  "boxUR;": "\u255A",
  "boxUr;": "\u2559",
  "boxuR;": "\u2558",
  "boxur;": "\u2514",
  "boxV;": "\u2551",
  "boxv;": "\u2502",
  "boxVH;": "\u256C",
  "boxVh;": "\u256B",
  "boxvH;": "\u256A",
  "boxvh;": "\u253C",
  "boxVL;": "\u2563",
  "boxVl;": "\u2562",
  "boxvL;": "\u2561",
  "boxvl;": "\u2524",
  "boxVR;": "\u2560",
  "boxVr;": "\u255F",
  "boxvR;": "\u255E",
  "boxvr;": "\u251C",
  "bprime;": "\u2035",
  "Breve;": "\u02D8",
  "breve;": "\u02D8",
  "brvbar;": "\xA6",
  "brvbar": "\xA6",
  "Bscr;": "\u212C",
  "bscr;": "\u{1D4B7}",
  "bsemi;": "\u204F",
  "bsim;": "\u223D",
  "bsime;": "\u22CD",
  "bsol;": "\\",
  "bsolb;": "\u29C5",
  "bsolhsub;": "\u27C8",
  "bull;": "\u2022",
  "bullet;": "\u2022",
  "bump;": "\u224E",
  "bumpE;": "\u2AAE",
  "bumpe;": "\u224F",
  "Bumpeq;": "\u224E",
  "bumpeq;": "\u224F",
  "Cacute;": "\u0106",
  "cacute;": "\u0107",
  "Cap;": "\u22D2",
  "cap;": "\u2229",
  "capand;": "\u2A44",
  "capbrcup;": "\u2A49",
  "capcap;": "\u2A4B",
  "capcup;": "\u2A47",
  "capdot;": "\u2A40",
  "CapitalDifferentialD;": "\u2145",
  "caps;": "\u2229\uFE00",
  "caret;": "\u2041",
  "caron;": "\u02C7",
  "Cayleys;": "\u212D",
  "ccaps;": "\u2A4D",
  "Ccaron;": "\u010C",
  "ccaron;": "\u010D",
  "Ccedil;": "\xC7",
  "Ccedil": "\xC7",
  "ccedil;": "\xE7",
  "ccedil": "\xE7",
  "Ccirc;": "\u0108",
  "ccirc;": "\u0109",
  "Cconint;": "\u2230",
  "ccups;": "\u2A4C",
  "ccupssm;": "\u2A50",
  "Cdot;": "\u010A",
  "cdot;": "\u010B",
  "cedil;": "\xB8",
  "cedil": "\xB8",
  "Cedilla;": "\xB8",
  "cemptyv;": "\u29B2",
  "cent;": "\xA2",
  "cent": "\xA2",
  "CenterDot;": "\xB7",
  "centerdot;": "\xB7",
  "Cfr;": "\u212D",
  "cfr;": "\u{1D520}",
  "CHcy;": "\u0427",
  "chcy;": "\u0447",
  "check;": "\u2713",
  "checkmark;": "\u2713",
  "Chi;": "\u03A7",
  "chi;": "\u03C7",
  "cir;": "\u25CB",
  "circ;": "\u02C6",
  "circeq;": "\u2257",
  "circlearrowleft;": "\u21BA",
  "circlearrowright;": "\u21BB",
  "circledast;": "\u229B",
  "circledcirc;": "\u229A",
  "circleddash;": "\u229D",
  "CircleDot;": "\u2299",
  "circledR;": "\xAE",
  "circledS;": "\u24C8",
  "CircleMinus;": "\u2296",
  "CirclePlus;": "\u2295",
  "CircleTimes;": "\u2297",
  "cirE;": "\u29C3",
  "cire;": "\u2257",
  "cirfnint;": "\u2A10",
  "cirmid;": "\u2AEF",
  "cirscir;": "\u29C2",
  "ClockwiseContourIntegral;": "\u2232",
  "CloseCurlyDoubleQuote;": "\u201D",
  "CloseCurlyQuote;": "\u2019",
  "clubs;": "\u2663",
  "clubsuit;": "\u2663",
  "Colon;": "\u2237",
  "colon;": ":",
  "Colone;": "\u2A74",
  "colone;": "\u2254",
  "coloneq;": "\u2254",
  "comma;": ",",
  "commat;": "@",
  "comp;": "\u2201",
  "compfn;": "\u2218",
  "complement;": "\u2201",
  "complexes;": "\u2102",
  "cong;": "\u2245",
  "congdot;": "\u2A6D",
  "Congruent;": "\u2261",
  "Conint;": "\u222F",
  "conint;": "\u222E",
  "ContourIntegral;": "\u222E",
  "Copf;": "\u2102",
  "copf;": "\u{1D554}",
  "coprod;": "\u2210",
  "Coproduct;": "\u2210",
  "COPY;": "\xA9",
  "COPY": "\xA9",
  "copy;": "\xA9",
  "copy": "\xA9",
  "copysr;": "\u2117",
  "CounterClockwiseContourIntegral;": "\u2233",
  "crarr;": "\u21B5",
  "Cross;": "\u2A2F",
  "cross;": "\u2717",
  "Cscr;": "\u{1D49E}",
  "cscr;": "\u{1D4B8}",
  "csub;": "\u2ACF",
  "csube;": "\u2AD1",
  "csup;": "\u2AD0",
  "csupe;": "\u2AD2",
  "ctdot;": "\u22EF",
  "cudarrl;": "\u2938",
  "cudarrr;": "\u2935",
  "cuepr;": "\u22DE",
  "cuesc;": "\u22DF",
  "cularr;": "\u21B6",
  "cularrp;": "\u293D",
  "Cup;": "\u22D3",
  "cup;": "\u222A",
  "cupbrcap;": "\u2A48",
  "CupCap;": "\u224D",
  "cupcap;": "\u2A46",
  "cupcup;": "\u2A4A",
  "cupdot;": "\u228D",
  "cupor;": "\u2A45",
  "cups;": "\u222A\uFE00",
  "curarr;": "\u21B7",
  "curarrm;": "\u293C",
  "curlyeqprec;": "\u22DE",
  "curlyeqsucc;": "\u22DF",
  "curlyvee;": "\u22CE",
  "curlywedge;": "\u22CF",
  "curren;": "\xA4",
  "curren": "\xA4",
  "curvearrowleft;": "\u21B6",
  "curvearrowright;": "\u21B7",
  "cuvee;": "\u22CE",
  "cuwed;": "\u22CF",
  "cwconint;": "\u2232",
  "cwint;": "\u2231",
  "cylcty;": "\u232D",
  "Dagger;": "\u2021",
  "dagger;": "\u2020",
  "daleth;": "\u2138",
  "Darr;": "\u21A1",
  "dArr;": "\u21D3",
  "darr;": "\u2193",
  "dash;": "\u2010",
  "Dashv;": "\u2AE4",
  "dashv;": "\u22A3",
  "dbkarow;": "\u290F",
  "dblac;": "\u02DD",
  "Dcaron;": "\u010E",
  "dcaron;": "\u010F",
  "Dcy;": "\u0414",
  "dcy;": "\u0434",
  "DD;": "\u2145",
  "dd;": "\u2146",
  "ddagger;": "\u2021",
  "ddarr;": "\u21CA",
  "DDotrahd;": "\u2911",
  "ddotseq;": "\u2A77",
  "deg;": "\xB0",
  "deg": "\xB0",
  "Del;": "\u2207",
  "Delta;": "\u0394",
  "delta;": "\u03B4",
  "demptyv;": "\u29B1",
  "dfisht;": "\u297F",
  "Dfr;": "\u{1D507}",
  "dfr;": "\u{1D521}",
  "dHar;": "\u2965",
  "dharl;": "\u21C3",
  "dharr;": "\u21C2",
  "DiacriticalAcute;": "\xB4",
  "DiacriticalDot;": "\u02D9",
  "DiacriticalDoubleAcute;": "\u02DD",
  "DiacriticalGrave;": "`",
  "DiacriticalTilde;": "\u02DC",
  "diam;": "\u22C4",
  "Diamond;": "\u22C4",
  "diamond;": "\u22C4",
  "diamondsuit;": "\u2666",
  "diams;": "\u2666",
  "die;": "\xA8",
  "DifferentialD;": "\u2146",
  "digamma;": "\u03DD",
  "disin;": "\u22F2",
  "div;": "\xF7",
  "divide;": "\xF7",
  "divide": "\xF7",
  "divideontimes;": "\u22C7",
  "divonx;": "\u22C7",
  "DJcy;": "\u0402",
  "djcy;": "\u0452",
  "dlcorn;": "\u231E",
  "dlcrop;": "\u230D",
  "dollar;": "$",
  "Dopf;": "\u{1D53B}",
  "dopf;": "\u{1D555}",
  "Dot;": "\xA8",
  "dot;": "\u02D9",
  "DotDot;": "\u20DC",
  "doteq;": "\u2250",
  "doteqdot;": "\u2251",
  "DotEqual;": "\u2250",
  "dotminus;": "\u2238",
  "dotplus;": "\u2214",
  "dotsquare;": "\u22A1",
  "doublebarwedge;": "\u2306",
  "DoubleContourIntegral;": "\u222F",
  "DoubleDot;": "\xA8",
  "DoubleDownArrow;": "\u21D3",
  "DoubleLeftArrow;": "\u21D0",
  "DoubleLeftRightArrow;": "\u21D4",
  "DoubleLeftTee;": "\u2AE4",
  "DoubleLongLeftArrow;": "\u27F8",
  "DoubleLongLeftRightArrow;": "\u27FA",
  "DoubleLongRightArrow;": "\u27F9",
  "DoubleRightArrow;": "\u21D2",
  "DoubleRightTee;": "\u22A8",
  "DoubleUpArrow;": "\u21D1",
  "DoubleUpDownArrow;": "\u21D5",
  "DoubleVerticalBar;": "\u2225",
  "DownArrow;": "\u2193",
  "Downarrow;": "\u21D3",
  "downarrow;": "\u2193",
  "DownArrowBar;": "\u2913",
  "DownArrowUpArrow;": "\u21F5",
  "DownBreve;": "\u0311",
  "downdownarrows;": "\u21CA",
  "downharpoonleft;": "\u21C3",
  "downharpoonright;": "\u21C2",
  "DownLeftRightVector;": "\u2950",
  "DownLeftTeeVector;": "\u295E",
  "DownLeftVector;": "\u21BD",
  "DownLeftVectorBar;": "\u2956",
  "DownRightTeeVector;": "\u295F",
  "DownRightVector;": "\u21C1",
  "DownRightVectorBar;": "\u2957",
  "DownTee;": "\u22A4",
  "DownTeeArrow;": "\u21A7",
  "drbkarow;": "\u2910",
  "drcorn;": "\u231F",
  "drcrop;": "\u230C",
  "Dscr;": "\u{1D49F}",
  "dscr;": "\u{1D4B9}",
  "DScy;": "\u0405",
  "dscy;": "\u0455",
  "dsol;": "\u29F6",
  "Dstrok;": "\u0110",
  "dstrok;": "\u0111",
  "dtdot;": "\u22F1",
  "dtri;": "\u25BF",
  "dtrif;": "\u25BE",
  "duarr;": "\u21F5",
  "duhar;": "\u296F",
  "dwangle;": "\u29A6",
  "DZcy;": "\u040F",
  "dzcy;": "\u045F",
  "dzigrarr;": "\u27FF",
  "Eacute;": "\xC9",
  "Eacute": "\xC9",
  "eacute;": "\xE9",
  "eacute": "\xE9",
  "easter;": "\u2A6E",
  "Ecaron;": "\u011A",
  "ecaron;": "\u011B",
  "ecir;": "\u2256",
  "Ecirc;": "\xCA",
  "Ecirc": "\xCA",
  "ecirc;": "\xEA",
  "ecirc": "\xEA",
  "ecolon;": "\u2255",
  "Ecy;": "\u042D",
  "ecy;": "\u044D",
  "eDDot;": "\u2A77",
  "Edot;": "\u0116",
  "eDot;": "\u2251",
  "edot;": "\u0117",
  "ee;": "\u2147",
  "efDot;": "\u2252",
  "Efr;": "\u{1D508}",
  "efr;": "\u{1D522}",
  "eg;": "\u2A9A",
  "Egrave;": "\xC8",
  "Egrave": "\xC8",
  "egrave;": "\xE8",
  "egrave": "\xE8",
  "egs;": "\u2A96",
  "egsdot;": "\u2A98",
  "el;": "\u2A99",
  "Element;": "\u2208",
  "elinters;": "\u23E7",
  "ell;": "\u2113",
  "els;": "\u2A95",
  "elsdot;": "\u2A97",
  "Emacr;": "\u0112",
  "emacr;": "\u0113",
  "empty;": "\u2205",
  "emptyset;": "\u2205",
  "EmptySmallSquare;": "\u25FB",
  "emptyv;": "\u2205",
  "EmptyVerySmallSquare;": "\u25AB",
  "emsp;": "\u2003",
  "emsp13;": "\u2004",
  "emsp14;": "\u2005",
  "ENG;": "\u014A",
  "eng;": "\u014B",
  "ensp;": "\u2002",
  "Eogon;": "\u0118",
  "eogon;": "\u0119",
  "Eopf;": "\u{1D53C}",
  "eopf;": "\u{1D556}",
  "epar;": "\u22D5",
  "eparsl;": "\u29E3",
  "eplus;": "\u2A71",
  "epsi;": "\u03B5",
  "Epsilon;": "\u0395",
  "epsilon;": "\u03B5",
  "epsiv;": "\u03F5",
  "eqcirc;": "\u2256",
  "eqcolon;": "\u2255",
  "eqsim;": "\u2242",
  "eqslantgtr;": "\u2A96",
  "eqslantless;": "\u2A95",
  "Equal;": "\u2A75",
  "equals;": "=",
  "EqualTilde;": "\u2242",
  "equest;": "\u225F",
  "Equilibrium;": "\u21CC",
  "equiv;": "\u2261",
  "equivDD;": "\u2A78",
  "eqvparsl;": "\u29E5",
  "erarr;": "\u2971",
  "erDot;": "\u2253",
  "Escr;": "\u2130",
  "escr;": "\u212F",
  "esdot;": "\u2250",
  "Esim;": "\u2A73",
  "esim;": "\u2242",
  "Eta;": "\u0397",
  "eta;": "\u03B7",
  "ETH;": "\xD0",
  "ETH": "\xD0",
  "eth;": "\xF0",
  "eth": "\xF0",
  "Euml;": "\xCB",
  "Euml": "\xCB",
  "euml;": "\xEB",
  "euml": "\xEB",
  "euro;": "\u20AC",
  "excl;": "!",
  "exist;": "\u2203",
  "Exists;": "\u2203",
  "expectation;": "\u2130",
  "ExponentialE;": "\u2147",
  "exponentiale;": "\u2147",
  "fallingdotseq;": "\u2252",
  "Fcy;": "\u0424",
  "fcy;": "\u0444",
  "female;": "\u2640",
  "ffilig;": "\uFB03",
  "fflig;": "\uFB00",
  "ffllig;": "\uFB04",
  "Ffr;": "\u{1D509}",
  "ffr;": "\u{1D523}",
  "filig;": "\uFB01",
  "FilledSmallSquare;": "\u25FC",
  "FilledVerySmallSquare;": "\u25AA",
  "fjlig;": "fj",
  "flat;": "\u266D",
  "fllig;": "\uFB02",
  "fltns;": "\u25B1",
  "fnof;": "\u0192",
  "Fopf;": "\u{1D53D}",
  "fopf;": "\u{1D557}",
  "ForAll;": "\u2200",
  "forall;": "\u2200",
  "fork;": "\u22D4",
  "forkv;": "\u2AD9",
  "Fouriertrf;": "\u2131",
  "fpartint;": "\u2A0D",
  "frac12;": "\xBD",
  "frac12": "\xBD",
  "frac13;": "\u2153",
  "frac14;": "\xBC",
  "frac14": "\xBC",
  "frac15;": "\u2155",
  "frac16;": "\u2159",
  "frac18;": "\u215B",
  "frac23;": "\u2154",
  "frac25;": "\u2156",
  "frac34;": "\xBE",
  "frac34": "\xBE",
  "frac35;": "\u2157",
  "frac38;": "\u215C",
  "frac45;": "\u2158",
  "frac56;": "\u215A",
  "frac58;": "\u215D",
  "frac78;": "\u215E",
  "frasl;": "\u2044",
  "frown;": "\u2322",
  "Fscr;": "\u2131",
  "fscr;": "\u{1D4BB}",
  "gacute;": "\u01F5",
  "Gamma;": "\u0393",
  "gamma;": "\u03B3",
  "Gammad;": "\u03DC",
  "gammad;": "\u03DD",
  "gap;": "\u2A86",
  "Gbreve;": "\u011E",
  "gbreve;": "\u011F",
  "Gcedil;": "\u0122",
  "Gcirc;": "\u011C",
  "gcirc;": "\u011D",
  "Gcy;": "\u0413",
  "gcy;": "\u0433",
  "Gdot;": "\u0120",
  "gdot;": "\u0121",
  "gE;": "\u2267",
  "ge;": "\u2265",
  "gEl;": "\u2A8C",
  "gel;": "\u22DB",
  "geq;": "\u2265",
  "geqq;": "\u2267",
  "geqslant;": "\u2A7E",
  "ges;": "\u2A7E",
  "gescc;": "\u2AA9",
  "gesdot;": "\u2A80",
  "gesdoto;": "\u2A82",
  "gesdotol;": "\u2A84",
  "gesl;": "\u22DB\uFE00",
  "gesles;": "\u2A94",
  "Gfr;": "\u{1D50A}",
  "gfr;": "\u{1D524}",
  "Gg;": "\u22D9",
  "gg;": "\u226B",
  "ggg;": "\u22D9",
  "gimel;": "\u2137",
  "GJcy;": "\u0403",
  "gjcy;": "\u0453",
  "gl;": "\u2277",
  "gla;": "\u2AA5",
  "glE;": "\u2A92",
  "glj;": "\u2AA4",
  "gnap;": "\u2A8A",
  "gnapprox;": "\u2A8A",
  "gnE;": "\u2269",
  "gne;": "\u2A88",
  "gneq;": "\u2A88",
  "gneqq;": "\u2269",
  "gnsim;": "\u22E7",
  "Gopf;": "\u{1D53E}",
  "gopf;": "\u{1D558}",
  "grave;": "`",
  "GreaterEqual;": "\u2265",
  "GreaterEqualLess;": "\u22DB",
  "GreaterFullEqual;": "\u2267",
  "GreaterGreater;": "\u2AA2",
  "GreaterLess;": "\u2277",
  "GreaterSlantEqual;": "\u2A7E",
  "GreaterTilde;": "\u2273",
  "Gscr;": "\u{1D4A2}",
  "gscr;": "\u210A",
  "gsim;": "\u2273",
  "gsime;": "\u2A8E",
  "gsiml;": "\u2A90",
  "GT;": ">",
  "GT": ">",
  "Gt;": "\u226B",
  "gt;": ">",
  "gt": ">",
  "gtcc;": "\u2AA7",
  "gtcir;": "\u2A7A",
  "gtdot;": "\u22D7",
  "gtlPar;": "\u2995",
  "gtquest;": "\u2A7C",
  "gtrapprox;": "\u2A86",
  "gtrarr;": "\u2978",
  "gtrdot;": "\u22D7",
  "gtreqless;": "\u22DB",
  "gtreqqless;": "\u2A8C",
  "gtrless;": "\u2277",
  "gtrsim;": "\u2273",
  "gvertneqq;": "\u2269\uFE00",
  "gvnE;": "\u2269\uFE00",
  "Hacek;": "\u02C7",
  "hairsp;": "\u200A",
  "half;": "\xBD",
  "hamilt;": "\u210B",
  "HARDcy;": "\u042A",
  "hardcy;": "\u044A",
  "hArr;": "\u21D4",
  "harr;": "\u2194",
  "harrcir;": "\u2948",
  "harrw;": "\u21AD",
  "Hat;": "^",
  "hbar;": "\u210F",
  "Hcirc;": "\u0124",
  "hcirc;": "\u0125",
  "hearts;": "\u2665",
  "heartsuit;": "\u2665",
  "hellip;": "\u2026",
  "hercon;": "\u22B9",
  "Hfr;": "\u210C",
  "hfr;": "\u{1D525}",
  "HilbertSpace;": "\u210B",
  "hksearow;": "\u2925",
  "hkswarow;": "\u2926",
  "hoarr;": "\u21FF",
  "homtht;": "\u223B",
  "hookleftarrow;": "\u21A9",
  "hookrightarrow;": "\u21AA",
  "Hopf;": "\u210D",
  "hopf;": "\u{1D559}",
  "horbar;": "\u2015",
  "HorizontalLine;": "\u2500",
  "Hscr;": "\u210B",
  "hscr;": "\u{1D4BD}",
  "hslash;": "\u210F",
  "Hstrok;": "\u0126",
  "hstrok;": "\u0127",
  "HumpDownHump;": "\u224E",
  "HumpEqual;": "\u224F",
  "hybull;": "\u2043",
  "hyphen;": "\u2010",
  "Iacute;": "\xCD",
  "Iacute": "\xCD",
  "iacute;": "\xED",
  "iacute": "\xED",
  "ic;": "\u2063",
  "Icirc;": "\xCE",
  "Icirc": "\xCE",
  "icirc;": "\xEE",
  "icirc": "\xEE",
  "Icy;": "\u0418",
  "icy;": "\u0438",
  "Idot;": "\u0130",
  "IEcy;": "\u0415",
  "iecy;": "\u0435",
  "iexcl;": "\xA1",
  "iexcl": "\xA1",
  "iff;": "\u21D4",
  "Ifr;": "\u2111",
  "ifr;": "\u{1D526}",
  "Igrave;": "\xCC",
  "Igrave": "\xCC",
  "igrave;": "\xEC",
  "igrave": "\xEC",
  "ii;": "\u2148",
  "iiiint;": "\u2A0C",
  "iiint;": "\u222D",
  "iinfin;": "\u29DC",
  "iiota;": "\u2129",
  "IJlig;": "\u0132",
  "ijlig;": "\u0133",
  "Im;": "\u2111",
  "Imacr;": "\u012A",
  "imacr;": "\u012B",
  "image;": "\u2111",
  "ImaginaryI;": "\u2148",
  "imagline;": "\u2110",
  "imagpart;": "\u2111",
  "imath;": "\u0131",
  "imof;": "\u22B7",
  "imped;": "\u01B5",
  "Implies;": "\u21D2",
  "in;": "\u2208",
  "incare;": "\u2105",
  "infin;": "\u221E",
  "infintie;": "\u29DD",
  "inodot;": "\u0131",
  "Int;": "\u222C",
  "int;": "\u222B",
  "intcal;": "\u22BA",
  "integers;": "\u2124",
  "Integral;": "\u222B",
  "intercal;": "\u22BA",
  "Intersection;": "\u22C2",
  "intlarhk;": "\u2A17",
  "intprod;": "\u2A3C",
  "InvisibleComma;": "\u2063",
  "InvisibleTimes;": "\u2062",
  "IOcy;": "\u0401",
  "iocy;": "\u0451",
  "Iogon;": "\u012E",
  "iogon;": "\u012F",
  "Iopf;": "\u{1D540}",
  "iopf;": "\u{1D55A}",
  "Iota;": "\u0399",
  "iota;": "\u03B9",
  "iprod;": "\u2A3C",
  "iquest;": "\xBF",
  "iquest": "\xBF",
  "Iscr;": "\u2110",
  "iscr;": "\u{1D4BE}",
  "isin;": "\u2208",
  "isindot;": "\u22F5",
  "isinE;": "\u22F9",
  "isins;": "\u22F4",
  "isinsv;": "\u22F3",
  "isinv;": "\u2208",
  "it;": "\u2062",
  "Itilde;": "\u0128",
  "itilde;": "\u0129",
  "Iukcy;": "\u0406",
  "iukcy;": "\u0456",
  "Iuml;": "\xCF",
  "Iuml": "\xCF",
  "iuml;": "\xEF",
  "iuml": "\xEF",
  "Jcirc;": "\u0134",
  "jcirc;": "\u0135",
  "Jcy;": "\u0419",
  "jcy;": "\u0439",
  "Jfr;": "\u{1D50D}",
  "jfr;": "\u{1D527}",
  "jmath;": "\u0237",
  "Jopf;": "\u{1D541}",
  "jopf;": "\u{1D55B}",
  "Jscr;": "\u{1D4A5}",
  "jscr;": "\u{1D4BF}",
  "Jsercy;": "\u0408",
  "jsercy;": "\u0458",
  "Jukcy;": "\u0404",
  "jukcy;": "\u0454",
  "Kappa;": "\u039A",
  "kappa;": "\u03BA",
  "kappav;": "\u03F0",
  "Kcedil;": "\u0136",
  "kcedil;": "\u0137",
  "Kcy;": "\u041A",
  "kcy;": "\u043A",
  "Kfr;": "\u{1D50E}",
  "kfr;": "\u{1D528}",
  "kgreen;": "\u0138",
  "KHcy;": "\u0425",
  "khcy;": "\u0445",
  "KJcy;": "\u040C",
  "kjcy;": "\u045C",
  "Kopf;": "\u{1D542}",
  "kopf;": "\u{1D55C}",
  "Kscr;": "\u{1D4A6}",
  "kscr;": "\u{1D4C0}",
  "lAarr;": "\u21DA",
  "Lacute;": "\u0139",
  "lacute;": "\u013A",
  "laemptyv;": "\u29B4",
  "lagran;": "\u2112",
  "Lambda;": "\u039B",
  "lambda;": "\u03BB",
  "Lang;": "\u27EA",
  "lang;": "\u27E8",
  "langd;": "\u2991",
  "langle;": "\u27E8",
  "lap;": "\u2A85",
  "Laplacetrf;": "\u2112",
  "laquo;": "\xAB",
  "laquo": "\xAB",
  "Larr;": "\u219E",
  "lArr;": "\u21D0",
  "larr;": "\u2190",
  "larrb;": "\u21E4",
  "larrbfs;": "\u291F",
  "larrfs;": "\u291D",
  "larrhk;": "\u21A9",
  "larrlp;": "\u21AB",
  "larrpl;": "\u2939",
  "larrsim;": "\u2973",
  "larrtl;": "\u21A2",
  "lat;": "\u2AAB",
  "lAtail;": "\u291B",
  "latail;": "\u2919",
  "late;": "\u2AAD",
  "lates;": "\u2AAD\uFE00",
  "lBarr;": "\u290E",
  "lbarr;": "\u290C",
  "lbbrk;": "\u2772",
  "lbrace;": "{",
  "lbrack;": "[",
  "lbrke;": "\u298B",
  "lbrksld;": "\u298F",
  "lbrkslu;": "\u298D",
  "Lcaron;": "\u013D",
  "lcaron;": "\u013E",
  "Lcedil;": "\u013B",
  "lcedil;": "\u013C",
  "lceil;": "\u2308",
  "lcub;": "{",
  "Lcy;": "\u041B",
  "lcy;": "\u043B",
  "ldca;": "\u2936",
  "ldquo;": "\u201C",
  "ldquor;": "\u201E",
  "ldrdhar;": "\u2967",
  "ldrushar;": "\u294B",
  "ldsh;": "\u21B2",
  "lE;": "\u2266",
  "le;": "\u2264",
  "LeftAngleBracket;": "\u27E8",
  "LeftArrow;": "\u2190",
  "Leftarrow;": "\u21D0",
  "leftarrow;": "\u2190",
  "LeftArrowBar;": "\u21E4",
  "LeftArrowRightArrow;": "\u21C6",
  "leftarrowtail;": "\u21A2",
  "LeftCeiling;": "\u2308",
  "LeftDoubleBracket;": "\u27E6",
  "LeftDownTeeVector;": "\u2961",
  "LeftDownVector;": "\u21C3",
  "LeftDownVectorBar;": "\u2959",
  "LeftFloor;": "\u230A",
  "leftharpoondown;": "\u21BD",
  "leftharpoonup;": "\u21BC",
  "leftleftarrows;": "\u21C7",
  "LeftRightArrow;": "\u2194",
  "Leftrightarrow;": "\u21D4",
  "leftrightarrow;": "\u2194",
  "leftrightarrows;": "\u21C6",
  "leftrightharpoons;": "\u21CB",
  "leftrightsquigarrow;": "\u21AD",
  "LeftRightVector;": "\u294E",
  "LeftTee;": "\u22A3",
  "LeftTeeArrow;": "\u21A4",
  "LeftTeeVector;": "\u295A",
  "leftthreetimes;": "\u22CB",
  "LeftTriangle;": "\u22B2",
  "LeftTriangleBar;": "\u29CF",
  "LeftTriangleEqual;": "\u22B4",
  "LeftUpDownVector;": "\u2951",
  "LeftUpTeeVector;": "\u2960",
  "LeftUpVector;": "\u21BF",
  "LeftUpVectorBar;": "\u2958",
  "LeftVector;": "\u21BC",
  "LeftVectorBar;": "\u2952",
  "lEg;": "\u2A8B",
  "leg;": "\u22DA",
  "leq;": "\u2264",
  "leqq;": "\u2266",
  "leqslant;": "\u2A7D",
  "les;": "\u2A7D",
  "lescc;": "\u2AA8",
  "lesdot;": "\u2A7F",
  "lesdoto;": "\u2A81",
  "lesdotor;": "\u2A83",
  "lesg;": "\u22DA\uFE00",
  "lesges;": "\u2A93",
  "lessapprox;": "\u2A85",
  "lessdot;": "\u22D6",
  "lesseqgtr;": "\u22DA",
  "lesseqqgtr;": "\u2A8B",
  "LessEqualGreater;": "\u22DA",
  "LessFullEqual;": "\u2266",
  "LessGreater;": "\u2276",
  "lessgtr;": "\u2276",
  "LessLess;": "\u2AA1",
  "lesssim;": "\u2272",
  "LessSlantEqual;": "\u2A7D",
  "LessTilde;": "\u2272",
  "lfisht;": "\u297C",
  "lfloor;": "\u230A",
  "Lfr;": "\u{1D50F}",
  "lfr;": "\u{1D529}",
  "lg;": "\u2276",
  "lgE;": "\u2A91",
  "lHar;": "\u2962",
  "lhard;": "\u21BD",
  "lharu;": "\u21BC",
  "lharul;": "\u296A",
  "lhblk;": "\u2584",
  "LJcy;": "\u0409",
  "ljcy;": "\u0459",
  "Ll;": "\u22D8",
  "ll;": "\u226A",
  "llarr;": "\u21C7",
  "llcorner;": "\u231E",
  "Lleftarrow;": "\u21DA",
  "llhard;": "\u296B",
  "lltri;": "\u25FA",
  "Lmidot;": "\u013F",
  "lmidot;": "\u0140",
  "lmoust;": "\u23B0",
  "lmoustache;": "\u23B0",
  "lnap;": "\u2A89",
  "lnapprox;": "\u2A89",
  "lnE;": "\u2268",
  "lne;": "\u2A87",
  "lneq;": "\u2A87",
  "lneqq;": "\u2268",
  "lnsim;": "\u22E6",
  "loang;": "\u27EC",
  "loarr;": "\u21FD",
  "lobrk;": "\u27E6",
  "LongLeftArrow;": "\u27F5",
  "Longleftarrow;": "\u27F8",
  "longleftarrow;": "\u27F5",
  "LongLeftRightArrow;": "\u27F7",
  "Longleftrightarrow;": "\u27FA",
  "longleftrightarrow;": "\u27F7",
  "longmapsto;": "\u27FC",
  "LongRightArrow;": "\u27F6",
  "Longrightarrow;": "\u27F9",
  "longrightarrow;": "\u27F6",
  "looparrowleft;": "\u21AB",
  "looparrowright;": "\u21AC",
  "lopar;": "\u2985",
  "Lopf;": "\u{1D543}",
  "lopf;": "\u{1D55D}",
  "loplus;": "\u2A2D",
  "lotimes;": "\u2A34",
  "lowast;": "\u2217",
  "lowbar;": "_",
  "LowerLeftArrow;": "\u2199",
  "LowerRightArrow;": "\u2198",
  "loz;": "\u25CA",
  "lozenge;": "\u25CA",
  "lozf;": "\u29EB",
  "lpar;": "(",
  "lparlt;": "\u2993",
  "lrarr;": "\u21C6",
  "lrcorner;": "\u231F",
  "lrhar;": "\u21CB",
  "lrhard;": "\u296D",
  "lrm;": "\u200E",
  "lrtri;": "\u22BF",
  "lsaquo;": "\u2039",
  "Lscr;": "\u2112",
  "lscr;": "\u{1D4C1}",
  "Lsh;": "\u21B0",
  "lsh;": "\u21B0",
  "lsim;": "\u2272",
  "lsime;": "\u2A8D",
  "lsimg;": "\u2A8F",
  "lsqb;": "[",
  "lsquo;": "\u2018",
  "lsquor;": "\u201A",
  "Lstrok;": "\u0141",
  "lstrok;": "\u0142",
  "LT;": "<",
  "LT": "<",
  "Lt;": "\u226A",
  "lt;": "<",
  "lt": "<",
  "ltcc;": "\u2AA6",
  "ltcir;": "\u2A79",
  "ltdot;": "\u22D6",
  "lthree;": "\u22CB",
  "ltimes;": "\u22C9",
  "ltlarr;": "\u2976",
  "ltquest;": "\u2A7B",
  "ltri;": "\u25C3",
  "ltrie;": "\u22B4",
  "ltrif;": "\u25C2",
  "ltrPar;": "\u2996",
  "lurdshar;": "\u294A",
  "luruhar;": "\u2966",
  "lvertneqq;": "\u2268\uFE00",
  "lvnE;": "\u2268\uFE00",
  "macr;": "\xAF",
  "macr": "\xAF",
  "male;": "\u2642",
  "malt;": "\u2720",
  "maltese;": "\u2720",
  "Map;": "\u2905",
  "map;": "\u21A6",
  "mapsto;": "\u21A6",
  "mapstodown;": "\u21A7",
  "mapstoleft;": "\u21A4",
  "mapstoup;": "\u21A5",
  "marker;": "\u25AE",
  "mcomma;": "\u2A29",
  "Mcy;": "\u041C",
  "mcy;": "\u043C",
  "mdash;": "\u2014",
  "mDDot;": "\u223A",
  "measuredangle;": "\u2221",
  "MediumSpace;": "\u205F",
  "Mellintrf;": "\u2133",
  "Mfr;": "\u{1D510}",
  "mfr;": "\u{1D52A}",
  "mho;": "\u2127",
  "micro;": "\xB5",
  "micro": "\xB5",
  "mid;": "\u2223",
  "midast;": "*",
  "midcir;": "\u2AF0",
  "middot;": "\xB7",
  "middot": "\xB7",
  "minus;": "\u2212",
  "minusb;": "\u229F",
  "minusd;": "\u2238",
  "minusdu;": "\u2A2A",
  "MinusPlus;": "\u2213",
  "mlcp;": "\u2ADB",
  "mldr;": "\u2026",
  "mnplus;": "\u2213",
  "models;": "\u22A7",
  "Mopf;": "\u{1D544}",
  "mopf;": "\u{1D55E}",
  "mp;": "\u2213",
  "Mscr;": "\u2133",
  "mscr;": "\u{1D4C2}",
  "mstpos;": "\u223E",
  "Mu;": "\u039C",
  "mu;": "\u03BC",
  "multimap;": "\u22B8",
  "mumap;": "\u22B8",
  "nabla;": "\u2207",
  "Nacute;": "\u0143",
  "nacute;": "\u0144",
  "nang;": "\u2220\u20D2",
  "nap;": "\u2249",
  "napE;": "\u2A70\u0338",
  "napid;": "\u224B\u0338",
  "napos;": "\u0149",
  "napprox;": "\u2249",
  "natur;": "\u266E",
  "natural;": "\u266E",
  "naturals;": "\u2115",
  "nbsp;": "\xA0",
  "nbsp": "\xA0",
  "nbump;": "\u224E\u0338",
  "nbumpe;": "\u224F\u0338",
  "ncap;": "\u2A43",
  "Ncaron;": "\u0147",
  "ncaron;": "\u0148",
  "Ncedil;": "\u0145",
  "ncedil;": "\u0146",
  "ncong;": "\u2247",
  "ncongdot;": "\u2A6D\u0338",
  "ncup;": "\u2A42",
  "Ncy;": "\u041D",
  "ncy;": "\u043D",
  "ndash;": "\u2013",
  "ne;": "\u2260",
  "nearhk;": "\u2924",
  "neArr;": "\u21D7",
  "nearr;": "\u2197",
  "nearrow;": "\u2197",
  "nedot;": "\u2250\u0338",
  "NegativeMediumSpace;": "\u200B",
  "NegativeThickSpace;": "\u200B",
  "NegativeThinSpace;": "\u200B",
  "NegativeVeryThinSpace;": "\u200B",
  "nequiv;": "\u2262",
  "nesear;": "\u2928",
  "nesim;": "\u2242\u0338",
  "NestedGreaterGreater;": "\u226B",
  "NestedLessLess;": "\u226A",
  "NewLine;": "\n",
  "nexist;": "\u2204",
  "nexists;": "\u2204",
  "Nfr;": "\u{1D511}",
  "nfr;": "\u{1D52B}",
  "ngE;": "\u2267\u0338",
  "nge;": "\u2271",
  "ngeq;": "\u2271",
  "ngeqq;": "\u2267\u0338",
  "ngeqslant;": "\u2A7E\u0338",
  "nges;": "\u2A7E\u0338",
  "nGg;": "\u22D9\u0338",
  "ngsim;": "\u2275",
  "nGt;": "\u226B\u20D2",
  "ngt;": "\u226F",
  "ngtr;": "\u226F",
  "nGtv;": "\u226B\u0338",
  "nhArr;": "\u21CE",
  "nharr;": "\u21AE",
  "nhpar;": "\u2AF2",
  "ni;": "\u220B",
  "nis;": "\u22FC",
  "nisd;": "\u22FA",
  "niv;": "\u220B",
  "NJcy;": "\u040A",
  "njcy;": "\u045A",
  "nlArr;": "\u21CD",
  "nlarr;": "\u219A",
  "nldr;": "\u2025",
  "nlE;": "\u2266\u0338",
  "nle;": "\u2270",
  "nLeftarrow;": "\u21CD",
  "nleftarrow;": "\u219A",
  "nLeftrightarrow;": "\u21CE",
  "nleftrightarrow;": "\u21AE",
  "nleq;": "\u2270",
  "nleqq;": "\u2266\u0338",
  "nleqslant;": "\u2A7D\u0338",
  "nles;": "\u2A7D\u0338",
  "nless;": "\u226E",
  "nLl;": "\u22D8\u0338",
  "nlsim;": "\u2274",
  "nLt;": "\u226A\u20D2",
  "nlt;": "\u226E",
  "nltri;": "\u22EA",
  "nltrie;": "\u22EC",
  "nLtv;": "\u226A\u0338",
  "nmid;": "\u2224",
  "NoBreak;": "\u2060",
  "NonBreakingSpace;": "\xA0",
  "Nopf;": "\u2115",
  "nopf;": "\u{1D55F}",
  "Not;": "\u2AEC",
  "not;": "\xAC",
  "not": "\xAC",
  "NotCongruent;": "\u2262",
  "NotCupCap;": "\u226D",
  "NotDoubleVerticalBar;": "\u2226",
  "NotElement;": "\u2209",
  "NotEqual;": "\u2260",
  "NotEqualTilde;": "\u2242\u0338",
  "NotExists;": "\u2204",
  "NotGreater;": "\u226F",
  "NotGreaterEqual;": "\u2271",
  "NotGreaterFullEqual;": "\u2267\u0338",
  "NotGreaterGreater;": "\u226B\u0338",
  "NotGreaterLess;": "\u2279",
  "NotGreaterSlantEqual;": "\u2A7E\u0338",
  "NotGreaterTilde;": "\u2275",
  "NotHumpDownHump;": "\u224E\u0338",
  "NotHumpEqual;": "\u224F\u0338",
  "notin;": "\u2209",
  "notindot;": "\u22F5\u0338",
  "notinE;": "\u22F9\u0338",
  "notinva;": "\u2209",
  "notinvb;": "\u22F7",
  "notinvc;": "\u22F6",
  "NotLeftTriangle;": "\u22EA",
  "NotLeftTriangleBar;": "\u29CF\u0338",
  "NotLeftTriangleEqual;": "\u22EC",
  "NotLess;": "\u226E",
  "NotLessEqual;": "\u2270",
  "NotLessGreater;": "\u2278",
  "NotLessLess;": "\u226A\u0338",
  "NotLessSlantEqual;": "\u2A7D\u0338",
  "NotLessTilde;": "\u2274",
  "NotNestedGreaterGreater;": "\u2AA2\u0338",
  "NotNestedLessLess;": "\u2AA1\u0338",
  "notni;": "\u220C",
  "notniva;": "\u220C",
  "notnivb;": "\u22FE",
  "notnivc;": "\u22FD",
  "NotPrecedes;": "\u2280",
  "NotPrecedesEqual;": "\u2AAF\u0338",
  "NotPrecedesSlantEqual;": "\u22E0",
  "NotReverseElement;": "\u220C",
  "NotRightTriangle;": "\u22EB",
  "NotRightTriangleBar;": "\u29D0\u0338",
  "NotRightTriangleEqual;": "\u22ED",
  "NotSquareSubset;": "\u228F\u0338",
  "NotSquareSubsetEqual;": "\u22E2",
  "NotSquareSuperset;": "\u2290\u0338",
  "NotSquareSupersetEqual;": "\u22E3",
  "NotSubset;": "\u2282\u20D2",
  "NotSubsetEqual;": "\u2288",
  "NotSucceeds;": "\u2281",
  "NotSucceedsEqual;": "\u2AB0\u0338",
  "NotSucceedsSlantEqual;": "\u22E1",
  "NotSucceedsTilde;": "\u227F\u0338",
  "NotSuperset;": "\u2283\u20D2",
  "NotSupersetEqual;": "\u2289",
  "NotTilde;": "\u2241",
  "NotTildeEqual;": "\u2244",
  "NotTildeFullEqual;": "\u2247",
  "NotTildeTilde;": "\u2249",
  "NotVerticalBar;": "\u2224",
  "npar;": "\u2226",
  "nparallel;": "\u2226",
  "nparsl;": "\u2AFD\u20E5",
  "npart;": "\u2202\u0338",
  "npolint;": "\u2A14",
  "npr;": "\u2280",
  "nprcue;": "\u22E0",
  "npre;": "\u2AAF\u0338",
  "nprec;": "\u2280",
  "npreceq;": "\u2AAF\u0338",
  "nrArr;": "\u21CF",
  "nrarr;": "\u219B",
  "nrarrc;": "\u2933\u0338",
  "nrarrw;": "\u219D\u0338",
  "nRightarrow;": "\u21CF",
  "nrightarrow;": "\u219B",
  "nrtri;": "\u22EB",
  "nrtrie;": "\u22ED",
  "nsc;": "\u2281",
  "nsccue;": "\u22E1",
  "nsce;": "\u2AB0\u0338",
  "Nscr;": "\u{1D4A9}",
  "nscr;": "\u{1D4C3}",
  "nshortmid;": "\u2224",
  "nshortparallel;": "\u2226",
  "nsim;": "\u2241",
  "nsime;": "\u2244",
  "nsimeq;": "\u2244",
  "nsmid;": "\u2224",
  "nspar;": "\u2226",
  "nsqsube;": "\u22E2",
  "nsqsupe;": "\u22E3",
  "nsub;": "\u2284",
  "nsubE;": "\u2AC5\u0338",
  "nsube;": "\u2288",
  "nsubset;": "\u2282\u20D2",
  "nsubseteq;": "\u2288",
  "nsubseteqq;": "\u2AC5\u0338",
  "nsucc;": "\u2281",
  "nsucceq;": "\u2AB0\u0338",
  "nsup;": "\u2285",
  "nsupE;": "\u2AC6\u0338",
  "nsupe;": "\u2289",
  "nsupset;": "\u2283\u20D2",
  "nsupseteq;": "\u2289",
  "nsupseteqq;": "\u2AC6\u0338",
  "ntgl;": "\u2279",
  "Ntilde;": "\xD1",
  "Ntilde": "\xD1",
  "ntilde;": "\xF1",
  "ntilde": "\xF1",
  "ntlg;": "\u2278",
  "ntriangleleft;": "\u22EA",
  "ntrianglelefteq;": "\u22EC",
  "ntriangleright;": "\u22EB",
  "ntrianglerighteq;": "\u22ED",
  "Nu;": "\u039D",
  "nu;": "\u03BD",
  "num;": "#",
  "numero;": "\u2116",
  "numsp;": "\u2007",
  "nvap;": "\u224D\u20D2",
  "nVDash;": "\u22AF",
  "nVdash;": "\u22AE",
  "nvDash;": "\u22AD",
  "nvdash;": "\u22AC",
  "nvge;": "\u2265\u20D2",
  "nvgt;": ">\u20D2",
  "nvHarr;": "\u2904",
  "nvinfin;": "\u29DE",
  "nvlArr;": "\u2902",
  "nvle;": "\u2264\u20D2",
  "nvlt;": "<\u20D2",
  "nvltrie;": "\u22B4\u20D2",
  "nvrArr;": "\u2903",
  "nvrtrie;": "\u22B5\u20D2",
  "nvsim;": "\u223C\u20D2",
  "nwarhk;": "\u2923",
  "nwArr;": "\u21D6",
  "nwarr;": "\u2196",
  "nwarrow;": "\u2196",
  "nwnear;": "\u2927",
  "Oacute;": "\xD3",
  "Oacute": "\xD3",
  "oacute;": "\xF3",
  "oacute": "\xF3",
  "oast;": "\u229B",
  "ocir;": "\u229A",
  "Ocirc;": "\xD4",
  "Ocirc": "\xD4",
  "ocirc;": "\xF4",
  "ocirc": "\xF4",
  "Ocy;": "\u041E",
  "ocy;": "\u043E",
  "odash;": "\u229D",
  "Odblac;": "\u0150",
  "odblac;": "\u0151",
  "odiv;": "\u2A38",
  "odot;": "\u2299",
  "odsold;": "\u29BC",
  "OElig;": "\u0152",
  "oelig;": "\u0153",
  "ofcir;": "\u29BF",
  "Ofr;": "\u{1D512}",
  "ofr;": "\u{1D52C}",
  "ogon;": "\u02DB",
  "Ograve;": "\xD2",
  "Ograve": "\xD2",
  "ograve;": "\xF2",
  "ograve": "\xF2",
  "ogt;": "\u29C1",
  "ohbar;": "\u29B5",
  "ohm;": "\u03A9",
  "oint;": "\u222E",
  "olarr;": "\u21BA",
  "olcir;": "\u29BE",
  "olcross;": "\u29BB",
  "oline;": "\u203E",
  "olt;": "\u29C0",
  "Omacr;": "\u014C",
  "omacr;": "\u014D",
  "Omega;": "\u03A9",
  "omega;": "\u03C9",
  "Omicron;": "\u039F",
  "omicron;": "\u03BF",
  "omid;": "\u29B6",
  "ominus;": "\u2296",
  "Oopf;": "\u{1D546}",
  "oopf;": "\u{1D560}",
  "opar;": "\u29B7",
  "OpenCurlyDoubleQuote;": "\u201C",
  "OpenCurlyQuote;": "\u2018",
  "operp;": "\u29B9",
  "oplus;": "\u2295",
  "Or;": "\u2A54",
  "or;": "\u2228",
  "orarr;": "\u21BB",
  "ord;": "\u2A5D",
  "order;": "\u2134",
  "orderof;": "\u2134",
  "ordf;": "\xAA",
  "ordf": "\xAA",
  "ordm;": "\xBA",
  "ordm": "\xBA",
  "origof;": "\u22B6",
  "oror;": "\u2A56",
  "orslope;": "\u2A57",
  "orv;": "\u2A5B",
  "oS;": "\u24C8",
  "Oscr;": "\u{1D4AA}",
  "oscr;": "\u2134",
  "Oslash;": "\xD8",
  "Oslash": "\xD8",
  "oslash;": "\xF8",
  "oslash": "\xF8",
  "osol;": "\u2298",
  "Otilde;": "\xD5",
  "Otilde": "\xD5",
  "otilde;": "\xF5",
  "otilde": "\xF5",
  "Otimes;": "\u2A37",
  "otimes;": "\u2297",
  "otimesas;": "\u2A36",
  "Ouml;": "\xD6",
  "Ouml": "\xD6",
  "ouml;": "\xF6",
  "ouml": "\xF6",
  "ovbar;": "\u233D",
  "OverBar;": "\u203E",
  "OverBrace;": "\u23DE",
  "OverBracket;": "\u23B4",
  "OverParenthesis;": "\u23DC",
  "par;": "\u2225",
  "para;": "\xB6",
  "para": "\xB6",
  "parallel;": "\u2225",
  "parsim;": "\u2AF3",
  "parsl;": "\u2AFD",
  "part;": "\u2202",
  "PartialD;": "\u2202",
  "Pcy;": "\u041F",
  "pcy;": "\u043F",
  "percnt;": "%",
  "period;": ".",
  "permil;": "\u2030",
  "perp;": "\u22A5",
  "pertenk;": "\u2031",
  "Pfr;": "\u{1D513}",
  "pfr;": "\u{1D52D}",
  "Phi;": "\u03A6",
  "phi;": "\u03C6",
  "phiv;": "\u03D5",
  "phmmat;": "\u2133",
  "phone;": "\u260E",
  "Pi;": "\u03A0",
  "pi;": "\u03C0",
  "pitchfork;": "\u22D4",
  "piv;": "\u03D6",
  "planck;": "\u210F",
  "planckh;": "\u210E",
  "plankv;": "\u210F",
  "plus;": "+",
  "plusacir;": "\u2A23",
  "plusb;": "\u229E",
  "pluscir;": "\u2A22",
  "plusdo;": "\u2214",
  "plusdu;": "\u2A25",
  "pluse;": "\u2A72",
  "PlusMinus;": "\xB1",
  "plusmn;": "\xB1",
  "plusmn": "\xB1",
  "plussim;": "\u2A26",
  "plustwo;": "\u2A27",
  "pm;": "\xB1",
  "Poincareplane;": "\u210C",
  "pointint;": "\u2A15",
  "Popf;": "\u2119",
  "popf;": "\u{1D561}",
  "pound;": "\xA3",
  "pound": "\xA3",
  "Pr;": "\u2ABB",
  "pr;": "\u227A",
  "prap;": "\u2AB7",
  "prcue;": "\u227C",
  "prE;": "\u2AB3",
  "pre;": "\u2AAF",
  "prec;": "\u227A",
  "precapprox;": "\u2AB7",
  "preccurlyeq;": "\u227C",
  "Precedes;": "\u227A",
  "PrecedesEqual;": "\u2AAF",
  "PrecedesSlantEqual;": "\u227C",
  "PrecedesTilde;": "\u227E",
  "preceq;": "\u2AAF",
  "precnapprox;": "\u2AB9",
  "precneqq;": "\u2AB5",
  "precnsim;": "\u22E8",
  "precsim;": "\u227E",
  "Prime;": "\u2033",
  "prime;": "\u2032",
  "primes;": "\u2119",
  "prnap;": "\u2AB9",
  "prnE;": "\u2AB5",
  "prnsim;": "\u22E8",
  "prod;": "\u220F",
  "Product;": "\u220F",
  "profalar;": "\u232E",
  "profline;": "\u2312",
  "profsurf;": "\u2313",
  "prop;": "\u221D",
  "Proportion;": "\u2237",
  "Proportional;": "\u221D",
  "propto;": "\u221D",
  "prsim;": "\u227E",
  "prurel;": "\u22B0",
  "Pscr;": "\u{1D4AB}",
  "pscr;": "\u{1D4C5}",
  "Psi;": "\u03A8",
  "psi;": "\u03C8",
  "puncsp;": "\u2008",
  "Qfr;": "\u{1D514}",
  "qfr;": "\u{1D52E}",
  "qint;": "\u2A0C",
  "Qopf;": "\u211A",
  "qopf;": "\u{1D562}",
  "qprime;": "\u2057",
  "Qscr;": "\u{1D4AC}",
  "qscr;": "\u{1D4C6}",
  "quaternions;": "\u210D",
  "quatint;": "\u2A16",
  "quest;": "?",
  "questeq;": "\u225F",
  "QUOT;": '"',
  "QUOT": '"',
  "quot;": '"',
  "quot": '"',
  "rAarr;": "\u21DB",
  "race;": "\u223D\u0331",
  "Racute;": "\u0154",
  "racute;": "\u0155",
  "radic;": "\u221A",
  "raemptyv;": "\u29B3",
  "Rang;": "\u27EB",
  "rang;": "\u27E9",
  "rangd;": "\u2992",
  "range;": "\u29A5",
  "rangle;": "\u27E9",
  "raquo;": "\xBB",
  "raquo": "\xBB",
  "Rarr;": "\u21A0",
  "rArr;": "\u21D2",
  "rarr;": "\u2192",
  "rarrap;": "\u2975",
  "rarrb;": "\u21E5",
  "rarrbfs;": "\u2920",
  "rarrc;": "\u2933",
  "rarrfs;": "\u291E",
  "rarrhk;": "\u21AA",
  "rarrlp;": "\u21AC",
  "rarrpl;": "\u2945",
  "rarrsim;": "\u2974",
  "Rarrtl;": "\u2916",
  "rarrtl;": "\u21A3",
  "rarrw;": "\u219D",
  "rAtail;": "\u291C",
  "ratail;": "\u291A",
  "ratio;": "\u2236",
  "rationals;": "\u211A",
  "RBarr;": "\u2910",
  "rBarr;": "\u290F",
  "rbarr;": "\u290D",
  "rbbrk;": "\u2773",
  "rbrace;": "}",
  "rbrack;": "]",
  "rbrke;": "\u298C",
  "rbrksld;": "\u298E",
  "rbrkslu;": "\u2990",
  "Rcaron;": "\u0158",
  "rcaron;": "\u0159",
  "Rcedil;": "\u0156",
  "rcedil;": "\u0157",
  "rceil;": "\u2309",
  "rcub;": "}",
  "Rcy;": "\u0420",
  "rcy;": "\u0440",
  "rdca;": "\u2937",
  "rdldhar;": "\u2969",
  "rdquo;": "\u201D",
  "rdquor;": "\u201D",
  "rdsh;": "\u21B3",
  "Re;": "\u211C",
  "real;": "\u211C",
  "realine;": "\u211B",
  "realpart;": "\u211C",
  "reals;": "\u211D",
  "rect;": "\u25AD",
  "REG;": "\xAE",
  "REG": "\xAE",
  "reg;": "\xAE",
  "reg": "\xAE",
  "ReverseElement;": "\u220B",
  "ReverseEquilibrium;": "\u21CB",
  "ReverseUpEquilibrium;": "\u296F",
  "rfisht;": "\u297D",
  "rfloor;": "\u230B",
  "Rfr;": "\u211C",
  "rfr;": "\u{1D52F}",
  "rHar;": "\u2964",
  "rhard;": "\u21C1",
  "rharu;": "\u21C0",
  "rharul;": "\u296C",
  "Rho;": "\u03A1",
  "rho;": "\u03C1",
  "rhov;": "\u03F1",
  "RightAngleBracket;": "\u27E9",
  "RightArrow;": "\u2192",
  "Rightarrow;": "\u21D2",
  "rightarrow;": "\u2192",
  "RightArrowBar;": "\u21E5",
  "RightArrowLeftArrow;": "\u21C4",
  "rightarrowtail;": "\u21A3",
  "RightCeiling;": "\u2309",
  "RightDoubleBracket;": "\u27E7",
  "RightDownTeeVector;": "\u295D",
  "RightDownVector;": "\u21C2",
  "RightDownVectorBar;": "\u2955",
  "RightFloor;": "\u230B",
  "rightharpoondown;": "\u21C1",
  "rightharpoonup;": "\u21C0",
  "rightleftarrows;": "\u21C4",
  "rightleftharpoons;": "\u21CC",
  "rightrightarrows;": "\u21C9",
  "rightsquigarrow;": "\u219D",
  "RightTee;": "\u22A2",
  "RightTeeArrow;": "\u21A6",
  "RightTeeVector;": "\u295B",
  "rightthreetimes;": "\u22CC",
  "RightTriangle;": "\u22B3",
  "RightTriangleBar;": "\u29D0",
  "RightTriangleEqual;": "\u22B5",
  "RightUpDownVector;": "\u294F",
  "RightUpTeeVector;": "\u295C",
  "RightUpVector;": "\u21BE",
  "RightUpVectorBar;": "\u2954",
  "RightVector;": "\u21C0",
  "RightVectorBar;": "\u2953",
  "ring;": "\u02DA",
  "risingdotseq;": "\u2253",
  "rlarr;": "\u21C4",
  "rlhar;": "\u21CC",
  "rlm;": "\u200F",
  "rmoust;": "\u23B1",
  "rmoustache;": "\u23B1",
  "rnmid;": "\u2AEE",
  "roang;": "\u27ED",
  "roarr;": "\u21FE",
  "robrk;": "\u27E7",
  "ropar;": "\u2986",
  "Ropf;": "\u211D",
  "ropf;": "\u{1D563}",
  "roplus;": "\u2A2E",
  "rotimes;": "\u2A35",
  "RoundImplies;": "\u2970",
  "rpar;": ")",
  "rpargt;": "\u2994",
  "rppolint;": "\u2A12",
  "rrarr;": "\u21C9",
  "Rrightarrow;": "\u21DB",
  "rsaquo;": "\u203A",
  "Rscr;": "\u211B",
  "rscr;": "\u{1D4C7}",
  "Rsh;": "\u21B1",
  "rsh;": "\u21B1",
  "rsqb;": "]",
  "rsquo;": "\u2019",
  "rsquor;": "\u2019",
  "rthree;": "\u22CC",
  "rtimes;": "\u22CA",
  "rtri;": "\u25B9",
  "rtrie;": "\u22B5",
  "rtrif;": "\u25B8",
  "rtriltri;": "\u29CE",
  "RuleDelayed;": "\u29F4",
  "ruluhar;": "\u2968",
  "rx;": "\u211E",
  "Sacute;": "\u015A",
  "sacute;": "\u015B",
  "sbquo;": "\u201A",
  "Sc;": "\u2ABC",
  "sc;": "\u227B",
  "scap;": "\u2AB8",
  "Scaron;": "\u0160",
  "scaron;": "\u0161",
  "sccue;": "\u227D",
  "scE;": "\u2AB4",
  "sce;": "\u2AB0",
  "Scedil;": "\u015E",
  "scedil;": "\u015F",
  "Scirc;": "\u015C",
  "scirc;": "\u015D",
  "scnap;": "\u2ABA",
  "scnE;": "\u2AB6",
  "scnsim;": "\u22E9",
  "scpolint;": "\u2A13",
  "scsim;": "\u227F",
  "Scy;": "\u0421",
  "scy;": "\u0441",
  "sdot;": "\u22C5",
  "sdotb;": "\u22A1",
  "sdote;": "\u2A66",
  "searhk;": "\u2925",
  "seArr;": "\u21D8",
  "searr;": "\u2198",
  "searrow;": "\u2198",
  "sect;": "\xA7",
  "sect": "\xA7",
  "semi;": ";",
  "seswar;": "\u2929",
  "setminus;": "\u2216",
  "setmn;": "\u2216",
  "sext;": "\u2736",
  "Sfr;": "\u{1D516}",
  "sfr;": "\u{1D530}",
  "sfrown;": "\u2322",
  "sharp;": "\u266F",
  "SHCHcy;": "\u0429",
  "shchcy;": "\u0449",
  "SHcy;": "\u0428",
  "shcy;": "\u0448",
  "ShortDownArrow;": "\u2193",
  "ShortLeftArrow;": "\u2190",
  "shortmid;": "\u2223",
  "shortparallel;": "\u2225",
  "ShortRightArrow;": "\u2192",
  "ShortUpArrow;": "\u2191",
  "shy;": "\xAD",
  "shy": "\xAD",
  "Sigma;": "\u03A3",
  "sigma;": "\u03C3",
  "sigmaf;": "\u03C2",
  "sigmav;": "\u03C2",
  "sim;": "\u223C",
  "simdot;": "\u2A6A",
  "sime;": "\u2243",
  "simeq;": "\u2243",
  "simg;": "\u2A9E",
  "simgE;": "\u2AA0",
  "siml;": "\u2A9D",
  "simlE;": "\u2A9F",
  "simne;": "\u2246",
  "simplus;": "\u2A24",
  "simrarr;": "\u2972",
  "slarr;": "\u2190",
  "SmallCircle;": "\u2218",
  "smallsetminus;": "\u2216",
  "smashp;": "\u2A33",
  "smeparsl;": "\u29E4",
  "smid;": "\u2223",
  "smile;": "\u2323",
  "smt;": "\u2AAA",
  "smte;": "\u2AAC",
  "smtes;": "\u2AAC\uFE00",
  "SOFTcy;": "\u042C",
  "softcy;": "\u044C",
  "sol;": "/",
  "solb;": "\u29C4",
  "solbar;": "\u233F",
  "Sopf;": "\u{1D54A}",
  "sopf;": "\u{1D564}",
  "spades;": "\u2660",
  "spadesuit;": "\u2660",
  "spar;": "\u2225",
  "sqcap;": "\u2293",
  "sqcaps;": "\u2293\uFE00",
  "sqcup;": "\u2294",
  "sqcups;": "\u2294\uFE00",
  "Sqrt;": "\u221A",
  "sqsub;": "\u228F",
  "sqsube;": "\u2291",
  "sqsubset;": "\u228F",
  "sqsubseteq;": "\u2291",
  "sqsup;": "\u2290",
  "sqsupe;": "\u2292",
  "sqsupset;": "\u2290",
  "sqsupseteq;": "\u2292",
  "squ;": "\u25A1",
  "Square;": "\u25A1",
  "square;": "\u25A1",
  "SquareIntersection;": "\u2293",
  "SquareSubset;": "\u228F",
  "SquareSubsetEqual;": "\u2291",
  "SquareSuperset;": "\u2290",
  "SquareSupersetEqual;": "\u2292",
  "SquareUnion;": "\u2294",
  "squarf;": "\u25AA",
  "squf;": "\u25AA",
  "srarr;": "\u2192",
  "Sscr;": "\u{1D4AE}",
  "sscr;": "\u{1D4C8}",
  "ssetmn;": "\u2216",
  "ssmile;": "\u2323",
  "sstarf;": "\u22C6",
  "Star;": "\u22C6",
  "star;": "\u2606",
  "starf;": "\u2605",
  "straightepsilon;": "\u03F5",
  "straightphi;": "\u03D5",
  "strns;": "\xAF",
  "Sub;": "\u22D0",
  "sub;": "\u2282",
  "subdot;": "\u2ABD",
  "subE;": "\u2AC5",
  "sube;": "\u2286",
  "subedot;": "\u2AC3",
  "submult;": "\u2AC1",
  "subnE;": "\u2ACB",
  "subne;": "\u228A",
  "subplus;": "\u2ABF",
  "subrarr;": "\u2979",
  "Subset;": "\u22D0",
  "subset;": "\u2282",
  "subseteq;": "\u2286",
  "subseteqq;": "\u2AC5",
  "SubsetEqual;": "\u2286",
  "subsetneq;": "\u228A",
  "subsetneqq;": "\u2ACB",
  "subsim;": "\u2AC7",
  "subsub;": "\u2AD5",
  "subsup;": "\u2AD3",
  "succ;": "\u227B",
  "succapprox;": "\u2AB8",
  "succcurlyeq;": "\u227D",
  "Succeeds;": "\u227B",
  "SucceedsEqual;": "\u2AB0",
  "SucceedsSlantEqual;": "\u227D",
  "SucceedsTilde;": "\u227F",
  "succeq;": "\u2AB0",
  "succnapprox;": "\u2ABA",
  "succneqq;": "\u2AB6",
  "succnsim;": "\u22E9",
  "succsim;": "\u227F",
  "SuchThat;": "\u220B",
  "Sum;": "\u2211",
  "sum;": "\u2211",
  "sung;": "\u266A",
  "Sup;": "\u22D1",
  "sup;": "\u2283",
  "sup1;": "\xB9",
  "sup1": "\xB9",
  "sup2;": "\xB2",
  "sup2": "\xB2",
  "sup3;": "\xB3",
  "sup3": "\xB3",
  "supdot;": "\u2ABE",
  "supdsub;": "\u2AD8",
  "supE;": "\u2AC6",
  "supe;": "\u2287",
  "supedot;": "\u2AC4",
  "Superset;": "\u2283",
  "SupersetEqual;": "\u2287",
  "suphsol;": "\u27C9",
  "suphsub;": "\u2AD7",
  "suplarr;": "\u297B",
  "supmult;": "\u2AC2",
  "supnE;": "\u2ACC",
  "supne;": "\u228B",
  "supplus;": "\u2AC0",
  "Supset;": "\u22D1",
  "supset;": "\u2283",
  "supseteq;": "\u2287",
  "supseteqq;": "\u2AC6",
  "supsetneq;": "\u228B",
  "supsetneqq;": "\u2ACC",
  "supsim;": "\u2AC8",
  "supsub;": "\u2AD4",
  "supsup;": "\u2AD6",
  "swarhk;": "\u2926",
  "swArr;": "\u21D9",
  "swarr;": "\u2199",
  "swarrow;": "\u2199",
  "swnwar;": "\u292A",
  "szlig;": "\xDF",
  "szlig": "\xDF",
  "Tab;": "	",
  "target;": "\u2316",
  "Tau;": "\u03A4",
  "tau;": "\u03C4",
  "tbrk;": "\u23B4",
  "Tcaron;": "\u0164",
  "tcaron;": "\u0165",
  "Tcedil;": "\u0162",
  "tcedil;": "\u0163",
  "Tcy;": "\u0422",
  "tcy;": "\u0442",
  "tdot;": "\u20DB",
  "telrec;": "\u2315",
  "Tfr;": "\u{1D517}",
  "tfr;": "\u{1D531}",
  "there4;": "\u2234",
  "Therefore;": "\u2234",
  "therefore;": "\u2234",
  "Theta;": "\u0398",
  "theta;": "\u03B8",
  "thetasym;": "\u03D1",
  "thetav;": "\u03D1",
  "thickapprox;": "\u2248",
  "thicksim;": "\u223C",
  "ThickSpace;": "\u205F\u200A",
  "thinsp;": "\u2009",
  "ThinSpace;": "\u2009",
  "thkap;": "\u2248",
  "thksim;": "\u223C",
  "THORN;": "\xDE",
  "THORN": "\xDE",
  "thorn;": "\xFE",
  "thorn": "\xFE",
  "Tilde;": "\u223C",
  "tilde;": "\u02DC",
  "TildeEqual;": "\u2243",
  "TildeFullEqual;": "\u2245",
  "TildeTilde;": "\u2248",
  "times;": "\xD7",
  "times": "\xD7",
  "timesb;": "\u22A0",
  "timesbar;": "\u2A31",
  "timesd;": "\u2A30",
  "tint;": "\u222D",
  "toea;": "\u2928",
  "top;": "\u22A4",
  "topbot;": "\u2336",
  "topcir;": "\u2AF1",
  "Topf;": "\u{1D54B}",
  "topf;": "\u{1D565}",
  "topfork;": "\u2ADA",
  "tosa;": "\u2929",
  "tprime;": "\u2034",
  "TRADE;": "\u2122",
  "trade;": "\u2122",
  "triangle;": "\u25B5",
  "triangledown;": "\u25BF",
  "triangleleft;": "\u25C3",
  "trianglelefteq;": "\u22B4",
  "triangleq;": "\u225C",
  "triangleright;": "\u25B9",
  "trianglerighteq;": "\u22B5",
  "tridot;": "\u25EC",
  "trie;": "\u225C",
  "triminus;": "\u2A3A",
  "TripleDot;": "\u20DB",
  "triplus;": "\u2A39",
  "trisb;": "\u29CD",
  "tritime;": "\u2A3B",
  "trpezium;": "\u23E2",
  "Tscr;": "\u{1D4AF}",
  "tscr;": "\u{1D4C9}",
  "TScy;": "\u0426",
  "tscy;": "\u0446",
  "TSHcy;": "\u040B",
  "tshcy;": "\u045B",
  "Tstrok;": "\u0166",
  "tstrok;": "\u0167",
  "twixt;": "\u226C",
  "twoheadleftarrow;": "\u219E",
  "twoheadrightarrow;": "\u21A0",
  "Uacute;": "\xDA",
  "Uacute": "\xDA",
  "uacute;": "\xFA",
  "uacute": "\xFA",
  "Uarr;": "\u219F",
  "uArr;": "\u21D1",
  "uarr;": "\u2191",
  "Uarrocir;": "\u2949",
  "Ubrcy;": "\u040E",
  "ubrcy;": "\u045E",
  "Ubreve;": "\u016C",
  "ubreve;": "\u016D",
  "Ucirc;": "\xDB",
  "Ucirc": "\xDB",
  "ucirc;": "\xFB",
  "ucirc": "\xFB",
  "Ucy;": "\u0423",
  "ucy;": "\u0443",
  "udarr;": "\u21C5",
  "Udblac;": "\u0170",
  "udblac;": "\u0171",
  "udhar;": "\u296E",
  "ufisht;": "\u297E",
  "Ufr;": "\u{1D518}",
  "ufr;": "\u{1D532}",
  "Ugrave;": "\xD9",
  "Ugrave": "\xD9",
  "ugrave;": "\xF9",
  "ugrave": "\xF9",
  "uHar;": "\u2963",
  "uharl;": "\u21BF",
  "uharr;": "\u21BE",
  "uhblk;": "\u2580",
  "ulcorn;": "\u231C",
  "ulcorner;": "\u231C",
  "ulcrop;": "\u230F",
  "ultri;": "\u25F8",
  "Umacr;": "\u016A",
  "umacr;": "\u016B",
  "uml;": "\xA8",
  "uml": "\xA8",
  "UnderBar;": "_",
  "UnderBrace;": "\u23DF",
  "UnderBracket;": "\u23B5",
  "UnderParenthesis;": "\u23DD",
  "Union;": "\u22C3",
  "UnionPlus;": "\u228E",
  "Uogon;": "\u0172",
  "uogon;": "\u0173",
  "Uopf;": "\u{1D54C}",
  "uopf;": "\u{1D566}",
  "UpArrow;": "\u2191",
  "Uparrow;": "\u21D1",
  "uparrow;": "\u2191",
  "UpArrowBar;": "\u2912",
  "UpArrowDownArrow;": "\u21C5",
  "UpDownArrow;": "\u2195",
  "Updownarrow;": "\u21D5",
  "updownarrow;": "\u2195",
  "UpEquilibrium;": "\u296E",
  "upharpoonleft;": "\u21BF",
  "upharpoonright;": "\u21BE",
  "uplus;": "\u228E",
  "UpperLeftArrow;": "\u2196",
  "UpperRightArrow;": "\u2197",
  "Upsi;": "\u03D2",
  "upsi;": "\u03C5",
  "upsih;": "\u03D2",
  "Upsilon;": "\u03A5",
  "upsilon;": "\u03C5",
  "UpTee;": "\u22A5",
  "UpTeeArrow;": "\u21A5",
  "upuparrows;": "\u21C8",
  "urcorn;": "\u231D",
  "urcorner;": "\u231D",
  "urcrop;": "\u230E",
  "Uring;": "\u016E",
  "uring;": "\u016F",
  "urtri;": "\u25F9",
  "Uscr;": "\u{1D4B0}",
  "uscr;": "\u{1D4CA}",
  "utdot;": "\u22F0",
  "Utilde;": "\u0168",
  "utilde;": "\u0169",
  "utri;": "\u25B5",
  "utrif;": "\u25B4",
  "uuarr;": "\u21C8",
  "Uuml;": "\xDC",
  "Uuml": "\xDC",
  "uuml;": "\xFC",
  "uuml": "\xFC",
  "uwangle;": "\u29A7",
  "vangrt;": "\u299C",
  "varepsilon;": "\u03F5",
  "varkappa;": "\u03F0",
  "varnothing;": "\u2205",
  "varphi;": "\u03D5",
  "varpi;": "\u03D6",
  "varpropto;": "\u221D",
  "vArr;": "\u21D5",
  "varr;": "\u2195",
  "varrho;": "\u03F1",
  "varsigma;": "\u03C2",
  "varsubsetneq;": "\u228A\uFE00",
  "varsubsetneqq;": "\u2ACB\uFE00",
  "varsupsetneq;": "\u228B\uFE00",
  "varsupsetneqq;": "\u2ACC\uFE00",
  "vartheta;": "\u03D1",
  "vartriangleleft;": "\u22B2",
  "vartriangleright;": "\u22B3",
  "Vbar;": "\u2AEB",
  "vBar;": "\u2AE8",
  "vBarv;": "\u2AE9",
  "Vcy;": "\u0412",
  "vcy;": "\u0432",
  "VDash;": "\u22AB",
  "Vdash;": "\u22A9",
  "vDash;": "\u22A8",
  "vdash;": "\u22A2",
  "Vdashl;": "\u2AE6",
  "Vee;": "\u22C1",
  "vee;": "\u2228",
  "veebar;": "\u22BB",
  "veeeq;": "\u225A",
  "vellip;": "\u22EE",
  "Verbar;": "\u2016",
  "verbar;": "|",
  "Vert;": "\u2016",
  "vert;": "|",
  "VerticalBar;": "\u2223",
  "VerticalLine;": "|",
  "VerticalSeparator;": "\u2758",
  "VerticalTilde;": "\u2240",
  "VeryThinSpace;": "\u200A",
  "Vfr;": "\u{1D519}",
  "vfr;": "\u{1D533}",
  "vltri;": "\u22B2",
  "vnsub;": "\u2282\u20D2",
  "vnsup;": "\u2283\u20D2",
  "Vopf;": "\u{1D54D}",
  "vopf;": "\u{1D567}",
  "vprop;": "\u221D",
  "vrtri;": "\u22B3",
  "Vscr;": "\u{1D4B1}",
  "vscr;": "\u{1D4CB}",
  "vsubnE;": "\u2ACB\uFE00",
  "vsubne;": "\u228A\uFE00",
  "vsupnE;": "\u2ACC\uFE00",
  "vsupne;": "\u228B\uFE00",
  "Vvdash;": "\u22AA",
  "vzigzag;": "\u299A",
  "Wcirc;": "\u0174",
  "wcirc;": "\u0175",
  "wedbar;": "\u2A5F",
  "Wedge;": "\u22C0",
  "wedge;": "\u2227",
  "wedgeq;": "\u2259",
  "weierp;": "\u2118",
  "Wfr;": "\u{1D51A}",
  "wfr;": "\u{1D534}",
  "Wopf;": "\u{1D54E}",
  "wopf;": "\u{1D568}",
  "wp;": "\u2118",
  "wr;": "\u2240",
  "wreath;": "\u2240",
  "Wscr;": "\u{1D4B2}",
  "wscr;": "\u{1D4CC}",
  "xcap;": "\u22C2",
  "xcirc;": "\u25EF",
  "xcup;": "\u22C3",
  "xdtri;": "\u25BD",
  "Xfr;": "\u{1D51B}",
  "xfr;": "\u{1D535}",
  "xhArr;": "\u27FA",
  "xharr;": "\u27F7",
  "Xi;": "\u039E",
  "xi;": "\u03BE",
  "xlArr;": "\u27F8",
  "xlarr;": "\u27F5",
  "xmap;": "\u27FC",
  "xnis;": "\u22FB",
  "xodot;": "\u2A00",
  "Xopf;": "\u{1D54F}",
  "xopf;": "\u{1D569}",
  "xoplus;": "\u2A01",
  "xotime;": "\u2A02",
  "xrArr;": "\u27F9",
  "xrarr;": "\u27F6",
  "Xscr;": "\u{1D4B3}",
  "xscr;": "\u{1D4CD}",
  "xsqcup;": "\u2A06",
  "xuplus;": "\u2A04",
  "xutri;": "\u25B3",
  "xvee;": "\u22C1",
  "xwedge;": "\u22C0",
  "Yacute;": "\xDD",
  "Yacute": "\xDD",
  "yacute;": "\xFD",
  "yacute": "\xFD",
  "YAcy;": "\u042F",
  "yacy;": "\u044F",
  "Ycirc;": "\u0176",
  "ycirc;": "\u0177",
  "Ycy;": "\u042B",
  "ycy;": "\u044B",
  "yen;": "\xA5",
  "yen": "\xA5",
  "Yfr;": "\u{1D51C}",
  "yfr;": "\u{1D536}",
  "YIcy;": "\u0407",
  "yicy;": "\u0457",
  "Yopf;": "\u{1D550}",
  "yopf;": "\u{1D56A}",
  "Yscr;": "\u{1D4B4}",
  "yscr;": "\u{1D4CE}",
  "YUcy;": "\u042E",
  "yucy;": "\u044E",
  "Yuml;": "\u0178",
  "yuml;": "\xFF",
  "yuml": "\xFF",
  "Zacute;": "\u0179",
  "zacute;": "\u017A",
  "Zcaron;": "\u017D",
  "zcaron;": "\u017E",
  "Zcy;": "\u0417",
  "zcy;": "\u0437",
  "Zdot;": "\u017B",
  "zdot;": "\u017C",
  "zeetrf;": "\u2128",
  "ZeroWidthSpace;": "\u200B",
  "Zeta;": "\u0396",
  "zeta;": "\u03B6",
  "Zfr;": "\u2128",
  "zfr;": "\u{1D537}",
  "ZHcy;": "\u0416",
  "zhcy;": "\u0436",
  "zigrarr;": "\u21DD",
  "Zopf;": "\u2124",
  "zopf;": "\u{1D56B}",
  "Zscr;": "\u{1D4B5}",
  "zscr;": "\u{1D4CF}",
  "zwj;": "\u200D",
  "zwnj;": "\u200C"
};

// node_modules/vscode-html-languageservice/lib/esm/utils/strings.js
function startsWith(haystack, needle) {
  if (haystack.length < needle.length) {
    return false;
  }
  for (let i = 0; i < needle.length; i++) {
    if (haystack[i] !== needle[i]) {
      return false;
    }
  }
  return true;
}
function endsWith(haystack, needle) {
  const diff = haystack.length - needle.length;
  if (diff > 0) {
    return haystack.lastIndexOf(needle) === diff;
  } else if (diff === 0) {
    return haystack === needle;
  } else {
    return false;
  }
}
function repeat(value, count) {
  let s = "";
  while (count > 0) {
    if ((count & 1) === 1) {
      s += value;
    }
    value += value;
    count = count >>> 1;
  }
  return s;
}
var _a = "a".charCodeAt(0);
var _z = "z".charCodeAt(0);
var _A = "A".charCodeAt(0);
var _Z = "Z".charCodeAt(0);
var _0 = "0".charCodeAt(0);
var _9 = "9".charCodeAt(0);
function isLetterOrDigit(text, index) {
  const c = text.charCodeAt(index);
  return _a <= c && c <= _z || _A <= c && c <= _Z || _0 <= c && c <= _9;
}

// node_modules/vscode-html-languageservice/lib/esm/utils/object.js
function isDefined(obj) {
  return typeof obj !== "undefined";
}

// node_modules/vscode-html-languageservice/lib/esm/utils/markup.js
function normalizeMarkupContent(input) {
  if (!input) {
    return void 0;
  }
  if (typeof input === "string") {
    return {
      kind: "markdown",
      value: input
    };
  }
  return {
    kind: "markdown",
    value: input.value
  };
}

// node_modules/vscode-html-languageservice/lib/esm/languageFacts/dataProvider.js
var HTMLDataProvider = class {
  isApplicable() {
    return true;
  }
  /**
   * Currently, unversioned data uses the V1 implementation
   * In the future when the provider handles multiple versions of HTML custom data,
   * use the latest implementation for unversioned data
   */
  constructor(id, customData) {
    this.id = id;
    this._tags = [];
    this._tagMap = {};
    this._valueSetMap = {};
    this._tags = customData.tags || [];
    this._globalAttributes = customData.globalAttributes || [];
    this._tags.forEach((t2) => {
      this._tagMap[t2.name.toLowerCase()] = t2;
    });
    if (customData.valueSets) {
      customData.valueSets.forEach((vs) => {
        this._valueSetMap[vs.name] = vs.values;
      });
    }
  }
  getId() {
    return this.id;
  }
  provideTags() {
    return this._tags;
  }
  provideAttributes(tag) {
    const attributes = [];
    const processAttribute = (a) => {
      attributes.push(a);
    };
    const tagEntry = this._tagMap[tag.toLowerCase()];
    if (tagEntry) {
      tagEntry.attributes.forEach(processAttribute);
    }
    this._globalAttributes.forEach(processAttribute);
    return attributes;
  }
  provideValues(tag, attribute) {
    const values = [];
    attribute = attribute.toLowerCase();
    const processAttributes = (attributes) => {
      attributes.forEach((a) => {
        if (a.name.toLowerCase() === attribute) {
          if (a.values) {
            a.values.forEach((v) => {
              values.push(v);
            });
          }
          if (a.valueSet) {
            if (this._valueSetMap[a.valueSet]) {
              this._valueSetMap[a.valueSet].forEach((v) => {
                values.push(v);
              });
            }
          }
        }
      });
    };
    const tagEntry = this._tagMap[tag.toLowerCase()];
    if (tagEntry) {
      processAttributes(tagEntry.attributes);
    }
    processAttributes(this._globalAttributes);
    return values;
  }
};
function generateDocumentation(item, settings = {}, doesSupportMarkdown) {
  const result = {
    kind: doesSupportMarkdown ? "markdown" : "plaintext",
    value: ""
  };
  if (item.description && settings.documentation !== false) {
    const normalizedDescription = normalizeMarkupContent(item.description);
    if (normalizedDescription) {
      result.value += normalizedDescription.value;
    }
  }
  if (item.references && item.references.length > 0 && settings.references !== false) {
    if (result.value.length) {
      result.value += `

`;
    }
    if (doesSupportMarkdown) {
      result.value += item.references.map((r) => {
        return `[${r.name}](${r.url})`;
      }).join(" | ");
    } else {
      result.value += item.references.map((r) => {
        return `${r.name}: ${r.url}`;
      }).join("\n");
    }
  }
  if (result.value === "") {
    return void 0;
  }
  return result;
}

// node_modules/vscode-html-languageservice/lib/esm/services/pathCompletion.js
var PathCompletionParticipant = class {
  constructor(dataManager, readDirectory) {
    this.dataManager = dataManager;
    this.readDirectory = readDirectory;
    this.atributeCompletions = [];
  }
  onHtmlAttributeValue(context) {
    if (this.dataManager.isPathAttribute(context.tag, context.attribute)) {
      this.atributeCompletions.push(context);
    }
  }
  async computeCompletions(document, documentContext) {
    const result = { items: [], isIncomplete: false };
    for (const attributeCompletion of this.atributeCompletions) {
      const fullValue = stripQuotes(document.getText(attributeCompletion.range));
      if (isCompletablePath(fullValue)) {
        if (fullValue === "." || fullValue === "..") {
          result.isIncomplete = true;
        } else {
          const replaceRange = pathToReplaceRange(attributeCompletion.value, fullValue, attributeCompletion.range);
          const suggestions = await this.providePathSuggestions(attributeCompletion.value, replaceRange, document, documentContext);
          for (const item of suggestions) {
            result.items.push(item);
          }
        }
      }
    }
    return result;
  }
  async providePathSuggestions(valueBeforeCursor, replaceRange, document, documentContext) {
    const valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf("/") + 1);
    let parentDir = documentContext.resolveReference(valueBeforeLastSlash || ".", document.uri);
    if (parentDir) {
      try {
        const result = [];
        const infos = await this.readDirectory(parentDir);
        for (const [name, type] of infos) {
          if (name.charCodeAt(0) !== CharCode_dot) {
            result.push(createCompletionItem(name, type === FileType.Directory, replaceRange));
          }
        }
        return result;
      } catch (e) {
      }
    }
    return [];
  }
};
var CharCode_dot = ".".charCodeAt(0);
function stripQuotes(fullValue) {
  if (startsWith(fullValue, `'`) || startsWith(fullValue, `"`)) {
    return fullValue.slice(1, -1);
  } else {
    return fullValue;
  }
}
function isCompletablePath(value) {
  if (startsWith(value, "http") || startsWith(value, "https") || startsWith(value, "//")) {
    return false;
  }
  return true;
}
function pathToReplaceRange(valueBeforeCursor, fullValue, range) {
  let replaceRange;
  const lastIndexOfSlash = valueBeforeCursor.lastIndexOf("/");
  if (lastIndexOfSlash === -1) {
    replaceRange = shiftRange(range, 1, -1);
  } else {
    const valueAfterLastSlash = fullValue.slice(lastIndexOfSlash + 1);
    const startPos = shiftPosition(range.end, -1 - valueAfterLastSlash.length);
    const whitespaceIndex = valueAfterLastSlash.indexOf(" ");
    let endPos;
    if (whitespaceIndex !== -1) {
      endPos = shiftPosition(startPos, whitespaceIndex);
    } else {
      endPos = shiftPosition(range.end, -1);
    }
    replaceRange = Range.create(startPos, endPos);
  }
  return replaceRange;
}
function createCompletionItem(p, isDir, replaceRange) {
  if (isDir) {
    p = p + "/";
    return {
      label: p,
      kind: CompletionItemKind.Folder,
      textEdit: TextEdit.replace(replaceRange, p),
      command: {
        title: "Suggest",
        command: "editor.action.triggerSuggest"
      }
    };
  } else {
    return {
      label: p,
      kind: CompletionItemKind.File,
      textEdit: TextEdit.replace(replaceRange, p)
    };
  }
}
function shiftPosition(pos, offset) {
  return Position.create(pos.line, pos.character + offset);
}
function shiftRange(range, startOffset, endOffset) {
  const start = shiftPosition(range.start, startOffset);
  const end = shiftPosition(range.end, endOffset);
  return Range.create(start, end);
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlCompletion.js
var HTMLCompletion = class {
  constructor(lsOptions, dataManager) {
    this.lsOptions = lsOptions;
    this.dataManager = dataManager;
    this.completionParticipants = [];
  }
  setCompletionParticipants(registeredCompletionParticipants) {
    this.completionParticipants = registeredCompletionParticipants || [];
  }
  async doComplete2(document, position, htmlDocument, documentContext, settings) {
    if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) {
      return this.doComplete(document, position, htmlDocument, settings);
    }
    const participant = new PathCompletionParticipant(this.dataManager, this.lsOptions.fileSystemProvider.readDirectory);
    const contributedParticipants = this.completionParticipants;
    this.completionParticipants = [participant].concat(contributedParticipants);
    const result = this.doComplete(document, position, htmlDocument, settings);
    try {
      const pathCompletionResult = await participant.computeCompletions(document, documentContext);
      return {
        isIncomplete: result.isIncomplete || pathCompletionResult.isIncomplete,
        items: pathCompletionResult.items.concat(result.items)
      };
    } finally {
      this.completionParticipants = contributedParticipants;
    }
  }
  doComplete(document, position, htmlDocument, settings) {
    const result = this._doComplete(document, position, htmlDocument, settings);
    return this.convertCompletionList(result);
  }
  _doComplete(document, position, htmlDocument, settings) {
    const result = {
      isIncomplete: false,
      items: []
    };
    const completionParticipants = this.completionParticipants;
    const dataProviders = this.dataManager.getDataProviders().filter((p) => p.isApplicable(document.languageId) && (!settings || settings[p.getId()] !== false));
    const voidElements = this.dataManager.getVoidElements(dataProviders);
    const doesSupportMarkdown = this.doesSupportMarkdown();
    const text = document.getText();
    const offset = document.offsetAt(position);
    const node = htmlDocument.findNodeBefore(offset);
    if (!node) {
      return result;
    }
    const scanner = createScanner(text, node.start);
    let currentTag = "";
    let currentAttributeName;
    function getReplaceRange(replaceStart, replaceEnd = offset) {
      if (replaceStart > offset) {
        replaceStart = offset;
      }
      return { start: document.positionAt(replaceStart), end: document.positionAt(replaceEnd) };
    }
    function collectOpenTagSuggestions(afterOpenBracket, tagNameEnd) {
      const range = getReplaceRange(afterOpenBracket, tagNameEnd);
      dataProviders.forEach((provider) => {
        provider.provideTags().forEach((tag) => {
          result.items.push({
            label: tag.name,
            kind: CompletionItemKind.Property,
            documentation: generateDocumentation(tag, void 0, doesSupportMarkdown),
            textEdit: TextEdit.replace(range, tag.name),
            insertTextFormat: InsertTextFormat.PlainText
          });
        });
      });
      return result;
    }
    function getLineIndent(offset2) {
      let start = offset2;
      while (start > 0) {
        const ch = text.charAt(start - 1);
        if ("\n\r".indexOf(ch) >= 0) {
          return text.substring(start, offset2);
        }
        if (!isWhiteSpace(ch)) {
          return null;
        }
        start--;
      }
      return text.substring(0, offset2);
    }
    function collectCloseTagSuggestions(afterOpenBracket, inOpenTag, tagNameEnd = offset) {
      const range = getReplaceRange(afterOpenBracket, tagNameEnd);
      const closeTag = isFollowedBy(text, tagNameEnd, ScannerState.WithinEndTag, TokenType.EndTagClose) ? "" : ">";
      let curr = node;
      if (inOpenTag) {
        curr = curr.parent;
      }
      while (curr) {
        const tag = curr.tag;
        if (tag && (!curr.closed || curr.endTagStart && curr.endTagStart > offset)) {
          const item = {
            label: "/" + tag,
            kind: CompletionItemKind.Property,
            filterText: "/" + tag,
            textEdit: TextEdit.replace(range, "/" + tag + closeTag),
            insertTextFormat: InsertTextFormat.PlainText
          };
          const startIndent = getLineIndent(curr.start);
          const endIndent = getLineIndent(afterOpenBracket - 1);
          if (startIndent !== null && endIndent !== null && startIndent !== endIndent) {
            const insertText = startIndent + "</" + tag + closeTag;
            item.textEdit = TextEdit.replace(getReplaceRange(afterOpenBracket - 1 - endIndent.length), insertText);
            item.filterText = endIndent + "</" + tag;
          }
          result.items.push(item);
          return result;
        }
        curr = curr.parent;
      }
      if (inOpenTag) {
        return result;
      }
      dataProviders.forEach((provider) => {
        provider.provideTags().forEach((tag) => {
          result.items.push({
            label: "/" + tag.name,
            kind: CompletionItemKind.Property,
            documentation: generateDocumentation(tag, void 0, doesSupportMarkdown),
            filterText: "/" + tag.name + closeTag,
            textEdit: TextEdit.replace(range, "/" + tag.name + closeTag),
            insertTextFormat: InsertTextFormat.PlainText
          });
        });
      });
      return result;
    }
    const collectAutoCloseTagSuggestion = (tagCloseEnd, tag) => {
      if (settings && settings.hideAutoCompleteProposals) {
        return result;
      }
      if (!this.dataManager.isVoidElement(tag, voidElements)) {
        const pos = document.positionAt(tagCloseEnd);
        result.items.push({
          label: "</" + tag + ">",
          kind: CompletionItemKind.Property,
          filterText: "</" + tag + ">",
          textEdit: TextEdit.insert(pos, "$0</" + tag + ">"),
          insertTextFormat: InsertTextFormat.Snippet
        });
      }
      return result;
    };
    function collectTagSuggestions(tagStart, tagEnd) {
      collectOpenTagSuggestions(tagStart, tagEnd);
      collectCloseTagSuggestions(tagStart, true, tagEnd);
      return result;
    }
    function getExistingAttributes() {
      const existingAttributes = /* @__PURE__ */ Object.create(null);
      node.attributeNames.forEach((attribute) => {
        existingAttributes[attribute] = true;
      });
      return existingAttributes;
    }
    function collectAttributeNameSuggestions(nameStart, nameEnd = offset) {
      let replaceEnd = offset;
      while (replaceEnd < nameEnd && text[replaceEnd] !== "<") {
        replaceEnd++;
      }
      const currentAttribute = text.substring(nameStart, nameEnd);
      const range = getReplaceRange(nameStart, replaceEnd);
      let value = "";
      if (!isFollowedBy(text, nameEnd, ScannerState.AfterAttributeName, TokenType.DelimiterAssign)) {
        const defaultValue = settings?.attributeDefaultValue ?? "doublequotes";
        if (defaultValue === "empty") {
          value = "=$1";
        } else if (defaultValue === "singlequotes") {
          value = "='$1'";
        } else {
          value = '="$1"';
        }
      }
      const seenAttributes = getExistingAttributes();
      seenAttributes[currentAttribute] = false;
      dataProviders.forEach((provider) => {
        provider.provideAttributes(currentTag).forEach((attr) => {
          if (seenAttributes[attr.name]) {
            return;
          }
          seenAttributes[attr.name] = true;
          let codeSnippet = attr.name;
          let command;
          if (attr.valueSet !== "v" && value.length) {
            codeSnippet = codeSnippet + value;
            if (attr.valueSet || attr.name === "style") {
              command = {
                title: "Suggest",
                command: "editor.action.triggerSuggest"
              };
            }
          }
          result.items.push({
            label: attr.name,
            kind: attr.valueSet === "handler" ? CompletionItemKind.Function : CompletionItemKind.Value,
            documentation: generateDocumentation(attr, void 0, doesSupportMarkdown),
            textEdit: TextEdit.replace(range, codeSnippet),
            insertTextFormat: InsertTextFormat.Snippet,
            command
          });
        });
      });
      collectDataAttributesSuggestions(range, seenAttributes);
      return result;
    }
    function collectDataAttributesSuggestions(range, seenAttributes) {
      const dataAttr = "data-";
      const dataAttributes = {};
      dataAttributes[dataAttr] = `${dataAttr}$1="$2"`;
      function addNodeDataAttributes(node2) {
        node2.attributeNames.forEach((attr) => {
          if (startsWith(attr, dataAttr) && !dataAttributes[attr] && !seenAttributes[attr]) {
            dataAttributes[attr] = attr + '="$1"';
          }
        });
        node2.children.forEach((child) => addNodeDataAttributes(child));
      }
      if (htmlDocument) {
        htmlDocument.roots.forEach((root) => addNodeDataAttributes(root));
      }
      Object.keys(dataAttributes).forEach((attr) => result.items.push({
        label: attr,
        kind: CompletionItemKind.Value,
        textEdit: TextEdit.replace(range, dataAttributes[attr]),
        insertTextFormat: InsertTextFormat.Snippet
      }));
    }
    function collectAttributeValueSuggestions(valueStart, valueEnd = offset) {
      let range;
      let addQuotes;
      let valuePrefix;
      if (offset > valueStart && offset <= valueEnd && isQuote(text[valueStart])) {
        const valueContentStart = valueStart + 1;
        let valueContentEnd = valueEnd;
        if (valueEnd > valueStart && text[valueEnd - 1] === text[valueStart]) {
          valueContentEnd--;
        }
        const wsBefore = getWordStart(text, offset, valueContentStart);
        const wsAfter = getWordEnd(text, offset, valueContentEnd);
        range = getReplaceRange(wsBefore, wsAfter);
        valuePrefix = offset >= valueContentStart && offset <= valueContentEnd ? text.substring(valueContentStart, offset) : "";
        addQuotes = false;
      } else {
        range = getReplaceRange(valueStart, valueEnd);
        valuePrefix = text.substring(valueStart, offset);
        addQuotes = true;
      }
      if (completionParticipants.length > 0) {
        const tag = currentTag.toLowerCase();
        const attribute = currentAttributeName.toLowerCase();
        const fullRange = getReplaceRange(valueStart, valueEnd);
        for (const participant of completionParticipants) {
          if (participant.onHtmlAttributeValue) {
            participant.onHtmlAttributeValue({ document, position, tag, attribute, value: valuePrefix, range: fullRange });
          }
        }
      }
      dataProviders.forEach((provider) => {
        provider.provideValues(currentTag, currentAttributeName).forEach((value) => {
          const insertText = addQuotes ? '"' + value.name + '"' : value.name;
          result.items.push({
            label: value.name,
            filterText: insertText,
            kind: CompletionItemKind.Unit,
            documentation: generateDocumentation(value, void 0, doesSupportMarkdown),
            textEdit: TextEdit.replace(range, insertText),
            insertTextFormat: InsertTextFormat.PlainText
          });
        });
      });
      collectCharacterEntityProposals();
      return result;
    }
    function scanNextForEndPos(nextToken) {
      if (offset === scanner.getTokenEnd()) {
        token = scanner.scan();
        if (token === nextToken && scanner.getTokenOffset() === offset) {
          return scanner.getTokenEnd();
        }
      }
      return offset;
    }
    function collectInsideContent() {
      for (const participant of completionParticipants) {
        if (participant.onHtmlContent) {
          participant.onHtmlContent({ document, position });
        }
      }
      return collectCharacterEntityProposals();
    }
    function collectCharacterEntityProposals() {
      let k = offset - 1;
      let characterStart = position.character;
      while (k >= 0 && isLetterOrDigit(text, k)) {
        k--;
        characterStart--;
      }
      if (k >= 0 && text[k] === "&") {
        const range = Range.create(Position.create(position.line, characterStart - 1), position);
        for (const entity in entities) {
          if (endsWith(entity, ";")) {
            const label = "&" + entity;
            result.items.push({
              label,
              kind: CompletionItemKind.Keyword,
              documentation: t("Character entity representing '{0}'", entities[entity]),
              textEdit: TextEdit.replace(range, label),
              insertTextFormat: InsertTextFormat.PlainText
            });
          }
        }
      }
      return result;
    }
    function suggestDoctype(replaceStart, replaceEnd) {
      const range = getReplaceRange(replaceStart, replaceEnd);
      result.items.push({
        label: "!DOCTYPE",
        kind: CompletionItemKind.Property,
        documentation: "A preamble for an HTML document.",
        textEdit: TextEdit.replace(range, "!DOCTYPE html>"),
        insertTextFormat: InsertTextFormat.PlainText
      });
    }
    let token = scanner.scan();
    while (token !== TokenType.EOS && scanner.getTokenOffset() <= offset) {
      switch (token) {
        case TokenType.StartTagOpen:
          if (scanner.getTokenEnd() === offset) {
            const endPos = scanNextForEndPos(TokenType.StartTag);
            if (position.line === 0) {
              suggestDoctype(offset, endPos);
            }
            return collectTagSuggestions(offset, endPos);
          }
          break;
        case TokenType.StartTag:
          if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
            return collectOpenTagSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
          }
          currentTag = scanner.getTokenText();
          break;
        case TokenType.AttributeName:
          if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
            return collectAttributeNameSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
          }
          currentAttributeName = scanner.getTokenText();
          break;
        case TokenType.DelimiterAssign:
          if (scanner.getTokenEnd() === offset) {
            const endPos = scanNextForEndPos(TokenType.AttributeValue);
            return collectAttributeValueSuggestions(offset, endPos);
          }
          break;
        case TokenType.AttributeValue:
          if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
            return collectAttributeValueSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
          }
          break;
        case TokenType.Whitespace:
          if (offset <= scanner.getTokenEnd()) {
            switch (scanner.getScannerState()) {
              case ScannerState.AfterOpeningStartTag:
                const startPos = scanner.getTokenOffset();
                const endTagPos = scanNextForEndPos(TokenType.StartTag);
                return collectTagSuggestions(startPos, endTagPos);
              case ScannerState.WithinTag:
              case ScannerState.AfterAttributeName:
                return collectAttributeNameSuggestions(scanner.getTokenEnd());
              case ScannerState.BeforeAttributeValue:
                return collectAttributeValueSuggestions(scanner.getTokenEnd());
              case ScannerState.AfterOpeningEndTag:
                return collectCloseTagSuggestions(scanner.getTokenOffset() - 1, false);
              case ScannerState.WithinContent:
                return collectInsideContent();
            }
          }
          break;
        case TokenType.EndTagOpen:
          if (offset <= scanner.getTokenEnd()) {
            const afterOpenBracket = scanner.getTokenOffset() + 1;
            const endOffset = scanNextForEndPos(TokenType.EndTag);
            return collectCloseTagSuggestions(afterOpenBracket, false, endOffset);
          }
          break;
        case TokenType.EndTag:
          if (offset <= scanner.getTokenEnd()) {
            let start = scanner.getTokenOffset() - 1;
            while (start >= 0) {
              const ch = text.charAt(start);
              if (ch === "/") {
                return collectCloseTagSuggestions(start, false, scanner.getTokenEnd());
              } else if (!isWhiteSpace(ch)) {
                break;
              }
              start--;
            }
          }
          break;
        case TokenType.StartTagClose:
          if (offset <= scanner.getTokenEnd()) {
            if (currentTag) {
              return collectAutoCloseTagSuggestion(scanner.getTokenEnd(), currentTag);
            }
          }
          break;
        case TokenType.Content:
          if (offset <= scanner.getTokenEnd()) {
            return collectInsideContent();
          }
          break;
        default:
          if (offset <= scanner.getTokenEnd()) {
            return result;
          }
          break;
      }
      token = scanner.scan();
    }
    return result;
  }
  doQuoteComplete(document, position, htmlDocument, settings) {
    const offset = document.offsetAt(position);
    if (offset <= 0) {
      return null;
    }
    const defaultValue = settings?.attributeDefaultValue ?? "doublequotes";
    if (defaultValue === "empty") {
      return null;
    }
    const char = document.getText().charAt(offset - 1);
    if (char !== "=") {
      return null;
    }
    const value = defaultValue === "doublequotes" ? '"$1"' : "'$1'";
    const node = htmlDocument.findNodeBefore(offset);
    if (node && node.attributes && node.start < offset && (!node.endTagStart || node.endTagStart > offset)) {
      const scanner = createScanner(document.getText(), node.start);
      let token = scanner.scan();
      while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
        if (token === TokenType.AttributeName && scanner.getTokenEnd() === offset - 1) {
          token = scanner.scan();
          if (token !== TokenType.DelimiterAssign) {
            return null;
          }
          token = scanner.scan();
          if (token === TokenType.Unknown || token === TokenType.AttributeValue) {
            return null;
          }
          return value;
        }
        token = scanner.scan();
      }
    }
    return null;
  }
  doTagComplete(document, position, htmlDocument) {
    const offset = document.offsetAt(position);
    if (offset <= 0) {
      return null;
    }
    const char = document.getText().charAt(offset - 1);
    if (char === ">") {
      const voidElements = this.dataManager.getVoidElements(document.languageId);
      const node = htmlDocument.findNodeBefore(offset);
      if (node && node.tag && !this.dataManager.isVoidElement(node.tag, voidElements) && node.start < offset && (!node.endTagStart || node.endTagStart > offset)) {
        const scanner = createScanner(document.getText(), node.start);
        let token = scanner.scan();
        while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
          if (token === TokenType.StartTagClose && scanner.getTokenEnd() === offset) {
            return `$0</${node.tag}>`;
          }
          token = scanner.scan();
        }
      }
    } else if (char === "/") {
      let node = htmlDocument.findNodeBefore(offset);
      while (node && node.closed && !(node.endTagStart && node.endTagStart > offset)) {
        node = node.parent;
      }
      if (node && node.tag) {
        const scanner = createScanner(document.getText(), node.start);
        let token = scanner.scan();
        while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
          if (token === TokenType.EndTagOpen && scanner.getTokenEnd() === offset) {
            if (document.getText().charAt(offset) !== ">") {
              return `${node.tag}>`;
            } else {
              return node.tag;
            }
          }
          token = scanner.scan();
        }
      }
    }
    return null;
  }
  convertCompletionList(list) {
    if (!this.doesSupportMarkdown()) {
      list.items.forEach((item) => {
        if (item.documentation && typeof item.documentation !== "string") {
          item.documentation = {
            kind: "plaintext",
            value: item.documentation.value
          };
        }
      });
    }
    return list;
  }
  doesSupportMarkdown() {
    if (!isDefined(this.supportsMarkdown)) {
      if (!isDefined(this.lsOptions.clientCapabilities)) {
        this.supportsMarkdown = true;
        return this.supportsMarkdown;
      }
      const documentationFormat = this.lsOptions.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
      this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  }
};
function isQuote(s) {
  return /^["']*$/.test(s);
}
function isWhiteSpace(s) {
  return /^\s*$/.test(s);
}
function isFollowedBy(s, offset, intialState, expectedToken) {
  const scanner = createScanner(s, offset, intialState);
  let token = scanner.scan();
  while (token === TokenType.Whitespace) {
    token = scanner.scan();
  }
  return token === expectedToken;
}
function getWordStart(s, offset, limit) {
  while (offset > limit && !isWhiteSpace(s[offset - 1])) {
    offset--;
  }
  return offset;
}
function getWordEnd(s, offset, limit) {
  while (offset < limit && !isWhiteSpace(s[offset])) {
    offset++;
  }
  return offset;
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlHover.js
var HTMLHover = class {
  constructor(lsOptions, dataManager) {
    this.lsOptions = lsOptions;
    this.dataManager = dataManager;
  }
  doHover(document, position, htmlDocument, options) {
    const convertContents = this.convertContents.bind(this);
    const doesSupportMarkdown = this.doesSupportMarkdown();
    const offset = document.offsetAt(position);
    const node = htmlDocument.findNodeAt(offset);
    const text = document.getText();
    if (!node || !node.tag) {
      return null;
    }
    const dataProviders = this.dataManager.getDataProviders().filter((p) => p.isApplicable(document.languageId));
    function getTagHover(currTag, range, open) {
      for (const provider of dataProviders) {
        let hover = null;
        provider.provideTags().forEach((tag) => {
          if (tag.name.toLowerCase() === currTag.toLowerCase()) {
            let markupContent = generateDocumentation(tag, options, doesSupportMarkdown);
            if (!markupContent) {
              markupContent = {
                kind: doesSupportMarkdown ? "markdown" : "plaintext",
                value: ""
              };
            }
            hover = { contents: markupContent, range };
          }
        });
        if (hover) {
          hover.contents = convertContents(hover.contents);
          return hover;
        }
      }
      return null;
    }
    function getAttrHover(currTag, currAttr, range) {
      for (const provider of dataProviders) {
        let hover = null;
        provider.provideAttributes(currTag).forEach((attr) => {
          if (currAttr === attr.name && attr.description) {
            const contentsDoc = generateDocumentation(attr, options, doesSupportMarkdown);
            if (contentsDoc) {
              hover = { contents: contentsDoc, range };
            } else {
              hover = null;
            }
          }
        });
        if (hover) {
          hover.contents = convertContents(hover.contents);
          return hover;
        }
      }
      return null;
    }
    function getAttrValueHover(currTag, currAttr, currAttrValue, range) {
      for (const provider of dataProviders) {
        let hover = null;
        provider.provideValues(currTag, currAttr).forEach((attrValue) => {
          if (currAttrValue === attrValue.name && attrValue.description) {
            const contentsDoc = generateDocumentation(attrValue, options, doesSupportMarkdown);
            if (contentsDoc) {
              hover = { contents: contentsDoc, range };
            } else {
              hover = null;
            }
          }
        });
        if (hover) {
          hover.contents = convertContents(hover.contents);
          return hover;
        }
      }
      return null;
    }
    function getEntityHover(text2, range) {
      let currEntity = filterEntity(text2);
      for (const entity in entities) {
        let hover = null;
        const label = "&" + entity;
        if (currEntity === label) {
          let code = entities[entity].charCodeAt(0).toString(16).toUpperCase();
          let hex = "U+";
          if (code.length < 4) {
            const zeroes = 4 - code.length;
            let k = 0;
            while (k < zeroes) {
              hex += "0";
              k += 1;
            }
          }
          hex += code;
          const contentsDoc = t("Character entity representing '{0}', unicode equivalent '{1}'", entities[entity], hex);
          if (contentsDoc) {
            hover = { contents: contentsDoc, range };
          } else {
            hover = null;
          }
        }
        if (hover) {
          hover.contents = convertContents(hover.contents);
          return hover;
        }
      }
      return null;
    }
    function getTagNameRange2(tokenType, startOffset) {
      const scanner = createScanner(document.getText(), startOffset);
      let token = scanner.scan();
      while (token !== TokenType.EOS && (scanner.getTokenEnd() < offset || scanner.getTokenEnd() === offset && token !== tokenType)) {
        token = scanner.scan();
      }
      if (token === tokenType && offset <= scanner.getTokenEnd()) {
        return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
      }
      return null;
    }
    function getEntityRange() {
      let k = offset - 1;
      let characterStart = position.character;
      while (k >= 0 && isLetterOrDigit(text, k)) {
        k--;
        characterStart--;
      }
      let n = k + 1;
      let characterEnd = characterStart;
      while (isLetterOrDigit(text, n)) {
        n++;
        characterEnd++;
      }
      if (k >= 0 && text[k] === "&") {
        let range = null;
        if (text[n] === ";") {
          range = Range.create(Position.create(position.line, characterStart), Position.create(position.line, characterEnd + 1));
        } else {
          range = Range.create(Position.create(position.line, characterStart), Position.create(position.line, characterEnd));
        }
        return range;
      }
      return null;
    }
    function filterEntity(text2) {
      let k = offset - 1;
      let newText = "&";
      while (k >= 0 && isLetterOrDigit(text2, k)) {
        k--;
      }
      k = k + 1;
      while (isLetterOrDigit(text2, k)) {
        newText += text2[k];
        k += 1;
      }
      newText += ";";
      return newText;
    }
    if (node.endTagStart && offset >= node.endTagStart) {
      const tagRange2 = getTagNameRange2(TokenType.EndTag, node.endTagStart);
      if (tagRange2) {
        return getTagHover(node.tag, tagRange2, false);
      }
      return null;
    }
    const tagRange = getTagNameRange2(TokenType.StartTag, node.start);
    if (tagRange) {
      return getTagHover(node.tag, tagRange, true);
    }
    const attrRange = getTagNameRange2(TokenType.AttributeName, node.start);
    if (attrRange) {
      const tag = node.tag;
      const attr = document.getText(attrRange);
      return getAttrHover(tag, attr, attrRange);
    }
    const entityRange = getEntityRange();
    if (entityRange) {
      return getEntityHover(text, entityRange);
    }
    function scanAttrAndAttrValue(nodeStart, attrValueStart) {
      const scanner = createScanner(document.getText(), nodeStart);
      let token = scanner.scan();
      let prevAttr = void 0;
      while (token !== TokenType.EOS && scanner.getTokenEnd() <= attrValueStart) {
        token = scanner.scan();
        if (token === TokenType.AttributeName) {
          prevAttr = scanner.getTokenText();
        }
      }
      return prevAttr;
    }
    const attrValueRange = getTagNameRange2(TokenType.AttributeValue, node.start);
    if (attrValueRange) {
      const tag = node.tag;
      const attrValue = trimQuotes(document.getText(attrValueRange));
      const matchAttr = scanAttrAndAttrValue(node.start, document.offsetAt(attrValueRange.start));
      if (matchAttr) {
        return getAttrValueHover(tag, matchAttr, attrValue, attrValueRange);
      }
    }
    return null;
  }
  convertContents(contents) {
    if (!this.doesSupportMarkdown()) {
      if (typeof contents === "string") {
        return contents;
      } else if ("kind" in contents) {
        return {
          kind: "plaintext",
          value: contents.value
        };
      } else if (Array.isArray(contents)) {
        contents.map((c) => {
          return typeof c === "string" ? c : c.value;
        });
      } else {
        return contents.value;
      }
    }
    return contents;
  }
  doesSupportMarkdown() {
    if (!isDefined(this.supportsMarkdown)) {
      if (!isDefined(this.lsOptions.clientCapabilities)) {
        this.supportsMarkdown = true;
        return this.supportsMarkdown;
      }
      const contentFormat = this.lsOptions.clientCapabilities?.textDocument?.hover?.contentFormat;
      this.supportsMarkdown = Array.isArray(contentFormat) && contentFormat.indexOf(MarkupKind.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  }
};
function trimQuotes(s) {
  if (s.length <= 1) {
    return s.replace(/['"]/, "");
  }
  if (s[0] === `'` || s[0] === `"`) {
    s = s.slice(1);
  }
  if (s[s.length - 1] === `'` || s[s.length - 1] === `"`) {
    s = s.slice(0, -1);
  }
  return s;
}

// node_modules/vscode-html-languageservice/lib/esm/beautify/beautify.js
function js_beautify(js_source_text, options) {
  return js_source_text;
}

// node_modules/vscode-html-languageservice/lib/esm/beautify/beautify-css.js
var legacy_beautify_css;
(function() {
  "use strict";
  var __webpack_modules__ = [
    ,
    ,
    /* 2 */
    /***/
    function(module) {
      function OutputLine(parent) {
        this.__parent = parent;
        this.__character_count = 0;
        this.__indent_count = -1;
        this.__alignment_count = 0;
        this.__wrap_point_index = 0;
        this.__wrap_point_character_count = 0;
        this.__wrap_point_indent_count = -1;
        this.__wrap_point_alignment_count = 0;
        this.__items = [];
      }
      OutputLine.prototype.clone_empty = function() {
        var line = new OutputLine(this.__parent);
        line.set_indent(this.__indent_count, this.__alignment_count);
        return line;
      };
      OutputLine.prototype.item = function(index) {
        if (index < 0) {
          return this.__items[this.__items.length + index];
        } else {
          return this.__items[index];
        }
      };
      OutputLine.prototype.has_match = function(pattern) {
        for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
          if (this.__items[lastCheckedOutput].match(pattern)) {
            return true;
          }
        }
        return false;
      };
      OutputLine.prototype.set_indent = function(indent, alignment) {
        if (this.is_empty()) {
          this.__indent_count = indent || 0;
          this.__alignment_count = alignment || 0;
          this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
        }
      };
      OutputLine.prototype._set_wrap_point = function() {
        if (this.__parent.wrap_line_length) {
          this.__wrap_point_index = this.__items.length;
          this.__wrap_point_character_count = this.__character_count;
          this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
          this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
        }
      };
      OutputLine.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      };
      OutputLine.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var next = this.__parent.current_line;
          next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
          next.__items = this.__items.slice(this.__wrap_point_index);
          this.__items = this.__items.slice(0, this.__wrap_point_index);
          next.__character_count += this.__character_count - this.__wrap_point_character_count;
          this.__character_count = this.__wrap_point_character_count;
          if (next.__items[0] === " ") {
            next.__items.splice(0, 1);
            next.__character_count -= 1;
          }
          return true;
        }
        return false;
      };
      OutputLine.prototype.is_empty = function() {
        return this.__items.length === 0;
      };
      OutputLine.prototype.last = function() {
        if (!this.is_empty()) {
          return this.__items[this.__items.length - 1];
        } else {
          return null;
        }
      };
      OutputLine.prototype.push = function(item) {
        this.__items.push(item);
        var last_newline_index = item.lastIndexOf("\n");
        if (last_newline_index !== -1) {
          this.__character_count = item.length - last_newline_index;
        } else {
          this.__character_count += item.length;
        }
      };
      OutputLine.prototype.pop = function() {
        var item = null;
        if (!this.is_empty()) {
          item = this.__items.pop();
          this.__character_count -= item.length;
        }
        return item;
      };
      OutputLine.prototype._remove_indent = function() {
        if (this.__indent_count > 0) {
          this.__indent_count -= 1;
          this.__character_count -= this.__parent.indent_size;
        }
      };
      OutputLine.prototype._remove_wrap_indent = function() {
        if (this.__wrap_point_indent_count > 0) {
          this.__wrap_point_indent_count -= 1;
        }
      };
      OutputLine.prototype.trim = function() {
        while (this.last() === " ") {
          this.__items.pop();
          this.__character_count -= 1;
        }
      };
      OutputLine.prototype.toString = function() {
        var result = "";
        if (this.is_empty()) {
          if (this.__parent.indent_empty_lines) {
            result = this.__parent.get_indent_string(this.__indent_count);
          }
        } else {
          result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
          result += this.__items.join("");
        }
        return result;
      };
      function IndentStringCache(options, baseIndentString) {
        this.__cache = [""];
        this.__indent_size = options.indent_size;
        this.__indent_string = options.indent_char;
        if (!options.indent_with_tabs) {
          this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
        }
        baseIndentString = baseIndentString || "";
        if (options.indent_level > 0) {
          baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
        }
        this.__base_string = baseIndentString;
        this.__base_string_length = baseIndentString.length;
      }
      IndentStringCache.prototype.get_indent_size = function(indent, column) {
        var result = this.__base_string_length;
        column = column || 0;
        if (indent < 0) {
          result = 0;
        }
        result += indent * this.__indent_size;
        result += column;
        return result;
      };
      IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
        var result = this.__base_string;
        column = column || 0;
        if (indent_level < 0) {
          indent_level = 0;
          result = "";
        }
        column += indent_level * this.__indent_size;
        this.__ensure_cache(column);
        result += this.__cache[column];
        return result;
      };
      IndentStringCache.prototype.__ensure_cache = function(column) {
        while (column >= this.__cache.length) {
          this.__add_column();
        }
      };
      IndentStringCache.prototype.__add_column = function() {
        var column = this.__cache.length;
        var indent = 0;
        var result = "";
        if (this.__indent_size && column >= this.__indent_size) {
          indent = Math.floor(column / this.__indent_size);
          column -= indent * this.__indent_size;
          result = new Array(indent + 1).join(this.__indent_string);
        }
        if (column) {
          result += new Array(column + 1).join(" ");
        }
        this.__cache.push(result);
      };
      function Output(options, baseIndentString) {
        this.__indent_cache = new IndentStringCache(options, baseIndentString);
        this.raw = false;
        this._end_with_newline = options.end_with_newline;
        this.indent_size = options.indent_size;
        this.wrap_line_length = options.wrap_line_length;
        this.indent_empty_lines = options.indent_empty_lines;
        this.__lines = [];
        this.previous_line = null;
        this.current_line = null;
        this.next_line = new OutputLine(this);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = false;
        this.__add_outputline();
      }
      Output.prototype.__add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = this.next_line.clone_empty();
        this.__lines.push(this.current_line);
      };
      Output.prototype.get_line_number = function() {
        return this.__lines.length;
      };
      Output.prototype.get_indent_string = function(indent, column) {
        return this.__indent_cache.get_indent_string(indent, column);
      };
      Output.prototype.get_indent_size = function(indent, column) {
        return this.__indent_cache.get_indent_size(indent, column);
      };
      Output.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      };
      Output.prototype.add_new_line = function(force_newline) {
        if (this.is_empty() || !force_newline && this.just_added_newline()) {
          return false;
        }
        if (!this.raw) {
          this.__add_outputline();
        }
        return true;
      };
      Output.prototype.get_code = function(eol) {
        this.trim(true);
        var last_item = this.current_line.pop();
        if (last_item) {
          if (last_item[last_item.length - 1] === "\n") {
            last_item = last_item.replace(/\n+$/g, "");
          }
          this.current_line.push(last_item);
        }
        if (this._end_with_newline) {
          this.__add_outputline();
        }
        var sweet_code = this.__lines.join("\n");
        if (eol !== "\n") {
          sweet_code = sweet_code.replace(/[\n]/g, eol);
        }
        return sweet_code;
      };
      Output.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      };
      Output.prototype.set_indent = function(indent, alignment) {
        indent = indent || 0;
        alignment = alignment || 0;
        this.next_line.set_indent(indent, alignment);
        if (this.__lines.length > 1) {
          this.current_line.set_indent(indent, alignment);
          return true;
        }
        this.current_line.set_indent();
        return false;
      };
      Output.prototype.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
          this.__add_outputline();
        }
        this.current_line.set_indent(-1);
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = false;
      };
      Output.prototype.add_token = function(printable_token) {
        this.__add_space_before_token();
        this.current_line.push(printable_token);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = this.current_line._allow_wrap();
      };
      Output.prototype.__add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
          if (!this.non_breaking_space) {
            this.set_wrap_point();
          }
          this.current_line.push(" ");
        }
      };
      Output.prototype.remove_indent = function(index) {
        var output_length = this.__lines.length;
        while (index < output_length) {
          this.__lines[index]._remove_indent();
          index++;
        }
        this.current_line._remove_wrap_indent();
      };
      Output.prototype.trim = function(eat_newlines) {
        eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
        this.current_line.trim();
        while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
          this.__lines.pop();
          this.current_line = this.__lines[this.__lines.length - 1];
          this.current_line.trim();
        }
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      };
      Output.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      };
      Output.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      };
      Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
        var index = this.__lines.length - 2;
        while (index >= 0) {
          var potentialEmptyLine = this.__lines[index];
          if (potentialEmptyLine.is_empty()) {
            break;
          } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
            this.__lines.splice(index + 1, 0, new OutputLine(this));
            this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          index--;
        }
      };
      module.exports.Output = Output;
    },
    ,
    ,
    ,
    /* 6 */
    /***/
    function(module) {
      function Options(options, merge_child_field) {
        this.raw_options = _mergeOpts(options, merge_child_field);
        this.disabled = this._get_boolean("disabled");
        this.eol = this._get_characters("eol", "auto");
        this.end_with_newline = this._get_boolean("end_with_newline");
        this.indent_size = this._get_number("indent_size", 4);
        this.indent_char = this._get_characters("indent_char", " ");
        this.indent_level = this._get_number("indent_level");
        this.preserve_newlines = this._get_boolean("preserve_newlines", true);
        this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
        if (!this.preserve_newlines) {
          this.max_preserve_newlines = 0;
        }
        this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
        if (this.indent_with_tabs) {
          this.indent_char = "	";
          if (this.indent_size === 1) {
            this.indent_size = 4;
          }
        }
        this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
        this.indent_empty_lines = this._get_boolean("indent_empty_lines");
        this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      Options.prototype._get_array = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = default_value || [];
        if (typeof option_value === "object") {
          if (option_value !== null && typeof option_value.concat === "function") {
            result = option_value.concat();
          }
        } else if (typeof option_value === "string") {
          result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
        }
        return result;
      };
      Options.prototype._get_boolean = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = option_value === void 0 ? !!default_value : !!option_value;
        return result;
      };
      Options.prototype._get_characters = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = default_value || "";
        if (typeof option_value === "string") {
          result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
        }
        return result;
      };
      Options.prototype._get_number = function(name, default_value) {
        var option_value = this.raw_options[name];
        default_value = parseInt(default_value, 10);
        if (isNaN(default_value)) {
          default_value = 0;
        }
        var result = parseInt(option_value, 10);
        if (isNaN(result)) {
          result = default_value;
        }
        return result;
      };
      Options.prototype._get_selection = function(name, selection_list, default_value) {
        var result = this._get_selection_list(name, selection_list, default_value);
        if (result.length !== 1) {
          throw new Error(
            "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
          );
        }
        return result[0];
      };
      Options.prototype._get_selection_list = function(name, selection_list, default_value) {
        if (!selection_list || selection_list.length === 0) {
          throw new Error("Selection list cannot be empty.");
        }
        default_value = default_value || [selection_list[0]];
        if (!this._is_valid_selection(default_value, selection_list)) {
          throw new Error("Invalid Default Value!");
        }
        var result = this._get_array(name, default_value);
        if (!this._is_valid_selection(result, selection_list)) {
          throw new Error(
            "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
          );
        }
        return result;
      };
      Options.prototype._is_valid_selection = function(result, selection_list) {
        return result.length && selection_list.length && !result.some(function(item) {
          return selection_list.indexOf(item) === -1;
        });
      };
      function _mergeOpts(allOptions, childFieldName) {
        var finalOpts = {};
        allOptions = _normalizeOpts(allOptions);
        var name;
        for (name in allOptions) {
          if (name !== childFieldName) {
            finalOpts[name] = allOptions[name];
          }
        }
        if (childFieldName && allOptions[childFieldName]) {
          for (name in allOptions[childFieldName]) {
            finalOpts[name] = allOptions[childFieldName][name];
          }
        }
        return finalOpts;
      }
      function _normalizeOpts(options) {
        var convertedOpts = {};
        var key;
        for (key in options) {
          var newKey = key.replace(/-/g, "_");
          convertedOpts[newKey] = options[key];
        }
        return convertedOpts;
      }
      module.exports.Options = Options;
      module.exports.normalizeOpts = _normalizeOpts;
      module.exports.mergeOpts = _mergeOpts;
    },
    ,
    /* 8 */
    /***/
    function(module) {
      var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
      function InputScanner(input_string) {
        this.__input = input_string || "";
        this.__input_length = this.__input.length;
        this.__position = 0;
      }
      InputScanner.prototype.restart = function() {
        this.__position = 0;
      };
      InputScanner.prototype.back = function() {
        if (this.__position > 0) {
          this.__position -= 1;
        }
      };
      InputScanner.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      };
      InputScanner.prototype.next = function() {
        var val = null;
        if (this.hasNext()) {
          val = this.__input.charAt(this.__position);
          this.__position += 1;
        }
        return val;
      };
      InputScanner.prototype.peek = function(index) {
        var val = null;
        index = index || 0;
        index += this.__position;
        if (index >= 0 && index < this.__input_length) {
          val = this.__input.charAt(index);
        }
        return val;
      };
      InputScanner.prototype.__match = function(pattern, index) {
        pattern.lastIndex = index;
        var pattern_match = pattern.exec(this.__input);
        if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
          if (pattern_match.index !== index) {
            pattern_match = null;
          }
        }
        return pattern_match;
      };
      InputScanner.prototype.test = function(pattern, index) {
        index = index || 0;
        index += this.__position;
        if (index >= 0 && index < this.__input_length) {
          return !!this.__match(pattern, index);
        } else {
          return false;
        }
      };
      InputScanner.prototype.testChar = function(pattern, index) {
        var val = this.peek(index);
        pattern.lastIndex = 0;
        return val !== null && pattern.test(val);
      };
      InputScanner.prototype.match = function(pattern) {
        var pattern_match = this.__match(pattern, this.__position);
        if (pattern_match) {
          this.__position += pattern_match[0].length;
        } else {
          pattern_match = null;
        }
        return pattern_match;
      };
      InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
        var val = "";
        var match;
        if (starting_pattern) {
          match = this.match(starting_pattern);
          if (match) {
            val += match[0];
          }
        }
        if (until_pattern && (match || !starting_pattern)) {
          val += this.readUntil(until_pattern, until_after);
        }
        return val;
      };
      InputScanner.prototype.readUntil = function(pattern, until_after) {
        var val = "";
        var match_index = this.__position;
        pattern.lastIndex = this.__position;
        var pattern_match = pattern.exec(this.__input);
        if (pattern_match) {
          match_index = pattern_match.index;
          if (until_after) {
            match_index += pattern_match[0].length;
          }
        } else {
          match_index = this.__input_length;
        }
        val = this.__input.substring(this.__position, match_index);
        this.__position = match_index;
        return val;
      };
      InputScanner.prototype.readUntilAfter = function(pattern) {
        return this.readUntil(pattern, true);
      };
      InputScanner.prototype.get_regexp = function(pattern, match_from) {
        var result = null;
        var flags = "g";
        if (match_from && regexp_has_sticky) {
          flags = "y";
        }
        if (typeof pattern === "string" && pattern !== "") {
          result = new RegExp(pattern, flags);
        } else if (pattern) {
          result = new RegExp(pattern.source, flags);
        }
        return result;
      };
      InputScanner.prototype.get_literal_regexp = function(literal_string) {
        return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      };
      InputScanner.prototype.peekUntilAfter = function(pattern) {
        var start = this.__position;
        var val = this.readUntilAfter(pattern);
        this.__position = start;
        return val;
      };
      InputScanner.prototype.lookBack = function(testVal) {
        var start = this.__position - 1;
        return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
      };
      module.exports.InputScanner = InputScanner;
    },
    ,
    ,
    ,
    ,
    /* 13 */
    /***/
    function(module) {
      function Directives(start_block_pattern, end_block_pattern) {
        start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
        end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
        this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
        this.__directive_pattern = / (\w+)[:](\w+)/g;
        this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
      }
      Directives.prototype.get_directives = function(text) {
        if (!text.match(this.__directives_block_pattern)) {
          return null;
        }
        var directives = {};
        this.__directive_pattern.lastIndex = 0;
        var directive_match = this.__directive_pattern.exec(text);
        while (directive_match) {
          directives[directive_match[1]] = directive_match[2];
          directive_match = this.__directive_pattern.exec(text);
        }
        return directives;
      };
      Directives.prototype.readIgnored = function(input) {
        return input.readUntilAfter(this.__directives_end_ignore_pattern);
      };
      module.exports.Directives = Directives;
    },
    ,
    /* 15 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Beautifier = __webpack_require__2(16).Beautifier, Options = __webpack_require__2(17).Options;
      function css_beautify2(source_text, options) {
        var beautifier = new Beautifier(source_text, options);
        return beautifier.beautify();
      }
      module.exports = css_beautify2;
      module.exports.defaultOptions = function() {
        return new Options();
      };
    },
    /* 16 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Options = __webpack_require__2(17).Options;
      var Output = __webpack_require__2(2).Output;
      var InputScanner = __webpack_require__2(8).InputScanner;
      var Directives = __webpack_require__2(13).Directives;
      var directives_core = new Directives(/\/\*/, /\*\//);
      var lineBreak = /\r\n|[\r\n]/;
      var allLineBreaks = /\r\n|[\r\n]/g;
      var whitespaceChar = /\s/;
      var whitespacePattern = /(?:\s|\n)+/g;
      var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
      var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
      function Beautifier(source_text, options) {
        this._source_text = source_text || "";
        this._options = new Options(options);
        this._ch = null;
        this._input = null;
        this.NESTED_AT_RULE = {
          "page": true,
          "font-face": true,
          "keyframes": true,
          // also in CONDITIONAL_GROUP_RULE below
          "media": true,
          "supports": true,
          "document": true
        };
        this.CONDITIONAL_GROUP_RULE = {
          "media": true,
          "supports": true,
          "document": true
        };
        this.NON_SEMICOLON_NEWLINE_PROPERTY = [
          "grid-template-areas",
          "grid-template"
        ];
      }
      Beautifier.prototype.eatString = function(endChars) {
        var result = "";
        this._ch = this._input.next();
        while (this._ch) {
          result += this._ch;
          if (this._ch === "\\") {
            result += this._input.next();
          } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
            break;
          }
          this._ch = this._input.next();
        }
        return result;
      };
      Beautifier.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
        var result = whitespaceChar.test(this._input.peek());
        var newline_count = 0;
        while (whitespaceChar.test(this._input.peek())) {
          this._ch = this._input.next();
          if (allowAtLeastOneNewLine && this._ch === "\n") {
            if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
              newline_count++;
              this._output.add_new_line(true);
            }
          }
        }
        return result;
      };
      Beautifier.prototype.foundNestedPseudoClass = function() {
        var openParen = 0;
        var i = 1;
        var ch = this._input.peek(i);
        while (ch) {
          if (ch === "{") {
            return true;
          } else if (ch === "(") {
            openParen += 1;
          } else if (ch === ")") {
            if (openParen === 0) {
              return false;
            }
            openParen -= 1;
          } else if (ch === ";" || ch === "}") {
            return false;
          }
          i++;
          ch = this._input.peek(i);
        }
        return false;
      };
      Beautifier.prototype.print_string = function(output_string) {
        this._output.set_indent(this._indentLevel);
        this._output.non_breaking_space = true;
        this._output.add_token(output_string);
      };
      Beautifier.prototype.preserveSingleSpace = function(isAfterSpace) {
        if (isAfterSpace) {
          this._output.space_before_token = true;
        }
      };
      Beautifier.prototype.indent = function() {
        this._indentLevel++;
      };
      Beautifier.prototype.outdent = function() {
        if (this._indentLevel > 0) {
          this._indentLevel--;
        }
      };
      Beautifier.prototype.beautify = function() {
        if (this._options.disabled) {
          return this._source_text;
        }
        var source_text = this._source_text;
        var eol = this._options.eol;
        if (eol === "auto") {
          eol = "\n";
          if (source_text && lineBreak.test(source_text || "")) {
            eol = source_text.match(lineBreak)[0];
          }
        }
        source_text = source_text.replace(allLineBreaks, "\n");
        var baseIndentString = source_text.match(/^[\t ]*/)[0];
        this._output = new Output(this._options, baseIndentString);
        this._input = new InputScanner(source_text);
        this._indentLevel = 0;
        this._nestedLevel = 0;
        this._ch = null;
        var parenLevel = 0;
        var insideRule = false;
        var insidePropertyValue = false;
        var enteringConditionalGroup = false;
        var insideNonNestedAtRule = false;
        var insideScssMap = false;
        var topCharacter = this._ch;
        var insideNonSemiColonValues = false;
        var whitespace;
        var isAfterSpace;
        var previous_ch;
        while (true) {
          whitespace = this._input.read(whitespacePattern);
          isAfterSpace = whitespace !== "";
          previous_ch = topCharacter;
          this._ch = this._input.next();
          if (this._ch === "\\" && this._input.hasNext()) {
            this._ch += this._input.next();
          }
          topCharacter = this._ch;
          if (!this._ch) {
            break;
          } else if (this._ch === "/" && this._input.peek() === "*") {
            this._output.add_new_line();
            this._input.back();
            var comment = this._input.read(block_comment_pattern);
            var directives = directives_core.get_directives(comment);
            if (directives && directives.ignore === "start") {
              comment += directives_core.readIgnored(this._input);
            }
            this.print_string(comment);
            this.eatWhitespace(true);
            this._output.add_new_line();
          } else if (this._ch === "/" && this._input.peek() === "/") {
            this._output.space_before_token = true;
            this._input.back();
            this.print_string(this._input.read(comment_pattern));
            this.eatWhitespace(true);
          } else if (this._ch === "$") {
            this.preserveSingleSpace(isAfterSpace);
            this.print_string(this._ch);
            var variable = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
            if (variable.match(/[ :]$/)) {
              variable = this.eatString(": ").replace(/\s+$/, "");
              this.print_string(variable);
              this._output.space_before_token = true;
            }
            if (parenLevel === 0 && variable.indexOf(":") !== -1) {
              insidePropertyValue = true;
              this.indent();
            }
          } else if (this._ch === "@") {
            this.preserveSingleSpace(isAfterSpace);
            if (this._input.peek() === "{") {
              this.print_string(this._ch + this.eatString("}"));
            } else {
              this.print_string(this._ch);
              var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
              if (variableOrRule.match(/[ :]$/)) {
                variableOrRule = this.eatString(": ").replace(/\s+$/, "");
                this.print_string(variableOrRule);
                this._output.space_before_token = true;
              }
              if (parenLevel === 0 && variableOrRule.indexOf(":") !== -1) {
                insidePropertyValue = true;
                this.indent();
              } else if (variableOrRule in this.NESTED_AT_RULE) {
                this._nestedLevel += 1;
                if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                  enteringConditionalGroup = true;
                }
              } else if (parenLevel === 0 && !insidePropertyValue) {
                insideNonNestedAtRule = true;
              }
            }
          } else if (this._ch === "#" && this._input.peek() === "{") {
            this.preserveSingleSpace(isAfterSpace);
            this.print_string(this._ch + this.eatString("}"));
          } else if (this._ch === "{") {
            if (insidePropertyValue) {
              insidePropertyValue = false;
              this.outdent();
            }
            insideNonNestedAtRule = false;
            if (enteringConditionalGroup) {
              enteringConditionalGroup = false;
              insideRule = this._indentLevel >= this._nestedLevel;
            } else {
              insideRule = this._indentLevel >= this._nestedLevel - 1;
            }
            if (this._options.newline_between_rules && insideRule) {
              if (this._output.previous_line && this._output.previous_line.item(-1) !== "{") {
                this._output.ensure_empty_line_above("/", ",");
              }
            }
            this._output.space_before_token = true;
            if (this._options.brace_style === "expand") {
              this._output.add_new_line();
              this.print_string(this._ch);
              this.indent();
              this._output.set_indent(this._indentLevel);
            } else {
              if (previous_ch === "(") {
                this._output.space_before_token = false;
              } else if (previous_ch !== ",") {
                this.indent();
              }
              this.print_string(this._ch);
            }
            this.eatWhitespace(true);
            this._output.add_new_line();
          } else if (this._ch === "}") {
            this.outdent();
            this._output.add_new_line();
            if (previous_ch === "{") {
              this._output.trim(true);
            }
            if (insidePropertyValue) {
              this.outdent();
              insidePropertyValue = false;
            }
            this.print_string(this._ch);
            insideRule = false;
            if (this._nestedLevel) {
              this._nestedLevel--;
            }
            this.eatWhitespace(true);
            this._output.add_new_line();
            if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
              if (this._input.peek() !== "}") {
                this._output.add_new_line(true);
              }
            }
            if (this._input.peek() === ")") {
              this._output.trim(true);
              if (this._options.brace_style === "expand") {
                this._output.add_new_line(true);
              }
            }
          } else if (this._ch === ":") {
            for (var i = 0; i < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; i++) {
              if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[i])) {
                insideNonSemiColonValues = true;
                break;
              }
            }
            if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideNonNestedAtRule && parenLevel === 0) {
              this.print_string(":");
              if (!insidePropertyValue) {
                insidePropertyValue = true;
                this._output.space_before_token = true;
                this.eatWhitespace(true);
                this.indent();
              }
            } else {
              if (this._input.lookBack(" ")) {
                this._output.space_before_token = true;
              }
              if (this._input.peek() === ":") {
                this._ch = this._input.next();
                this.print_string("::");
              } else {
                this.print_string(":");
              }
            }
          } else if (this._ch === '"' || this._ch === "'") {
            var preserveQuoteSpace = previous_ch === '"' || previous_ch === "'";
            this.preserveSingleSpace(preserveQuoteSpace || isAfterSpace);
            this.print_string(this._ch + this.eatString(this._ch));
            this.eatWhitespace(true);
          } else if (this._ch === ";") {
            insideNonSemiColonValues = false;
            if (parenLevel === 0) {
              if (insidePropertyValue) {
                this.outdent();
                insidePropertyValue = false;
              }
              insideNonNestedAtRule = false;
              this.print_string(this._ch);
              this.eatWhitespace(true);
              if (this._input.peek() !== "/") {
                this._output.add_new_line();
              }
            } else {
              this.print_string(this._ch);
              this.eatWhitespace(true);
              this._output.space_before_token = true;
            }
          } else if (this._ch === "(") {
            if (this._input.lookBack("url")) {
              this.print_string(this._ch);
              this.eatWhitespace();
              parenLevel++;
              this.indent();
              this._ch = this._input.next();
              if (this._ch === ")" || this._ch === '"' || this._ch === "'") {
                this._input.back();
              } else if (this._ch) {
                this.print_string(this._ch + this.eatString(")"));
                if (parenLevel) {
                  parenLevel--;
                  this.outdent();
                }
              }
            } else {
              var space_needed = false;
              if (this._input.lookBack("with")) {
                space_needed = true;
              }
              this.preserveSingleSpace(isAfterSpace || space_needed);
              this.print_string(this._ch);
              if (insidePropertyValue && previous_ch === "$" && this._options.selector_separator_newline) {
                this._output.add_new_line();
                insideScssMap = true;
              } else {
                this.eatWhitespace();
                parenLevel++;
                this.indent();
              }
            }
          } else if (this._ch === ")") {
            if (parenLevel) {
              parenLevel--;
              this.outdent();
            }
            if (insideScssMap && this._input.peek() === ";" && this._options.selector_separator_newline) {
              insideScssMap = false;
              this.outdent();
              this._output.add_new_line();
            }
            this.print_string(this._ch);
          } else if (this._ch === ",") {
            this.print_string(this._ch);
            this.eatWhitespace(true);
            if (this._options.selector_separator_newline && (!insidePropertyValue || insideScssMap) && parenLevel === 0 && !insideNonNestedAtRule) {
              this._output.add_new_line();
            } else {
              this._output.space_before_token = true;
            }
          } else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !insidePropertyValue && parenLevel === 0) {
            if (this._options.space_around_combinator) {
              this._output.space_before_token = true;
              this.print_string(this._ch);
              this._output.space_before_token = true;
            } else {
              this.print_string(this._ch);
              this.eatWhitespace();
              if (this._ch && whitespaceChar.test(this._ch)) {
                this._ch = "";
              }
            }
          } else if (this._ch === "]") {
            this.print_string(this._ch);
          } else if (this._ch === "[") {
            this.preserveSingleSpace(isAfterSpace);
            this.print_string(this._ch);
          } else if (this._ch === "=") {
            this.eatWhitespace();
            this.print_string("=");
            if (whitespaceChar.test(this._ch)) {
              this._ch = "";
            }
          } else if (this._ch === "!" && !this._input.lookBack("\\")) {
            this._output.space_before_token = true;
            this.print_string(this._ch);
          } else {
            var preserveAfterSpace = previous_ch === '"' || previous_ch === "'";
            this.preserveSingleSpace(preserveAfterSpace || isAfterSpace);
            this.print_string(this._ch);
            if (!this._output.just_added_newline() && this._input.peek() === "\n" && insideNonSemiColonValues) {
              this._output.add_new_line();
            }
          }
        }
        var sweetCode = this._output.get_code(eol);
        return sweetCode;
      };
      module.exports.Beautifier = Beautifier;
    },
    /* 17 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var BaseOptions = __webpack_require__2(6).Options;
      function Options(options) {
        BaseOptions.call(this, options, "css");
        this.selector_separator_newline = this._get_boolean("selector_separator_newline", true);
        this.newline_between_rules = this._get_boolean("newline_between_rules", true);
        var space_around_selector_separator = this._get_boolean("space_around_selector_separator");
        this.space_around_combinator = this._get_boolean("space_around_combinator") || space_around_selector_separator;
        var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
        this.brace_style = "collapse";
        for (var bs = 0; bs < brace_style_split.length; bs++) {
          if (brace_style_split[bs] !== "expand") {
            this.brace_style = "collapse";
          } else {
            this.brace_style = brace_style_split[bs];
          }
        }
      }
      Options.prototype = new BaseOptions();
      module.exports.Options = Options;
    }
    /******/
  ];
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = __webpack_require__(15);
  legacy_beautify_css = __webpack_exports__;
})();
var css_beautify = legacy_beautify_css;

// node_modules/vscode-html-languageservice/lib/esm/beautify/beautify-html.js
var legacy_beautify_html;
(function() {
  "use strict";
  var __webpack_modules__ = [
    ,
    ,
    /* 2 */
    /***/
    function(module) {
      function OutputLine(parent) {
        this.__parent = parent;
        this.__character_count = 0;
        this.__indent_count = -1;
        this.__alignment_count = 0;
        this.__wrap_point_index = 0;
        this.__wrap_point_character_count = 0;
        this.__wrap_point_indent_count = -1;
        this.__wrap_point_alignment_count = 0;
        this.__items = [];
      }
      OutputLine.prototype.clone_empty = function() {
        var line = new OutputLine(this.__parent);
        line.set_indent(this.__indent_count, this.__alignment_count);
        return line;
      };
      OutputLine.prototype.item = function(index) {
        if (index < 0) {
          return this.__items[this.__items.length + index];
        } else {
          return this.__items[index];
        }
      };
      OutputLine.prototype.has_match = function(pattern) {
        for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
          if (this.__items[lastCheckedOutput].match(pattern)) {
            return true;
          }
        }
        return false;
      };
      OutputLine.prototype.set_indent = function(indent, alignment) {
        if (this.is_empty()) {
          this.__indent_count = indent || 0;
          this.__alignment_count = alignment || 0;
          this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
        }
      };
      OutputLine.prototype._set_wrap_point = function() {
        if (this.__parent.wrap_line_length) {
          this.__wrap_point_index = this.__items.length;
          this.__wrap_point_character_count = this.__character_count;
          this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
          this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
        }
      };
      OutputLine.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      };
      OutputLine.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var next = this.__parent.current_line;
          next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
          next.__items = this.__items.slice(this.__wrap_point_index);
          this.__items = this.__items.slice(0, this.__wrap_point_index);
          next.__character_count += this.__character_count - this.__wrap_point_character_count;
          this.__character_count = this.__wrap_point_character_count;
          if (next.__items[0] === " ") {
            next.__items.splice(0, 1);
            next.__character_count -= 1;
          }
          return true;
        }
        return false;
      };
      OutputLine.prototype.is_empty = function() {
        return this.__items.length === 0;
      };
      OutputLine.prototype.last = function() {
        if (!this.is_empty()) {
          return this.__items[this.__items.length - 1];
        } else {
          return null;
        }
      };
      OutputLine.prototype.push = function(item) {
        this.__items.push(item);
        var last_newline_index = item.lastIndexOf("\n");
        if (last_newline_index !== -1) {
          this.__character_count = item.length - last_newline_index;
        } else {
          this.__character_count += item.length;
        }
      };
      OutputLine.prototype.pop = function() {
        var item = null;
        if (!this.is_empty()) {
          item = this.__items.pop();
          this.__character_count -= item.length;
        }
        return item;
      };
      OutputLine.prototype._remove_indent = function() {
        if (this.__indent_count > 0) {
          this.__indent_count -= 1;
          this.__character_count -= this.__parent.indent_size;
        }
      };
      OutputLine.prototype._remove_wrap_indent = function() {
        if (this.__wrap_point_indent_count > 0) {
          this.__wrap_point_indent_count -= 1;
        }
      };
      OutputLine.prototype.trim = function() {
        while (this.last() === " ") {
          this.__items.pop();
          this.__character_count -= 1;
        }
      };
      OutputLine.prototype.toString = function() {
        var result = "";
        if (this.is_empty()) {
          if (this.__parent.indent_empty_lines) {
            result = this.__parent.get_indent_string(this.__indent_count);
          }
        } else {
          result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
          result += this.__items.join("");
        }
        return result;
      };
      function IndentStringCache(options, baseIndentString) {
        this.__cache = [""];
        this.__indent_size = options.indent_size;
        this.__indent_string = options.indent_char;
        if (!options.indent_with_tabs) {
          this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
        }
        baseIndentString = baseIndentString || "";
        if (options.indent_level > 0) {
          baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
        }
        this.__base_string = baseIndentString;
        this.__base_string_length = baseIndentString.length;
      }
      IndentStringCache.prototype.get_indent_size = function(indent, column) {
        var result = this.__base_string_length;
        column = column || 0;
        if (indent < 0) {
          result = 0;
        }
        result += indent * this.__indent_size;
        result += column;
        return result;
      };
      IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
        var result = this.__base_string;
        column = column || 0;
        if (indent_level < 0) {
          indent_level = 0;
          result = "";
        }
        column += indent_level * this.__indent_size;
        this.__ensure_cache(column);
        result += this.__cache[column];
        return result;
      };
      IndentStringCache.prototype.__ensure_cache = function(column) {
        while (column >= this.__cache.length) {
          this.__add_column();
        }
      };
      IndentStringCache.prototype.__add_column = function() {
        var column = this.__cache.length;
        var indent = 0;
        var result = "";
        if (this.__indent_size && column >= this.__indent_size) {
          indent = Math.floor(column / this.__indent_size);
          column -= indent * this.__indent_size;
          result = new Array(indent + 1).join(this.__indent_string);
        }
        if (column) {
          result += new Array(column + 1).join(" ");
        }
        this.__cache.push(result);
      };
      function Output(options, baseIndentString) {
        this.__indent_cache = new IndentStringCache(options, baseIndentString);
        this.raw = false;
        this._end_with_newline = options.end_with_newline;
        this.indent_size = options.indent_size;
        this.wrap_line_length = options.wrap_line_length;
        this.indent_empty_lines = options.indent_empty_lines;
        this.__lines = [];
        this.previous_line = null;
        this.current_line = null;
        this.next_line = new OutputLine(this);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = false;
        this.__add_outputline();
      }
      Output.prototype.__add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = this.next_line.clone_empty();
        this.__lines.push(this.current_line);
      };
      Output.prototype.get_line_number = function() {
        return this.__lines.length;
      };
      Output.prototype.get_indent_string = function(indent, column) {
        return this.__indent_cache.get_indent_string(indent, column);
      };
      Output.prototype.get_indent_size = function(indent, column) {
        return this.__indent_cache.get_indent_size(indent, column);
      };
      Output.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      };
      Output.prototype.add_new_line = function(force_newline) {
        if (this.is_empty() || !force_newline && this.just_added_newline()) {
          return false;
        }
        if (!this.raw) {
          this.__add_outputline();
        }
        return true;
      };
      Output.prototype.get_code = function(eol) {
        this.trim(true);
        var last_item = this.current_line.pop();
        if (last_item) {
          if (last_item[last_item.length - 1] === "\n") {
            last_item = last_item.replace(/\n+$/g, "");
          }
          this.current_line.push(last_item);
        }
        if (this._end_with_newline) {
          this.__add_outputline();
        }
        var sweet_code = this.__lines.join("\n");
        if (eol !== "\n") {
          sweet_code = sweet_code.replace(/[\n]/g, eol);
        }
        return sweet_code;
      };
      Output.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      };
      Output.prototype.set_indent = function(indent, alignment) {
        indent = indent || 0;
        alignment = alignment || 0;
        this.next_line.set_indent(indent, alignment);
        if (this.__lines.length > 1) {
          this.current_line.set_indent(indent, alignment);
          return true;
        }
        this.current_line.set_indent();
        return false;
      };
      Output.prototype.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
          this.__add_outputline();
        }
        this.current_line.set_indent(-1);
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = false;
      };
      Output.prototype.add_token = function(printable_token) {
        this.__add_space_before_token();
        this.current_line.push(printable_token);
        this.space_before_token = false;
        this.non_breaking_space = false;
        this.previous_token_wrapped = this.current_line._allow_wrap();
      };
      Output.prototype.__add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
          if (!this.non_breaking_space) {
            this.set_wrap_point();
          }
          this.current_line.push(" ");
        }
      };
      Output.prototype.remove_indent = function(index) {
        var output_length = this.__lines.length;
        while (index < output_length) {
          this.__lines[index]._remove_indent();
          index++;
        }
        this.current_line._remove_wrap_indent();
      };
      Output.prototype.trim = function(eat_newlines) {
        eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
        this.current_line.trim();
        while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
          this.__lines.pop();
          this.current_line = this.__lines[this.__lines.length - 1];
          this.current_line.trim();
        }
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      };
      Output.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      };
      Output.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      };
      Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
        var index = this.__lines.length - 2;
        while (index >= 0) {
          var potentialEmptyLine = this.__lines[index];
          if (potentialEmptyLine.is_empty()) {
            break;
          } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
            this.__lines.splice(index + 1, 0, new OutputLine(this));
            this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          index--;
        }
      };
      module.exports.Output = Output;
    },
    /* 3 */
    /***/
    function(module) {
      function Token(type, text, newlines, whitespace_before) {
        this.type = type;
        this.text = text;
        this.comments_before = null;
        this.newlines = newlines || 0;
        this.whitespace_before = whitespace_before || "";
        this.parent = null;
        this.next = null;
        this.previous = null;
        this.opened = null;
        this.closed = null;
        this.directives = null;
      }
      module.exports.Token = Token;
    },
    ,
    ,
    /* 6 */
    /***/
    function(module) {
      function Options(options, merge_child_field) {
        this.raw_options = _mergeOpts(options, merge_child_field);
        this.disabled = this._get_boolean("disabled");
        this.eol = this._get_characters("eol", "auto");
        this.end_with_newline = this._get_boolean("end_with_newline");
        this.indent_size = this._get_number("indent_size", 4);
        this.indent_char = this._get_characters("indent_char", " ");
        this.indent_level = this._get_number("indent_level");
        this.preserve_newlines = this._get_boolean("preserve_newlines", true);
        this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
        if (!this.preserve_newlines) {
          this.max_preserve_newlines = 0;
        }
        this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
        if (this.indent_with_tabs) {
          this.indent_char = "	";
          if (this.indent_size === 1) {
            this.indent_size = 4;
          }
        }
        this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
        this.indent_empty_lines = this._get_boolean("indent_empty_lines");
        this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      Options.prototype._get_array = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = default_value || [];
        if (typeof option_value === "object") {
          if (option_value !== null && typeof option_value.concat === "function") {
            result = option_value.concat();
          }
        } else if (typeof option_value === "string") {
          result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
        }
        return result;
      };
      Options.prototype._get_boolean = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = option_value === void 0 ? !!default_value : !!option_value;
        return result;
      };
      Options.prototype._get_characters = function(name, default_value) {
        var option_value = this.raw_options[name];
        var result = default_value || "";
        if (typeof option_value === "string") {
          result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
        }
        return result;
      };
      Options.prototype._get_number = function(name, default_value) {
        var option_value = this.raw_options[name];
        default_value = parseInt(default_value, 10);
        if (isNaN(default_value)) {
          default_value = 0;
        }
        var result = parseInt(option_value, 10);
        if (isNaN(result)) {
          result = default_value;
        }
        return result;
      };
      Options.prototype._get_selection = function(name, selection_list, default_value) {
        var result = this._get_selection_list(name, selection_list, default_value);
        if (result.length !== 1) {
          throw new Error(
            "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
          );
        }
        return result[0];
      };
      Options.prototype._get_selection_list = function(name, selection_list, default_value) {
        if (!selection_list || selection_list.length === 0) {
          throw new Error("Selection list cannot be empty.");
        }
        default_value = default_value || [selection_list[0]];
        if (!this._is_valid_selection(default_value, selection_list)) {
          throw new Error("Invalid Default Value!");
        }
        var result = this._get_array(name, default_value);
        if (!this._is_valid_selection(result, selection_list)) {
          throw new Error(
            "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'"
          );
        }
        return result;
      };
      Options.prototype._is_valid_selection = function(result, selection_list) {
        return result.length && selection_list.length && !result.some(function(item) {
          return selection_list.indexOf(item) === -1;
        });
      };
      function _mergeOpts(allOptions, childFieldName) {
        var finalOpts = {};
        allOptions = _normalizeOpts(allOptions);
        var name;
        for (name in allOptions) {
          if (name !== childFieldName) {
            finalOpts[name] = allOptions[name];
          }
        }
        if (childFieldName && allOptions[childFieldName]) {
          for (name in allOptions[childFieldName]) {
            finalOpts[name] = allOptions[childFieldName][name];
          }
        }
        return finalOpts;
      }
      function _normalizeOpts(options) {
        var convertedOpts = {};
        var key;
        for (key in options) {
          var newKey = key.replace(/-/g, "_");
          convertedOpts[newKey] = options[key];
        }
        return convertedOpts;
      }
      module.exports.Options = Options;
      module.exports.normalizeOpts = _normalizeOpts;
      module.exports.mergeOpts = _mergeOpts;
    },
    ,
    /* 8 */
    /***/
    function(module) {
      var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
      function InputScanner(input_string) {
        this.__input = input_string || "";
        this.__input_length = this.__input.length;
        this.__position = 0;
      }
      InputScanner.prototype.restart = function() {
        this.__position = 0;
      };
      InputScanner.prototype.back = function() {
        if (this.__position > 0) {
          this.__position -= 1;
        }
      };
      InputScanner.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      };
      InputScanner.prototype.next = function() {
        var val = null;
        if (this.hasNext()) {
          val = this.__input.charAt(this.__position);
          this.__position += 1;
        }
        return val;
      };
      InputScanner.prototype.peek = function(index) {
        var val = null;
        index = index || 0;
        index += this.__position;
        if (index >= 0 && index < this.__input_length) {
          val = this.__input.charAt(index);
        }
        return val;
      };
      InputScanner.prototype.__match = function(pattern, index) {
        pattern.lastIndex = index;
        var pattern_match = pattern.exec(this.__input);
        if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
          if (pattern_match.index !== index) {
            pattern_match = null;
          }
        }
        return pattern_match;
      };
      InputScanner.prototype.test = function(pattern, index) {
        index = index || 0;
        index += this.__position;
        if (index >= 0 && index < this.__input_length) {
          return !!this.__match(pattern, index);
        } else {
          return false;
        }
      };
      InputScanner.prototype.testChar = function(pattern, index) {
        var val = this.peek(index);
        pattern.lastIndex = 0;
        return val !== null && pattern.test(val);
      };
      InputScanner.prototype.match = function(pattern) {
        var pattern_match = this.__match(pattern, this.__position);
        if (pattern_match) {
          this.__position += pattern_match[0].length;
        } else {
          pattern_match = null;
        }
        return pattern_match;
      };
      InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
        var val = "";
        var match;
        if (starting_pattern) {
          match = this.match(starting_pattern);
          if (match) {
            val += match[0];
          }
        }
        if (until_pattern && (match || !starting_pattern)) {
          val += this.readUntil(until_pattern, until_after);
        }
        return val;
      };
      InputScanner.prototype.readUntil = function(pattern, until_after) {
        var val = "";
        var match_index = this.__position;
        pattern.lastIndex = this.__position;
        var pattern_match = pattern.exec(this.__input);
        if (pattern_match) {
          match_index = pattern_match.index;
          if (until_after) {
            match_index += pattern_match[0].length;
          }
        } else {
          match_index = this.__input_length;
        }
        val = this.__input.substring(this.__position, match_index);
        this.__position = match_index;
        return val;
      };
      InputScanner.prototype.readUntilAfter = function(pattern) {
        return this.readUntil(pattern, true);
      };
      InputScanner.prototype.get_regexp = function(pattern, match_from) {
        var result = null;
        var flags = "g";
        if (match_from && regexp_has_sticky) {
          flags = "y";
        }
        if (typeof pattern === "string" && pattern !== "") {
          result = new RegExp(pattern, flags);
        } else if (pattern) {
          result = new RegExp(pattern.source, flags);
        }
        return result;
      };
      InputScanner.prototype.get_literal_regexp = function(literal_string) {
        return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      };
      InputScanner.prototype.peekUntilAfter = function(pattern) {
        var start = this.__position;
        var val = this.readUntilAfter(pattern);
        this.__position = start;
        return val;
      };
      InputScanner.prototype.lookBack = function(testVal) {
        var start = this.__position - 1;
        return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
      };
      module.exports.InputScanner = InputScanner;
    },
    /* 9 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var InputScanner = __webpack_require__2(8).InputScanner;
      var Token = __webpack_require__2(3).Token;
      var TokenStream = __webpack_require__2(10).TokenStream;
      var WhitespacePattern = __webpack_require__2(11).WhitespacePattern;
      var TOKEN = {
        START: "TK_START",
        RAW: "TK_RAW",
        EOF: "TK_EOF"
      };
      var Tokenizer = function(input_string, options) {
        this._input = new InputScanner(input_string);
        this._options = options || {};
        this.__tokens = null;
        this._patterns = {};
        this._patterns.whitespace = new WhitespacePattern(this._input);
      };
      Tokenizer.prototype.tokenize = function() {
        this._input.restart();
        this.__tokens = new TokenStream();
        this._reset();
        var current;
        var previous = new Token(TOKEN.START, "");
        var open_token = null;
        var open_stack = [];
        var comments = new TokenStream();
        while (previous.type !== TOKEN.EOF) {
          current = this._get_next_token(previous, open_token);
          while (this._is_comment(current)) {
            comments.add(current);
            current = this._get_next_token(previous, open_token);
          }
          if (!comments.isEmpty()) {
            current.comments_before = comments;
            comments = new TokenStream();
          }
          current.parent = open_token;
          if (this._is_opening(current)) {
            open_stack.push(open_token);
            open_token = current;
          } else if (open_token && this._is_closing(current, open_token)) {
            current.opened = open_token;
            open_token.closed = current;
            open_token = open_stack.pop();
            current.parent = open_token;
          }
          current.previous = previous;
          previous.next = current;
          this.__tokens.add(current);
          previous = current;
        }
        return this.__tokens;
      };
      Tokenizer.prototype._is_first_token = function() {
        return this.__tokens.isEmpty();
      };
      Tokenizer.prototype._reset = function() {
      };
      Tokenizer.prototype._get_next_token = function(previous_token, open_token) {
        this._readWhitespace();
        var resulting_string = this._input.read(/.+/g);
        if (resulting_string) {
          return this._create_token(TOKEN.RAW, resulting_string);
        } else {
          return this._create_token(TOKEN.EOF, "");
        }
      };
      Tokenizer.prototype._is_comment = function(current_token) {
        return false;
      };
      Tokenizer.prototype._is_opening = function(current_token) {
        return false;
      };
      Tokenizer.prototype._is_closing = function(current_token, open_token) {
        return false;
      };
      Tokenizer.prototype._create_token = function(type, text) {
        var token = new Token(
          type,
          text,
          this._patterns.whitespace.newline_count,
          this._patterns.whitespace.whitespace_before_token
        );
        return token;
      };
      Tokenizer.prototype._readWhitespace = function() {
        return this._patterns.whitespace.read();
      };
      module.exports.Tokenizer = Tokenizer;
      module.exports.TOKEN = TOKEN;
    },
    /* 10 */
    /***/
    function(module) {
      function TokenStream(parent_token) {
        this.__tokens = [];
        this.__tokens_length = this.__tokens.length;
        this.__position = 0;
        this.__parent_token = parent_token;
      }
      TokenStream.prototype.restart = function() {
        this.__position = 0;
      };
      TokenStream.prototype.isEmpty = function() {
        return this.__tokens_length === 0;
      };
      TokenStream.prototype.hasNext = function() {
        return this.__position < this.__tokens_length;
      };
      TokenStream.prototype.next = function() {
        var val = null;
        if (this.hasNext()) {
          val = this.__tokens[this.__position];
          this.__position += 1;
        }
        return val;
      };
      TokenStream.prototype.peek = function(index) {
        var val = null;
        index = index || 0;
        index += this.__position;
        if (index >= 0 && index < this.__tokens_length) {
          val = this.__tokens[index];
        }
        return val;
      };
      TokenStream.prototype.add = function(token) {
        if (this.__parent_token) {
          token.parent = this.__parent_token;
        }
        this.__tokens.push(token);
        this.__tokens_length += 1;
      };
      module.exports.TokenStream = TokenStream;
    },
    /* 11 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Pattern = __webpack_require__2(12).Pattern;
      function WhitespacePattern(input_scanner, parent) {
        Pattern.call(this, input_scanner, parent);
        if (parent) {
          this._line_regexp = this._input.get_regexp(parent._line_regexp);
        } else {
          this.__set_whitespace_patterns("", "");
        }
        this.newline_count = 0;
        this.whitespace_before_token = "";
      }
      WhitespacePattern.prototype = new Pattern();
      WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
        whitespace_chars += "\\t ";
        newline_chars += "\\n\\r";
        this._match_pattern = this._input.get_regexp(
          "[" + whitespace_chars + newline_chars + "]+",
          true
        );
        this._newline_regexp = this._input.get_regexp(
          "\\r\\n|[" + newline_chars + "]"
        );
      };
      WhitespacePattern.prototype.read = function() {
        this.newline_count = 0;
        this.whitespace_before_token = "";
        var resulting_string = this._input.read(this._match_pattern);
        if (resulting_string === " ") {
          this.whitespace_before_token = " ";
        } else if (resulting_string) {
          var matches = this.__split(this._newline_regexp, resulting_string);
          this.newline_count = matches.length - 1;
          this.whitespace_before_token = matches[this.newline_count];
        }
        return resulting_string;
      };
      WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
        var result = this._create();
        result.__set_whitespace_patterns(whitespace_chars, newline_chars);
        result._update();
        return result;
      };
      WhitespacePattern.prototype._create = function() {
        return new WhitespacePattern(this._input, this);
      };
      WhitespacePattern.prototype.__split = function(regexp, input_string) {
        regexp.lastIndex = 0;
        var start_index = 0;
        var result = [];
        var next_match = regexp.exec(input_string);
        while (next_match) {
          result.push(input_string.substring(start_index, next_match.index));
          start_index = next_match.index + next_match[0].length;
          next_match = regexp.exec(input_string);
        }
        if (start_index < input_string.length) {
          result.push(input_string.substring(start_index, input_string.length));
        } else {
          result.push("");
        }
        return result;
      };
      module.exports.WhitespacePattern = WhitespacePattern;
    },
    /* 12 */
    /***/
    function(module) {
      function Pattern(input_scanner, parent) {
        this._input = input_scanner;
        this._starting_pattern = null;
        this._match_pattern = null;
        this._until_pattern = null;
        this._until_after = false;
        if (parent) {
          this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
          this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
          this._until_pattern = this._input.get_regexp(parent._until_pattern);
          this._until_after = parent._until_after;
        }
      }
      Pattern.prototype.read = function() {
        var result = this._input.read(this._starting_pattern);
        if (!this._starting_pattern || result) {
          result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
        }
        return result;
      };
      Pattern.prototype.read_match = function() {
        return this._input.match(this._match_pattern);
      };
      Pattern.prototype.until_after = function(pattern) {
        var result = this._create();
        result._until_after = true;
        result._until_pattern = this._input.get_regexp(pattern);
        result._update();
        return result;
      };
      Pattern.prototype.until = function(pattern) {
        var result = this._create();
        result._until_after = false;
        result._until_pattern = this._input.get_regexp(pattern);
        result._update();
        return result;
      };
      Pattern.prototype.starting_with = function(pattern) {
        var result = this._create();
        result._starting_pattern = this._input.get_regexp(pattern, true);
        result._update();
        return result;
      };
      Pattern.prototype.matching = function(pattern) {
        var result = this._create();
        result._match_pattern = this._input.get_regexp(pattern, true);
        result._update();
        return result;
      };
      Pattern.prototype._create = function() {
        return new Pattern(this._input, this);
      };
      Pattern.prototype._update = function() {
      };
      module.exports.Pattern = Pattern;
    },
    /* 13 */
    /***/
    function(module) {
      function Directives(start_block_pattern, end_block_pattern) {
        start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
        end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
        this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
        this.__directive_pattern = / (\w+)[:](\w+)/g;
        this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
      }
      Directives.prototype.get_directives = function(text) {
        if (!text.match(this.__directives_block_pattern)) {
          return null;
        }
        var directives = {};
        this.__directive_pattern.lastIndex = 0;
        var directive_match = this.__directive_pattern.exec(text);
        while (directive_match) {
          directives[directive_match[1]] = directive_match[2];
          directive_match = this.__directive_pattern.exec(text);
        }
        return directives;
      };
      Directives.prototype.readIgnored = function(input) {
        return input.readUntilAfter(this.__directives_end_ignore_pattern);
      };
      module.exports.Directives = Directives;
    },
    /* 14 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Pattern = __webpack_require__2(12).Pattern;
      var template_names = {
        django: false,
        erb: false,
        handlebars: false,
        php: false,
        smarty: false,
        angular: false
      };
      function TemplatablePattern(input_scanner, parent) {
        Pattern.call(this, input_scanner, parent);
        this.__template_pattern = null;
        this._disabled = Object.assign({}, template_names);
        this._excluded = Object.assign({}, template_names);
        if (parent) {
          this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
          this._excluded = Object.assign(this._excluded, parent._excluded);
          this._disabled = Object.assign(this._disabled, parent._disabled);
        }
        var pattern = new Pattern(input_scanner);
        this.__patterns = {
          handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
          handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
          handlebars: pattern.starting_with(/{{/).until_after(/}}/),
          php: pattern.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
          erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
          // django coflicts with handlebars a bit.
          django: pattern.starting_with(/{%/).until_after(/%}/),
          django_value: pattern.starting_with(/{{/).until_after(/}}/),
          django_comment: pattern.starting_with(/{#/).until_after(/#}/),
          smarty: pattern.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
          smarty_comment: pattern.starting_with(/{\*/).until_after(/\*}/),
          smarty_literal: pattern.starting_with(/{literal}/).until_after(/{\/literal}/)
        };
      }
      TemplatablePattern.prototype = new Pattern();
      TemplatablePattern.prototype._create = function() {
        return new TemplatablePattern(this._input, this);
      };
      TemplatablePattern.prototype._update = function() {
        this.__set_templated_pattern();
      };
      TemplatablePattern.prototype.disable = function(language) {
        var result = this._create();
        result._disabled[language] = true;
        result._update();
        return result;
      };
      TemplatablePattern.prototype.read_options = function(options) {
        var result = this._create();
        for (var language in template_names) {
          result._disabled[language] = options.templating.indexOf(language) === -1;
        }
        result._update();
        return result;
      };
      TemplatablePattern.prototype.exclude = function(language) {
        var result = this._create();
        result._excluded[language] = true;
        result._update();
        return result;
      };
      TemplatablePattern.prototype.read = function() {
        var result = "";
        if (this._match_pattern) {
          result = this._input.read(this._starting_pattern);
        } else {
          result = this._input.read(this._starting_pattern, this.__template_pattern);
        }
        var next = this._read_template();
        while (next) {
          if (this._match_pattern) {
            next += this._input.read(this._match_pattern);
          } else {
            next += this._input.readUntil(this.__template_pattern);
          }
          result += next;
          next = this._read_template();
        }
        if (this._until_after) {
          result += this._input.readUntilAfter(this._until_pattern);
        }
        return result;
      };
      TemplatablePattern.prototype.__set_templated_pattern = function() {
        var items = [];
        if (!this._disabled.php) {
          items.push(this.__patterns.php._starting_pattern.source);
        }
        if (!this._disabled.handlebars) {
          items.push(this.__patterns.handlebars._starting_pattern.source);
        }
        if (!this._disabled.erb) {
          items.push(this.__patterns.erb._starting_pattern.source);
        }
        if (!this._disabled.django) {
          items.push(this.__patterns.django._starting_pattern.source);
          items.push(this.__patterns.django_value._starting_pattern.source);
          items.push(this.__patterns.django_comment._starting_pattern.source);
        }
        if (!this._disabled.smarty) {
          items.push(this.__patterns.smarty._starting_pattern.source);
        }
        if (this._until_pattern) {
          items.push(this._until_pattern.source);
        }
        this.__template_pattern = this._input.get_regexp("(?:" + items.join("|") + ")");
      };
      TemplatablePattern.prototype._read_template = function() {
        var resulting_string = "";
        var c = this._input.peek();
        if (c === "<") {
          var peek1 = this._input.peek(1);
          if (!this._disabled.php && !this._excluded.php && peek1 === "?") {
            resulting_string = resulting_string || this.__patterns.php.read();
          }
          if (!this._disabled.erb && !this._excluded.erb && peek1 === "%") {
            resulting_string = resulting_string || this.__patterns.erb.read();
          }
        } else if (c === "{") {
          if (!this._disabled.handlebars && !this._excluded.handlebars) {
            resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
            resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
            resulting_string = resulting_string || this.__patterns.handlebars.read();
          }
          if (!this._disabled.django) {
            if (!this._excluded.django && !this._excluded.handlebars) {
              resulting_string = resulting_string || this.__patterns.django_value.read();
            }
            if (!this._excluded.django) {
              resulting_string = resulting_string || this.__patterns.django_comment.read();
              resulting_string = resulting_string || this.__patterns.django.read();
            }
          }
          if (!this._disabled.smarty) {
            if (this._disabled.django && this._disabled.handlebars) {
              resulting_string = resulting_string || this.__patterns.smarty_comment.read();
              resulting_string = resulting_string || this.__patterns.smarty_literal.read();
              resulting_string = resulting_string || this.__patterns.smarty.read();
            }
          }
        }
        return resulting_string;
      };
      module.exports.TemplatablePattern = TemplatablePattern;
    },
    ,
    ,
    ,
    /* 18 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Beautifier = __webpack_require__2(19).Beautifier, Options = __webpack_require__2(20).Options;
      function style_html(html_source, options, js_beautify2, css_beautify2) {
        var beautifier = new Beautifier(html_source, options, js_beautify2, css_beautify2);
        return beautifier.beautify();
      }
      module.exports = style_html;
      module.exports.defaultOptions = function() {
        return new Options();
      };
    },
    /* 19 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var Options = __webpack_require__2(20).Options;
      var Output = __webpack_require__2(2).Output;
      var Tokenizer = __webpack_require__2(21).Tokenizer;
      var TOKEN = __webpack_require__2(21).TOKEN;
      var lineBreak = /\r\n|[\r\n]/;
      var allLineBreaks = /\r\n|[\r\n]/g;
      var Printer = function(options, base_indent_string) {
        this.indent_level = 0;
        this.alignment_size = 0;
        this.max_preserve_newlines = options.max_preserve_newlines;
        this.preserve_newlines = options.preserve_newlines;
        this._output = new Output(options, base_indent_string);
      };
      Printer.prototype.current_line_has_match = function(pattern) {
        return this._output.current_line.has_match(pattern);
      };
      Printer.prototype.set_space_before_token = function(value, non_breaking) {
        this._output.space_before_token = value;
        this._output.non_breaking_space = non_breaking;
      };
      Printer.prototype.set_wrap_point = function() {
        this._output.set_indent(this.indent_level, this.alignment_size);
        this._output.set_wrap_point();
      };
      Printer.prototype.add_raw_token = function(token) {
        this._output.add_raw_token(token);
      };
      Printer.prototype.print_preserved_newlines = function(raw_token) {
        var newlines = 0;
        if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
          newlines = raw_token.newlines ? 1 : 0;
        }
        if (this.preserve_newlines) {
          newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
        }
        for (var n = 0; n < newlines; n++) {
          this.print_newline(n > 0);
        }
        return newlines !== 0;
      };
      Printer.prototype.traverse_whitespace = function(raw_token) {
        if (raw_token.whitespace_before || raw_token.newlines) {
          if (!this.print_preserved_newlines(raw_token)) {
            this._output.space_before_token = true;
          }
          return true;
        }
        return false;
      };
      Printer.prototype.previous_token_wrapped = function() {
        return this._output.previous_token_wrapped;
      };
      Printer.prototype.print_newline = function(force) {
        this._output.add_new_line(force);
      };
      Printer.prototype.print_token = function(token) {
        if (token.text) {
          this._output.set_indent(this.indent_level, this.alignment_size);
          this._output.add_token(token.text);
        }
      };
      Printer.prototype.indent = function() {
        this.indent_level++;
      };
      Printer.prototype.deindent = function() {
        if (this.indent_level > 0) {
          this.indent_level--;
          this._output.set_indent(this.indent_level, this.alignment_size);
        }
      };
      Printer.prototype.get_full_indent = function(level) {
        level = this.indent_level + (level || 0);
        if (level < 1) {
          return "";
        }
        return this._output.get_indent_string(level);
      };
      var get_type_attribute = function(start_token) {
        var result = null;
        var raw_token = start_token.next;
        while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
          if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === "type") {
            if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
              result = raw_token.next.next.text;
            }
            break;
          }
          raw_token = raw_token.next;
        }
        return result;
      };
      var get_custom_beautifier_name = function(tag_check, raw_token) {
        var typeAttribute = null;
        var result = null;
        if (!raw_token.closed) {
          return null;
        }
        if (tag_check === "script") {
          typeAttribute = "text/javascript";
        } else if (tag_check === "style") {
          typeAttribute = "text/css";
        }
        typeAttribute = get_type_attribute(raw_token) || typeAttribute;
        if (typeAttribute.search("text/css") > -1) {
          result = "css";
        } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
          result = "javascript";
        } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
          result = "html";
        } else if (typeAttribute.search(/test\/null/) > -1) {
          result = "null";
        }
        return result;
      };
      function in_array(what, arr) {
        return arr.indexOf(what) !== -1;
      }
      function TagFrame(parent, parser_token, indent_level) {
        this.parent = parent || null;
        this.tag = parser_token ? parser_token.tag_name : "";
        this.indent_level = indent_level || 0;
        this.parser_token = parser_token || null;
      }
      function TagStack(printer) {
        this._printer = printer;
        this._current_frame = null;
      }
      TagStack.prototype.get_parser_token = function() {
        return this._current_frame ? this._current_frame.parser_token : null;
      };
      TagStack.prototype.record_tag = function(parser_token) {
        var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
        this._current_frame = new_frame;
      };
      TagStack.prototype._try_pop_frame = function(frame) {
        var parser_token = null;
        if (frame) {
          parser_token = frame.parser_token;
          this._printer.indent_level = frame.indent_level;
          this._current_frame = frame.parent;
        }
        return parser_token;
      };
      TagStack.prototype._get_frame = function(tag_list, stop_list) {
        var frame = this._current_frame;
        while (frame) {
          if (tag_list.indexOf(frame.tag) !== -1) {
            break;
          } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
            frame = null;
            break;
          }
          frame = frame.parent;
        }
        return frame;
      };
      TagStack.prototype.try_pop = function(tag, stop_list) {
        var frame = this._get_frame([tag], stop_list);
        return this._try_pop_frame(frame);
      };
      TagStack.prototype.indent_to_tag = function(tag_list) {
        var frame = this._get_frame(tag_list);
        if (frame) {
          this._printer.indent_level = frame.indent_level;
        }
      };
      function Beautifier(source_text, options, js_beautify2, css_beautify2) {
        this._source_text = source_text || "";
        options = options || {};
        this._js_beautify = js_beautify2;
        this._css_beautify = css_beautify2;
        this._tag_stack = null;
        var optionHtml = new Options(options, "html");
        this._options = optionHtml;
        this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, "force".length) === "force";
        this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline";
        this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned";
        this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple";
        this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, "preserve".length) === "preserve";
        this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
      }
      Beautifier.prototype.beautify = function() {
        if (this._options.disabled) {
          return this._source_text;
        }
        var source_text = this._source_text;
        var eol = this._options.eol;
        if (this._options.eol === "auto") {
          eol = "\n";
          if (source_text && lineBreak.test(source_text)) {
            eol = source_text.match(lineBreak)[0];
          }
        }
        source_text = source_text.replace(allLineBreaks, "\n");
        var baseIndentString = source_text.match(/^[\t ]*/)[0];
        var last_token = {
          text: "",
          type: ""
        };
        var last_tag_token = new TagOpenParserToken();
        var printer = new Printer(this._options, baseIndentString);
        var tokens = new Tokenizer(source_text, this._options).tokenize();
        this._tag_stack = new TagStack(printer);
        var parser_token = null;
        var raw_token = tokens.next();
        while (raw_token.type !== TOKEN.EOF) {
          if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
            parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token, tokens);
            last_tag_token = parser_token;
          } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
            parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, last_token);
          } else if (raw_token.type === TOKEN.TAG_CLOSE) {
            parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
          } else if (raw_token.type === TOKEN.TEXT) {
            parser_token = this._handle_text(printer, raw_token, last_tag_token);
          } else if (raw_token.type === TOKEN.CONTROL_FLOW_OPEN) {
            parser_token = this._handle_control_flow_open(printer, raw_token);
          } else if (raw_token.type === TOKEN.CONTROL_FLOW_CLOSE) {
            parser_token = this._handle_control_flow_close(printer, raw_token);
          } else {
            printer.add_raw_token(raw_token);
          }
          last_token = parser_token;
          raw_token = tokens.next();
        }
        var sweet_code = printer._output.get_code(eol);
        return sweet_code;
      };
      Beautifier.prototype._handle_control_flow_open = function(printer, raw_token) {
        var parser_token = {
          text: raw_token.text,
          type: raw_token.type
        };
        printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
        if (raw_token.newlines) {
          printer.print_preserved_newlines(raw_token);
        } else {
          printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
        }
        printer.print_token(raw_token);
        printer.indent();
        return parser_token;
      };
      Beautifier.prototype._handle_control_flow_close = function(printer, raw_token) {
        var parser_token = {
          text: raw_token.text,
          type: raw_token.type
        };
        printer.deindent();
        if (raw_token.newlines) {
          printer.print_preserved_newlines(raw_token);
        } else {
          printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
        }
        printer.print_token(raw_token);
        return parser_token;
      };
      Beautifier.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
        var parser_token = {
          text: raw_token.text,
          type: raw_token.type
        };
        printer.alignment_size = 0;
        last_tag_token.tag_complete = true;
        printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
        if (last_tag_token.is_unformatted) {
          printer.add_raw_token(raw_token);
        } else {
          if (last_tag_token.tag_start_char === "<") {
            printer.set_space_before_token(raw_token.text[0] === "/", true);
            if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
              printer.print_newline(false);
            }
          }
          printer.print_token(raw_token);
        }
        if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
          printer.indent();
          last_tag_token.indent_content = false;
        }
        if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
          printer.set_wrap_point();
        }
        return parser_token;
      };
      Beautifier.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, last_token) {
        var wrapped = last_tag_token.has_wrapped_attrs;
        var parser_token = {
          text: raw_token.text,
          type: raw_token.type
        };
        printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
        if (last_tag_token.is_unformatted) {
          printer.add_raw_token(raw_token);
        } else if (last_tag_token.tag_start_char === "{" && raw_token.type === TOKEN.TEXT) {
          if (printer.print_preserved_newlines(raw_token)) {
            raw_token.newlines = 0;
            printer.add_raw_token(raw_token);
          } else {
            printer.print_token(raw_token);
          }
        } else {
          if (raw_token.type === TOKEN.ATTRIBUTE) {
            printer.set_space_before_token(true);
          } else if (raw_token.type === TOKEN.EQUALS) {
            printer.set_space_before_token(false);
          } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
            printer.set_space_before_token(false);
          }
          if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === "<") {
            if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
              printer.traverse_whitespace(raw_token);
              wrapped = wrapped || raw_token.newlines !== 0;
            }
            if (this._is_wrap_attributes_force && last_tag_token.attr_count >= this._options.wrap_attributes_min_attrs && (last_token.type !== TOKEN.TAG_OPEN || // ie. second attribute and beyond
            this._is_wrap_attributes_force_expand_multiline)) {
              printer.print_newline(false);
              wrapped = true;
            }
          }
          printer.print_token(raw_token);
          wrapped = wrapped || printer.previous_token_wrapped();
          last_tag_token.has_wrapped_attrs = wrapped;
        }
        return parser_token;
      };
      Beautifier.prototype._handle_text = function(printer, raw_token, last_tag_token) {
        var parser_token = {
          text: raw_token.text,
          type: "TK_CONTENT"
        };
        if (last_tag_token.custom_beautifier_name) {
          this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
        } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
          printer.add_raw_token(raw_token);
        } else {
          printer.traverse_whitespace(raw_token);
          printer.print_token(raw_token);
        }
        return parser_token;
      };
      Beautifier.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
        var local = this;
        if (raw_token.text !== "") {
          var text = raw_token.text, _beautifier, script_indent_level = 1, pre = "", post = "";
          if (last_tag_token.custom_beautifier_name === "javascript" && typeof this._js_beautify === "function") {
            _beautifier = this._js_beautify;
          } else if (last_tag_token.custom_beautifier_name === "css" && typeof this._css_beautify === "function") {
            _beautifier = this._css_beautify;
          } else if (last_tag_token.custom_beautifier_name === "html") {
            _beautifier = function(html_source, options) {
              var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
              return beautifier.beautify();
            };
          }
          if (this._options.indent_scripts === "keep") {
            script_indent_level = 0;
          } else if (this._options.indent_scripts === "separate") {
            script_indent_level = -printer.indent_level;
          }
          var indentation = printer.get_full_indent(script_indent_level);
          text = text.replace(/\n[ \t]*$/, "");
          if (last_tag_token.custom_beautifier_name !== "html" && text[0] === "<" && text.match(/^(<!--|<!\[CDATA\[)/)) {
            var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);
            if (!matched) {
              printer.add_raw_token(raw_token);
              return;
            }
            pre = indentation + matched[1] + "\n";
            text = matched[4];
            if (matched[5]) {
              post = indentation + matched[5];
            }
            text = text.replace(/\n[ \t]*$/, "");
            if (matched[2] || matched[3].indexOf("\n") !== -1) {
              matched = matched[3].match(/[ \t]+$/);
              if (matched) {
                raw_token.whitespace_before = matched[0];
              }
            }
          }
          if (text) {
            if (_beautifier) {
              var Child_options = function() {
                this.eol = "\n";
              };
              Child_options.prototype = this._options.raw_options;
              var child_options = new Child_options();
              text = _beautifier(indentation + text, child_options);
            } else {
              var white = raw_token.whitespace_before;
              if (white) {
                text = text.replace(new RegExp("\n(" + white + ")?", "g"), "\n");
              }
              text = indentation + text.replace(/\n/g, "\n" + indentation);
            }
          }
          if (pre) {
            if (!text) {
              text = pre + post;
            } else {
              text = pre + text + "\n" + post;
            }
          }
          printer.print_newline(false);
          if (text) {
            raw_token.text = text;
            raw_token.whitespace_before = "";
            raw_token.newlines = 0;
            printer.add_raw_token(raw_token);
            printer.print_newline(true);
          }
        }
      };
      Beautifier.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token, tokens) {
        var parser_token = this._get_tag_open_token(raw_token);
        if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && !parser_token.is_start_tag) {
          printer.add_raw_token(raw_token);
          parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
        } else {
          printer.traverse_whitespace(raw_token);
          this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
          if (!parser_token.is_inline_element) {
            printer.set_wrap_point();
          }
          printer.print_token(raw_token);
        }
        if (parser_token.is_start_tag && this._is_wrap_attributes_force) {
          var peek_index = 0;
          var peek_token;
          do {
            peek_token = tokens.peek(peek_index);
            if (peek_token.type === TOKEN.ATTRIBUTE) {
              parser_token.attr_count += 1;
            }
            peek_index += 1;
          } while (peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
        }
        if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
          parser_token.alignment_size = raw_token.text.length + 1;
        }
        if (!parser_token.tag_complete && !parser_token.is_unformatted) {
          printer.alignment_size = parser_token.alignment_size;
        }
        return parser_token;
      };
      var TagOpenParserToken = function(parent, raw_token) {
        this.parent = parent || null;
        this.text = "";
        this.type = "TK_TAG_OPEN";
        this.tag_name = "";
        this.is_inline_element = false;
        this.is_unformatted = false;
        this.is_content_unformatted = false;
        this.is_empty_element = false;
        this.is_start_tag = false;
        this.is_end_tag = false;
        this.indent_content = false;
        this.multiline_content = false;
        this.custom_beautifier_name = null;
        this.start_tag_token = null;
        this.attr_count = 0;
        this.has_wrapped_attrs = false;
        this.alignment_size = 0;
        this.tag_complete = false;
        this.tag_start_char = "";
        this.tag_check = "";
        if (!raw_token) {
          this.tag_complete = true;
        } else {
          var tag_check_match;
          this.tag_start_char = raw_token.text[0];
          this.text = raw_token.text;
          if (this.tag_start_char === "<") {
            tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
            this.tag_check = tag_check_match ? tag_check_match[1] : "";
          } else {
            tag_check_match = raw_token.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/);
            this.tag_check = tag_check_match ? tag_check_match[1] : "";
            if ((raw_token.text.startsWith("{{#>") || raw_token.text.startsWith("{{~#>")) && this.tag_check[0] === ">") {
              if (this.tag_check === ">" && raw_token.next !== null) {
                this.tag_check = raw_token.next.text.split(" ")[0];
              } else {
                this.tag_check = raw_token.text.split(">")[1];
              }
            }
          }
          this.tag_check = this.tag_check.toLowerCase();
          if (raw_token.type === TOKEN.COMMENT) {
            this.tag_complete = true;
          }
          this.is_start_tag = this.tag_check.charAt(0) !== "/";
          this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
          this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === "/>";
          var handlebar_starts = 2;
          if (this.tag_start_char === "{" && this.text.length >= 3) {
            if (this.text.charAt(2) === "~") {
              handlebar_starts = 3;
            }
          }
          this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(handlebar_starts)));
        }
      };
      Beautifier.prototype._get_tag_open_token = function(raw_token) {
        var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
        parser_token.alignment_size = this._options.wrap_attributes_indent_size;
        parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
        parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
        parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
        parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
        parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || this._options.inline_custom_elements && parser_token.tag_name.includes("-") || parser_token.tag_start_char === "{";
        return parser_token;
      };
      Beautifier.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {
        if (!parser_token.is_empty_element) {
          if (parser_token.is_end_tag) {
            parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
          } else {
            if (this._do_optional_end_element(parser_token)) {
              if (!parser_token.is_inline_element) {
                printer.print_newline(false);
              }
            }
            this._tag_stack.record_tag(parser_token);
            if ((parser_token.tag_name === "script" || parser_token.tag_name === "style") && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
              parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
            }
          }
        }
        if (in_array(parser_token.tag_check, this._options.extra_liners)) {
          printer.print_newline(false);
          if (!printer._output.just_added_blankline()) {
            printer.print_newline(true);
          }
        }
        if (parser_token.is_empty_element) {
          if (parser_token.tag_start_char === "{" && parser_token.tag_check === "else") {
            this._tag_stack.indent_to_tag(["if", "unless", "each"]);
            parser_token.indent_content = true;
            var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
            if (!foundIfOnCurrentLine) {
              printer.print_newline(false);
            }
          }
          if (parser_token.tag_name === "!--" && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf("\n") === -1) {
          } else {
            if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
              printer.print_newline(false);
            }
            this._calcluate_parent_multiline(printer, parser_token);
          }
        } else if (parser_token.is_end_tag) {
          var do_end_expand = false;
          do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
          do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== "TK_CONTENT";
          if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
            do_end_expand = false;
          }
          if (do_end_expand) {
            printer.print_newline(false);
          }
        } else {
          parser_token.indent_content = !parser_token.custom_beautifier_name;
          if (parser_token.tag_start_char === "<") {
            if (parser_token.tag_name === "html") {
              parser_token.indent_content = this._options.indent_inner_html;
            } else if (parser_token.tag_name === "head") {
              parser_token.indent_content = this._options.indent_head_inner_html;
            } else if (parser_token.tag_name === "body") {
              parser_token.indent_content = this._options.indent_body_inner_html;
            }
          }
          if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== "TK_CONTENT" || parser_token.is_content_unformatted)) {
            printer.print_newline(false);
          }
          this._calcluate_parent_multiline(printer, parser_token);
        }
      };
      Beautifier.prototype._calcluate_parent_multiline = function(printer, parser_token) {
        if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
          parser_token.parent.multiline_content = true;
        }
      };
      var p_closers = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"];
      var p_parent_excludes = ["a", "audio", "del", "ins", "map", "noscript", "video"];
      Beautifier.prototype._do_optional_end_element = function(parser_token) {
        var result = null;
        if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
          return;
        }
        if (parser_token.tag_name === "body") {
          result = result || this._tag_stack.try_pop("head");
        } else if (parser_token.tag_name === "li") {
          result = result || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
        } else if (parser_token.tag_name === "dd" || parser_token.tag_name === "dt") {
          result = result || this._tag_stack.try_pop("dt", ["dl"]);
          result = result || this._tag_stack.try_pop("dd", ["dl"]);
        } else if (parser_token.parent.tag_name === "p" && p_closers.indexOf(parser_token.tag_name) !== -1) {
          var p_parent = parser_token.parent.parent;
          if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
            result = result || this._tag_stack.try_pop("p");
          }
        } else if (parser_token.tag_name === "rp" || parser_token.tag_name === "rt") {
          result = result || this._tag_stack.try_pop("rt", ["ruby", "rtc"]);
          result = result || this._tag_stack.try_pop("rp", ["ruby", "rtc"]);
        } else if (parser_token.tag_name === "optgroup") {
          result = result || this._tag_stack.try_pop("optgroup", ["select"]);
        } else if (parser_token.tag_name === "option") {
          result = result || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]);
        } else if (parser_token.tag_name === "colgroup") {
          result = result || this._tag_stack.try_pop("caption", ["table"]);
        } else if (parser_token.tag_name === "thead") {
          result = result || this._tag_stack.try_pop("caption", ["table"]);
          result = result || this._tag_stack.try_pop("colgroup", ["table"]);
        } else if (parser_token.tag_name === "tbody" || parser_token.tag_name === "tfoot") {
          result = result || this._tag_stack.try_pop("caption", ["table"]);
          result = result || this._tag_stack.try_pop("colgroup", ["table"]);
          result = result || this._tag_stack.try_pop("thead", ["table"]);
          result = result || this._tag_stack.try_pop("tbody", ["table"]);
        } else if (parser_token.tag_name === "tr") {
          result = result || this._tag_stack.try_pop("caption", ["table"]);
          result = result || this._tag_stack.try_pop("colgroup", ["table"]);
          result = result || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"]);
        } else if (parser_token.tag_name === "th" || parser_token.tag_name === "td") {
          result = result || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]);
          result = result || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]);
        }
        parser_token.parent = this._tag_stack.get_parser_token();
        return result;
      };
      module.exports.Beautifier = Beautifier;
    },
    /* 20 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var BaseOptions = __webpack_require__2(6).Options;
      function Options(options) {
        BaseOptions.call(this, options, "html");
        if (this.templating.length === 1 && this.templating[0] === "auto") {
          this.templating = ["django", "erb", "handlebars", "php"];
        }
        this.indent_inner_html = this._get_boolean("indent_inner_html");
        this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", true);
        this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", true);
        this.indent_handlebars = this._get_boolean("indent_handlebars", true);
        this.wrap_attributes = this._get_selection(
          "wrap_attributes",
          ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
        );
        this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2);
        this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size);
        this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]);
        this.inline = this._get_array("inline", [
          "a",
          "abbr",
          "area",
          "audio",
          "b",
          "bdi",
          "bdo",
          "br",
          "button",
          "canvas",
          "cite",
          "code",
          "data",
          "datalist",
          "del",
          "dfn",
          "em",
          "embed",
          "i",
          "iframe",
          "img",
          "input",
          "ins",
          "kbd",
          "keygen",
          "label",
          "map",
          "mark",
          "math",
          "meter",
          "noscript",
          "object",
          "output",
          "progress",
          "q",
          "ruby",
          "s",
          "samp",
          /* 'script', */
          "select",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "svg",
          "template",
          "textarea",
          "time",
          "u",
          "var",
          "video",
          "wbr",
          "text",
          // obsolete inline tags
          "acronym",
          "big",
          "strike",
          "tt"
        ]);
        this.inline_custom_elements = this._get_boolean("inline_custom_elements", true);
        this.void_elements = this._get_array("void_elements", [
          // HTLM void elements - aka self-closing tags - aka singletons
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "menuitem",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
          // NOTE: Optional tags are too complex for a simple list
          // they are hard coded in _do_optional_end_element
          // Doctype and xml elements
          "!doctype",
          "?xml",
          // obsolete tags
          "basefont",
          "isindex"
        ]);
        this.unformatted = this._get_array("unformatted", []);
        this.content_unformatted = this._get_array("content_unformatted", [
          "pre",
          "textarea"
        ]);
        this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter");
        this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
      }
      Options.prototype = new BaseOptions();
      module.exports.Options = Options;
    },
    /* 21 */
    /***/
    function(module, __unused_webpack_exports, __webpack_require__2) {
      var BaseTokenizer = __webpack_require__2(9).Tokenizer;
      var BASETOKEN = __webpack_require__2(9).TOKEN;
      var Directives = __webpack_require__2(13).Directives;
      var TemplatablePattern = __webpack_require__2(14).TemplatablePattern;
      var Pattern = __webpack_require__2(12).Pattern;
      var TOKEN = {
        TAG_OPEN: "TK_TAG_OPEN",
        TAG_CLOSE: "TK_TAG_CLOSE",
        CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
        CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
        ATTRIBUTE: "TK_ATTRIBUTE",
        EQUALS: "TK_EQUALS",
        VALUE: "TK_VALUE",
        COMMENT: "TK_COMMENT",
        TEXT: "TK_TEXT",
        UNKNOWN: "TK_UNKNOWN",
        START: BASETOKEN.START,
        RAW: BASETOKEN.RAW,
        EOF: BASETOKEN.EOF
      };
      var directives_core = new Directives(/<\!--/, /-->/);
      var Tokenizer = function(input_string, options) {
        BaseTokenizer.call(this, input_string, options);
        this._current_tag_name = "";
        var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
        var pattern_reader = new Pattern(this._input);
        this.__patterns = {
          word: templatable_reader.until(/[\n\r\t <]/),
          word_control_flow_close_excluded: templatable_reader.until(/[\n\r\t <}]/),
          single_quote: templatable_reader.until_after(/'/),
          double_quote: templatable_reader.until_after(/"/),
          attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
          element_name: templatable_reader.until(/[\n\r\t >\/]/),
          angular_control_flow_start: pattern_reader.matching(/\@[a-zA-Z]+[^({]*[({]/),
          handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
          handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
          handlebars_open: pattern_reader.until(/[\n\r\t }]/),
          handlebars_raw_close: pattern_reader.until(/}}/),
          comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
          cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
          conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
          processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
        };
        if (this._options.indent_handlebars) {
          this.__patterns.word = this.__patterns.word.exclude("handlebars");
          this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars");
        }
        this._unformatted_content_delimiter = null;
        if (this._options.unformatted_content_delimiter) {
          var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
          this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
        }
      };
      Tokenizer.prototype = new BaseTokenizer();
      Tokenizer.prototype._is_comment = function(current_token) {
        return false;
      };
      Tokenizer.prototype._is_opening = function(current_token) {
        return current_token.type === TOKEN.TAG_OPEN || current_token.type === TOKEN.CONTROL_FLOW_OPEN;
      };
      Tokenizer.prototype._is_closing = function(current_token, open_token) {
        return current_token.type === TOKEN.TAG_CLOSE && (open_token && ((current_token.text === ">" || current_token.text === "/>") && open_token.text[0] === "<" || current_token.text === "}}" && open_token.text[0] === "{" && open_token.text[1] === "{")) || current_token.type === TOKEN.CONTROL_FLOW_CLOSE && (current_token.text === "}" && open_token.text.endsWith("{"));
      };
      Tokenizer.prototype._reset = function() {
        this._current_tag_name = "";
      };
      Tokenizer.prototype._get_next_token = function(previous_token, open_token) {
        var token = null;
        this._readWhitespace();
        var c = this._input.peek();
        if (c === null) {
          return this._create_token(TOKEN.EOF, "");
        }
        token = token || this._read_open_handlebars(c, open_token);
        token = token || this._read_attribute(c, previous_token, open_token);
        token = token || this._read_close(c, open_token);
        token = token || this._read_control_flows(c, open_token);
        token = token || this._read_raw_content(c, previous_token, open_token);
        token = token || this._read_content_word(c, open_token);
        token = token || this._read_comment_or_cdata(c);
        token = token || this._read_processing(c);
        token = token || this._read_open(c, open_token);
        token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
        return token;
      };
      Tokenizer.prototype._read_comment_or_cdata = function(c) {
        var token = null;
        var resulting_string = null;
        var directives = null;
        if (c === "<") {
          var peek1 = this._input.peek(1);
          if (peek1 === "!") {
            resulting_string = this.__patterns.comment.read();
            if (resulting_string) {
              directives = directives_core.get_directives(resulting_string);
              if (directives && directives.ignore === "start") {
                resulting_string += directives_core.readIgnored(this._input);
              }
            } else {
              resulting_string = this.__patterns.cdata.read();
            }
          }
          if (resulting_string) {
            token = this._create_token(TOKEN.COMMENT, resulting_string);
            token.directives = directives;
          }
        }
        return token;
      };
      Tokenizer.prototype._read_processing = function(c) {
        var token = null;
        var resulting_string = null;
        var directives = null;
        if (c === "<") {
          var peek1 = this._input.peek(1);
          if (peek1 === "!" || peek1 === "?") {
            resulting_string = this.__patterns.conditional_comment.read();
            resulting_string = resulting_string || this.__patterns.processing.read();
          }
          if (resulting_string) {
            token = this._create_token(TOKEN.COMMENT, resulting_string);
            token.directives = directives;
          }
        }
        return token;
      };
      Tokenizer.prototype._read_open = function(c, open_token) {
        var resulting_string = null;
        var token = null;
        if (!open_token || open_token.type === TOKEN.CONTROL_FLOW_OPEN) {
          if (c === "<") {
            resulting_string = this._input.next();
            if (this._input.peek() === "/") {
              resulting_string += this._input.next();
            }
            resulting_string += this.__patterns.element_name.read();
            token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
          }
        }
        return token;
      };
      Tokenizer.prototype._read_open_handlebars = function(c, open_token) {
        var resulting_string = null;
        var token = null;
        if (!open_token || open_token.type === TOKEN.CONTROL_FLOW_OPEN) {
          if (this._options.indent_handlebars && c === "{" && this._input.peek(1) === "{") {
            if (this._input.peek(2) === "!") {
              resulting_string = this.__patterns.handlebars_comment.read();
              resulting_string = resulting_string || this.__patterns.handlebars.read();
              token = this._create_token(TOKEN.COMMENT, resulting_string);
            } else {
              resulting_string = this.__patterns.handlebars_open.read();
              token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
            }
          }
        }
        return token;
      };
      Tokenizer.prototype._read_control_flows = function(c, open_token) {
        var resulting_string = "";
        var token = null;
        if (!this._options.templating.includes("angular") || !this._options.indent_handlebars) {
          return token;
        }
        if (c === "@") {
          resulting_string = this.__patterns.angular_control_flow_start.read();
          if (resulting_string === "") {
            return token;
          }
          var opening_parentheses_count = resulting_string.endsWith("(") ? 1 : 0;
          var closing_parentheses_count = 0;
          while (!(resulting_string.endsWith("{") && opening_parentheses_count === closing_parentheses_count)) {
            var next_char = this._input.next();
            if (next_char === null) {
              break;
            } else if (next_char === "(") {
              opening_parentheses_count++;
            } else if (next_char === ")") {
              closing_parentheses_count++;
            }
            resulting_string += next_char;
          }
          token = this._create_token(TOKEN.CONTROL_FLOW_OPEN, resulting_string);
        } else if (c === "}" && open_token && open_token.type === TOKEN.CONTROL_FLOW_OPEN) {
          resulting_string = this._input.next();
          token = this._create_token(TOKEN.CONTROL_FLOW_CLOSE, resulting_string);
        }
        return token;
      };
      Tokenizer.prototype._read_close = function(c, open_token) {
        var resulting_string = null;
        var token = null;
        if (open_token && open_token.type === TOKEN.TAG_OPEN) {
          if (open_token.text[0] === "<" && (c === ">" || c === "/" && this._input.peek(1) === ">")) {
            resulting_string = this._input.next();
            if (c === "/") {
              resulting_string += this._input.next();
            }
            token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
          } else if (open_token.text[0] === "{" && c === "}" && this._input.peek(1) === "}") {
            this._input.next();
            this._input.next();
            token = this._create_token(TOKEN.TAG_CLOSE, "}}");
          }
        }
        return token;
      };
      Tokenizer.prototype._read_attribute = function(c, previous_token, open_token) {
        var token = null;
        var resulting_string = "";
        if (open_token && open_token.text[0] === "<") {
          if (c === "=") {
            token = this._create_token(TOKEN.EQUALS, this._input.next());
          } else if (c === '"' || c === "'") {
            var content = this._input.next();
            if (c === '"') {
              content += this.__patterns.double_quote.read();
            } else {
              content += this.__patterns.single_quote.read();
            }
            token = this._create_token(TOKEN.VALUE, content);
          } else {
            resulting_string = this.__patterns.attribute.read();
            if (resulting_string) {
              if (previous_token.type === TOKEN.EQUALS) {
                token = this._create_token(TOKEN.VALUE, resulting_string);
              } else {
                token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
              }
            }
          }
        }
        return token;
      };
      Tokenizer.prototype._is_content_unformatted = function(tag_name) {
        return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
      };
      Tokenizer.prototype._read_raw_content = function(c, previous_token, open_token) {
        var resulting_string = "";
        if (open_token && open_token.text[0] === "{") {
          resulting_string = this.__patterns.handlebars_raw_close.read();
        } else if (previous_token.type === TOKEN.TAG_CLOSE && previous_token.opened.text[0] === "<" && previous_token.text[0] !== "/") {
          var tag_name = previous_token.opened.text.substr(1).toLowerCase();
          if (tag_name === "script" || tag_name === "style") {
            var token = this._read_comment_or_cdata(c);
            if (token) {
              token.type = TOKEN.TEXT;
              return token;
            }
            resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
          } else if (this._is_content_unformatted(tag_name)) {
            resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
          }
        }
        if (resulting_string) {
          return this._create_token(TOKEN.TEXT, resulting_string);
        }
        return null;
      };
      Tokenizer.prototype._read_content_word = function(c, open_token) {
        var resulting_string = "";
        if (this._options.unformatted_content_delimiter) {
          if (c === this._options.unformatted_content_delimiter[0]) {
            resulting_string = this.__patterns.unformatted_content_delimiter.read();
          }
        }
        if (!resulting_string) {
          resulting_string = open_token && open_token.type === TOKEN.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read();
        }
        if (resulting_string) {
          return this._create_token(TOKEN.TEXT, resulting_string);
        }
      };
      module.exports.Tokenizer = Tokenizer;
      module.exports.TOKEN = TOKEN;
    }
    /******/
  ];
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = __webpack_require__(18);
  legacy_beautify_html = __webpack_exports__;
})();
function html_beautify(html_source, options) {
  return legacy_beautify_html(html_source, options, js_beautify, css_beautify);
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlFormatter.js
function format2(document, range, options) {
  let value = document.getText();
  let includesEnd = true;
  let initialIndentLevel = 0;
  const tabSize = options.tabSize || 4;
  if (range) {
    let startOffset = document.offsetAt(range.start);
    let extendedStart = startOffset;
    while (extendedStart > 0 && isWhitespace(value, extendedStart - 1)) {
      extendedStart--;
    }
    if (extendedStart === 0 || isEOL(value, extendedStart - 1)) {
      startOffset = extendedStart;
    } else {
      if (extendedStart < startOffset) {
        startOffset = extendedStart + 1;
      }
    }
    let endOffset = document.offsetAt(range.end);
    let extendedEnd = endOffset;
    while (extendedEnd < value.length && isWhitespace(value, extendedEnd)) {
      extendedEnd++;
    }
    if (extendedEnd === value.length || isEOL(value, extendedEnd)) {
      endOffset = extendedEnd;
    }
    range = Range.create(document.positionAt(startOffset), document.positionAt(endOffset));
    const firstHalf = value.substring(0, startOffset);
    if (new RegExp(/.*[<][^>]*$/).test(firstHalf)) {
      value = value.substring(startOffset, endOffset);
      return [{
        range,
        newText: value
      }];
    }
    includesEnd = endOffset === value.length;
    value = value.substring(startOffset, endOffset);
    if (startOffset !== 0) {
      const startOfLineOffset = document.offsetAt(Position.create(range.start.line, 0));
      initialIndentLevel = computeIndentLevel(document.getText(), startOfLineOffset, options);
    }
  } else {
    range = Range.create(Position.create(0, 0), document.positionAt(value.length));
  }
  const htmlOptions = {
    indent_size: tabSize,
    indent_char: options.insertSpaces ? " " : "	",
    indent_empty_lines: getFormatOption(options, "indentEmptyLines", false),
    wrap_line_length: getFormatOption(options, "wrapLineLength", 120),
    unformatted: getTagsFormatOption(options, "unformatted", void 0),
    content_unformatted: getTagsFormatOption(options, "contentUnformatted", void 0),
    indent_inner_html: getFormatOption(options, "indentInnerHtml", false),
    preserve_newlines: getFormatOption(options, "preserveNewLines", true),
    max_preserve_newlines: getFormatOption(options, "maxPreserveNewLines", 32786),
    indent_handlebars: getFormatOption(options, "indentHandlebars", false),
    end_with_newline: includesEnd && getFormatOption(options, "endWithNewline", false),
    extra_liners: getTagsFormatOption(options, "extraLiners", void 0),
    wrap_attributes: getFormatOption(options, "wrapAttributes", "auto"),
    wrap_attributes_indent_size: getFormatOption(options, "wrapAttributesIndentSize", void 0),
    eol: "\n",
    indent_scripts: getFormatOption(options, "indentScripts", "normal"),
    templating: getTemplatingFormatOption(options, "all"),
    unformatted_content_delimiter: getFormatOption(options, "unformattedContentDelimiter", "")
  };
  let result = html_beautify(trimLeft(value), htmlOptions);
  if (initialIndentLevel > 0) {
    const indent = options.insertSpaces ? repeat(" ", tabSize * initialIndentLevel) : repeat("	", initialIndentLevel);
    result = result.split("\n").join("\n" + indent);
    if (range.start.character === 0) {
      result = indent + result;
    }
  }
  return [{
    range,
    newText: result
  }];
}
function trimLeft(str) {
  return str.replace(/^\s+/, "");
}
function getFormatOption(options, key, dflt) {
  if (options && options.hasOwnProperty(key)) {
    const value = options[key];
    if (value !== null) {
      return value;
    }
  }
  return dflt;
}
function getTagsFormatOption(options, key, dflt) {
  const list = getFormatOption(options, key, null);
  if (typeof list === "string") {
    if (list.length > 0) {
      return list.split(",").map((t2) => t2.trim().toLowerCase());
    }
    return [];
  }
  return dflt;
}
function getTemplatingFormatOption(options, dflt) {
  const value = getFormatOption(options, "templating", dflt);
  if (value === true) {
    return ["auto"];
  }
  if (value === false || value === dflt || Array.isArray(value) === false) {
    return ["none"];
  }
  return value;
}
function computeIndentLevel(content, offset, options) {
  let i = offset;
  let nChars = 0;
  const tabSize = options.tabSize || 4;
  while (i < content.length) {
    const ch = content.charAt(i);
    if (ch === " ") {
      nChars++;
    } else if (ch === "	") {
      nChars += tabSize;
    } else {
      break;
    }
    i++;
  }
  return Math.floor(nChars / tabSize);
}
function isEOL(text, offset) {
  return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
function isWhitespace(text, offset) {
  return " 	".indexOf(text.charAt(offset)) !== -1;
}

// node_modules/vscode-uri/lib/esm/index.mjs
var LIB;
(() => {
  "use strict";
  var t2 = { 470: (t3) => {
    function e2(t4) {
      if ("string" != typeof t4)
        throw new TypeError("Path must be a string. Received " + JSON.stringify(t4));
    }
    function r2(t4, e3) {
      for (var r3, n3 = "", i = 0, o = -1, s = 0, h = 0; h <= t4.length; ++h) {
        if (h < t4.length)
          r3 = t4.charCodeAt(h);
        else {
          if (47 === r3)
            break;
          r3 = 47;
        }
        if (47 === r3) {
          if (o === h - 1 || 1 === s)
            ;
          else if (o !== h - 1 && 2 === s) {
            if (n3.length < 2 || 2 !== i || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
              if (n3.length > 2) {
                var a = n3.lastIndexOf("/");
                if (a !== n3.length - 1) {
                  -1 === a ? (n3 = "", i = 0) : i = (n3 = n3.slice(0, a)).length - 1 - n3.lastIndexOf("/"), o = h, s = 0;
                  continue;
                }
              } else if (2 === n3.length || 1 === n3.length) {
                n3 = "", i = 0, o = h, s = 0;
                continue;
              }
            }
            e3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i = 2);
          } else
            n3.length > 0 ? n3 += "/" + t4.slice(o + 1, h) : n3 = t4.slice(o + 1, h), i = h - o - 1;
          o = h, s = 0;
        } else
          46 === r3 && -1 !== s ? ++s : s = -1;
      }
      return n3;
    }
    var n2 = { resolve: function() {
      for (var t4, n3 = "", i = false, o = arguments.length - 1; o >= -1 && !i; o--) {
        var s;
        o >= 0 ? s = arguments[o] : (void 0 === t4 && (t4 = process.cwd()), s = t4), e2(s), 0 !== s.length && (n3 = s + "/" + n3, i = 47 === s.charCodeAt(0));
      }
      return n3 = r2(n3, !i), i ? n3.length > 0 ? "/" + n3 : "/" : n3.length > 0 ? n3 : ".";
    }, normalize: function(t4) {
      if (e2(t4), 0 === t4.length)
        return ".";
      var n3 = 47 === t4.charCodeAt(0), i = 47 === t4.charCodeAt(t4.length - 1);
      return 0 !== (t4 = r2(t4, !n3)).length || n3 || (t4 = "."), t4.length > 0 && i && (t4 += "/"), n3 ? "/" + t4 : t4;
    }, isAbsolute: function(t4) {
      return e2(t4), t4.length > 0 && 47 === t4.charCodeAt(0);
    }, join: function() {
      if (0 === arguments.length)
        return ".";
      for (var t4, r3 = 0; r3 < arguments.length; ++r3) {
        var i = arguments[r3];
        e2(i), i.length > 0 && (void 0 === t4 ? t4 = i : t4 += "/" + i);
      }
      return void 0 === t4 ? "." : n2.normalize(t4);
    }, relative: function(t4, r3) {
      if (e2(t4), e2(r3), t4 === r3)
        return "";
      if ((t4 = n2.resolve(t4)) === (r3 = n2.resolve(r3)))
        return "";
      for (var i = 1; i < t4.length && 47 === t4.charCodeAt(i); ++i)
        ;
      for (var o = t4.length, s = o - i, h = 1; h < r3.length && 47 === r3.charCodeAt(h); ++h)
        ;
      for (var a = r3.length - h, c = s < a ? s : a, f = -1, u = 0; u <= c; ++u) {
        if (u === c) {
          if (a > c) {
            if (47 === r3.charCodeAt(h + u))
              return r3.slice(h + u + 1);
            if (0 === u)
              return r3.slice(h + u);
          } else
            s > c && (47 === t4.charCodeAt(i + u) ? f = u : 0 === u && (f = 0));
          break;
        }
        var l = t4.charCodeAt(i + u);
        if (l !== r3.charCodeAt(h + u))
          break;
        47 === l && (f = u);
      }
      var g = "";
      for (u = i + f + 1; u <= o; ++u)
        u !== o && 47 !== t4.charCodeAt(u) || (0 === g.length ? g += ".." : g += "/..");
      return g.length > 0 ? g + r3.slice(h + f) : (h += f, 47 === r3.charCodeAt(h) && ++h, r3.slice(h));
    }, _makeLong: function(t4) {
      return t4;
    }, dirname: function(t4) {
      if (e2(t4), 0 === t4.length)
        return ".";
      for (var r3 = t4.charCodeAt(0), n3 = 47 === r3, i = -1, o = true, s = t4.length - 1; s >= 1; --s)
        if (47 === (r3 = t4.charCodeAt(s))) {
          if (!o) {
            i = s;
            break;
          }
        } else
          o = false;
      return -1 === i ? n3 ? "/" : "." : n3 && 1 === i ? "//" : t4.slice(0, i);
    }, basename: function(t4, r3) {
      if (void 0 !== r3 && "string" != typeof r3)
        throw new TypeError('"ext" argument must be a string');
      e2(t4);
      var n3, i = 0, o = -1, s = true;
      if (void 0 !== r3 && r3.length > 0 && r3.length <= t4.length) {
        if (r3.length === t4.length && r3 === t4)
          return "";
        var h = r3.length - 1, a = -1;
        for (n3 = t4.length - 1; n3 >= 0; --n3) {
          var c = t4.charCodeAt(n3);
          if (47 === c) {
            if (!s) {
              i = n3 + 1;
              break;
            }
          } else
            -1 === a && (s = false, a = n3 + 1), h >= 0 && (c === r3.charCodeAt(h) ? -1 == --h && (o = n3) : (h = -1, o = a));
        }
        return i === o ? o = a : -1 === o && (o = t4.length), t4.slice(i, o);
      }
      for (n3 = t4.length - 1; n3 >= 0; --n3)
        if (47 === t4.charCodeAt(n3)) {
          if (!s) {
            i = n3 + 1;
            break;
          }
        } else
          -1 === o && (s = false, o = n3 + 1);
      return -1 === o ? "" : t4.slice(i, o);
    }, extname: function(t4) {
      e2(t4);
      for (var r3 = -1, n3 = 0, i = -1, o = true, s = 0, h = t4.length - 1; h >= 0; --h) {
        var a = t4.charCodeAt(h);
        if (47 !== a)
          -1 === i && (o = false, i = h + 1), 46 === a ? -1 === r3 ? r3 = h : 1 !== s && (s = 1) : -1 !== r3 && (s = -1);
        else if (!o) {
          n3 = h + 1;
          break;
        }
      }
      return -1 === r3 || -1 === i || 0 === s || 1 === s && r3 === i - 1 && r3 === n3 + 1 ? "" : t4.slice(r3, i);
    }, format: function(t4) {
      if (null === t4 || "object" != typeof t4)
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t4);
      return function(t5, e3) {
        var r3 = e3.dir || e3.root, n3 = e3.base || (e3.name || "") + (e3.ext || "");
        return r3 ? r3 === e3.root ? r3 + n3 : r3 + "/" + n3 : n3;
      }(0, t4);
    }, parse: function(t4) {
      e2(t4);
      var r3 = { root: "", dir: "", base: "", ext: "", name: "" };
      if (0 === t4.length)
        return r3;
      var n3, i = t4.charCodeAt(0), o = 47 === i;
      o ? (r3.root = "/", n3 = 1) : n3 = 0;
      for (var s = -1, h = 0, a = -1, c = true, f = t4.length - 1, u = 0; f >= n3; --f)
        if (47 !== (i = t4.charCodeAt(f)))
          -1 === a && (c = false, a = f + 1), 46 === i ? -1 === s ? s = f : 1 !== u && (u = 1) : -1 !== s && (u = -1);
        else if (!c) {
          h = f + 1;
          break;
        }
      return -1 === s || -1 === a || 0 === u || 1 === u && s === a - 1 && s === h + 1 ? -1 !== a && (r3.base = r3.name = 0 === h && o ? t4.slice(1, a) : t4.slice(h, a)) : (0 === h && o ? (r3.name = t4.slice(1, s), r3.base = t4.slice(1, a)) : (r3.name = t4.slice(h, s), r3.base = t4.slice(h, a)), r3.ext = t4.slice(s, a)), h > 0 ? r3.dir = t4.slice(0, h - 1) : o && (r3.dir = "/"), r3;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    n2.posix = n2, t3.exports = n2;
  } }, e = {};
  function r(n2) {
    var i = e[n2];
    if (void 0 !== i)
      return i.exports;
    var o = e[n2] = { exports: {} };
    return t2[n2](o, o.exports, r), o.exports;
  }
  r.d = (t3, e2) => {
    for (var n2 in e2)
      r.o(e2, n2) && !r.o(t3, n2) && Object.defineProperty(t3, n2, { enumerable: true, get: e2[n2] });
  }, r.o = (t3, e2) => Object.prototype.hasOwnProperty.call(t3, e2), r.r = (t3) => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
  };
  var n = {};
  (() => {
    let t3;
    if (r.r(n), r.d(n, { URI: () => f, Utils: () => P }), "object" == typeof process)
      t3 = "win32" === process.platform;
    else if ("object" == typeof navigator) {
      let e3 = navigator.userAgent;
      t3 = e3.indexOf("Windows") >= 0;
    }
    const e2 = /^\w[\w\d+.-]*$/, i = /^\//, o = /^\/\//;
    function s(t4, r2) {
      if (!t4.scheme && r2)
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t4.authority}", path: "${t4.path}", query: "${t4.query}", fragment: "${t4.fragment}"}`);
      if (t4.scheme && !e2.test(t4.scheme))
        throw new Error("[UriError]: Scheme contains illegal characters.");
      if (t4.path) {
        if (t4.authority) {
          if (!i.test(t4.path))
            throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (o.test(t4.path))
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const h = "", a = "/", c = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class f {
      static isUri(t4) {
        return t4 instanceof f || !!t4 && "string" == typeof t4.authority && "string" == typeof t4.fragment && "string" == typeof t4.path && "string" == typeof t4.query && "string" == typeof t4.scheme && "string" == typeof t4.fsPath && "function" == typeof t4.with && "function" == typeof t4.toString;
      }
      scheme;
      authority;
      path;
      query;
      fragment;
      constructor(t4, e3, r2, n2, i2, o2 = false) {
        "object" == typeof t4 ? (this.scheme = t4.scheme || h, this.authority = t4.authority || h, this.path = t4.path || h, this.query = t4.query || h, this.fragment = t4.fragment || h) : (this.scheme = /* @__PURE__ */ function(t5, e4) {
          return t5 || e4 ? t5 : "file";
        }(t4, o2), this.authority = e3 || h, this.path = function(t5, e4) {
          switch (t5) {
            case "https":
            case "http":
            case "file":
              e4 ? e4[0] !== a && (e4 = a + e4) : e4 = a;
          }
          return e4;
        }(this.scheme, r2 || h), this.query = n2 || h, this.fragment = i2 || h, s(this, o2));
      }
      get fsPath() {
        return m(this, false);
      }
      with(t4) {
        if (!t4)
          return this;
        let { scheme: e3, authority: r2, path: n2, query: i2, fragment: o2 } = t4;
        return void 0 === e3 ? e3 = this.scheme : null === e3 && (e3 = h), void 0 === r2 ? r2 = this.authority : null === r2 && (r2 = h), void 0 === n2 ? n2 = this.path : null === n2 && (n2 = h), void 0 === i2 ? i2 = this.query : null === i2 && (i2 = h), void 0 === o2 ? o2 = this.fragment : null === o2 && (o2 = h), e3 === this.scheme && r2 === this.authority && n2 === this.path && i2 === this.query && o2 === this.fragment ? this : new l(e3, r2, n2, i2, o2);
      }
      static parse(t4, e3 = false) {
        const r2 = c.exec(t4);
        return r2 ? new l(r2[2] || h, C(r2[4] || h), C(r2[5] || h), C(r2[7] || h), C(r2[9] || h), e3) : new l(h, h, h, h, h);
      }
      static file(e3) {
        let r2 = h;
        if (t3 && (e3 = e3.replace(/\\/g, a)), e3[0] === a && e3[1] === a) {
          const t4 = e3.indexOf(a, 2);
          -1 === t4 ? (r2 = e3.substring(2), e3 = a) : (r2 = e3.substring(2, t4), e3 = e3.substring(t4) || a);
        }
        return new l("file", r2, e3, h, h);
      }
      static from(t4) {
        const e3 = new l(t4.scheme, t4.authority, t4.path, t4.query, t4.fragment);
        return s(e3, true), e3;
      }
      toString(t4 = false) {
        return y(this, t4);
      }
      toJSON() {
        return this;
      }
      static revive(t4) {
        if (t4) {
          if (t4 instanceof f)
            return t4;
          {
            const e3 = new l(t4);
            return e3._formatted = t4.external, e3._fsPath = t4._sep === u ? t4.fsPath : null, e3;
          }
        }
        return t4;
      }
    }
    const u = t3 ? 1 : void 0;
    class l extends f {
      _formatted = null;
      _fsPath = null;
      get fsPath() {
        return this._fsPath || (this._fsPath = m(this, false)), this._fsPath;
      }
      toString(t4 = false) {
        return t4 ? y(this, true) : (this._formatted || (this._formatted = y(this, false)), this._formatted);
      }
      toJSON() {
        const t4 = { $mid: 1 };
        return this._fsPath && (t4.fsPath = this._fsPath, t4._sep = u), this._formatted && (t4.external = this._formatted), this.path && (t4.path = this.path), this.scheme && (t4.scheme = this.scheme), this.authority && (t4.authority = this.authority), this.query && (t4.query = this.query), this.fragment && (t4.fragment = this.fragment), t4;
      }
    }
    const g = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function d(t4, e3, r2) {
      let n2, i2 = -1;
      for (let o2 = 0; o2 < t4.length; o2++) {
        const s2 = t4.charCodeAt(o2);
        if (s2 >= 97 && s2 <= 122 || s2 >= 65 && s2 <= 90 || s2 >= 48 && s2 <= 57 || 45 === s2 || 46 === s2 || 95 === s2 || 126 === s2 || e3 && 47 === s2 || r2 && 91 === s2 || r2 && 93 === s2 || r2 && 58 === s2)
          -1 !== i2 && (n2 += encodeURIComponent(t4.substring(i2, o2)), i2 = -1), void 0 !== n2 && (n2 += t4.charAt(o2));
        else {
          void 0 === n2 && (n2 = t4.substr(0, o2));
          const e4 = g[s2];
          void 0 !== e4 ? (-1 !== i2 && (n2 += encodeURIComponent(t4.substring(i2, o2)), i2 = -1), n2 += e4) : -1 === i2 && (i2 = o2);
        }
      }
      return -1 !== i2 && (n2 += encodeURIComponent(t4.substring(i2))), void 0 !== n2 ? n2 : t4;
    }
    function p(t4) {
      let e3;
      for (let r2 = 0; r2 < t4.length; r2++) {
        const n2 = t4.charCodeAt(r2);
        35 === n2 || 63 === n2 ? (void 0 === e3 && (e3 = t4.substr(0, r2)), e3 += g[n2]) : void 0 !== e3 && (e3 += t4[r2]);
      }
      return void 0 !== e3 ? e3 : t4;
    }
    function m(e3, r2) {
      let n2;
      return n2 = e3.authority && e3.path.length > 1 && "file" === e3.scheme ? `//${e3.authority}${e3.path}` : 47 === e3.path.charCodeAt(0) && (e3.path.charCodeAt(1) >= 65 && e3.path.charCodeAt(1) <= 90 || e3.path.charCodeAt(1) >= 97 && e3.path.charCodeAt(1) <= 122) && 58 === e3.path.charCodeAt(2) ? r2 ? e3.path.substr(1) : e3.path[1].toLowerCase() + e3.path.substr(2) : e3.path, t3 && (n2 = n2.replace(/\//g, "\\")), n2;
    }
    function y(t4, e3) {
      const r2 = e3 ? p : d;
      let n2 = "", { scheme: i2, authority: o2, path: s2, query: h2, fragment: c2 } = t4;
      if (i2 && (n2 += i2, n2 += ":"), (o2 || "file" === i2) && (n2 += a, n2 += a), o2) {
        let t5 = o2.indexOf("@");
        if (-1 !== t5) {
          const e4 = o2.substr(0, t5);
          o2 = o2.substr(t5 + 1), t5 = e4.lastIndexOf(":"), -1 === t5 ? n2 += r2(e4, false, false) : (n2 += r2(e4.substr(0, t5), false, false), n2 += ":", n2 += r2(e4.substr(t5 + 1), false, true)), n2 += "@";
        }
        o2 = o2.toLowerCase(), t5 = o2.lastIndexOf(":"), -1 === t5 ? n2 += r2(o2, false, true) : (n2 += r2(o2.substr(0, t5), false, true), n2 += o2.substr(t5));
      }
      if (s2) {
        if (s2.length >= 3 && 47 === s2.charCodeAt(0) && 58 === s2.charCodeAt(2)) {
          const t5 = s2.charCodeAt(1);
          t5 >= 65 && t5 <= 90 && (s2 = `/${String.fromCharCode(t5 + 32)}:${s2.substr(3)}`);
        } else if (s2.length >= 2 && 58 === s2.charCodeAt(1)) {
          const t5 = s2.charCodeAt(0);
          t5 >= 65 && t5 <= 90 && (s2 = `${String.fromCharCode(t5 + 32)}:${s2.substr(2)}`);
        }
        n2 += r2(s2, true, false);
      }
      return h2 && (n2 += "?", n2 += r2(h2, false, false)), c2 && (n2 += "#", n2 += e3 ? c2 : d(c2, false, false)), n2;
    }
    function v(t4) {
      try {
        return decodeURIComponent(t4);
      } catch {
        return t4.length > 3 ? t4.substr(0, 3) + v(t4.substr(3)) : t4;
      }
    }
    const b = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function C(t4) {
      return t4.match(b) ? t4.replace(b, (t5) => v(t5)) : t4;
    }
    var A = r(470);
    const w = A.posix || A, x = "/";
    var P;
    !function(t4) {
      t4.joinPath = function(t5, ...e3) {
        return t5.with({ path: w.join(t5.path, ...e3) });
      }, t4.resolvePath = function(t5, ...e3) {
        let r2 = t5.path, n2 = false;
        r2[0] !== x && (r2 = x + r2, n2 = true);
        let i2 = w.resolve(r2, ...e3);
        return n2 && i2[0] === x && !t5.authority && (i2 = i2.substring(1)), t5.with({ path: i2 });
      }, t4.dirname = function(t5) {
        if (0 === t5.path.length || t5.path === x)
          return t5;
        let e3 = w.dirname(t5.path);
        return 1 === e3.length && 46 === e3.charCodeAt(0) && (e3 = ""), t5.with({ path: e3 });
      }, t4.basename = function(t5) {
        return w.basename(t5.path);
      }, t4.extname = function(t5) {
        return w.extname(t5.path);
      };
    }(P || (P = {}));
  })(), LIB = n;
})();
var { URI: URI2, Utils } = LIB;

// node_modules/vscode-html-languageservice/lib/esm/services/htmlLinks.js
function normalizeRef(url) {
  const first = url[0];
  const last = url[url.length - 1];
  if (first === last && (first === "'" || first === '"')) {
    url = url.substring(1, url.length - 1);
  }
  return url;
}
function validateRef(url, languageId) {
  if (!url.length) {
    return false;
  }
  if (languageId === "handlebars" && /{{|}}/.test(url)) {
    return false;
  }
  return /\b(w[\w\d+.-]*:\/\/)?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/.test(url);
}
function getWorkspaceUrl(documentUri, tokenContent, documentContext, base) {
  if (/^\s*javascript\:/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
    return void 0;
  }
  tokenContent = tokenContent.replace(/^\s*/g, "");
  const match = tokenContent.match(/^(\w[\w\d+.-]*):/);
  if (match) {
    const schema = match[1].toLowerCase();
    if (schema === "http" || schema === "https" || schema === "file") {
      return tokenContent;
    }
    return void 0;
  }
  if (/^\#/i.test(tokenContent)) {
    return documentUri + tokenContent;
  }
  if (/^\/\//i.test(tokenContent)) {
    return pickedScheme + ":" + tokenContent.replace(/^\s*/g, "");
  }
  if (documentContext) {
    return documentContext.resolveReference(tokenContent, base || documentUri);
  }
  return tokenContent;
}
function createLink(document, documentContext, attributeValue, startOffset, endOffset, base) {
  const tokenContent = normalizeRef(attributeValue);
  if (!validateRef(tokenContent, document.languageId)) {
    return void 0;
  }
  if (tokenContent.length < attributeValue.length) {
    startOffset++;
    endOffset--;
  }
  const workspaceUrl = getWorkspaceUrl(document.uri, tokenContent, documentContext, base);
  if (!workspaceUrl) {
    return void 0;
  }
  const target = validateAndCleanURI(workspaceUrl, document);
  return {
    range: Range.create(document.positionAt(startOffset), document.positionAt(endOffset)),
    target
  };
}
var _hash = "#".charCodeAt(0);
function validateAndCleanURI(uriStr, document) {
  try {
    let uri = URI2.parse(uriStr);
    if (uri.scheme === "file" && uri.query) {
      uri = uri.with({ query: null });
      uriStr = uri.toString(
        /* skipEncodig*/
        true
      );
    }
    if (uri.scheme === "file" && uri.fragment && !(uriStr.startsWith(document.uri) && uriStr.charCodeAt(document.uri.length) === _hash)) {
      return uri.with({ fragment: null }).toString(
        /* skipEncodig*/
        true
      );
    }
    return uriStr;
  } catch (e) {
    return void 0;
  }
}
var HTMLDocumentLinks = class {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }
  findDocumentLinks(document, documentContext) {
    const newLinks = [];
    const scanner = createScanner(document.getText(), 0);
    let token = scanner.scan();
    let lastAttributeName = void 0;
    let lastTagName = void 0;
    let afterBase = false;
    let base = void 0;
    const idLocations = {};
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTag:
          lastTagName = scanner.getTokenText().toLowerCase();
          if (!base) {
            afterBase = lastTagName === "base";
          }
          break;
        case TokenType.AttributeName:
          lastAttributeName = scanner.getTokenText().toLowerCase();
          break;
        case TokenType.AttributeValue:
          if (lastTagName && lastAttributeName && this.dataManager.isPathAttribute(lastTagName, lastAttributeName)) {
            const attributeValue = scanner.getTokenText();
            if (!afterBase) {
              const link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
              if (link) {
                newLinks.push(link);
              }
            }
            if (afterBase && typeof base === "undefined") {
              base = normalizeRef(attributeValue);
              if (base && documentContext) {
                base = documentContext.resolveReference(base, document.uri);
              }
            }
            afterBase = false;
            lastAttributeName = void 0;
          } else if (lastAttributeName === "id") {
            const id = normalizeRef(scanner.getTokenText());
            idLocations[id] = scanner.getTokenOffset();
          }
          break;
      }
      token = scanner.scan();
    }
    for (const link of newLinks) {
      const localWithHash = document.uri + "#";
      if (link.target && startsWith(link.target, localWithHash)) {
        const target = link.target.substring(localWithHash.length);
        const offset = idLocations[target];
        if (offset !== void 0) {
          const pos = document.positionAt(offset);
          link.target = `${localWithHash}${pos.line + 1},${pos.character + 1}`;
        } else {
          link.target = document.uri;
        }
      }
    }
    return newLinks;
  }
};

// node_modules/vscode-html-languageservice/lib/esm/services/htmlHighlighting.js
function findDocumentHighlights(document, position, htmlDocument) {
  const offset = document.offsetAt(position);
  const node = htmlDocument.findNodeAt(offset);
  if (!node.tag) {
    return [];
  }
  const result = [];
  const startTagRange = getTagNameRange(TokenType.StartTag, document, node.start);
  const endTagRange = typeof node.endTagStart === "number" && getTagNameRange(TokenType.EndTag, document, node.endTagStart);
  if (startTagRange && covers(startTagRange, position) || endTagRange && covers(endTagRange, position)) {
    if (startTagRange) {
      result.push({ kind: DocumentHighlightKind.Read, range: startTagRange });
    }
    if (endTagRange) {
      result.push({ kind: DocumentHighlightKind.Read, range: endTagRange });
    }
  }
  return result;
}
function isBeforeOrEqual(pos1, pos2) {
  return pos1.line < pos2.line || pos1.line === pos2.line && pos1.character <= pos2.character;
}
function covers(range, position) {
  return isBeforeOrEqual(range.start, position) && isBeforeOrEqual(position, range.end);
}
function getTagNameRange(tokenType, document, startOffset) {
  const scanner = createScanner(document.getText(), startOffset);
  let token = scanner.scan();
  while (token !== TokenType.EOS && token !== tokenType) {
    token = scanner.scan();
  }
  if (token !== TokenType.EOS) {
    return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
  }
  return null;
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlSymbolsProvider.js
function findDocumentSymbols(document, htmlDocument) {
  const symbols = [];
  const symbols2 = findDocumentSymbols2(document, htmlDocument);
  for (const symbol of symbols2) {
    walk(symbol, void 0);
  }
  return symbols;
  function walk(node, parent) {
    const symbol = SymbolInformation.create(node.name, node.kind, node.range, document.uri, parent?.name);
    symbol.containerName ?? (symbol.containerName = "");
    symbols.push(symbol);
    if (node.children) {
      for (const child of node.children) {
        walk(child, node);
      }
    }
  }
}
function findDocumentSymbols2(document, htmlDocument) {
  const symbols = [];
  htmlDocument.roots.forEach((node) => {
    provideFileSymbolsInternal(document, node, symbols);
  });
  return symbols;
}
function provideFileSymbolsInternal(document, node, symbols) {
  const name = nodeToName(node);
  const range = Range.create(document.positionAt(node.start), document.positionAt(node.end));
  const symbol = DocumentSymbol.create(name, void 0, SymbolKind.Field, range, range);
  symbols.push(symbol);
  node.children.forEach((child) => {
    symbol.children ?? (symbol.children = []);
    provideFileSymbolsInternal(document, child, symbol.children);
  });
}
function nodeToName(node) {
  let name = node.tag;
  if (node.attributes) {
    const id = node.attributes["id"];
    const classes = node.attributes["class"];
    if (id) {
      name += `#${id.replace(/[\"\']/g, "")}`;
    }
    if (classes) {
      name += classes.replace(/[\"\']/g, "").split(/\s+/).map((className) => `.${className}`).join("");
    }
  }
  return name || "?";
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlRename.js
function doRename(document, position, newName, htmlDocument) {
  const offset = document.offsetAt(position);
  const node = htmlDocument.findNodeAt(offset);
  if (!node.tag) {
    return null;
  }
  if (!isWithinTagRange(node, offset, node.tag)) {
    return null;
  }
  const edits = [];
  const startTagRange = {
    start: document.positionAt(node.start + "<".length),
    end: document.positionAt(node.start + "<".length + node.tag.length)
  };
  edits.push({
    range: startTagRange,
    newText: newName
  });
  if (node.endTagStart) {
    const endTagRange = {
      start: document.positionAt(node.endTagStart + "</".length),
      end: document.positionAt(node.endTagStart + "</".length + node.tag.length)
    };
    edits.push({
      range: endTagRange,
      newText: newName
    });
  }
  const changes = {
    [document.uri.toString()]: edits
  };
  return {
    changes
  };
}
function isWithinTagRange(node, offset, nodeTag) {
  if (node.endTagStart) {
    if (node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + nodeTag.length) {
      return true;
    }
  }
  return node.start + "<".length <= offset && offset <= node.start + "<".length + nodeTag.length;
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlMatchingTagPosition.js
function findMatchingTagPosition(document, position, htmlDocument) {
  const offset = document.offsetAt(position);
  const node = htmlDocument.findNodeAt(offset);
  if (!node.tag) {
    return null;
  }
  if (!node.endTagStart) {
    return null;
  }
  if (node.start + "<".length <= offset && offset <= node.start + "<".length + node.tag.length) {
    const mirrorOffset = offset - "<".length - node.start + node.endTagStart + "</".length;
    return document.positionAt(mirrorOffset);
  }
  if (node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + node.tag.length) {
    const mirrorOffset = offset - "</".length - node.endTagStart + node.start + "<".length;
    return document.positionAt(mirrorOffset);
  }
  return null;
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlLinkedEditing.js
function findLinkedEditingRanges(document, position, htmlDocument) {
  const offset = document.offsetAt(position);
  const node = htmlDocument.findNodeAt(offset);
  const tagLength = node.tag ? node.tag.length : 0;
  if (!node.endTagStart) {
    return null;
  }
  if (
    // Within open tag, compute close tag
    node.start + "<".length <= offset && offset <= node.start + "<".length + tagLength || // Within closing tag, compute open tag
    node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + tagLength
  ) {
    return [
      Range.create(document.positionAt(node.start + "<".length), document.positionAt(node.start + "<".length + tagLength)),
      Range.create(document.positionAt(node.endTagStart + "</".length), document.positionAt(node.endTagStart + "</".length + tagLength))
    ];
  }
  return null;
}

// node_modules/vscode-html-languageservice/lib/esm/services/htmlFolding.js
var HTMLFolding = class {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }
  limitRanges(ranges, rangeLimit) {
    ranges = ranges.sort((r1, r2) => {
      let diff = r1.startLine - r2.startLine;
      if (diff === 0) {
        diff = r1.endLine - r2.endLine;
      }
      return diff;
    });
    let top = void 0;
    const previous = [];
    const nestingLevels = [];
    const nestingLevelCounts = [];
    const setNestingLevel = (index, level) => {
      nestingLevels[index] = level;
      if (level < 30) {
        nestingLevelCounts[level] = (nestingLevelCounts[level] || 0) + 1;
      }
    };
    for (let i = 0; i < ranges.length; i++) {
      const entry = ranges[i];
      if (!top) {
        top = entry;
        setNestingLevel(i, 0);
      } else {
        if (entry.startLine > top.startLine) {
          if (entry.endLine <= top.endLine) {
            previous.push(top);
            top = entry;
            setNestingLevel(i, previous.length);
          } else if (entry.startLine > top.endLine) {
            do {
              top = previous.pop();
            } while (top && entry.startLine > top.endLine);
            if (top) {
              previous.push(top);
            }
            top = entry;
            setNestingLevel(i, previous.length);
          }
        }
      }
    }
    let entries = 0;
    let maxLevel = 0;
    for (let i = 0; i < nestingLevelCounts.length; i++) {
      const n = nestingLevelCounts[i];
      if (n) {
        if (n + entries > rangeLimit) {
          maxLevel = i;
          break;
        }
        entries += n;
      }
    }
    const result = [];
    for (let i = 0; i < ranges.length; i++) {
      const level = nestingLevels[i];
      if (typeof level === "number") {
        if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) {
          result.push(ranges[i]);
        }
      }
    }
    return result;
  }
  getFoldingRanges(document, context) {
    const voidElements = this.dataManager.getVoidElements(document.languageId);
    const scanner = createScanner(document.getText());
    let token = scanner.scan();
    const ranges = [];
    const stack = [];
    let lastTagName = null;
    let prevStart = -1;
    function addRange(range) {
      ranges.push(range);
      prevStart = range.startLine;
    }
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTag: {
          const tagName = scanner.getTokenText();
          const startLine = document.positionAt(scanner.getTokenOffset()).line;
          stack.push({ startLine, tagName });
          lastTagName = tagName;
          break;
        }
        case TokenType.EndTag: {
          lastTagName = scanner.getTokenText();
          break;
        }
        case TokenType.StartTagClose:
          if (!lastTagName || !this.dataManager.isVoidElement(lastTagName, voidElements)) {
            break;
          }
        case TokenType.EndTagClose:
        case TokenType.StartTagSelfClose: {
          let i = stack.length - 1;
          while (i >= 0 && stack[i].tagName !== lastTagName) {
            i--;
          }
          if (i >= 0) {
            const stackElement = stack[i];
            stack.length = i;
            const line = document.positionAt(scanner.getTokenOffset()).line;
            const startLine = stackElement.startLine;
            const endLine = line - 1;
            if (endLine > startLine && prevStart !== startLine) {
              addRange({ startLine, endLine });
            }
          }
          break;
        }
        case TokenType.Comment: {
          let startLine = document.positionAt(scanner.getTokenOffset()).line;
          const text = scanner.getTokenText();
          const m = text.match(/^\s*#(region\b)|(endregion\b)/);
          if (m) {
            if (m[1]) {
              stack.push({ startLine, tagName: "" });
            } else {
              let i = stack.length - 1;
              while (i >= 0 && stack[i].tagName.length) {
                i--;
              }
              if (i >= 0) {
                const stackElement = stack[i];
                stack.length = i;
                const endLine = startLine;
                startLine = stackElement.startLine;
                if (endLine > startLine && prevStart !== startLine) {
                  addRange({ startLine, endLine, kind: FoldingRangeKind.Region });
                }
              }
            }
          } else {
            const endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
            if (startLine < endLine) {
              addRange({ startLine, endLine, kind: FoldingRangeKind.Comment });
            }
          }
          break;
        }
      }
      token = scanner.scan();
    }
    const rangeLimit = context && context.rangeLimit || Number.MAX_VALUE;
    if (ranges.length > rangeLimit) {
      return this.limitRanges(ranges, rangeLimit);
    }
    return ranges;
  }
};

// node_modules/vscode-html-languageservice/lib/esm/services/htmlSelectionRange.js
var HTMLSelectionRange = class {
  constructor(htmlParser) {
    this.htmlParser = htmlParser;
  }
  getSelectionRanges(document, positions) {
    const htmlDocument = this.htmlParser.parseDocument(document);
    return positions.map((p) => this.getSelectionRange(p, document, htmlDocument));
  }
  getSelectionRange(position, document, htmlDocument) {
    const applicableRanges = this.getApplicableRanges(document, position, htmlDocument);
    let prev = void 0;
    let current = void 0;
    for (let index = applicableRanges.length - 1; index >= 0; index--) {
      const range = applicableRanges[index];
      if (!prev || range[0] !== prev[0] || range[1] !== prev[1]) {
        current = SelectionRange.create(Range.create(document.positionAt(applicableRanges[index][0]), document.positionAt(applicableRanges[index][1])), current);
      }
      prev = range;
    }
    if (!current) {
      current = SelectionRange.create(Range.create(position, position));
    }
    return current;
  }
  getApplicableRanges(document, position, htmlDoc) {
    const currOffset = document.offsetAt(position);
    const currNode = htmlDoc.findNodeAt(currOffset);
    let result = this.getAllParentTagRanges(currNode);
    if (currNode.startTagEnd && !currNode.endTagStart) {
      if (currNode.startTagEnd !== currNode.end) {
        return [[currNode.start, currNode.end]];
      }
      const closeRange = Range.create(document.positionAt(currNode.startTagEnd - 2), document.positionAt(currNode.startTagEnd));
      const closeText = document.getText(closeRange);
      if (closeText === "/>") {
        result.unshift([currNode.start + 1, currNode.startTagEnd - 2]);
      } else {
        result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
      }
      const attributeLevelRanges = this.getAttributeLevelRanges(document, currNode, currOffset);
      result = attributeLevelRanges.concat(result);
      return result;
    }
    if (!currNode.startTagEnd || !currNode.endTagStart) {
      return result;
    }
    result.unshift([currNode.start, currNode.end]);
    if (currNode.start < currOffset && currOffset < currNode.startTagEnd) {
      result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
      const attributeLevelRanges = this.getAttributeLevelRanges(document, currNode, currOffset);
      result = attributeLevelRanges.concat(result);
      return result;
    } else if (currNode.startTagEnd <= currOffset && currOffset <= currNode.endTagStart) {
      result.unshift([currNode.startTagEnd, currNode.endTagStart]);
      return result;
    } else {
      if (currOffset >= currNode.endTagStart + 2) {
        result.unshift([currNode.endTagStart + 2, currNode.end - 1]);
      }
      return result;
    }
  }
  getAllParentTagRanges(initialNode) {
    let currNode = initialNode;
    const result = [];
    while (currNode.parent) {
      currNode = currNode.parent;
      this.getNodeRanges(currNode).forEach((r) => result.push(r));
    }
    return result;
  }
  getNodeRanges(n) {
    if (n.startTagEnd && n.endTagStart && n.startTagEnd < n.endTagStart) {
      return [
        [n.startTagEnd, n.endTagStart],
        [n.start, n.end]
      ];
    }
    return [
      [n.start, n.end]
    ];
  }
  getAttributeLevelRanges(document, currNode, currOffset) {
    const currNodeRange = Range.create(document.positionAt(currNode.start), document.positionAt(currNode.end));
    const currNodeText = document.getText(currNodeRange);
    const relativeOffset = currOffset - currNode.start;
    const scanner = createScanner(currNodeText);
    let token = scanner.scan();
    const positionOffset = currNode.start;
    const result = [];
    let isInsideAttribute = false;
    let attrStart = -1;
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.AttributeName: {
          if (relativeOffset < scanner.getTokenOffset()) {
            isInsideAttribute = false;
            break;
          }
          if (relativeOffset <= scanner.getTokenEnd()) {
            result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);
          }
          isInsideAttribute = true;
          attrStart = scanner.getTokenOffset();
          break;
        }
        case TokenType.AttributeValue: {
          if (!isInsideAttribute) {
            break;
          }
          const valueText = scanner.getTokenText();
          if (relativeOffset < scanner.getTokenOffset()) {
            result.push([attrStart, scanner.getTokenEnd()]);
            break;
          }
          if (relativeOffset >= scanner.getTokenOffset() && relativeOffset <= scanner.getTokenEnd()) {
            result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);
            if (valueText[0] === `"` && valueText[valueText.length - 1] === `"` || valueText[0] === `'` && valueText[valueText.length - 1] === `'`) {
              if (relativeOffset >= scanner.getTokenOffset() + 1 && relativeOffset <= scanner.getTokenEnd() - 1) {
                result.unshift([scanner.getTokenOffset() + 1, scanner.getTokenEnd() - 1]);
              }
            }
            result.push([attrStart, scanner.getTokenEnd()]);
          }
          break;
        }
      }
      token = scanner.scan();
    }
    return result.map((pair) => {
      return [pair[0] + positionOffset, pair[1] + positionOffset];
    });
  }
};

// node_modules/vscode-html-languageservice/lib/esm/languageFacts/data/webCustomData.js
var htmlData = {
  "version": 1.1,
  "tags": [
    {
      "name": "html",
      "description": {
        "kind": "markdown",
        "value": "The html element represents the root of an HTML document."
      },
      "attributes": [
        {
          "name": "manifest",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "version",
        },
        {
          "name": "xmlns",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "head",
      "description": {
        "kind": "markdown",
        "value": "The head element represents a collection of metadata for the Document."
      },
      "attributes": [
        {
          "name": "profile",
          "description": "The URIs of one or more metadata profiles, separated by white space."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "title",
      "description": {
        "kind": "markdown",
        "value": "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "base",
      "description": {
        "kind": "markdown",
        "value": "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information."
      },
      "void": true,
      "attributes": [
        {
          "name": "href",
          "description": {
            "kind": "markdown",
            "value": "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
          }
        },
        {
          "name": "target",
          "valueSet": "target",
          "description": {
            "kind": "markdown",
            "value": "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "link",
      "description": {
        "kind": "markdown",
        "value": "The link element allows authors to link their document to other resources."
      },
      "void": true,
      "attributes": [
        {
          "name": "href",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "crossorigin",
          "valueSet": "xo",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "rel",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "media",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "hreflang",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
            "value": 'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.'
          }
        },
        {
          "name": "sizes",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "as",
        },
        {
          "name": "importance",
          "description": "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
        },
        {
          "name": "importance",
          "description": '**`auto`**: Indicates\xA0**no\xA0preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the\xA0browser\xA0that the resource is of\xA0**high** priority.\n\n**`low`**:\xA0Indicates to the\xA0browser\xA0that the resource is of\xA0**low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.'
        },
        {
          "name": "integrity",
        },
        {
          "name": "referrerpolicy",
        },
        {
          "name": "title",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "meta",
      "description": {
        "kind": "markdown",
        "value": "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements."
      },
      "void": true,
      "attributes": [
        {
          "name": "name",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "http-equiv",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "content",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "charset",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "scheme",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "style",
      "description": {
        "kind": "markdown",
        "value": "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user."
      },
      "attributes": [
        {
          "name": "media",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "nonce",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
            "value": "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified \u2014 there is very little reason to include this in modern web documents."
          }
        },
        {
          "name": "scoped",
          "valueSet": "v"
        },
        {
          "name": "title",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "body",
      "description": {
        "kind": "markdown",
        "value": "The body element represents the content of the document."
      },
      "attributes": [
        {
          "name": "onafterprint",
          "description": {
            "kind": "markdown",
            "value": "Function to call after the user has printed the document."
          }
        },
        {
          "name": "onbeforeprint",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the user requests printing of the document."
          }
        },
        {
          "name": "onbeforeunload",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the document is about to be unloaded."
          }
        },
        {
          "name": "onhashchange",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
          }
        },
        {
          "name": "onlanguagechange",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the preferred languages changed."
          }
        },
        {
          "name": "onmessage",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the document has received a message."
          }
        },
        {
          "name": "onoffline",
          "description": {
            "kind": "markdown",
            "value": "Function to call when network communication has failed."
          }
        },
        {
          "name": "ononline",
          "description": {
            "kind": "markdown",
            "value": "Function to call when network communication has been restored."
          }
        },
        {
          "name": "onpagehide"
        },
        {
          "name": "onpageshow"
        },
        {
          "name": "onpopstate",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the user has navigated session history."
          }
        },
        {
          "name": "onstorage",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the storage area has changed."
          }
        },
        {
          "name": "onunload",
          "description": {
            "kind": "markdown",
            "value": "Function to call when the document is going away."
          }
        },
        {
          "name": "alink",
        },
        {
          "name": "background",
        },
        {
          "name": "bgcolor",
        },
        {
          "name": "bottommargin",
        },
        {
          "name": "leftmargin",
        },
        {
          "name": "link",
        },
        {
          "name": "onblur",
          "description": "Function to call when the document loses focus."
        },
        {
          "name": "onerror",
          "description": "Function to call when the document fails to load properly."
        },
        {
          "name": "onfocus",
          "description": "Function to call when the document receives focus."
        },
        {
          "name": "onload",
          "description": "Function to call when the document has finished loading."
        },
        {
          "name": "onredo",
          "description": "Function to call when the user has moved forward in undo transaction history."
        },
        {
          "name": "onresize",
          "description": "Function to call when the document has been resized."
        },
        {
          "name": "onundo",
          "description": "Function to call when the user has moved backward in undo transaction history."
        },
        {
          "name": "rightmargin",
        },
        {
          "name": "text",
        },
        {
          "name": "topmargin",
        },
        {
          "name": "vlink",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "article",
      "description": {
        "kind": "markdown",
        "value": "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1\u2013h6 element) as a child of the article element."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "section",
      "description": {
        "kind": "markdown",
        "value": "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "nav",
      "description": {
        "kind": "markdown",
        "value": "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "aside",
      "description": {
        "kind": "markdown",
        "value": "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h1",
      "description": {
        "kind": "markdown",
        "value": "The h1 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h2",
      "description": {
        "kind": "markdown",
        "value": "The h2 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h3",
      "description": {
        "kind": "markdown",
        "value": "The h3 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h4",
      "description": {
        "kind": "markdown",
        "value": "The h4 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h5",
      "description": {
        "kind": "markdown",
        "value": "The h5 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "h6",
      "description": {
        "kind": "markdown",
        "value": "The h6 element represents a section heading."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "header",
      "description": {
        "kind": "markdown",
        "value": "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "footer",
      "description": {
        "kind": "markdown",
        "value": "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "address",
      "description": {
        "kind": "markdown",
        "value": "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "p",
      "description": {
        "kind": "markdown",
        "value": "The p element represents a paragraph."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "hr",
      "description": {
        "kind": "markdown",
        "value": "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book."
      },
      "void": true,
      "attributes": [
        {
          "name": "align",
          "description": "Sets the alignment of the rule on the page. If no value is specified, the default value is `left`."
        },
        {
          "name": "color",
          "description": "Sets the color of the rule through color name or hexadecimal value."
        },
        {
          "name": "noshade",
          "description": "Sets the rule to have no shading."
        },
        {
          "name": "size",
          "description": "Sets the height, in pixels, of the rule."
        },
        {
          "name": "width",
          "description": "Sets the length of the rule on the page through a pixel or percentage value."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "pre",
      "description": {
        "kind": "markdown",
        "value": "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements."
      },
      "attributes": [
        {
          "name": "cols",
        },
        {
          "name": "width",
        },
        {
          "name": "wrap",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "blockquote",
      "description": {
        "kind": "markdown",
        "value": "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations."
      },
      "attributes": [
        {
          "name": "cite",
          "description": {
            "kind": "markdown",
            "value": "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "ol",
      "description": {
        "kind": "markdown",
        "value": "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document."
      },
      "attributes": [
        {
          "name": "reversed",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute specifies that the items of the list are specified in reversed order."
          }
        },
        {
          "name": "start",
          "description": {
            "kind": "markdown",
            "value": 'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.'
          }
        },
        {
          "name": "type",
          "valueSet": "lt",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "compact",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "ul",
      "description": {
        "kind": "markdown",
        "value": "The ul element represents a list of items, where the order of the items is not important \u2014 that is, where changing the order would not materially change the meaning of the document."
      },
      "attributes": [
        {
          "name": "compact",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "li",
      "description": {
        "kind": "markdown",
        "value": "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element."
      },
      "attributes": [
        {
          "name": "value",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "type",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dl",
      "description": {
        "kind": "markdown",
        "value": "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dt",
      "description": {
        "kind": "markdown",
        "value": "The dt element represents the term, or name, part of a term-description group in a description list (dl element)."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dd",
      "description": {
        "kind": "markdown",
        "value": "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element)."
      },
      "attributes": [
        {
          "name": "nowrap",
          "description": "If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "figure",
      "description": {
        "kind": "markdown",
        "value": "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "figcaption",
      "description": {
        "kind": "markdown",
        "value": "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "main",
      "description": {
        "kind": "markdown",
        "value": "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "div",
      "description": {
        "kind": "markdown",
        "value": "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "a",
      "description": {
        "kind": "markdown",
        "value": "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents."
      },
      "attributes": [
        {
          "name": "href",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "target",
          "valueSet": "target",
          "description": {
            "kind": "markdown",
            "value": 'Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use `rel="noopener"`.'
          }
        },
        {
          "name": "download",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "ping",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "rel",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "hreflang",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "referrerpolicy",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "em",
      "description": {
        "kind": "markdown",
        "value": "The em element represents stress emphasis of its contents."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "strong",
      "description": {
        "kind": "markdown",
        "value": "The strong element represents strong importance, seriousness, or urgency for its contents."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "small",
      "description": {
        "kind": "markdown",
        "value": "The small element represents side comments such as small print."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "s",
      "description": {
        "kind": "markdown",
        "value": "The s element represents contents that are no longer accurate or no longer relevant."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "cite",
      "description": {
        "kind": "markdown",
        "value": "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "q",
      "description": {
        "kind": "markdown",
        "value": "The q element represents some phrasing content quoted from another source."
      },
      "attributes": [
        {
          "name": "cite",
          "description": {
            "kind": "markdown",
            "value": "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dfn",
      "description": {
        "kind": "markdown",
        "value": "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "abbr",
      "description": {
        "kind": "markdown",
        "value": "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "ruby",
      "description": {
        "kind": "markdown",
        "value": "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]"
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "rb",
      "description": {
        "kind": "markdown",
        "value": "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "rt",
      "description": {
        "kind": "markdown",
        "value": "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "rp",
      "description": {
        "kind": "markdown",
        "value": "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "time",
      "description": {
        "kind": "markdown",
        "value": "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below."
      },
      "attributes": [
        {
          "name": "datetime",
          "description": {
            "kind": "markdown",
            "value": "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "code",
      "description": {
        "kind": "markdown",
        "value": "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "var",
      "description": {
        "kind": "markdown",
        "value": "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "samp",
      "description": {
        "kind": "markdown",
        "value": "The samp element represents sample or quoted output from another program or computing system."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "kbd",
      "description": {
        "kind": "markdown",
        "value": "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands)."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "sub",
      "description": {
        "kind": "markdown",
        "value": "The sub element represents a subscript."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "sup",
      "description": {
        "kind": "markdown",
        "value": "The sup element represents a superscript."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "i",
      "description": {
        "kind": "markdown",
        "value": "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "b",
      "description": {
        "kind": "markdown",
        "value": "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "u",
      "description": {
        "kind": "markdown",
        "value": "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "mark",
      "description": {
        "kind": "markdown",
        "value": "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "bdi",
      "description": {
        "kind": "markdown",
        "value": "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]"
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "bdo",
      "description": {
        "kind": "markdown",
        "value": "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]"
      },
      "attributes": [
        {
          "name": "dir",
          "description": "The direction in which text should be rendered in this element's contents. Possible values are:\n\n*   `ltr`: Indicates that the text should go in a left-to-right direction.\n*   `rtl`: Indicates that the text should go in a right-to-left direction."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "span",
      "description": {
        "kind": "markdown",
        "value": "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "br",
      "description": {
        "kind": "markdown",
        "value": "The br element represents a line break."
      },
      "void": true,
      "attributes": [
        {
          "name": "clear",
          "description": "Indicates where to begin the next line after the break."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "wbr",
      "description": {
        "kind": "markdown",
        "value": "The wbr element represents a line break opportunity."
      },
      "void": true,
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "ins",
      "description": {
        "kind": "markdown",
        "value": "The ins element represents an addition to the document."
      },
      "attributes": [
        {
          "name": "cite",
          "description": "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system."
        },
        {
          "name": "datetime",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "del",
      "description": {
        "kind": "markdown",
        "value": "The del element represents a removal from the document."
      },
      "attributes": [
        {
          "name": "cite",
          "description": {
            "kind": "markdown",
            "value": "A URI for a resource that explains the change (for example, meeting minutes)."
          }
        },
        {
          "name": "datetime",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "picture",
      "description": {
        "kind": "markdown",
        "value": "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "img",
      "description": {
        "kind": "markdown",
        "value": "An img element represents an image."
      },
      "void": true,
      "attributes": [
        {
          "name": "alt",
          "description": {
            "kind": "markdown",
            "value": 'This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element\'s `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.'
          }
        },
        {
          "name": "src",
          "description": {
            "kind": "markdown",
            "value": "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
          }
        },
        {
          "name": "srcset",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "crossorigin",
          "valueSet": "xo",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "usemap",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "ismap",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "width",
          "description": {
            "kind": "markdown",
            "value": "The intrinsic width of the image in pixels."
          }
        },
        {
          "name": "height",
          "description": {
            "kind": "markdown",
            "value": "The intrinsic height of the image in pixels."
          }
        },
        {
          "name": "decoding",
          "valueSet": "decoding",
          "description": {
            "kind": "markdown",
            "value": "Provides an image decoding hint to the browser. The allowed values are:\n`sync`\n\nDecode the image synchronously for atomic presentation with other content.\n\n`async`\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\n`auto`\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user."
          }
        },
        {
          "name": "loading",
          "valueSet": "loading",
          "description": {
            "kind": "markdown",
            "value": "Indicates how the browser should load the image."
          }
        },
        {
          "name": "referrerpolicy",
          "valueSet": "referrerpolicy",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "sizes",
          "description": {
            "kind": "markdown",
            "value": "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\n1.  a media condition. This must be omitted for the last item.\n2.  a source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image\u2019s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect."
          }
        },
        {
          "name": "importance",
          "description": "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
        },
        {
          "name": "importance",
          "description": "`auto`: Indicates\xA0**no\xA0preference**. The browser may use its own heuristics to decide the priority of the image.\n\n`high`: Indicates to the\xA0browser\xA0that the image is of\xA0**high** priority.\n\n`low`:\xA0Indicates to the\xA0browser\xA0that the image is of\xA0**low** priority."
        },
        {
          "name": "intrinsicsize",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "iframe",
      "description": {
        "kind": "markdown",
        "value": "The iframe element represents a nested browsing context."
      },
      "attributes": [
        {
          "name": "src",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "srcdoc",
          "description": {
            "kind": "markdown",
            "value": "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "sandbox",
          "valueSet": "sb",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "seamless",
          "valueSet": "v"
        },
        {
          "name": "allowfullscreen",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "width",
          "description": {
            "kind": "markdown",
            "value": "The width of the frame in CSS pixels. Default is `300`."
          }
        },
        {
          "name": "height",
          "description": {
            "kind": "markdown",
            "value": "The height of the frame in CSS pixels. Default is `150`."
          }
        },
        {
          "name": "allow",
        },
        {
          "name": "allowpaymentrequest",
        },
        {
          "name": "allowpaymentrequest",
          "description": 'This attribute is considered a legacy attribute and redefined as `allow="payment"`.'
        },
        {
          "name": "csp",
        },
        {
          "name": "importance",
          "description": "The download priority of the resource in the `<iframe>`'s `src` attribute. Allowed values:\n\n`auto` (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\n`high`\n\nThe resource should be downloaded before other lower-priority page resources.\n\n`low`\n\nThe resource should be downloaded after other higher-priority page resources."
        },
        {
          "name": "referrerpolicy",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "embed",
      "description": {
        "kind": "markdown",
        "value": "The embed element provides an integration point for an external (typically non-HTML) application or interactive content."
      },
      "void": true,
      "attributes": [
        {
          "name": "src",
          "description": {
            "kind": "markdown",
            "value": "The URL\xA0of the resource being embedded."
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
            "value": "The MIME\xA0type to use to select the plug-in to instantiate."
          }
        },
        {
          "name": "width",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "height",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "object",
      "description": {
        "kind": "markdown",
        "value": "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin."
      },
      "attributes": [
        {
          "name": "data",
          "description": {
            "kind": "markdown",
            "value": "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "typemustmatch",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
          }
        },
        {
          "name": "usemap",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "width",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "height",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "archive",
          "description": "A space-separated list of URIs for archives of resources for the object."
        },
        {
          "name": "border",
          "description": "The width of a border around the control, in pixels."
        },
        {
          "name": "classid",
          "description": "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
        },
        {
          "name": "codebase",
          "description": "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document."
        },
        {
          "name": "codetype",
          "description": "The content type of the data specified by **classid**."
        },
        {
          "name": "declare",
          "description": "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused."
        },
        {
          "name": "standby",
          "description": "A message that the browser can show while loading the object's implementation and data."
        },
        {
          "name": "tabindex",
          "description": "The position of the element in the tabbing navigation order for the current document."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "param",
      "description": {
        "kind": "markdown",
        "value": "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own."
      },
      "void": true,
      "attributes": [
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "Name of the parameter."
          }
        },
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "Specifies the value of the parameter."
          }
        },
        {
          "name": "type",
          "description": 'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.'
        },
        {
          "name": "valuetype",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "video",
      "description": {
        "kind": "markdown",
        "value": "A video element is used for playing videos or movies, and audio files with captions."
      },
      "attributes": [
        {
          "name": "src"
        },
        {
          "name": "crossorigin",
          "valueSet": "xo"
        },
        {
          "name": "poster"
        },
        {
          "name": "preload",
          "valueSet": "pl"
        },
        {
          "name": "autoplay",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": 'A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.\n**Note**: Sites that automatically play audio (or video with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.\n\nTo disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `<video>` tag at all. To remove autoplay the attribute needs to be removed altogether.\n\nIn some browsers (e.g. Chrome 70.0) autoplay is not working if no `muted` attribute is present.'
          }
        },
        {
          "name": "mediagroup"
        },
        {
          "name": "loop",
          "valueSet": "v"
        },
        {
          "name": "muted",
          "valueSet": "v"
        },
        {
          "name": "controls",
          "valueSet": "v"
        },
        {
          "name": "width"
        },
        {
          "name": "height"
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "audio",
      "description": {
        "kind": "markdown",
        "value": "An audio element represents a sound or audio stream."
      },
      "attributes": [
        {
          "name": "src",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "crossorigin",
          "valueSet": "xo",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "preload",
          "valueSet": "pl",
          "description": {
            "kind": "markdown",
            "value": "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over\xA0`preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
          }
        },
        {
          "name": "autoplay",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "A Boolean attribute:\xA0if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\n**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control."
          }
        },
        {
          "name": "mediagroup"
        },
        {
          "name": "loop",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "A Boolean attribute:\xA0if specified, the audio player will\xA0automatically seek back to the start\xA0upon reaching the end of the audio."
          }
        },
        {
          "name": "muted",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
          }
        },
        {
          "name": "controls",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "source",
      "description": {
        "kind": "markdown",
        "value": "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own."
      },
      "void": true,
      "attributes": [
        {
          "name": "src",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "sizes",
        },
        {
          "name": "srcset",
        },
        {
          "name": "media",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "track",
      "description": {
        "kind": "markdown",
        "value": "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own."
      },
      "void": true,
      "attributes": [
        {
          "name": "default",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
          }
        },
        {
          "name": "kind",
          "valueSet": "tk",
          "description": {
            "kind": "markdown",
            "value": "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.)\xA0The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
          }
        },
        {
          "name": "label",
          "description": {
            "kind": "markdown",
            "value": "A user-readable title of the text track which is used by the browser when listing available text tracks."
          }
        },
        {
          "name": "src",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "srclang",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "map",
      "description": {
        "kind": "markdown",
        "value": "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children."
      },
      "attributes": [
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "area",
      "description": {
        "kind": "markdown",
        "value": "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map."
      },
      "void": true,
      "attributes": [
        {
          "name": "alt"
        },
        {
          "name": "coords"
        },
        {
          "name": "shape",
          "valueSet": "sh"
        },
        {
          "name": "href"
        },
        {
          "name": "target",
          "valueSet": "target"
        },
        {
          "name": "download"
        },
        {
          "name": "ping"
        },
        {
          "name": "rel"
        },
        {
          "name": "hreflang"
        },
        {
          "name": "type"
        },
        {
          "name": "accesskey",
          "description": "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "table",
      "description": {
        "kind": "markdown",
        "value": "The table element represents data with more than one dimension, in the form of a table."
      },
      "attributes": [
        {
          "name": "border"
        },
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "caption",
      "description": {
        "kind": "markdown",
        "value": "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element."
      },
      "attributes": [
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "colgroup",
      "description": {
        "kind": "markdown",
        "value": "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element."
      },
      "attributes": [
        {
          "name": "span"
        },
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "col",
      "description": {
        "kind": "markdown",
        "value": "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup."
      },
      "void": true,
      "attributes": [
        {
          "name": "span"
        },
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "tbody",
      "description": {
        "kind": "markdown",
        "value": "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table."
      },
      "attributes": [
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "thead",
      "description": {
        "kind": "markdown",
        "value": "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table."
      },
      "attributes": [
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "tfoot",
      "description": {
        "kind": "markdown",
        "value": "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table."
      },
      "attributes": [
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "tr",
      "description": {
        "kind": "markdown",
        "value": "The tr element represents a row of cells in a table."
      },
      "attributes": [
        {
          "name": "align",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "td",
      "description": {
        "kind": "markdown",
        "value": "The td element represents a data cell in a table."
      },
      "attributes": [
        {
          "name": "colspan"
        },
        {
          "name": "rowspan"
        },
        {
          "name": "headers"
        },
        {
          "name": "abbr",
          "description": "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute."
        },
        {
          "name": "align",
        },
        {
          "name": "axis",
          "description": "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard."
        },
        {
          "name": "bgcolor",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "th",
      "description": {
        "kind": "markdown",
        "value": "The th element represents a header cell in a table."
      },
      "attributes": [
        {
          "name": "colspan"
        },
        {
          "name": "rowspan"
        },
        {
          "name": "headers"
        },
        {
          "name": "scope",
          "valueSet": "s"
        },
        {
          "name": "sorted"
        },
        {
          "name": "abbr",
          "description": {
            "kind": "markdown",
            "value": "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
          }
        },
        {
          "name": "align",
        },
        {
          "name": "axis",
        },
        {
          "name": "bgcolor",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "form",
      "description": {
        "kind": "markdown",
        "value": "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing."
      },
      "attributes": [
        {
          "name": "accept-charset",
          "description": {
            "kind": "markdown",
            "value": 'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.'
          }
        },
        {
          "name": "action",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "autocomplete",
          "valueSet": "o",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "enctype",
          "valueSet": "et",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "method",
          "valueSet": "m",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
          }
        },
        {
          "name": "novalidate",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "target",
          "valueSet": "target",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "accept",
        },
        {
          "name": "autocapitalize",
          "description": "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "label",
      "description": {
        "kind": "markdown",
        "value": "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself."
      },
      "attributes": [
        {
          "name": "form",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "for",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "input",
      "description": {
        "kind": "markdown",
        "value": "The input element represents a typed data field, usually with a form control to allow the user to edit the data."
      },
      "void": true,
      "attributes": [
        {
          "name": "accept"
        },
        {
          "name": "alt"
        },
        {
          "name": "autocomplete",
          "valueSet": "inputautocomplete"
        },
        {
          "name": "autofocus",
          "valueSet": "v"
        },
        {
          "name": "checked",
          "valueSet": "v"
        },
        {
          "name": "dirname"
        },
        {
          "name": "disabled",
          "valueSet": "v"
        },
        {
          "name": "form"
        },
        {
          "name": "formaction"
        },
        {
          "name": "formenctype",
          "valueSet": "et"
        },
        {
          "name": "formmethod",
          "valueSet": "fm"
        },
        {
          "name": "formnovalidate",
          "valueSet": "v"
        },
        {
          "name": "formtarget"
        },
        {
          "name": "height"
        },
        {
          "name": "inputmode",
          "valueSet": "im"
        },
        {
          "name": "list"
        },
        {
          "name": "max"
        },
        {
          "name": "maxlength"
        },
        {
          "name": "min"
        },
        {
          "name": "minlength"
        },
        {
          "name": "multiple",
          "valueSet": "v"
        },
        {
          "name": "name"
        },
        {
          "name": "pattern"
        },
        {
          "name": "placeholder"
        },
        {
          "name": "readonly",
          "valueSet": "v"
        },
        {
          "name": "required",
          "valueSet": "v"
        },
        {
          "name": "size"
        },
        {
          "name": "src"
        },
        {
          "name": "step"
        },
        {
          "name": "type",
          "valueSet": "t"
        },
        {
          "name": "value"
        },
        {
          "name": "width"
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "button",
      "description": {
        "kind": "markdown",
        "value": "The button element represents a button labeled by its contents."
      },
      "attributes": [
        {
          "name": "autofocus",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
          }
        },
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "formaction",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "formenctype",
          "valueSet": "et",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "formmethod",
          "valueSet": "fm",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "formnovalidate",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "formtarget",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The name of the button, which is submitted with the form data."
          }
        },
        {
          "name": "type",
          "valueSet": "bt",
          "description": {
            "kind": "markdown",
            "value": "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
          }
        },
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
          }
        },
        {
          "name": "autocomplete",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "select",
      "description": {
        "kind": "markdown",
        "value": "The select element represents a control for selecting amongst a set of options."
      },
      "attributes": [
        {
          "name": "autocomplete",
          "valueSet": "inputautocomplete",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "autofocus",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
          }
        },
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
            "value": 'This attribute lets you specify the form element to\xA0which\xA0the select element is associated\xA0(that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.'
          }
        },
        {
          "name": "multiple",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "This attribute is used to specify the name of the control."
          }
        },
        {
          "name": "required",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "A Boolean attribute indicating that an option with a non-empty string value must be selected."
          }
        },
        {
          "name": "size",
          "description": {
            "kind": "markdown",
            "value": "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "datalist",
      "description": {
        "kind": "markdown",
        "value": "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "optgroup",
      "description": {
        "kind": "markdown",
        "value": "The optgroup element represents a group of option elements with a common label."
      },
      "attributes": [
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
          }
        },
        {
          "name": "label",
          "description": {
            "kind": "markdown",
            "value": "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "option",
      "description": {
        "kind": "markdown",
        "value": "The option element represents an option in a select element or as part of a list of suggestions in a datalist element."
      },
      "attributes": [
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "label",
          "description": {
            "kind": "markdown",
            "value": "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
          }
        },
        {
          "name": "selected",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "The content of this attribute represents the value to be submitted with the form, should this option be selected.\xA0If this attribute is omitted, the value is taken from the text content of the option element."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "textarea",
      "description": {
        "kind": "markdown",
        "value": "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value."
      },
      "attributes": [
        {
          "name": "autocomplete",
          "valueSet": "inputautocomplete",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "autofocus",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
          }
        },
        {
          "name": "cols",
          "description": {
            "kind": "markdown",
            "value": "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
          }
        },
        {
          "name": "dirname"
        },
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
            "value": 'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.'
          }
        },
        {
          "name": "inputmode",
          "valueSet": "im"
        },
        {
          "name": "maxlength",
          "description": {
            "kind": "markdown",
            "value": "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
          }
        },
        {
          "name": "minlength",
          "description": {
            "kind": "markdown",
            "value": "The minimum number of characters (unicode code points) required that the user should enter."
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The name of the control."
          }
        },
        {
          "name": "placeholder",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "readonly",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
          }
        },
        {
          "name": "required",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This attribute specifies that the user must fill in a value before submitting a form."
          }
        },
        {
          "name": "rows",
          "description": {
            "kind": "markdown",
            "value": "The number of visible text lines for the control."
          }
        },
        {
          "name": "wrap",
          "valueSet": "w",
          "description": {
            "kind": "markdown",
            "value": "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
          }
        },
        {
          "name": "autocapitalize",
          "description": "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
        },
        {
          "name": "spellcheck",
          "description": "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "output",
      "description": {
        "kind": "markdown",
        "value": "The output element represents the result of a calculation performed by the application, or the result of a user action."
      },
      "attributes": [
        {
          "name": "for",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "progress",
      "description": {
        "kind": "markdown",
        "value": "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed."
      },
      "attributes": [
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
          }
        },
        {
          "name": "max",
          "description": {
            "kind": "markdown",
            "value": "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "meter",
      "description": {
        "kind": "markdown",
        "value": "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate."
      },
      "attributes": [
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
          }
        },
        {
          "name": "min",
          "description": {
            "kind": "markdown",
            "value": "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
          }
        },
        {
          "name": "max",
          "description": {
            "kind": "markdown",
            "value": "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
          }
        },
        {
          "name": "low",
          "description": {
            "kind": "markdown",
            "value": "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
          }
        },
        {
          "name": "high",
          "description": {
            "kind": "markdown",
            "value": "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
          }
        },
        {
          "name": "optimum",
          "description": {
            "kind": "markdown",
            "value": "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
          }
        },
        {
          "name": "form",
          "description": "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "fieldset",
      "description": {
        "kind": "markdown",
        "value": "The fieldset element represents a set of form controls optionally grouped under a common name."
      },
      "attributes": [
        {
          "name": "disabled",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "form",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "name",
          "description": {
            "kind": "markdown",
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "legend",
      "description": {
        "kind": "markdown",
        "value": "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "details",
      "description": {
        "kind": "markdown",
        "value": "The details element represents a disclosure widget from which the user can obtain additional information or controls."
      },
      "attributes": [
        {
          "name": "open",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
            "value": "This Boolean attribute indicates whether or not the details \u2014 that is, the contents of the `<details>` element \u2014 are currently visible. The default, `false`, means the details are not visible."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "summary",
      "description": {
        "kind": "markdown",
        "value": "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dialog",
      "description": {
        "kind": "markdown",
        "value": "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window."
      },
      "attributes": [
        {
          "name": "open",
          "description": "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "script",
      "description": {
        "kind": "markdown",
        "value": "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user."
      },
      "attributes": [
        {
          "name": "src",
          "description": {
            "kind": "markdown",
            "value": "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
          }
        },
        {
          "name": "type",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "charset"
        },
        {
          "name": "async",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "defer",
          "valueSet": "v",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "crossorigin",
          "valueSet": "xo",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "nonce",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "integrity",
        },
        {
          "name": "nomodule",
        },
        {
          "name": "referrerpolicy",
        },
        {
          "name": "text",
          "description": "Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM."
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "noscript",
      "description": {
        "kind": "markdown",
        "value": "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "template",
      "description": {
        "kind": "markdown",
        "value": "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "canvas",
      "description": {
        "kind": "markdown",
        "value": "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly."
      },
      "attributes": [
        {
          "name": "width",
          "description": {
            "kind": "markdown",
            "value": "The width of the coordinate space in CSS pixels. Defaults to 300."
          }
        },
        {
          "name": "height",
          "description": {
            "kind": "markdown",
            "value": "The height of the coordinate space in CSS pixels. Defaults to 150."
          }
        },
        {
          "name": "moz-opaque",
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "slot",
      "description": {
        "kind": "markdown",
        "value": "The slot element is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together."
      },
      "attributes": [
        {
          "name": "name",
          "description": {
            "kind": "markdown",
            "value": "The slot's name.\nA **named slot** is a `<slot>` element with a `name` attribute."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "data",
      "description": {
        "kind": "markdown",
        "value": "The data element links a given piece of content with a machine-readable translation."
      },
      "attributes": [
        {
          "name": "value",
          "description": {
            "kind": "markdown",
            "value": "This attribute specifies the machine-readable translation of the content of the element."
          }
        }
      ],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "hgroup",
      "description": {
        "kind": "markdown",
        "value": "The hgroup element represents a heading and related content. It groups a single h1\u2013h6 element with one or more p."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "menu",
      "description": {
        "kind": "markdown",
        "value": "The menu element represents an unordered list of interactive items."
      },
      "attributes": [],
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    }
  ],
  "globalAttributes": [
    {
      "name": "accesskey",
      "description": {
        "kind": "markdown",
        "value": "Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "autocapitalize",
      "description": {
        "kind": "markdown",
        "value": "Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase"
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "class",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "contenteditable",
      "description": {
        "kind": "markdown",
        "value": "An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "contextmenu",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dir",
      "description": {
        "kind": "markdown",
        "value": "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
      },
      "valueSet": "d",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "draggable",
      "description": {
        "kind": "markdown",
      },
      "valueSet": "b",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "dropzone",
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "exportparts",
      "description": {
        "kind": "markdown",
        "value": "Used to transitively export shadow parts from a nested shadow tree into a containing light tree."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "hidden",
      "description": {
        "kind": "markdown",
        "value": "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
      },
      "valueSet": "v",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "id",
      "description": {
        "kind": "markdown",
        "value": "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS)."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "inputmode",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "is",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "itemid",
      "description": {
        "kind": "markdown",
        "value": "The unique, global identifier of an item."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "itemprop",
      "description": {
        "kind": "markdown",
        "value": "Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "itemref",
      "description": {
        "kind": "markdown",
        "value": "Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "itemscope",
      "description": {
        "kind": "markdown",
      },
      "valueSet": "v",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "itemtype",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "lang",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "part",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "role",
      "valueSet": "roles"
    },
    {
      "name": "slot",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "spellcheck",
      "description": {
        "kind": "markdown",
        "value": "An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors."
      },
      "valueSet": "b",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "style",
      "description": {
        "kind": "markdown",
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "tabindex",
      "description": {
        "kind": "markdown",
        "value": "An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "title",
      "description": {
        "kind": "markdown",
        "value": "Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip."
      },
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "translate",
      "description": {
        "kind": "markdown",
      },
      "valueSet": "y",
      "references": [
        {
          "name": "MDN Reference",
        }
      ]
    },
    {
      "name": "onabort",
      "description": {
        "kind": "markdown",
        "value": "The loading of a resource has been aborted."
      }
    },
    {
      "name": "onblur",
      "description": {
        "kind": "markdown",
        "value": "An element has lost focus (does not bubble)."
      }
    },
    {
      "name": "oncanplay",
      "description": {
        "kind": "markdown",
        "value": "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
      }
    },
    {
      "name": "oncanplaythrough",
      "description": {
        "kind": "markdown",
        "value": "The user agent can play the media up to its end without having to stop for further buffering of content."
      }
    },
    {
      "name": "onchange",
      "description": {
        "kind": "markdown",
        "value": "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
      }
    },
    {
      "name": "onclick",
      "description": {
        "kind": "markdown",
        "value": "A pointing device button has been pressed and released on an element."
      }
    },
    {
      "name": "oncontextmenu",
      "description": {
        "kind": "markdown",
        "value": "The right button of the mouse is clicked (before the context menu is displayed)."
      }
    },
    {
      "name": "ondblclick",
      "description": {
        "kind": "markdown",
        "value": "A pointing device button is clicked twice on an element."
      }
    },
    {
      "name": "ondrag",
      "description": {
        "kind": "markdown",
        "value": "An element or text selection is being dragged (every 350ms)."
      }
    },
    {
      "name": "ondragend",
      "description": {
        "kind": "markdown",
        "value": "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
      }
    },
    {
      "name": "ondragenter",
      "description": {
        "kind": "markdown",
        "value": "A dragged element or text selection enters a valid drop target."
      }
    },
    {
      "name": "ondragleave",
      "description": {
        "kind": "markdown",
        "value": "A dragged element or text selection leaves a valid drop target."
      }
    },
    {
      "name": "ondragover",
      "description": {
        "kind": "markdown",
        "value": "An element or text selection is being dragged over a valid drop target (every 350ms)."
      }
    },
    {
      "name": "ondragstart",
      "description": {
        "kind": "markdown",
        "value": "The user starts dragging an element or text selection."
      }
    },
    {
      "name": "ondrop",
      "description": {
        "kind": "markdown",
        "value": "An element is dropped on a valid drop target."
      }
    },
    {
      "name": "ondurationchange",
      "description": {
        "kind": "markdown",
        "value": "The duration attribute has been updated."
      }
    },
    {
      "name": "onemptied",
      "description": {
        "kind": "markdown",
        "value": "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
      }
    },
    {
      "name": "onended",
      "description": {
        "kind": "markdown",
        "value": "Playback has stopped because the end of the media was reached."
      }
    },
    {
      "name": "onerror",
      "description": {
        "kind": "markdown",
        "value": "A resource failed to load."
      }
    },
    {
      "name": "onfocus",
      "description": {
        "kind": "markdown",
        "value": "An element has received focus (does not bubble)."
      }
    },
    {
      "name": "onformchange"
    },
    {
      "name": "onforminput"
    },
    {
      "name": "oninput",
      "description": {
        "kind": "markdown",
        "value": "The value of an element changes or the content of an element with the attribute contenteditable is modified."
      }
    },
    {
      "name": "oninvalid",
      "description": {
        "kind": "markdown",
        "value": "A submittable element has been checked and doesn't satisfy its constraints."
      }
    },
    {
      "name": "onkeydown",
      "description": {
        "kind": "markdown",
        "value": "A key is pressed down."
      }
    },
    {
      "name": "onkeypress",
      "description": {
        "kind": "markdown",
        "value": "A key is pressed down and that key normally produces a character value (use input instead)."
      }
    },
    {
      "name": "onkeyup",
      "description": {
        "kind": "markdown",
        "value": "A key is released."
      }
    },
    {
      "name": "onload",
      "description": {
        "kind": "markdown",
        "value": "A resource and its dependent resources have finished loading."
      }
    },
    {
      "name": "onloadeddata",
      "description": {
        "kind": "markdown",
        "value": "The first frame of the media has finished loading."
      }
    },
    {
      "name": "onloadedmetadata",
      "description": {
        "kind": "markdown",
        "value": "The metadata has been loaded."
      }
    },
    {
      "name": "onloadstart",
      "description": {
        "kind": "markdown",
        "value": "Progress has begun."
      }
    },
    {
      "name": "onmousedown",
      "description": {
        "kind": "markdown",
        "value": "A pointing device button (usually a mouse) is pressed on an element."
      }
    },
    {
      "name": "onmousemove",
      "description": {
        "kind": "markdown",
        "value": "A pointing device is moved over an element."
      }
    },
    {
      "name": "onmouseout",
      "description": {
        "kind": "markdown",
        "value": "A pointing device is moved off the element that has the listener attached or off one of its children."
      }
    },
    {
      "name": "onmouseover",
      "description": {
        "kind": "markdown",
        "value": "A pointing device is moved onto the element that has the listener attached or onto one of its children."
      }
    },
    {
      "name": "onmouseup",
      "description": {
        "kind": "markdown",
        "value": "A pointing device button is released over an element."
      }
    },
    {
      "name": "onmousewheel"
    },
    {
      "name": "onmouseenter",
      "description": {
        "kind": "markdown",
        "value": "A pointing device is moved onto the element that has the listener attached."
      }
    },
    {
      "name": "onmouseleave",
      "description": {
        "kind": "markdown",
        "value": "A pointing device is moved off the element that has the listener attached."
      }
    },
    {
      "name": "onpause",
      "description": {
        "kind": "markdown",
        "value": "Playback has been paused."
      }
    },
    {
      "name": "onplay",
      "description": {
        "kind": "markdown",
        "value": "Playback has begun."
      }
    },
    {
      "name": "onplaying",
      "description": {
        "kind": "markdown",
        "value": "Playback is ready to start after having been paused or delayed due to lack of data."
      }
    },
    {
      "name": "onprogress",
      "description": {
        "kind": "markdown",
        "value": "In progress."
      }
    },
    {
      "name": "onratechange",
      "description": {
        "kind": "markdown",
        "value": "The playback rate has changed."
      }
    },
    {
      "name": "onreset",
      "description": {
        "kind": "markdown",
        "value": "A form is reset."
      }
    },
    {
      "name": "onresize",
      "description": {
        "kind": "markdown",
        "value": "The document view has been resized."
      }
    },
    {
      "name": "onreadystatechange",
      "description": {
        "kind": "markdown",
        "value": "The readyState attribute of a document has changed."
      }
    },
    {
      "name": "onscroll",
      "description": {
        "kind": "markdown",
        "value": "The document view or an element has been scrolled."
      }
    },
    {
      "name": "onseeked",
      "description": {
        "kind": "markdown",
        "value": "A seek operation completed."
      }
    },
    {
      "name": "onseeking",
      "description": {
        "kind": "markdown",
        "value": "A seek operation began."
      }
    },
    {
      "name": "onselect",
      "description": {
        "kind": "markdown",
        "value": "Some text is being selected."
      }
    },
    {
      "name": "onshow",
      "description": {
        "kind": "markdown",
        "value": "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
      }
    },
    {
      "name": "onstalled",
      "description": {
        "kind": "markdown",
        "value": "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
      }
    },
    {
      "name": "onsubmit",
      "description": {
        "kind": "markdown",
        "value": "A form is submitted."
      }
    },
    {
      "name": "onsuspend",
      "description": {
        "kind": "markdown",
        "value": "Media data loading has been suspended."
      }
    },
    {
      "name": "ontimeupdate",
      "description": {
        "kind": "markdown",
        "value": "The time indicated by the currentTime attribute has been updated."
      }
    },
    {
      "name": "onvolumechange",
      "description": {
        "kind": "markdown",
        "value": "The volume has changed."
      }
    },
    {
      "name": "onwaiting",
      "description": {
        "kind": "markdown",
        "value": "Playback has stopped because of a temporary lack of data."
      }
    },
    {
      "name": "onpointercancel",
      "description": {
        "kind": "markdown",
        "value": "The pointer is unlikely to produce any more events."
      }
    },
    {
      "name": "onpointerdown",
      "description": {
        "kind": "markdown",
        "value": "The pointer enters the active buttons state."
      }
    },
    {
      "name": "onpointerenter",
      "description": {
        "kind": "markdown",
        "value": "Pointing device is moved inside the hit-testing boundary."
      }
    },
    {
      "name": "onpointerleave",
      "description": {
        "kind": "markdown",
        "value": "Pointing device is moved out of the hit-testing boundary."
      }
    },
    {
      "name": "onpointerlockchange",
      "description": {
        "kind": "markdown",
        "value": "The pointer was locked or released."
      }
    },
    {
      "name": "onpointerlockerror",
      "description": {
        "kind": "markdown",
        "value": "It was impossible to lock the pointer for technical reasons or because the permission was denied."
      }
    },
    {
      "name": "onpointermove",
      "description": {
        "kind": "markdown",
        "value": "The pointer changed coordinates."
      }
    },
    {
      "name": "onpointerout",
      "description": {
        "kind": "markdown",
        "value": "The pointing device moved out of hit-testing boundary or leaves detectable hover range."
      }
    },
    {
      "name": "onpointerover",
      "description": {
        "kind": "markdown",
        "value": "The pointing device is moved into the hit-testing boundary."
      }
    },
    {
      "name": "onpointerup",
      "description": {
        "kind": "markdown",
        "value": "The pointer leaves the active buttons state."
      }
    },
    {
      "name": "aria-activedescendant",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-atomic",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-autocomplete",
      "valueSet": "autocomplete",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
      }
    },
    {
      "name": "aria-busy",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
      }
    },
    {
      "name": "aria-checked",
      "valueSet": "tristate",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-colcount",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-colindex",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-colspan",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-controls",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-current",
      "valueSet": "current",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-describedby",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-disabled",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-dropeffect",
      "valueSet": "dropeffect",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
      }
    },
    {
      "name": "aria-errormessage",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-expanded",
      "valueSet": "u",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
      }
    },
    {
      "name": "aria-flowto",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-grabbed",
      "valueSet": "u",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-haspopup",
      "valueSet": "haspopup",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-hidden",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-invalid",
      "valueSet": "invalid",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-label",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-labelledby",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-level",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-live",
      "valueSet": "live",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-modal",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-multiline",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates whether a text box accepts multiple lines of input or only a single line."
      }
    },
    {
      "name": "aria-multiselectable",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates that the user may select more than one item from the current selectable descendants."
      }
    },
    {
      "name": "aria-orientation",
      "valueSet": "orientation",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
      }
    },
    {
      "name": "aria-owns",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-placeholder",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
      }
    },
    {
      "name": "aria-posinset",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-pressed",
      "valueSet": "tristate",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-readonly",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-relevant",
      "valueSet": "relevant",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-required",
      "valueSet": "b",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-roledescription",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-rowcount",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-rowindex",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-rowspan",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-selected",
      "valueSet": "u",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-setsize",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-sort",
      "valueSet": "sort",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
        "value": "Indicates if items in a table or grid are sorted in ascending or descending order."
      }
    },
    {
      "name": "aria-valuemax",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-valuemin",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-valuenow",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-valuetext",
      "references": [
        {
          "name": "WAI-ARIA Reference",
        }
      ],
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-details",
      "description": {
        "kind": "markdown",
      }
    },
    {
      "name": "aria-keyshortcuts",
      "description": {
        "kind": "markdown",
        "value": "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
      }
    }
  ],
  "valueSets": [
    {
      "name": "b",
      "values": [
        {
          "name": "true"
        },
        {
          "name": "false"
        }
      ]
    },
    {
      "name": "u",
      "values": [
        {
          "name": "true"
        },
        {
          "name": "false"
        },
        {
          "name": "undefined"
        }
      ]
    },
    {
      "name": "o",
      "values": [
        {
          "name": "on"
        },
        {
          "name": "off"
        }
      ]
    },
    {
      "name": "y",
      "values": [
        {
          "name": "yes"
        },
        {
          "name": "no"
        }
      ]
    },
    {
      "name": "w",
      "values": [
        {
          "name": "soft"
        },
        {
          "name": "hard"
        }
      ]
    },
    {
      "name": "d",
      "values": [
        {
          "name": "ltr"
        },
        {
          "name": "rtl"
        },
        {
          "name": "auto"
        }
      ]
    },
    {
      "name": "m",
      "values": [
        {
          "name": "get",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "post",
          "description": {
            "kind": "markdown",
          }
        },
        {
          "name": "dialog",
          "description": {
            "kind": "markdown",
          }
        }
      ]
    },
    {
      "name": "fm",
      "values": [
        {
          "name": "get"
        },
        {
          "name": "post"
        }
      ]
    },
    {
      "name": "s",
      "values": [
        {
          "name": "row"
        },
        {
          "name": "col"
        },
        {
          "name": "rowgroup"
        },
        {
          "name": "colgroup"
        }
      ]
    },
    {
      "name": "t",
      "values": [
        {
          "name": "hidden"
        },
        {
          "name": "text"
        },
        {
          "name": "search"
        },
        {
          "name": "tel"
        },
        {
          "name": "url"
        },
        {
          "name": "email"
        },
        {
          "name": "password"
        },
        {
          "name": "datetime"
        },
        {
          "name": "date"
        },
        {
          "name": "month"
        },
        {
          "name": "week"
        },
        {
          "name": "time"
        },
        {
          "name": "datetime-local"
        },
        {
          "name": "number"
        },
        {
          "name": "range"
        },
        {
          "name": "color"
        },
        {
          "name": "checkbox"
        },
        {
          "name": "radio"
        },
        {
          "name": "file"
        },
        {
          "name": "submit"
        },
        {
          "name": "image"
        },
        {
          "name": "reset"
        },
        {
          "name": "button"
        }
      ]
    },
    {
      "name": "im",
      "values": [
        {
          "name": "verbatim"
        },
        {
          "name": "latin"
        },
        {
          "name": "latin-name"
        },
        {
          "name": "latin-prose"
        },
        {
          "name": "full-width-latin"
        },
        {
          "name": "kana"
        },
        {
          "name": "kana-name"
        },
        {
          "name": "katakana"
        },
        {
          "name": "numeric"
        },
        {
          "name": "tel"
        },
        {
          "name": "email"
        },
        {
          "name": "url"
        }
      ]
    },
    {
      "name": "bt",
      "values": [
        {
          "name": "button"
        },
        {
          "name": "submit"
        },
        {
          "name": "reset"
        },
        {
          "name": "menu"
        }
      ]
    },
    {
      "name": "lt",
      "values": [
        {
          "name": "1"
        },
        {
          "name": "a"
        },
        {
          "name": "A"
        },
        {
          "name": "i"
        },
        {
          "name": "I"
        }
      ]
    },
    {
      "name": "mt",
      "values": [
        {
          "name": "context"
        },
        {
          "name": "toolbar"
        }
      ]
    },
    {
      "name": "mit",
      "values": [
        {
          "name": "command"
        },
        {
          "name": "checkbox"
        },
        {
          "name": "radio"
        }
      ]
    },
    {
      "name": "et",
      "values": [
        {
          "name": "application/x-www-form-urlencoded"
        },
        {
          "name": "multipart/form-data"
        },
        {
          "name": "text/plain"
        }
      ]
    },
    {
      "name": "tk",
      "values": [
        {
          "name": "subtitles"
        },
        {
          "name": "captions"
        },
        {
          "name": "descriptions"
        },
        {
          "name": "chapters"
        },
        {
          "name": "metadata"
        }
      ]
    },
    {
      "name": "pl",
      "values": [
        {
          "name": "none"
        },
        {
          "name": "metadata"
        },
        {
          "name": "auto"
        }
      ]
    },
    {
      "name": "sh",
      "values": [
        {
          "name": "circle"
        },
        {
          "name": "default"
        },
        {
          "name": "poly"
        },
        {
          "name": "rect"
        }
      ]
    },
    {
      "name": "xo",
      "values": [
        {
          "name": "anonymous"
        },
        {
          "name": "use-credentials"
        }
      ]
    },
    {
      "name": "target",
      "values": [
        {
          "name": "_self"
        },
        {
          "name": "_blank"
        },
        {
          "name": "_parent"
        },
        {
          "name": "_top"
        }
      ]
    },
    {
      "name": "sb",
      "values": [
        {
          "name": "allow-forms"
        },
        {
          "name": "allow-modals"
        },
        {
          "name": "allow-pointer-lock"
        },
        {
          "name": "allow-popups"
        },
        {
          "name": "allow-popups-to-escape-sandbox"
        },
        {
          "name": "allow-same-origin"
        },
        {
          "name": "allow-scripts"
        },
        {
          "name": "allow-top-navigation"
        }
      ]
    },
    {
      "name": "tristate",
      "values": [
        {
          "name": "true"
        },
        {
          "name": "false"
        },
        {
          "name": "mixed"
        },
        {
          "name": "undefined"
        }
      ]
    },
    {
      "name": "inputautocomplete",
      "values": [
        {
          "name": "additional-name"
        },
        {
          "name": "address-level1"
        },
        {
          "name": "address-level2"
        },
        {
          "name": "address-level3"
        },
        {
          "name": "address-level4"
        },
        {
          "name": "address-line1"
        },
        {
          "name": "address-line2"
        },
        {
          "name": "address-line3"
        },
        {
          "name": "bday"
        },
        {
          "name": "bday-year"
        },
        {
          "name": "bday-day"
        },
        {
          "name": "bday-month"
        },
        {
          "name": "billing"
        },
        {
          "name": "cc-additional-name"
        },
        {
          "name": "cc-csc"
        },
        {
          "name": "cc-exp"
        },
        {
          "name": "cc-exp-month"
        },
        {
          "name": "cc-exp-year"
        },
        {
          "name": "cc-family-name"
        },
        {
          "name": "cc-given-name"
        },
        {
          "name": "cc-name"
        },
        {
          "name": "cc-number"
        },
        {
          "name": "cc-type"
        },
        {
          "name": "country"
        },
        {
          "name": "country-name"
        },
        {
          "name": "current-password"
        },
        {
          "name": "email"
        },
        {
          "name": "family-name"
        },
        {
          "name": "fax"
        },
        {
          "name": "given-name"
        },
        {
          "name": "home"
        },
        {
          "name": "honorific-prefix"
        },
        {
          "name": "honorific-suffix"
        },
        {
          "name": "impp"
        },
        {
          "name": "language"
        },
        {
          "name": "mobile"
        },
        {
          "name": "name"
        },
        {
          "name": "new-password"
        },
        {
          "name": "nickname"
        },
        {
          "name": "off"
        },
        {
          "name": "on"
        },
        {
          "name": "organization"
        },
        {
          "name": "organization-title"
        },
        {
          "name": "pager"
        },
        {
          "name": "photo"
        },
        {
          "name": "postal-code"
        },
        {
          "name": "sex"
        },
        {
          "name": "shipping"
        },
        {
          "name": "street-address"
        },
        {
          "name": "tel-area-code"
        },
        {
          "name": "tel"
        },
        {
          "name": "tel-country-code"
        },
        {
          "name": "tel-extension"
        },
        {
          "name": "tel-local"
        },
        {
          "name": "tel-local-prefix"
        },
        {
          "name": "tel-local-suffix"
        },
        {
          "name": "tel-national"
        },
        {
          "name": "transaction-amount"
        },
        {
          "name": "transaction-currency"
        },
        {
          "name": "url"
        },
        {
          "name": "username"
        },
        {
          "name": "work"
        }
      ]
    },
    {
      "name": "autocomplete",
      "values": [
        {
          "name": "inline"
        },
        {
          "name": "list"
        },
        {
          "name": "both"
        },
        {
          "name": "none"
        }
      ]
    },
    {
      "name": "current",
      "values": [
        {
          "name": "page"
        },
        {
          "name": "step"
        },
        {
          "name": "location"
        },
        {
          "name": "date"
        },
        {
          "name": "time"
        },
        {
          "name": "true"
        },
        {
          "name": "false"
        }
      ]
    },
    {
      "name": "dropeffect",
      "values": [
        {
          "name": "copy"
        },
        {
          "name": "move"
        },
        {
          "name": "link"
        },
        {
          "name": "execute"
        },
        {
          "name": "popup"
        },
        {
          "name": "none"
        }
      ]
    },
    {
      "name": "invalid",
      "values": [
        {
          "name": "grammar"
        },
        {
          "name": "false"
        },
        {
          "name": "spelling"
        },
        {
          "name": "true"
        }
      ]
    },
    {
      "name": "live",
      "values": [
        {
          "name": "off"
        },
        {
          "name": "polite"
        },
        {
          "name": "assertive"
        }
      ]
    },
    {
      "name": "orientation",
      "values": [
        {
          "name": "vertical"
        },
        {
          "name": "horizontal"
        },
        {
          "name": "undefined"
        }
      ]
    },
    {
      "name": "relevant",
      "values": [
        {
          "name": "additions"
        },
        {
          "name": "removals"
        },
        {
          "name": "text"
        },
        {
          "name": "all"
        },
        {
          "name": "additions text"
        }
      ]
    },
    {
      "name": "sort",
      "values": [
        {
          "name": "ascending"
        },
        {
          "name": "descending"
        },
        {
          "name": "none"
        },
        {
          "name": "other"
        }
      ]
    },
    {
      "name": "roles",
      "values": [
        {
          "name": "alert"
        },
        {
          "name": "alertdialog"
        },
        {
          "name": "button"
        },
        {
          "name": "checkbox"
        },
        {
          "name": "dialog"
        },
        {
          "name": "gridcell"
        },
        {
          "name": "link"
        },
        {
          "name": "log"
        },
        {
          "name": "marquee"
        },
        {
          "name": "menuitem"
        },
        {
          "name": "menuitemcheckbox"
        },
        {
          "name": "menuitemradio"
        },
        {
          "name": "option"
        },
        {
          "name": "progressbar"
        },
        {
          "name": "radio"
        },
        {
          "name": "scrollbar"
        },
        {
          "name": "searchbox"
        },
        {
          "name": "slider"
        },
        {
          "name": "spinbutton"
        },
        {
          "name": "status"
        },
        {
          "name": "switch"
        },
        {
          "name": "tab"
        },
        {
          "name": "tabpanel"
        },
        {
          "name": "textbox"
        },
        {
          "name": "timer"
        },
        {
          "name": "tooltip"
        },
        {
          "name": "treeitem"
        },
        {
          "name": "combobox"
        },
        {
          "name": "grid"
        },
        {
          "name": "listbox"
        },
        {
          "name": "menu"
        },
        {
          "name": "menubar"
        },
        {
          "name": "radiogroup"
        },
        {
          "name": "tablist"
        },
        {
          "name": "tree"
        },
        {
          "name": "treegrid"
        },
        {
          "name": "application"
        },
        {
          "name": "article"
        },
        {
          "name": "cell"
        },
        {
          "name": "columnheader"
        },
        {
          "name": "definition"
        },
        {
          "name": "directory"
        },
        {
          "name": "document"
        },
        {
          "name": "feed"
        },
        {
          "name": "figure"
        },
        {
          "name": "group"
        },
        {
          "name": "heading"
        },
        {
          "name": "img"
        },
        {
          "name": "list"
        },
        {
          "name": "listitem"
        },
        {
          "name": "math"
        },
        {
          "name": "none"
        },
        {
          "name": "note"
        },
        {
          "name": "presentation"
        },
        {
          "name": "region"
        },
        {
          "name": "row"
        },
        {
          "name": "rowgroup"
        },
        {
          "name": "rowheader"
        },
        {
          "name": "separator"
        },
        {
          "name": "table"
        },
        {
          "name": "term"
        },
        {
          "name": "text"
        },
        {
          "name": "toolbar"
        },
        {
          "name": "banner"
        },
        {
          "name": "complementary"
        },
        {
          "name": "contentinfo"
        },
        {
          "name": "form"
        },
        {
          "name": "main"
        },
        {
          "name": "navigation"
        },
        {
          "name": "region"
        },
        {
          "name": "search"
        },
        {
          "name": "doc-abstract"
        },
        {
          "name": "doc-acknowledgments"
        },
        {
          "name": "doc-afterword"
        },
        {
          "name": "doc-appendix"
        },
        {
          "name": "doc-backlink"
        },
        {
          "name": "doc-biblioentry"
        },
        {
          "name": "doc-bibliography"
        },
        {
          "name": "doc-biblioref"
        },
        {
          "name": "doc-chapter"
        },
        {
          "name": "doc-colophon"
        },
        {
          "name": "doc-conclusion"
        },
        {
          "name": "doc-cover"
        },
        {
          "name": "doc-credit"
        },
        {
          "name": "doc-credits"
        },
        {
          "name": "doc-dedication"
        },
        {
          "name": "doc-endnote"
        },
        {
          "name": "doc-endnotes"
        },
        {
          "name": "doc-epigraph"
        },
        {
          "name": "doc-epilogue"
        },
        {
          "name": "doc-errata"
        },
        {
          "name": "doc-example"
        },
        {
          "name": "doc-footnote"
        },
        {
          "name": "doc-foreword"
        },
        {
          "name": "doc-glossary"
        },
        {
          "name": "doc-glossref"
        },
        {
          "name": "doc-index"
        },
        {
          "name": "doc-introduction"
        },
        {
          "name": "doc-noteref"
        },
        {
          "name": "doc-notice"
        },
        {
          "name": "doc-pagebreak"
        },
        {
          "name": "doc-pagelist"
        },
        {
          "name": "doc-part"
        },
        {
          "name": "doc-preface"
        },
        {
          "name": "doc-prologue"
        },
        {
          "name": "doc-pullquote"
        },
        {
          "name": "doc-qna"
        },
        {
          "name": "doc-subtitle"
        },
        {
          "name": "doc-tip"
        },
        {
          "name": "doc-toc"
        }
      ]
    },
    {
      "name": "metanames",
      "values": [
        {
          "name": "application-name"
        },
        {
          "name": "author"
        },
        {
          "name": "description"
        },
        {
          "name": "format-detection"
        },
        {
          "name": "generator"
        },
        {
          "name": "keywords"
        },
        {
          "name": "publisher"
        },
        {
          "name": "referrer"
        },
        {
          "name": "robots"
        },
        {
          "name": "theme-color"
        },
        {
          "name": "viewport"
        }
      ]
    },
    {
      "name": "haspopup",
      "values": [
        {
          "name": "false",
          "description": {
            "kind": "markdown",
            "value": "(default) Indicates the element does not have a popup."
          }
        },
        {
          "name": "true",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a menu."
          }
        },
        {
          "name": "menu",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a menu."
          }
        },
        {
          "name": "listbox",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a listbox."
          }
        },
        {
          "name": "tree",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a tree."
          }
        },
        {
          "name": "grid",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a grid."
          }
        },
        {
          "name": "dialog",
          "description": {
            "kind": "markdown",
            "value": "Indicates the popup is a dialog."
          }
        }
      ]
    },
    {
      "name": "decoding",
      "values": [
        {
          "name": "sync"
        },
        {
          "name": "async"
        },
        {
          "name": "auto"
        }
      ]
    },
    {
      "name": "loading",
      "values": [
        {
          "name": "eager",
          "description": {
            "kind": "markdown",
            "value": "Loads the image immediately, regardless of whether or not the image is currently within the visible viewport (this is the default value)."
          }
        },
        {
          "name": "lazy",
          "description": {
            "kind": "markdown",
            "value": "Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser. The intent is to avoid the network and storage bandwidth needed to handle the image until it's reasonably certain that it will be needed. This generally improves the performance of the content in most typical use cases."
          }
        }
      ]
    },
    {
      "name": "referrerpolicy",
      "values": [
        {
          "name": "no-referrer"
        },
        {
          "name": "no-referrer-when-downgrade"
        },
        {
          "name": "origin"
        },
        {
          "name": "origin-when-cross-origin"
        },
        {
          "name": "same-origin"
        },
        {
          "name": "strict-origin"
        },
        {
          "name": "strict-origin-when-cross-origin"
        },
        {
          "name": "unsafe-url"
        }
      ]
    }
  ]
};

// node_modules/vscode-html-languageservice/lib/esm/languageFacts/dataManager.js
var HTMLDataManager = class {
  constructor(options) {
    this.dataProviders = [];
    this.setDataProviders(options.useDefaultDataProvider !== false, options.customDataProviders || []);
  }
  setDataProviders(builtIn, providers) {
    this.dataProviders = [];
    if (builtIn) {
      this.dataProviders.push(new HTMLDataProvider("html5", htmlData));
    }
    this.dataProviders.push(...providers);
  }
  getDataProviders() {
    return this.dataProviders;
  }
  isVoidElement(e, voidElements) {
    return !!e && binarySearch(voidElements, e.toLowerCase(), (s1, s2) => s1.localeCompare(s2)) >= 0;
  }
  getVoidElements(languageOrProviders) {
    const dataProviders = Array.isArray(languageOrProviders) ? languageOrProviders : this.getDataProviders().filter((p) => p.isApplicable(languageOrProviders));
    const voidTags = [];
    dataProviders.forEach((provider) => {
      provider.provideTags().filter((tag) => tag.void).forEach((tag) => voidTags.push(tag.name));
    });
    return voidTags.sort();
  }
  isPathAttribute(tag, attr) {
    if (attr === "src" || attr === "href") {
      return true;
    }
    const a = PATH_TAG_AND_ATTR[tag];
    if (a) {
      if (typeof a === "string") {
        return a === attr;
      } else {
        return a.indexOf(attr) !== -1;
      }
    }
    return false;
  }
};
var PATH_TAG_AND_ATTR = {
  // HTML 4
  a: "href",
  area: "href",
  body: "background",
  blockquote: "cite",
  del: "cite",
  form: "action",
  frame: ["src", "longdesc"],
  img: ["src", "longdesc"],
  ins: "cite",
  link: "href",
  object: "data",
  q: "cite",
  script: "src",
  // HTML 5
  audio: "src",
  button: "formaction",
  command: "icon",
  embed: "src",
  html: "manifest",
  input: ["src", "formaction"],
  source: "src",
  track: "src",
  video: ["src", "poster"]
};

// node_modules/vscode-html-languageservice/lib/esm/htmlLanguageService.js
var defaultLanguageServiceOptions = {};
function getLanguageService(options = defaultLanguageServiceOptions) {
  const dataManager = new HTMLDataManager(options);
  const htmlHover = new HTMLHover(options, dataManager);
  const htmlCompletion = new HTMLCompletion(options, dataManager);
  const htmlParser = new HTMLParser(dataManager);
  const htmlSelectionRange = new HTMLSelectionRange(htmlParser);
  const htmlFolding = new HTMLFolding(dataManager);
  const htmlDocumentLinks = new HTMLDocumentLinks(dataManager);
  return {
    setDataProviders: dataManager.setDataProviders.bind(dataManager),
    createScanner,
    parseHTMLDocument: htmlParser.parseDocument.bind(htmlParser),
    doComplete: htmlCompletion.doComplete.bind(htmlCompletion),
    doComplete2: htmlCompletion.doComplete2.bind(htmlCompletion),
    setCompletionParticipants: htmlCompletion.setCompletionParticipants.bind(htmlCompletion),
    doHover: htmlHover.doHover.bind(htmlHover),
    format: format2,
    findDocumentHighlights,
    findDocumentLinks: htmlDocumentLinks.findDocumentLinks.bind(htmlDocumentLinks),
    findDocumentSymbols,
    findDocumentSymbols2,
    getFoldingRanges: htmlFolding.getFoldingRanges.bind(htmlFolding),
    getSelectionRanges: htmlSelectionRange.getSelectionRanges.bind(htmlSelectionRange),
    doQuoteComplete: htmlCompletion.doQuoteComplete.bind(htmlCompletion),
    doTagComplete: htmlCompletion.doTagComplete.bind(htmlCompletion),
    doRename,
    findMatchingTagPosition,
    findOnTypeRenameRanges: findLinkedEditingRanges,
    findLinkedEditingRanges
  };
}
function newHTMLDataProvider(id, customData) {
  return new HTMLDataProvider(id, customData);
}

// src/language/html/htmlWorker.ts
var HTMLWorker = class {
  constructor(ctx, createData) {
    this._ctx = ctx;
    this._languageSettings = createData.languageSettings;
    this._languageId = createData.languageId;
    const data = this._languageSettings.data;
    const useDefaultDataProvider = data?.useDefaultDataProvider;
    const customDataProviders = [];
    if (data?.dataProviders) {
      for (const id in data.dataProviders) {
        customDataProviders.push(newHTMLDataProvider(id, data.dataProviders[id]));
      }
    }
    this._languageService = getLanguageService({
      useDefaultDataProvider,
      customDataProviders
    });
  }
  async doComplete(uri, position) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return null;
    }
    let htmlDocument = this._languageService.parseHTMLDocument(document);
    return Promise.resolve(
      this._languageService.doComplete(
        document,
        position,
        htmlDocument,
        this._languageSettings && this._languageSettings.suggest
      )
    );
  }
  async format(uri, range, options) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let formattingOptions = { ...this._languageSettings.format, ...options };
    let textEdits = this._languageService.format(document, range, formattingOptions);
    return Promise.resolve(textEdits);
  }
  async doHover(uri, position) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return null;
    }
    let htmlDocument = this._languageService.parseHTMLDocument(document);
    let hover = this._languageService.doHover(document, position, htmlDocument);
    return Promise.resolve(hover);
  }
  async findDocumentHighlights(uri, position) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let htmlDocument = this._languageService.parseHTMLDocument(document);
    let highlights = this._languageService.findDocumentHighlights(document, position, htmlDocument);
    return Promise.resolve(highlights);
  }
  async findDocumentLinks(uri) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let links = this._languageService.findDocumentLinks(
      document,
      null
      /*TODO@aeschli*/
    );
    return Promise.resolve(links);
  }
  async findDocumentSymbols(uri) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let htmlDocument = this._languageService.parseHTMLDocument(document);
    let symbols = this._languageService.findDocumentSymbols(document, htmlDocument);
    return Promise.resolve(symbols);
  }
  async getFoldingRanges(uri, context) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let ranges = this._languageService.getFoldingRanges(document, context);
    return Promise.resolve(ranges);
  }
  async getSelectionRanges(uri, positions) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return [];
    }
    let ranges = this._languageService.getSelectionRanges(document, positions);
    return Promise.resolve(ranges);
  }
  async doRename(uri, position, newName) {
    let document = this._getTextDocument(uri);
    if (!document) {
      return null;
    }
    let htmlDocument = this._languageService.parseHTMLDocument(document);
    let renames = this._languageService.doRename(document, position, newName, htmlDocument);
    return Promise.resolve(renames);
  }
  _getTextDocument(uri) {
    let models = this._ctx.getMirrorModels();
    for (let model of models) {
      if (model.uri.toString() === uri) {
        return TextDocument2.create(
          uri,
          this._languageId,
          model.version,
          model.getValue()
        );
      }
    }
    return null;
  }
};

// src/language/html/html.worker.ts
self.onmessage = () => {
  worker.initialize((ctx, createData) => {
    return new HTMLWorker(ctx, createData);
  });
};
