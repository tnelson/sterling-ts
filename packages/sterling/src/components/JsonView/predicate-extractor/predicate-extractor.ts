import { PredDeclContext } from "../forge-evaluator-pred/ForgeParser";
import { decodeHTML } from "entities";

export type Predicate = {
  name: string;
  args?: string[]; // list of argument names
  body: string;
  predicateString: string; // full string of the predicate
  predTree?: PredDeclContext; // parse tree of the predicate
}

function removeCommentLines(fileContent: string): string {
  // NOTE: this currently DOES NOT filter out block comments!
  let result = '';
  const lines = fileContent.split('\n');
  for (const line of lines) {
    if (!line.trim().startsWith('//') && !line.trim().startsWith('--')) {
      result += line + '\n';
    }
  }
  return result;
}

// extract predicates
export function extractPredicates(fileContent: string): Predicate[] {
  console.log('fileContent:', fileContent);
  const decodedContent = decodeHTML(fileContent); // HTML encoded string -> plain string
  const cleanedContent = removeCommentLines(decodedContent);
  console.log('cleanedContent:', cleanedContent);

  const predicateRegex = /pred\s+(\w+)(\[[^\]]*\])?\s*\{([\s\S]*?)\}/g;
  let match;
  const predicates: Predicate[] = [];

  while ((match = predicateRegex.exec(cleanedContent)) !== null) {
      const name = match[1]; // Predicate name
      const args = match[2] || ''; // Arguments (optional)
      let body = match[3]; // Predicate body
      console.log('body:', body);

      // filter out occurrences of "// " from the body
      body = body.replaceAll('// ', '');
      
      const predicate: Predicate = {
        name: name,
        args: args ? args.substring(1, args.length - 1).split(',').map(arg => arg.trim()) : undefined,
        body: body,
        predicateString: `pred ${name}${args} {${body}}`
      }
      predicates.push(predicate);
  }
  
  return predicates;
}